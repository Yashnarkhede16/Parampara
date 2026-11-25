/* ==========================================================================
   Paramparik Collection — Complete E-Commerce & WhatsApp Checkout Engine
   All product images loaded directly from local `images/` folder
   ========================================================================== */

const WHATSAPP_NUMBER = "917887976067";
const INSTAGRAM_HANDLE = "@paramparik_collection"; // Rename your Instagram ID here
const INSTAGRAM_URL = "https://www.instagram.com/paramparik_collection/";

const CATALOGUE = [
  // ================= NATH =================
 {
    id: "pc-nath-02",
    name: "Custom Bridal Pearl & Kundan Heritage Nath (Made to Order)",
    category: "nath",
    price: null,
    mrp: null,
    image: "images/nath-pearl-pair.jpg"
  },  
{
    id: "pc-nath-01",
    name: "Royal Pearl & Kundan Teardrop Bridal Nath (Pair with Gold Chains)",
    category: "nath",
    price: 450,
    mrp: 799,
    image: "images/nath-2.jpeg"
  },
{
    id: "pc-nath-03",
    name: "Royal Pearl & Kundan Teardrop Bridal Nath (Pair with Gold Chains)",
    category: "nath",
    price: 350,
    mrp: 599,
    image: "images/nath-3.jpeg"
  },
 

  // ================= BINDI & FOREHEAD ORNAMENTS =================
  {
    id: "pc-bindi-01",
    name: "Emerald Lotus Kundan & Pearl Bridal Forehead / Hair Chain",
    category: "bindi",
    price: 649,
    mrp: 1499,
    image: "images/bindi-lotus-chain-1.jpg"
  },
  {
    id: "pc-bindi-02",
    name: "Peshwai Green Meenakari Lotus & Pearl Hair / Forehead Ornament",
    category: "bindi",
    price: 749,
    mrp: 1699,
    image: "images/bindi-lotus-chain-2.jpg"
  },
  {
    id: "pc-bindi-03",
    name: "Custom Bridal Lotus Pearl Forehead & Choti Ornament",
    category: "bindi",
    price: null,
    mrp: null,
    image: "images/bindi-lotus-chain-1.jpg"
  },

  // ================= NECKLACES & CHOKERS =================
  {
    id: "pc-necklace-01",
    name: "Royal Peshwai Woven Gold & Emerald-Pearl Choker Necklace",
    category: "necklace",
    price: 399,
    mrp: 599,
    image: "images/neck-1.jpeg"
  },
  {
    id: "pc-necklace-02",
    name: "Handcrafted Maharashtrian Thushi & Pearl Bridal Choker",
    category: "necklace",
    price: 999,
    mrp: 1699,
    image: "images/neck-2.jpg"
  },
  {
    id: "pc-necklace-03",
    name: "Bridal Black-Bead Mangalsutra & Peshwai Choker Combo Set",
    category: "necklace",
    price: 1599,
    mrp: 3299,
    image: "images/mangalsutra-choker-set.jpg"
  },
  {
    id: "pc-necklace-04",
    name: "Traditional Gold-Finish Floral Bead Long Mala Necklace",
    category: "necklace",
    price: 899,
    mrp: 1999,
    image: "images/necklace-gold-beads-1.jpg"
  },
  {
    id: "pc-necklace-05",
    name: "Multi-Layer Mango Motif Gold & Emerald Bridal Haar Set",
    category: "necklace",
    price: 1799,
    mrp: 3699,
    image: "images/necklace-mango-layered.jpg"
  },
  {
    id: "pc-necklace-06",
    name: "Three-Layer Koyri Mango Gold-Plated & Emerald Choker Set",
    category: "necklace",
    price: 1499,
    mrp: 3199,
    image: "images/necklace-mango-choker.jpg"
  },

  // ================= EARRINGS =================
  {
    id: "pc-earrings-01",
    name: "Emerald Chandrakor Crescent Gold-Beaded Maharashtrian Earrings",
    category: "earrings",
    price: 550,
    mrp: 1199,
    image: "images/ear-1.jpeg"
  },
  {
    id: "pc-earrings-02",
    name: "Custom Green Stone & Gold Bead Crescent Bugadi / Earrings",
    category: "earrings",
    price: null,
    mrp: null,
    image: "images/earing-emerald-crescent.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("paramparik_cart") || "[]");
let activeCategory = "all";
let searchTerm = "";
let sortMode = "featured";
let pendingCheckoutItems = [];

document.addEventListener("DOMContentLoaded", () => {
  initScrollEffects();
  initMobileMenu();
  initHeroCarousel();
  initScrollReveal();
  injectCartAndModals();
  updateCartUI();
  initStorefrontControls();
  renderStorefront();
});

function initScrollEffects() {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  const header = document.querySelector(".site-header");
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
    if (header) header.classList.toggle("scrolled", scrollTop > 25);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initMobileMenu() {
  const btn = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".mobile-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => nav.classList.toggle("open"));
}

function initHeroCarousel() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  if (slides.length <= 1) return;

  let idx = 0;
  const goTo = (nextIdx) => {
    slides[idx].classList.remove("active");
    if (dots[idx]) dots[idx].classList.remove("active");
    idx = nextIdx;
    slides[idx].classList.add("active");
    if (dots[idx]) dots[idx].classList.add("active");
  };

  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
  setInterval(() => goTo((idx + 1) % slides.length), 5000);
}

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  items.forEach((el) => observer.observe(el));
}

function initStorefrontControls() {
  const grid = document.getElementById("storeProductsGrid");
  if (!grid) return;

  const initialHash = window.location.hash.replace("#", "").toLowerCase();
  if (["nath", "bindi", "necklace", "earrings"].includes(initialHash)) {
    activeCategory = initialHash;
  }

  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach((pill) => {
    if (pill.dataset.filter === activeCategory) {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
    }
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.dataset.filter;
      renderStorefront();
    });
  });

  const searchInput = document.getElementById("storeSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      renderStorefront();
    });
  }

  const sortSelect = document.getElementById("storeSort");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sortMode = e.target.value;
      renderStorefront();
    });
  }
}

