// Build script — King Motor Mojokerto
// Menghasilkan halaman statis dari data/site.json + data/units.json.
// Jalankan: npm run build

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const readJSON = (p) => JSON.parse(read(p));
const write = (p, content) => {
  const full = path.join(ROOT, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  return full;
};

const site = readJSON("data/site.json");
const units = readJSON("data/units.json");

// Domain bisa di-override lewat env (mis. preview deploy Vercel):
//   SITE_DOMAIN=https://king-motor.vercel.app npm run build
// Otomatis deteksi domain Vercel jika SITE_DOMAIN tidak ditentukan manual:
const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || "";
const autoVercelDomain = vercelHost ? `https://${vercelHost}` : "";
const SITE_DOMAIN = (process.env.SITE_DOMAIN || autoVercelDomain || "")
  .trim()
  .replace(/\/+$/, "");
if (SITE_DOMAIN) site.domain = SITE_DOMAIN;

// Override opsional lewat environment variable Vercel:
if (process.env.WA_NUMBER) {
  site.waNumber = process.env.WA_NUMBER.trim();
}
if (process.env.GA_ID) {
  site.integrations = site.integrations || {};
  site.integrations.gaId = process.env.GA_ID.trim();
}
if (process.env.FORM_ENDPOINT) {
  site.integrations = site.integrations || {};
  site.integrations.formEndpoint = process.env.FORM_ENDPOINT.trim();
}

/* ---------------------------------- utils --------------------------------- */

const esc = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[ch]);

const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

const rupiahShort = (n) => {
  const jt = n / 1_000_000;
  const str = jt.toFixed(1).replace(".", ",");
  return `Rp ${str} jt`;
};

const formatKm = (n) => `${Math.round(n).toLocaleString("id-ID")} km`;

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

const taxLabel = (value) => {
  const [y, m] = String(value).split("-").map(Number);
  return `${MONTHS[(m || 1) - 1]} ${y}`;
};

const dateLabel = (iso) => {
  const d = new Date(`${iso}T00:00:00`);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
};

const TYPE_LABEL = { matic: "Matic", bebek: "Bebek", sport: "Sport" };
const TRANSMISSION = {
  matic: "Matic (CVT)",
  bebek: "Manual 4 percepatan",
  sport: "Manual 6 percepatan",
};
const STATUS_LABEL = { ready: "Ready", booking: "Booking", sold: "Terjual" };

const waUrl = (text) =>
  `https://wa.me/${site.waNumber}?text=${encodeURIComponent(text)}`;

const installment = (price, dpPercent = 0.2, tenor = 24) => {
  const principal = price * (1 - dpPercent);
  const total = principal * (1 + site.credit.flatRatePerMonth * tenor);
  return Math.round(total / tenor / 1000) * 1000;
};

/* -------------------------------- validate -------------------------------- */

const slugs = new Set();
const problems = [];
for (const u of units) {
  if (!u.slug || !/^[a-z0-9-]+$/.test(u.slug)) problems.push(`Slug tidak valid: ${u.slug}`);
  if (slugs.has(u.slug)) problems.push(`Slug duplikat: ${u.slug}`);
  slugs.add(u.slug);
  if (!u.brand || !u.model || !u.year) problems.push(`Data unit tidak lengkap: ${u.slug}`);
  if (!TYPE_LABEL[u.type]) problems.push(`Tipe tidak dikenal (${u.type}): ${u.slug}`);
  if (!STATUS_LABEL[u.status]) problems.push(`Status tidak dikenal (${u.status}): ${u.slug}`);
  if (!(u.priceCash > 0)) problems.push(`Harga tidak valid: ${u.slug}`);
}
if (problems.length) {
  console.error("Data unit bermasalah:\n - " + problems.join("\n - "));
  process.exit(1);
}

/* ------------------------------ derived data ------------------------------ */

