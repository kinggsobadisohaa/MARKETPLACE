/* ============================================================
   King Motor Mojokerto — app.js
   Tanpa dependency. Semua data berasal dari assets/js/data.js
   ============================================================ */

(function () {
  "use strict";

  const site = window.KM_SITE || {};
  const units = Array.isArray(window.KM_UNITS) ? window.KM_UNITS : [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const formatNumber = (value, decimals = 0) =>
    new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);

  /* ------------------------------ analytics ------------------------------ */

  const analytics = {
    track(name, params = {}) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: name, ...params });
      if (typeof window.gtag === "function") window.gtag("event", name, params);
      if (new URLSearchParams(window.location.search).has("debug")) {
        console.info("[analytics]", name, params);
      }
    },
    init() {
      const id = site.integrations && site.integrations.gaId;
      if (!id) return;
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", id, { anonymize_ip: true });
    },
  };

  analytics.init();

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[data-ga="wa_click"]');
    if (!link) return;
    analytics.track("wa_click", {
      location: link.dataset.location || "unknown",
      unit_slug: link.dataset.unit || "",
      page: window.location.pathname,
    });
  });

  /* --------------------------------- header ------------------------------- */

  const header = $("#siteHeader");
  const navToggle = $("#navToggle");
  const mobileNav = $("#mobileNav");

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const closeNav = (returnFocus = false) => {
    if (!mobileNav || !navToggle) return;
    mobileNav.hidden = true;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Buka menu navigasi");
    document.body.classList.remove("nav-open");
    if (returnFocus) navToggle.focus();
  };

  const openNav = () => {
    if (!mobileNav || !navToggle) return;
    mobileNav.hidden = false;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Tutup menu navigasi");
    document.body.classList.add("nav-open");
  };

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeNav(true);
      else openNav();
    });

    mobileNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        closeNav(true);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 960 && navToggle.getAttribute("aria-expanded") === "true") {
        closeNav();
      }
    });
  }

  const backToTop = $("#backToTop");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      () => {
        const visible = window.scrollY > 600;
        backToTop.classList.toggle("is-visible", visible);
        backToTop.tabIndex = visible ? 0 : -1;
      },
      { passive: true }
    );
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  const fab = $(".fab-wa");
  if (fab) {
    const setFab = () => {
      fab.classList.toggle("is-visible", window.scrollY > 300);
    };
    setFab();
    window.addEventListener("scroll", setFab, { passive: true });
  }

  /* -------------------------------- copyright ----------------------------- */

  const yearEl = $("#copyrightYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* --------------------------------- reveal ------------------------------- */

  const revealTargets = $$(
    ".section-head, .feature-card, .legal-panel, .step, .credit-copy, .credit-card, .sell-copy, .sell-form-wrap, .testi-card, .map-card, .location-copy, .faq-intro, .faq-item, .final-cta-inner"
  );

  if (!reduceMotion && "IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el, index) => {
      el.classList.add("will-reveal");
      el.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 55}ms`);
      observer.observe(el);
    });
  }

  /* -------------------------------- counters ------------------------------ */

  const counters = $$("[data-count]");
  const runCounter = (el) => {
    if (el.dataset.counted === "1") return;
    el.dataset.counted = "1";
    const target = parseFloat(el.dataset.count || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) {
      el.textContent = formatNumber(target, decimals) + suffix;
      return;
    }
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatNumber(target * eased, decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = formatNumber(target, decimals) + suffix;
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.45 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  /* -------------------------------- catalog ------------------------------- */

  const grid = $("#unitGrid");

  if (grid && units.length) {
    const emptyState = $("#emptyState");
    const resultCount = $("#resultCount");
    const resetBtn = $("#resetFilters");
    const emptyReset = $("#emptyReset");
    const typeButtons = $$(".filter-tab", document);
    const priceSelect = $("#filterPrice");
    const yearSelect = $("#filterYear");
    const sortSelect = $("#filterSort");

    const state = {
      type: "all",
      price: "all",
      year: "all",
      sort: "featured",
    };

    const escapeHtml = (value) =>
      String(value).replace(/[&<>"']/g, (ch) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[ch]);

    const waIcon = `<svg class="ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.34M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.45 6.6 2.02 12.05 2.02c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.94L0 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.48-8.41"/></svg>`;

    const cardHtml = (u) => {
      const url = `motor/${u.slug}/`;
      const available = u.status === "ready";
      const featured = u.featured && available
        ? '<span class="badge badge--featured">Favorit</span>'
        : "";
      const foot = available
        ? `<a class="btn btn-wa btn-sm unit-cta" href="${u.waCard}" target="_blank" rel="noopener" data-ga="wa_click" data-location="catalog_card" data-unit="${u.slug}" aria-label="Chat WhatsApp tentang ${escapeHtml(u.title)}">${waIcon}Chat</a>`
        : `<span class="btn btn-sm btn-disabled" aria-disabled="true">${u.status === "booking" ? "Sudah dibooking" : "Terjual"}</span>`;

      return `<article class="unit-card" data-unit="${u.slug}" data-type="${u.type}" data-status="${u.status}">
  <a class="unit-media" href="${url}" aria-label="Lihat detail ${escapeHtml(u.title)}">
    <img src="assets/img/units/${u.slug}.svg" alt="Ilustrasi ${escapeHtml(u.title)} di King Motor Mojokerto" width="800" height="600" loading="lazy" decoding="async">
    <span class="unit-badges"><span class="badge badge--${u.status}">${u.statusLabel}</span>${featured}</span>
    <span class="unit-view">Lihat detail <span aria-hidden="true">→</span></span>
  </a>
  <div class="unit-card-body">
    <p class="unit-kicker">${escapeHtml(u.brand)} · ${u.typeLabel}</p>
    <h3><a href="${url}">${escapeHtml(u.model)}</a></h3>
    <p class="unit-price">${u.price}</p>
    <ul class="unit-meta">
      <li>${u.year}</li>
      <li>${u.km}</li>
      <li>${escapeHtml(u.color)}</li>
    </ul>
    <div class="unit-foot">
      <div class="unit-dp"><span>DP mulai</span><strong>${u.dpShort}</strong></div>
      ${foot}
    </div>
  </div>
</article>`;
    };

    const countByType = (type) =>
      type === "all" ? units.length : units.filter((u) => u.type === type).length;

    $$("[data-count-for]").forEach((el) => {
      el.textContent = String(countByType(el.dataset.countFor));
    });

    const passesPrice = (u) => {
      if (state.price === "all") return true;
      const [min, max] = state.price.split("-").map(Number);
      return u.priceCash >= min && u.priceCash <= max;
    };

    const passesYear = (u) => {
      if (state.year === "all") return true;
      const [min, max] = state.year.split("-").map(Number);
      return u.year >= min && u.year <= max;
    };

    const sortUnits = (list) => {
      const sorted = [...list];
      switch (state.sort) {
        case "price-asc":
          return sorted.sort((a, b) => a.priceCash - b.priceCash);
        case "price-desc":
          return sorted.sort((a, b) => b.priceCash - a.priceCash);
        case "km-asc":
          return sorted.sort((a, b) => a.mileageKm - b.mileageKm);
        case "newest":
          return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        default:
          return sorted.sort((a, b) => {
            if (a.status === "sold" && b.status !== "sold") return 1;
            if (b.status === "sold" && a.status !== "sold") return -1;
            if (a.featured !== b.featured) return a.featured ? -1 : 1;
            return new Date(b.dateAdded) - new Date(a.dateAdded);
          });
      }
    };

    const render = () => {
      const filtered = sortUnits(
        units.filter(
          (u) =>
            (state.type === "all" || u.type === state.type) &&
            passesPrice(u) &&
            passesYear(u)
        )
      );

      grid.innerHTML = filtered.map(cardHtml).join("");

      const hasFilters =
        state.type !== "all" || state.price !== "all" || state.year !== "all";

      if (resultCount) {
        resultCount.textContent = hasFilters
          ? `Menampilkan ${filtered.length} dari ${units.length} unit`
          : `Menampilkan ${filtered.length} unit`;
      }

      if (emptyState) emptyState.hidden = filtered.length !== 0;
      grid.hidden = filtered.length === 0;
    };

    const syncControls = () => {
      typeButtons.forEach((btn) => {
        const active = btn.dataset.type === state.type;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", String(active));
      });
      if (priceSelect) priceSelect.value = state.price;
      if (yearSelect) yearSelect.value = state.year;
      if (sortSelect) sortSelect.value = state.sort;
    };

    const reset = () => {
      state.type = "all";
      state.price = "all";
      state.year = "all";
      state.sort = "featured";
      syncControls();
      render();
      analytics.track("filter_apply", { filter_type: "reset", price_range: "all" });
    };

    typeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.type = btn.dataset.type;
        syncControls();
        render();
        analytics.track("filter_apply", { filter_type: state.type, price_range: state.price });
      });
    });

    if (priceSelect) {
      priceSelect.addEventListener("change", () => {
        state.price = priceSelect.value;
        render();
        analytics.track("filter_apply", { filter_type: state.type, price_range: state.price });
      });
    }

    if (yearSelect) {
      yearSelect.addEventListener("change", () => {
        state.year = yearSelect.value;
        render();
        analytics.track("filter_apply", { filter_type: state.type, year_range: state.year });
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        state.sort = sortSelect.value;
        render();
        analytics.track("filter_sort", { sort: state.sort });
      });
    }

    if (resetBtn) resetBtn.addEventListener("click", reset);
    if (emptyReset) emptyReset.addEventListener("click", reset);

    render();
  }

  /* ---------------------------------- FAQ --------------------------------- */

  $$(".faq-q").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const isOpen = button.getAttribute("aria-expanded") === "true";

      $$(".faq-q").forEach((other) => {
        if (other === button) return;
        other.setAttribute("aria-expanded", "false");
        const otherPanel = document.getElementById(other.getAttribute("aria-controls"));
        if (otherPanel) otherPanel.hidden = true;
      });

      button.setAttribute("aria-expanded", String(!isOpen));
      if (panel) panel.hidden = isOpen;

      if (!isOpen) {
        analytics.track("faq_open", { question: button.textContent.trim().slice(0, 90) });
      }
    });
  });

  /* --------------------------------- map ---------------------------------- */

  const mapCard = $("#mapCard");
  const loadMap = $("#loadMap");
  if (mapCard && loadMap) {
    loadMap.addEventListener("click", () => {
      const query = site.address && site.address.mapsQuery ? site.address.mapsQuery : "Mojokerto";
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
      iframe.title = "Peta lokasi King Motor Mojokerto";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.allowFullscreen = true;
      mapCard.innerHTML = "";
      mapCard.appendChild(iframe);
      analytics.track("map_load", { location: "showroom" });
    });
  }

  /* -------------------------------- open now ------------------------------ */

  const openStatus = $("#openStatus");
  if (openStatus && site.hours && Array.isArray(site.hours.weekly)) {
    const timeZone = site.hours.timezone || "Asia/Jakarta";
    const weekly = site.hours.weekly;
    const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

    const nowParts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());

    const weekday = dayMap[nowParts.find((p) => p.type === "weekday").value];
    const hour = Number(nowParts.find((p) => p.type === "hour").value);
    const minute = Number(nowParts.find((p) => p.type === "minute").value);
    const nowMinutes = hour * 60 + minute;

    const toMinutes = (value) => {
      const [h, m] = value.split(":").map(Number);
      return h * 60 + m;
    };

    const today = weekly.find((d) => d.day === weekday);
    const openMin = today ? toMinutes(today.open) : 0;
    const closeMin = today ? toMinutes(today.close) : 0;
    const isOpen = Boolean(today) && nowMinutes >= openMin && nowMinutes < closeMin;

    if (isOpen) {
      openStatus.textContent = `Buka sekarang · tutup ${today.close.replace(":", ".")}`;
      openStatus.classList.remove("is-closed");
    } else {
      let nextDay = null;
      let next = null;
      for (let offset = 0; offset <= 7; offset += 1) {
        const dayIndex = (weekday + offset) % 7;
        const entry = weekly.find((d) => d.day === dayIndex);
        if (!entry) continue;
        if (offset === 0 && nowMinutes < toMinutes(entry.open)) {
          nextDay = entry;
          next = entry.open;
          break;
        }
        if (offset > 0) {
          nextDay = entry;
          next = entry.open;
          break;
        }
      }
      if (nextDay) {
        const dayLabel = nextDay.day === weekday ? "hari ini" : nextDay.label;
        openStatus.textContent = `Tutup sekarang · buka ${dayLabel} ${next.replace(":", ".")}`;
      } else {
        openStatus.textContent = "Tutup sekarang";
      }
      openStatus.classList.add("is-closed");
    }
  }

  /* -------------------------------- sell form ----------------------------- */

  const form = $("#sellForm");
  const success = $("#sellSuccess");

  if (form && success) {
    const submitBtn = $("#sellSubmit");
    const successWa = $("#successWa");
    const resetFormBtn = $("#resetForm");
    const formError = $("#formError");
    const yearInput = $("#sellerYear");

    if (yearInput) {
      yearInput.max = String(new Date().getFullYear());
      yearInput.placeholder = String(new Date().getFullYear() - 5);
    }

    let started = false;

    const setError = (field, message) => {
      const input = form.elements[field];
      const error = document.getElementById(`err-${field}`);
      if (input) input.setAttribute("aria-invalid", "true");
      if (error) {
        error.textContent = message;
        error.hidden = false;
      }
    };

    const clearError = (field) => {
      const input = form.elements[field];
      const error = document.getElementById(`err-${field}`);
      if (input) input.removeAttribute("aria-invalid");
      if (error) {
        error.textContent = "";
        error.hidden = true;
      }
    };

    form.addEventListener(
      "focusin",
      () => {
        if (started) return;
        started = true;
        analytics.track("form_start", { form_name: "sell_motor" });
      },
      { once: false }
    );

    form.addEventListener("input", (event) => {
      const name = event.target.name;
      if (name && document.getElementById(`err-${name}`)) clearError(name);
    });

    const validate = () => {
      const values = {
        name: form.elements.name.value.trim(),
        phone: form.elements.phone.value.trim(),
        brand: form.elements.brand.value,
        model: form.elements.model.value.trim(),
        year: form.elements.year.value.trim(),
        km: form.elements.km.value.trim(),
        consent: form.elements.consent.checked,
      };

      let valid = true;
      let firstInvalid = null;

      ["name", "phone", "brand", "model", "year", "km", "consent"].forEach((key) =>
        clearError(key)
      );

      if (values.name.length < 2) {
        setError("name", "Nama minimal 2 karakter.");
        valid = false;
        firstInvalid = firstInvalid || "name";
      }

      const digits = values.phone.replace(/\D/g, "");
      if (!/^(0|62)8[1-9]\d{7,11}$/.test(digits)) {
        setError("phone", "Masukkan nomor WhatsApp yang valid, contoh 081234567890.");
        valid = false;
        firstInvalid = firstInvalid || "phone";
      }

      if (!values.brand) {
        setError("brand", "Pilih merek motor.");
        valid = false;
        firstInvalid = firstInvalid || "brand";
      }

      if (values.model.length < 2) {
        setError("model", "Isi tipe atau model motor.");
        valid = false;
        firstInvalid = firstInvalid || "model";
      }

      const year = Number(values.year);
      const maxYear = new Date().getFullYear();
      if (!Number.isInteger(year) || year < 1990 || year > maxYear) {
        setError("year", `Tahun harus antara 1990 dan ${maxYear}.`);
        valid = false;
        firstInvalid = firstInvalid || "year";
      }

      if (values.km) {
        const km = Number(values.km);
        if (!Number.isFinite(km) || km < 0 || km > 500000) {
          setError("km", "Kilometer harus antara 0 dan 500.000.");
          valid = false;
          firstInvalid = firstInvalid || "km";
        }
      }

      if (!values.consent) {
        setError("consent", "Centang persetujuan agar kami bisa menghubungi Anda.");
        valid = false;
        firstInvalid = firstInvalid || "consent";
      }

      if (!valid && firstInvalid) {
        const el = form.elements[firstInvalid];
        if (el && typeof el.focus === "function") el.focus();
      }

      return valid;
    };

    const buildMessage = () => {
      const values = {
        name: form.elements.name.value.trim(),
        phone: form.elements.phone.value.trim(),
        brand: form.elements.brand.value,
        model: form.elements.model.value.trim(),
        year: form.elements.year.value.trim(),
        km: form.elements.km.value.trim(),
        transmission: form.elements.transmission.value,
        price: form.elements.price.value.trim(),
        notes: form.elements.notes.value.trim(),
      };

      const lines = [
        "Halo King Motor, saya mau jual motor:",
        `Nama: ${values.name}`,
        `WA: ${values.phone}`,
        `Motor: ${values.brand} ${values.model} ${values.year}`,
        `Transmisi: ${values.transmission}`,
      ];
      if (values.km) lines.push(`Kilometer: ${values.km} km`);
      if (values.price) lines.push(`Harga harapan: Rp ${Number(values.price).toLocaleString("id-ID")}`);
      if (values.notes) lines.push(`Catatan: ${values.notes}`);
      lines.push("Mohon dibantu penilaiannya. Terima kasih.");
      return lines.join("\n");
    };

    const showSuccess = (waUrl) => {
      form.hidden = true;
      success.hidden = false;
      if (successWa && waUrl) successWa.href = waUrl;
      success.focus({ preventScroll: true });
      success.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // honeypot
      if (form.elements.website && form.elements.website.value) return;

      if (!validate()) {
        analytics.track("form_error", { form_name: "sell_motor" });
        return;
      }

      const message = buildMessage();
      const waUrl = `https://wa.me/${site.waNumber}?text=${encodeURIComponent(message)}`;
      const endpoint = site.integrations && site.integrations.formEndpoint;
      const payload = {
        name: form.elements.name.value.trim(),
        phone: form.elements.phone.value.trim(),
        brand: form.elements.brand.value,
        model: form.elements.model.value.trim(),
        year: Number(form.elements.year.value),
        km: form.elements.km.value ? Number(form.elements.km.value) : null,
        transmission: form.elements.transmission.value,
        expectedPrice: form.elements.price.value ? Number(form.elements.price.value) : null,
        notes: form.elements.notes.value.trim(),
        source: "landing_page",
      };

      analytics.track("form_submit", {
        form_name: "sell_motor",
        motor_brand: payload.brand,
      });

      if (!endpoint) {
        showSuccess(waUrl);
        return;
      }

      const originalText = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Mengirim...";
      }
      if (formError) formError.hidden = true;

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        showSuccess(waUrl);
      } catch (error) {
        if (formError) {
          formError.textContent =
            "Maaf, data belum terkirim. Coba lagi, atau kirim langsung lewat WhatsApp.";
          formError.hidden = false;
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });

    if (resetFormBtn) {
      resetFormBtn.addEventListener("click", () => {
        form.reset();
        form.hidden = false;
        success.hidden = true;
        ["name", "phone", "brand", "model", "year", "km", "consent"].forEach(clearError);
        const first = form.elements.name;
        if (first) first.focus();
        form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      });
    }
  }

  /* ------------------------------ scroll depth ---------------------------- */

  const depthMarks = [50, 90];
  const seenDepth = new Set();
  const trackDepth = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const percent = Math.round((window.scrollY / scrollable) * 100);
    depthMarks.forEach((mark) => {
      if (percent >= mark && !seenDepth.has(mark)) {
        seenDepth.add(mark);
        analytics.track("scroll_depth", { percent: mark });
      }
    });
  };
  if (document.body.classList.contains("page-home")) {
    window.addEventListener("scroll", trackDepth, { passive: true });
  }
})();