function renderStorefront() {
  const grid = document.getElementById("storeProductsGrid");
  if (!grid) return;

  let items = CATALOGUE.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchText =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm);
    return matchCat && matchText;
  });

  if (sortMode === "price-asc") {
    items.sort((a, b) => (a.price ?? 999999) - (b.price ?? 999999));
  } else if (sortMode === "price-desc") {
    items.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
  }

  if (!items.length) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:40px 0;color:#6b4c50;">No jewellery pieces matched your search. Try another keyword or click "All".</p>`;
    return;
  }

  grid.innerHTML = items.map((item) => {
    const hasPrice = typeof item.price === "number" && item.price > 0;
    const discountPct =
      hasPrice && item.mrp && item.mrp > item.price
        ? Math.round(((item.mrp - item.price) / item.mrp) * 100)
        : 0;

    const ribbonHtml = hasPrice && discountPct > 0
      ? `<span class="ecom-discount-ribbon">${discountPct}% OFF</span>`
      : `<span class="ecom-discount-ribbon custom-tag">CUSTOM ORDER</span>`;

    const pricingHtml = hasPrice
      ? `
        <div class="ecom-price-block">
          <div class="price-row">
            <span class="price-selling">₹${item.price.toLocaleString("en-IN")}</span>
            ${item.mrp ? `<span class="price-mrp">₹${item.mrp.toLocaleString("en-IN")}</span>` : ""}
            ${discountPct > 0 ? `<span class="price-off-badge">${discountPct}% Off</span>` : ""}
          </div>
          <div class="tax-note">Incl. of all taxes</div>
        </div>
      `
      : `
        <div class="ecom-price-block">
          <div class="price-on-request">Custom Handcrafted Piece</div>
          <div class="tax-note">Price available on WhatsApp enquiry</div>
        </div>
      `;

    const buttonsHtml = hasPrice
      ? `
        <div class="ecom-actions">
          <button class="btn-add-cart" onclick="addToCart('${item.id}')">🛒 Add to Cart</button>
          <button class="btn-buy-now" onclick="buySingleNow('${item.id}')">⚡ Buy Now</button>
        </div>
      `
      : `
        <div class="ecom-actions single-col">
          <button class="btn-enquiry-wa" onclick="enquireItemWhatsApp('${item.id}')">
            💬 Enquire on WhatsApp
          </button>
        </div>
      `;

    return `
      <article class="ecom-card">
        <div class="ecom-media" onclick="openZoomModal('${item.id}')">
          <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="imgFallback(this, '${item.name}')" />
          ${ribbonHtml}
          <button class="ecom-zoom-btn" type="button" aria-label="Zoom image">🔍</button>
        </div>
        <div class="ecom-body">
          <span class="ecom-cat">${item.category}</span>
          <h3 class="ecom-title">${item.name}</h3>
          ${pricingHtml}
          ${buttonsHtml}
        </div>
      </article>
    `;
  }).join("");
}