const siteWa = {
  general: waUrl("Halo King Motor, saya mau tanya stok motor di Mojokerto."),
  credit: waUrl("Halo King Motor, saya mau tanya simulasi kredit motor. Bisa dibantu?"),
  trade: waUrl("Halo King Motor, saya mau tukar tambah motor lama saya. Bisa minta penilaian?"),
  sell: waUrl("Halo King Motor, saya mau jual motor. Bisa minta penilaian?"),
  location: waUrl("Halo King Motor, boleh minta lokasi showroom dan stok terbaru?"),
};

const decorate = (u, base = "") => {
  const title = `${u.brand} ${u.model} ${u.year}`;
  const dpFrom = Math.round((u.priceCash * 0.2) / 100_000) * 100_000;
  const installmentFrom = installment(u.priceCash);
  const image = `${base}assets/img/units/${u.slug}.svg`;
  return {
    ...u,
    title,
    typeLabel: TYPE_LABEL[u.type],
    transmission: TRANSMISSION[u.type],
    statusLabel: STATUS_LABEL[u.status],
    price: rupiah(u.priceCash),
    priceShort: rupiahShort(u.priceCash),
    dpFrom,
    dp: rupiah(dpFrom),
    dpShort: rupiahShort(dpFrom),
    installmentFrom,
    installment: `Rp ${Math.round(installmentFrom).toLocaleString("id-ID")}`,
    installmentShort: rupiahShort(installmentFrom),
    km: formatKm(u.mileageKm),
    taxLabel: taxLabel(u.taxValidUntil),
    dateLabel: dateLabel(u.dateAdded),
    image,
    waCard: waUrl(
      `Halo King Motor, saya tertarik dengan ${title} seharga ${rupiah(u.priceCash)}. Masih ready?`
    ),
    waDetail: waUrl(
      `Halo King Motor, saya tertarik dengan ${title} seharga ${rupiah(u.priceCash)}. Bisa info kondisi, surat, dan foto terbarunya?`
    ),
    waBooking: waUrl(
      `Halo King Motor, saya mau booking test ride ${title}. Kapan bisa datang ke showroom?`
    ),
    waCredit: waUrl(
      `Halo King Motor, saya mau tanya simulasi kredit ${title}. DP saya sekitar ...`
    ),
    waTrade: waUrl(
      `Halo King Motor, saya mau tukar tambah motor lama saya dengan ${title}.`
    ),
  };
};

const allUnits = units.map((u) => decorate(u));
const bySlug = new Map(allUnits.map((u) => [u.slug, u]));

/* -------------------------------- templates ------------------------------- */

const header = read("src/partials/header.html");
const footer = read("src/partials/footer.html");

const globalTokens = {
  brand: site.brand,
  domain: site.domain,
  waNumber: site.waNumber,
  waGeneral: siteWa.general,
  waCredit: siteWa.credit,
  waTrade: siteWa.trade,
  waSell: siteWa.sell,
  phoneDisplay: site.phoneDisplay,
  phoneHref: `+${site.waNumber}`,
  email: site.email,
  addressFull: site.address.full,
  addressStreet: site.address.street,
  addressPostal: site.address.postalCode,
  mapsUrl: site.address.mapsUrl,
  lat: site.address.lat,
  lng: site.address.lng,
  instagram: site.social.find((s) => s.name === "Instagram")?.url || "#",
  facebook: site.social.find((s) => s.name === "Facebook")?.url || "#",
  tiktok: site.social.find((s) => s.name === "TikTok")?.url || "#",
};

const applyTokens = (html, extra = {}) => {
  const tokens = { ...globalTokens, ...extra };
  return html.replace(/\{\{([a-zA-Z0-9_.]+)\}\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(tokens, key)) return String(tokens[key]);
    throw new Error(`Token belum terisi: ${match}`);
  });
};

const renderShell = (pageFile, extraTokens = {}) => {
  let html = read(pageFile);
  html = html.replace("{{header}}", header).replace("{{footer}}", footer);
  return applyTokens(html, extraTokens);
};

/* ------------------------------ SVG generator ----------------------------- */

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
};
const tint = (hex, amount) => {
  const [r, g, b] = hexToRgb(hex);
  const mix = (c) => Math.round(c + (255 - c) * amount);
  return `#${[mix(r), mix(g), mix(b)].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
};

const BIKE_PATHS = `
  <path d="M5 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M19 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4" />
  <path d="M13 6h2l1.5 3l2 4" />`;

const unitArt = (u) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="Ilustrasi ${esc(u.title)}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${tint(u.colorHex, 0.58)}"/>
      <stop offset="0.55" stop-color="${tint(u.colorHex, 0.88)}"/>
      <stop offset="1" stop-color="#F8FAFC"/>
    </linearGradient>
    <linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0B2A4A" stop-opacity=".18"/>
      <stop offset="1" stop-color="#0B2A4A" stop-opacity=".02"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <circle cx="656" cy="118" r="196" fill="#FFFFFF" fill-opacity=".4"/>
  <circle cx="108" cy="530" r="150" fill="${u.colorHex}" fill-opacity=".08"/>
  <path d="M-20 470 C170 420 250 500 430 458 S690 402 830 452" fill="none" stroke="#FFFFFF" stroke-width="90" stroke-opacity=".26"/>
  <circle cx="400" cy="300" r="172" fill="${u.colorHex}" fill-opacity=".1"/>
  <circle cx="400" cy="300" r="172" fill="none" stroke="#FFFFFF" stroke-opacity=".55" stroke-width="1.5"/>
  <g stroke="${u.colorHex}" stroke-opacity=".18" stroke-width="10" stroke-linecap="round">
    <path d="M64 300h96"/>
    <path d="M44 344h72"/>
    <path d="M84 388h54"/>
  </g>
  <ellipse cx="400" cy="436" rx="188" ry="16" fill="url(#s)"/>
  <g transform="translate(400 292) scale(15.2) translate(-12 -12)" fill="none" stroke="#0B2A4A" stroke-width="1.22" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".88">
    ${BIKE_PATHS}
  </g>
  <path d="M286 456h228" stroke="#F5A623" stroke-opacity=".75" stroke-width="4" stroke-linecap="round"/>
  <g>
    <rect x="48" y="536" width="34" height="4" rx="2" fill="#F5A623"/>
    <text x="94" y="542" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" letter-spacing="6" fill="#0B2A4A" fill-opacity=".45">KING MOTOR</text>
  </g>
</svg>`;

/* --------------------------------- cards ---------------------------------- */

const checkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>`;

const waIcon = `<svg class="ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.34M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.45 6.6 2.02 12.05 2.02c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.94L0 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.48-8.41"/></svg>`;

const unitCard = (u, { base = "" } = {}) => {
  const url = `${base}motor/${u.slug}/`;
  const isAvailable = u.status === "ready";
  const badge = `<span class="badge badge--${u.status}">${u.statusLabel}</span>`;
  const featured = u.featured && isAvailable
    ? `<span class="badge badge--featured">Favorit</span>`
    : "";
  const foot = isAvailable
    ? `<a class="btn btn-wa btn-sm unit-cta" href="${u.waCard}" target="_blank" rel="noopener" data-ga="wa_click" data-location="catalog_card" data-unit="${u.slug}" aria-label="Chat WhatsApp tentang ${esc(u.title)}">${waIcon}Chat</a>`
    : `<span class="btn btn-sm btn-disabled" aria-disabled="true">${u.status === "booking" ? "Sudah dibooking" : "Terjual"}</span>`;

  return `<article class="unit-card" data-unit="${u.slug}" data-type="${u.type}" data-price="${u.priceCash}" data-year="${u.year}" data-km="${u.mileageKm}" data-featured="${u.featured ? 1 : 0}" data-date="${u.dateAdded}" data-status="${u.status}">
  <a class="unit-media" href="${url}" aria-label="Lihat detail ${esc(u.title)}">
    <img src="${base}assets/img/units/${u.slug}.svg" alt="Ilustrasi ${esc(u.title)} di King Motor Mojokerto" width="800" height="600" loading="lazy" decoding="async">
    <span class="unit-badges">${badge}${featured}</span>
    <span class="unit-view">Lihat detail <span aria-hidden="true">→</span></span>
  </a>
  <div class="unit-card-body">
    <p class="unit-kicker">${esc(u.brand)} · ${u.typeLabel}</p>
    <h3><a href="${url}">${esc(u.model)}</a></h3>
    <p class="unit-price">${u.price}</p>
    <ul class="unit-meta">
      <li>${u.year}</li>
      <li>${u.km}</li>
      <li>${esc(u.color)}</li>
    </ul>
    <div class="unit-foot">
      <div class="unit-dp"><span>DP mulai</span><strong>${u.dpShort}</strong></div>
      ${foot}
    </div>
  </div>
</article>`;
};

/* -------------------------------- pages ---------------------------------- */

const today = new Date().toISOString().slice(0, 10);

// 1. index
write(
  "index.html",
  renderShell("src/pages/index.html", {
    base: "",
    canonical: `${site.domain}/`,
    pageTitle: "King Motor — Showroom Motor Bekas Mojokerto | Surat Lengkap, Bisa Kredit",
    pageDescription: site.description,
  })
);

// 2. kebijakan privasi
write(
  "kebijakan-privasi.html",
  renderShell("src/pages/privacy.html", {
    base: "",
    canonical: `${site.domain}/kebijakan-privasi.html`,
    pageTitle: "Kebijakan Privasi — King Motor Mojokerto",
    pageDescription: "Kebijakan privasi King Motor Mojokerto: data yang kami kumpulkan, cara penggunaan, penyimpanan, dan hak Anda.",
  })
);

// 3. syarat & ketentuan
write(
  "syarat-ketentuan.html",
  renderShell("src/pages/terms.html", {
    base: "",
    canonical: `${site.domain}/syarat-ketentuan.html`,
    pageTitle: "Syarat & Ketentuan — King Motor Mojokerto",
    pageDescription: "Syarat dan ketentuan jual beli motor bekas di King Motor Mojokerto, termasuk harga, booking, kredit, garansi, dan tukar tambah.",
  })
);

// 4. 404 — base "/" agar aset tetap benar walau halaman ini dipakai
//    untuk URL dalam (mis. /motor/slug/yang-tidak-ada)
write(
  "404.html",
  renderShell("src/pages/404.html", {
    base: "/",
    canonical: `${site.domain}/404.html`,
    pageTitle: "Halaman tidak ditemukan — King Motor Mojokerto",
    pageDescription: "Halaman yang Anda cari tidak ditemukan.",
  })
);

// 5. detail unit
const detailTemplate = read("src/pages/detail.html");

for (const u of allUnits) {
  const canonical = `${site.domain}/motor/${u.slug}/`;
  const base = "../../";

  const relatedPool = allUnits.filter((x) => x.slug !== u.slug && x.status !== "sold");
  const related = [
    ...relatedPool.filter((x) => x.type === u.type && x.status === "ready"),
    ...relatedPool.filter((x) => x.type !== u.type && x.status === "ready"),
  ]
    .sort((a, b) => {
      if (a.type === u.type && b.type !== u.type) return -1;
      if (b.type === u.type && a.type !== u.type) return 1;
      return Math.abs(a.priceCash - u.priceCash) - Math.abs(b.priceCash - u.priceCash);
    })
    .slice(0, 3)
    .map((x) => unitCard(x, { base }))
    .join("\n");

  const conditionList = u.conditionNotes
    .map((note) => `<li>${checkIcon}<span>${esc(note)}</span></li>`)
    .join("\n          ");

  const motorcycleSchema = {
    "@context": "https://schema.org",
    "@type": "Motorcycle",
    name: u.title,
    description: u.description,
    brand: { "@type": "Brand", name: u.brand },
    model: u.model,
    vehicleModelDate: String(u.year),
    color: u.color,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: u.mileageKm,
      unitCode: "KMT",
    },
    itemCondition: "https://schema.org/UsedCondition",
    sku: u.slug,
    image: `${site.domain}/assets/img/units/${u.slug}.svg`,
    url: canonical,
    offers: {
      "@type": "Offer",
      price: u.priceCash,
      priceCurrency: "IDR",
      availability:
        u.status === "ready"
          ? "https://schema.org/InStock"
          : u.status === "booking"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/SoldOut",
      url: canonical,
      seller: {
        "@type": "AutoDealer",
        name: "King Motor Mojokerto",
        telephone: `+${site.waNumber}`,
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: `${site.domain}/` },
      { "@type": "ListItem", position: 2, name: "Stok Motor", item: `${site.domain}/#stok` },
      { "@type": "ListItem", position: 3, name: u.title, item: canonical },
    ],
  };

  const schema = JSON.stringify([motorcycleSchema, breadcrumbSchema]).replace(/</g, "\\u003c");

  const pageTitle = `${u.title} — ${u.priceShort} | King Motor Mojokerto`;
  const pageDescription = `${u.title} di King Motor Mojokerto. ${u.km}, ${u.color}, dokumen ${u.documentStatus.toLowerCase()}. Harga ${u.price}. Bisa kredit dan tukar tambah.`.slice(0, 158);

  let html = detailTemplate
    .replace("{{header}}", header)
    .replace("{{footer}}", footer);

  html = applyTokens(html, {
    base,
    canonical,
    pageTitle,
    pageDescription,
    schema,
    related,
    "u.slug": u.slug,
    "u.title": esc(u.title),
    "u.brand": esc(u.brand),
    "u.model": esc(u.model),
    "u.year": u.year,
    "u.typeLabel": u.typeLabel,
    "u.transmission": u.transmission,
    "u.color": esc(u.color),
    "u.km": u.km,
    "u.price": u.price,
    "u.priceShort": u.priceShort,
    "u.dp": u.dp,
    "u.installment": u.installment,
    "u.taxLabel": u.taxLabel,
    "u.documentStatus": esc(u.documentStatus),
    "u.status": u.status,
    "u.statusLabel": u.statusLabel,
    "u.warranty": esc(u.warranty),
    "u.description": esc(u.description),
    "u.image": `${base}assets/img/units/${u.slug}.svg`,
    "u.waDetail": u.waDetail,
    "u.waBooking": u.waBooking,
    "u.conditionList": conditionList,
  });

  write(`motor/${u.slug}/index.html`, html);
}