function addToCart(productId) {
  const product = CATALOGUE.find((p) => p.id === productId);
  if (!product || !product.price) return;

  const existing = cart.find((c) => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`Added "${product.name.slice(0, 28)}..." to Cart!`);
}

function updateCartQty(productId, delta) {
  const idx = cart.findIndex((c) => c.id === productId);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
  }
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem("paramparik_cart", JSON.stringify(cart));
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".cart-badge").forEach((el) => (el.textContent = totalCount));

  const listEl = document.getElementById("cartItemsList");
  const totalEl = document.getElementById("cartTotalAmount");
  if (!listEl || !totalEl) return;

  if (!cart.length) {
    listEl.innerHTML = `<p style="text-align:center;color:#6b4c50;margin-top:48px;">Your cart is empty. Click <strong>Add to Cart</strong> on any handcrafted piece to begin.</p>`;
    totalEl.textContent = "₹0";
    return;
  }

  let grandTotal = 0;
  listEl.innerHTML = cart.map((entry) => {
    const product = CATALOGUE.find((p) => p.id === entry.id);
    if (!product) return "";
    const lineTotal = product.price * entry.qty;
    grandTotal += lineTotal;
    return `
      <div class="cart-row">
        <img src="${product.image}" alt="${product.name}" />
        <div style="flex-grow:1;">
          <div style="font-size:0.86rem;font-weight:700;color:#1f1214;line-height:1.3;">${product.name}</div>
          <div style="font-size:0.85rem;font-weight:900;color:hsl(var(--maroon-deep));margin-top:3px;">
            ₹${product.price.toLocaleString("en-IN")} × ${entry.qty} = ₹${lineTotal.toLocaleString("en-IN")}
          </div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateCartQty('${product.id}', -1)">−</button>
            <span style="font-weight:700;font-size:0.86rem;">${entry.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${product.id}', 1)">+</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  totalEl.textContent = `₹${grandTotal.toLocaleString("en-IN")}`;
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  if (!drawer || !backdrop) return;
  drawer.classList.toggle("open", open);
  backdrop.classList.toggle("open", open);
}

function enquireItemWhatsApp(productId) {
  const product = CATALOGUE.find((p) => p.id === productId);
  if (!product) return;
  const msg = encodeURIComponent(
    `Namaste Paramparik Collection! 🙏\nI would like to enquire about the price and customization details for:\n• *Product:* ${product.name}\n• *Category:* ${product.category.toUpperCase()}\nPlease share details.`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
}

function buySingleNow(productId) {
  const product = CATALOGUE.find((p) => p.id === productId);
  if (!product || !product.price) return;
  pendingCheckoutItems = [{ product, qty: 1 }];
  openCheckoutModal();
}

function buyCartNow() {
  if (!cart.length) {
    showToast("Please add at least one item to your cart first.");
    return;
  }
  pendingCheckoutItems = cart
    .map((entry) => {
      const product = CATALOGUE.find((p) => p.id === entry.id);
      return product ? { product, qty: entry.qty } : null;
    })
    .filter(Boolean);
  toggleCartDrawer(false);
  openCheckoutModal();
}

function openCheckoutModal() {
  const modal = document.getElementById("checkoutModalOverlay");
  const summaryEl = document.getElementById("checkoutSummaryBox");
  if (!modal || !summaryEl || !pendingCheckoutItems.length) return;

  let total = 0;
  const linesHtml = pendingCheckoutItems.map(({ product, qty }) => {
    const sub = product.price * qty;
    total += sub;
    return `<div style="display:flex;justify-content:space-between;margin-bottom:6px;">
      <span>${product.name} <strong>(×${qty})</strong></span>
      <strong>₹${sub.toLocaleString("en-IN")}</strong>
    </div>`;
  }).join("");

  summaryEl.innerHTML = `
    ${linesHtml}
    <div style="border-top:1px dashed #d1c4b2;padding-top:8px;margin-top:8px;display:flex;justify-content:space-between;font-size:1rem;">
      <span>Total Payable (Incl. of all taxes):</span>
      <strong style="color:hsl(var(--maroon-deep));">₹${total.toLocaleString("en-IN")}</strong>
    </div>
  `;

  modal.classList.add("open");
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModalOverlay");
  if (modal) modal.classList.remove("open");
}

function injectCartAndModals() {
  if (document.getElementById("cartDrawer")) return;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div id="drawerBackdrop" class="drawer-backdrop" onclick="toggleCartDrawer(false)"></div>

    <aside id="cartDrawer" class="cart-drawer" aria-label="Shopping Cart">
      <div class="cart-drawer-header">
        <h3>Your Shopping Cart</h3>
        <button onclick="toggleCartDrawer(false)" style="color:hsl(var(--gold));font-size:1.25rem;">✕</button>
      </div>
      <div id="cartItemsList" class="cart-items-list"></div>
      <div class="cart-drawer-footer">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span style="font-weight:700;color:#4b3538;">Grand Total:</span>
          <span id="cartTotalAmount" style="font-size:1.35rem;font-weight:900;color:hsl(var(--maroon-deep));">₹0</span>
        </div>
        <button class="btn-buy-now" style="width:100%;padding:13px;font-size:0.95rem;" onclick="buyCartNow()">
          💬 Buy Now &amp; Send Order to WhatsApp
        </button>
      </div>
    </aside>

    <div id="checkoutModalOverlay" class="modal-overlay">
      <div class="checkout-modal">
        <button class="modal-close-btn" onclick="closeCheckoutModal()" aria-label="Close">✕</button>
        <span class="gold-pill-badge dark-text">Direct WhatsApp Order</span>
        <h2>Complete Your Order</h2>
        <p style="font-size:0.86rem;color:#6b4c50;">Enter your delivery details below to send your order directly to Paramparik Collection.</p>

        <div id="checkoutSummaryBox" class="order-summary-box"></div>

        <form id="whatsappOrderForm" novalidate>
          <div class="form-field">
            <label for="custName">Full Name *</label>
            <input type="text" id="custName" placeholder="e.g., Priya Patil" required />
            <div class="field-error" id="errName">Please enter your full name (minimum 3 characters).</div>
          </div>

          <div class="form-field">
            <label for="custPhone">Mobile / WhatsApp Number *</label>
            <input type="tel" id="custPhone" maxlength="10" inputmode="numeric" placeholder="10-digit mobile number" required />
            <div class="field-error" id="errPhone">Please enter a valid 10-digit Indian mobile number.</div>
          </div>

          <div class="form-field">
            <label for="custLocation">Delivery Location / Full Address *</label>
            <textarea id="custLocation" rows="2" placeholder="House/Building, Street, Landmark (e.g., Near Ram Mandir, Asoda)" required></textarea>
            <div class="field-error" id="errLocation">Please enter your complete delivery address.</div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-field">
              <label for="custCity">City / Village *</label>
              <input type="text" id="custCity" placeholder="e.g., Asoda, Jalgaon" required />
              <div class="field-error" id="errCity">Please enter your city/village.</div>
            </div>
            <div class="form-field">
              <label for="custPincode">Pincode *</label>
              <input type="text" id="custPincode" maxlength="6" inputmode="numeric" placeholder="e.g., 425101" required />
              <div class="field-error" id="errPincode">Enter a valid 6-digit pincode.</div>
            </div>
          </div>

          <div class="form-field">
            <label for="custNote">Custom Note / Size / Colour (Optional)</label>
            <input type="text" id="custNote" placeholder="e.g., Bridal packing, Green & Gold colour" />
          </div>

          <button type="submit" class="btn-enquiry-wa" style="width:100%;padding:13px;font-size:0.96rem;">
            💬 Confirm &amp; Send Order to WhatsApp
          </button>
        </form>
      </div>
    </div>

    <div id="zoomLightbox" class="lightbox-modal" onclick="if(event.target===this)this.classList.remove('open')">
      <div class="lightbox-card">
        <button class="modal-close-btn" onclick="document.getElementById('zoomLightbox').classList.remove('open')">✕</button>
        <img id="zoomImg" src="" alt="" />
        <div id="zoomFooter" style="padding:18px 22px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;"></div>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  const form = document.getElementById("whatsappOrderForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameEl = document.getElementById("custName");
    const phoneEl = document.getElementById("custPhone");
    const locEl = document.getElementById("custLocation");
    const cityEl = document.getElementById("custCity");
    const pinEl = document.getElementById("custPincode");
    const noteEl = document.getElementById("custNote");

    let valid = true;
    const check = (cond, input, errId) => {
      const err = document.getElementById(errId);
      if (!cond) {
        input.classList.add("invalid");
        err.classList.add("visible");
        valid = false;
      } else {
        input.classList.remove("invalid");
        err.classList.remove("visible");
      }
    };

    check(nameEl.value.trim().length >= 3, nameEl, "errName");
    check(/^[6-9][0-9]{9}$/.test(phoneEl.value.trim()), phoneEl, "errPhone");
    check(locEl.value.trim().length >= 6, locEl, "errLocation");
    check(cityEl.value.trim().length >= 2, cityEl, "errCity");
    check(/^[0-9]{6}$/.test(pinEl.value.trim()), pinEl, "errPincode");

    if (!valid) {
      showToast("Please fix the highlighted fields before ordering.");
      return;
    }

    let grandTotal = 0;
    const itemLines = pendingCheckoutItems.map(({ product, qty }, i) => {
      const lineTotal = product.price * qty;
      grandTotal += lineTotal;
      return `${i + 1}. *${product.name}*\n   Qty: ${qty} × ₹${product.price.toLocaleString("en-IN")} = ₹${lineTotal.toLocaleString("en-IN")}`;
    }).join("\n");

    const customNote = noteEl.value.trim() ? `\n• *Special Note:* ${noteEl.value.trim()}` : "";

    const message =
      `🛍️ *NEW ORDER — PARAMPARIK COLLECTION*\n` +
      `-----------------------------------\n` +
      `*Ordered Items:*\n${itemLines}\n\n` +
      `💰 *Total Amount:* ₹${grandTotal.toLocaleString("en-IN")} (Incl. of all taxes)\n` +
      `-----------------------------------\n` +
      `*Customer Details:*\n` +
      `• *Name:* ${nameEl.value.trim()}\n` +
      `• *Mobile:* ${phoneEl.value.trim()}\n` +
      `• *Location:* ${locEl.value.trim()}, ${cityEl.value.trim()} - ${pinEl.value.trim()}${customNote}\n` +
      `-----------------------------------\n` +
      `Please confirm availability and payment details. 🙏`;

    closeCheckoutModal();
    showToast("Redirecting to WhatsApp with your complete order...");
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    }, 500);
  });
}

function openZoomModal(productId) {
  const item = CATALOGUE.find((p) => p.id === productId);
  if (!item) return;
  const box = document.getElementById("zoomLightbox");
  document.getElementById("zoomImg").src = item.image;
  const hasPrice = typeof item.price === "number" && item.price > 0;
  document.getElementById("zoomFooter").innerHTML = `
    <div>
      <div style="font-weight:700;font-size:1.05rem;color:#1f1214;">${item.name}</div>
      <div style="font-weight:900;font-size:1.25rem;color:hsl(var(--maroon-deep));margin-top:4px;">
        ${hasPrice ? `₹${item.price.toLocaleString("en-IN")} <span style="font-size:0.85rem;color:#6b7280;text-decoration:line-through;font-weight:400;">₹${item.mrp.toLocaleString("en-IN")}</span>` : "Custom Order — Enquire for Price"}
      </div>
    </div>
    ${
      hasPrice
        ? `<button class="btn-buy-now" onclick="document.getElementById('zoomLightbox').classList.remove('open');buySingleNow('${item.id}')">⚡ Buy Now</button>`
        : `<button class="btn-enquiry-wa" onclick="enquireItemWhatsApp('${item.id}')">💬 Enquire on WhatsApp</button>`
    }
  `;
  box.classList.add("open");
}

function imgFallback(img, label) {
  img.onerror = null;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#3a0910"/>
    <rect x="24" y="24" width="752" height="552" fill="none" stroke="#c99e48" stroke-width="2"/>
    <text x="400" y="295" fill="#e5be6b" font-family="Georgia, serif" font-size="24" text-anchor="middle">${label}</text>
    <text x="400" y="330" fill="#faf6ed" font-family="sans-serif" font-size="12" letter-spacing="3" text-anchor="middle">PARAMPARIK COLLECTION</text>
  </svg>`;
  img.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function showToast(text) {
  let el = document.querySelector(".toast-banner");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast-banner";
    document.body.appendChild(el);
  }
  el.textContent = text;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 3200);
}