/* ------------------------------ generated js ------------------------------ */

const dataJs = `/* Auto-generated oleh scripts/generate.mjs — jangan diedit manual.
   Ubah data di data/site.json dan data/units.json lalu jalankan: npm run build */
window.KM_SITE = ${JSON.stringify({ ...site, wa: siteWa }, null, 2)};
window.KM_UNITS = ${JSON.stringify(allUnits, null, 2)};
`;
write("assets/js/data.js", dataJs);

/* ------------------------------ unit artwork ------------------------------ */

for (const u of allUnits) {
  write(`assets/img/units/${u.slug}.svg`, unitArt(u));
}

/* -------------------------------- sitemap -------------------------------- */

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site.domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${allUnits
  .map(
    (u) => `  <url>
    <loc>${site.domain}/motor/${u.slug}/</loc>
    <lastmod>${u.dateAdded}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
write("sitemap.xml", sitemap);

write(
  "robots.txt",
  `User-agent: *
Allow: /
Disallow: /kebijakan-privasi.html
Disallow: /syarat-ketentuan.html
Disallow: /404.html

Sitemap: ${site.domain}/sitemap.xml
`
);

/* --------------------------------- report -------------------------------- */

console.log(`Build selesai.`);
console.log(`- ${allUnits.length} unit diproses`);
console.log(`- index.html, kebijakan-privasi.html, syarat-ketentuan.html, 404.html`);
console.log(`- ${allUnits.length} halaman detail di motor/<slug>/`);
console.log(`- assets/js/data.js, ${allUnits.length} ilustrasi unit, sitemap.xml, robots.txt`);
