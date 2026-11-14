/**
 * Share Treats (sharetreats.ph/welcome) Style Core Script
 * - Digital Gifting & Lifestyle e-Voucher Catalog
 * - Sticker Greeting Card & Recipient Mobile Number Support
 * - LocalStorage Cart (Treats Bag) Management
 * - Build Version Tracking System (Starts at 0.01)
 */

const SITE_BUILD_VERSION = "0.01";
const SITE_BUILD_UPDATED_AT = "2026-11-14";

function renderBuildVersionBar() {
  const versionEls = document.querySelectorAll(".js-build-version");
  versionEls.forEach(el => {
    el.innerText = `Build v${SITE_BUILD_VERSION}`;
  });
}

const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Jollibee 치킨조이 1인 버킷 & 스파게티 트릿",
    brand: "Jollibee",
    category: "food",
    price: 12500,
    originalPrice: 15000,
    discount: "17%",
    rating: 4.9,
    reviews: 842,
    icon: "🍗",
    badge: "HOT TREAT"
  },
  {
    id: 2,
    name: "Starbucks 아메리카노 & 치즈케이크 기프티콘",
    brand: "Starbucks",
    category: "cafe",
    price: 11900,
    originalPrice: 14000,
    discount: "15%",
    rating: 4.9,
    reviews: 1210,
    icon: "☕",
    badge: "BEST"
  },
  {
    id: 3,
    name: "McDonald's 빅맥 라지 세트 모바일 바우처",
    brand: "McDonald's",
    category: "food",
    price: 8500,
    originalPrice: 9800,
    discount: "13%",
    rating: 4.8,
    reviews: 630,
    icon: "🍔",
    badge: "INSTANT"
  },
  {
    id: 4,
    name: "7-Eleven CLiQQ 10,000원 모바일 금액권",
    brand: "7-Eleven",
    category: "retail",
    price: 9000,
    originalPrice: 10000,
    discount: "10%",
    rating: 4.9,
    reviews: 950,
    icon: "🏪",
    badge: "BEST"
  },
  {
    id: 5,
    name: "CGV / SM Cinema 2인 영화 관람권 & 팝콘 콤보",
    brand: "Cinema",
    category: "entertainment",
    price: 29000,
    originalPrice: 36000,
    discount: "19%",
    rating: 4.8,
    reviews: 415,
    icon: "🎬",
    badge: "POPULAR"
  },
  {
    id: 6,
    name: "Dunkin' 먼치킨 10개입 & 아이스라떼 세트",
    brand: "Dunkin'",
    category: "cafe",
    price: 9900,
    originalPrice: 12000,
    discount: "18%",
    rating: 4.7,
    reviews: 328,
    icon: "🍩",
    badge: "SALE"
  },
  {
    id: 7,
    name: "KFC 징거버거 박스밀 & 에그타르트 e-쿠폰",
    brand: "KFC",
    category: "food",
    price: 10500,
    originalPrice: 12500,
    discount: "16%",
    rating: 4.8,
    reviews: 274,
    icon: "🍟",
    badge: "NEW"
  },
  {
    id: 8,
    name: "The Spa & Wellness 전신 아로마 테라피 60분권",
    brand: "Wellness Spa",
    category: "lifestyle",
    price: 59000,
    originalPrice: 75000,
    discount: "21%",
    rating: 4.9,
    reviews: 188,
    icon: "💆‍♀️",
    badge: "PREMIUM"
  }
];

function getCart() {
  const saved = localStorage.getItem("shop_cart");
  return saved ? JSON.parse(saved) : [];
}

function saveCart(cart) {
  localStorage.setItem("shop_cart", JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badgeElements = document.querySelectorAll(".badge-count");
  badgeElements.forEach(el => {
    el.innerText = totalCount;
  });
}

function showToast(message, icon = "🎁") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function addToCart(productId, quantity = 1, option = "🎂 생일 축하 스티커 카드") {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === productId && item.option === option);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      icon: product.icon,
      option: option,
      quantity: quantity
    });
  }

  saveCart(cart);
  showToast(`[${product.brand}] 트릿이 선물함(Treats Bag)에 담겼습니다!`, "🎁");
}

function renderProductCards(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: white; border-radius: 16px; border: 1.5px dashed #f1e4dd;">
        <div style="font-size: 3.2rem; margin-bottom: 12px;">🔍</div>
        <h4 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 6px;">조건에 맞는 트릿 쿠폰이 없습니다.</h4>
        <p style="color: #786b65; font-size: 0.9rem;">다른 브랜드나 카테고리를 선택해 보세요.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="product-card">
      ${p.badge ? `<span class="product-badge ${p.badge === 'BEST' ? 'best' : ''}">${p.badge}</span>` : ''}
      <span class="product-sms-tag">⚡ 즉시 SMS 발송</span>
      <div class="product-thumb">
        <a href="product-detail.html?id=${p.id}" style="line-height: 1;">${p.icon}</a>
        <span class="product-brand-chip">${p.brand}</span>
      </div>
      <div class="product-info">
        <span class="product-cat">${p.category.toUpperCase()} TREAT</span>
        <a href="product-detail.html?id=${p.id}" class="product-name">${p.name}</a>
        <div class="product-rating">
          ★ ${p.rating} <span class="rating-num">(${p.reviews.toLocaleString()}명 선물함)</span>
        </div>
        <div class="price-row">
          <span class="discount">${p.discount}</span>
          <span class="price">${p.price.toLocaleString()}원</span>
          <span class="original-price">${p.originalPrice.toLocaleString()}원</span>
        </div>
        <div class="card-actions">
          <button class="btn-card-cart" onclick="addToCart(${p.id})">🎁 트릿 담기</button>
          <a href="product-detail.html?id=${p.id}" class="btn btn-outline" style="padding: 10px 14px; font-size: 0.84rem;">선물하기</a>
        </div>
      </div>
    </div>
  `).join("");
}

function renderCartPage() {
  const tableBody = document.getElementById("cart-items-body");
  const emptyBox = document.getElementById("cart-empty-message");
  const cartContent = document.getElementById("cart-content-wrapper");
  if (!tableBody) return;

  const cart = getCart();
  if (cart.length === 0) {
    if (cartContent) cartContent.style.display = "none";
    if (emptyBox) emptyBox.style.display = "block";
    return;
  }

  if (cartContent) cartContent.style.display = "grid";
  if (emptyBox) emptyBox.style.display = "none";

  let subtotal = 0;

  tableBody.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `
      <tr>
        <td style="display: flex; align-items: center; gap: 16px;">
          <div style="font-size: 2.2rem; background: #fff3ef; padding: 12px; border-radius: 14px;">${item.icon}</div>
          <div>
            <div style="font-size: 0.75rem; font-weight: 800; color: #ff5722;">${item.brand || 'SHARE TREATS'}</div>
            <div style="font-weight: 800; margin-bottom: 4px;">${item.name}</div>
            <div style="font-size: 0.82rem; color: #786b65;">스티커/옵션: ${item.option}</div>
          </div>
        </td>
        <td style="font-weight: 700;">${item.price.toLocaleString()}원</td>
        <td>
          <div class="quantity-control">
            <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
            <input type="text" class="quantity-input" value="${item.quantity}" readonly>
            <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
          </div>
        </td>
        <td style="font-weight: 900; color: #ff5722;">${itemTotal.toLocaleString()}원</td>
        <td>
          <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.8rem;" onclick="removeCartItem(${index})">삭제</button>
        </td>
      </tr>
    `;
  }).join("");

  const shipping = 0; // Digital SMS Treat Codes have 0 fee
  const grandTotal = subtotal + shipping;

  document.getElementById("cart-subtotal").innerText = `${subtotal.toLocaleString()}원`;
  document.getElementById("cart-shipping").innerText = "무료 (SMS 즉시발송)";
  document.getElementById("cart-grand-total").innerText = `${grandTotal.toLocaleString()}원`;
}

function changeQuantity(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart(cart);
  renderCartPage();
}

function removeCartItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartPage();
  showToast("선택한 트릿이 선물함에서 삭제되었습니다.", "🗑️");
}

function clearCart() {
  localStorage.removeItem("shop_cart");
  updateCartBadge();
  renderCartPage();
}

function initDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id")) || 1;
  const product = PRODUCTS_DATA.find(p => p.id === id) || PRODUCTS_DATA[0];

  document.getElementById("detail-icon").innerText = product.icon;
  document.getElementById("detail-title").innerText = product.name;
  document.getElementById("detail-price").innerText = `${product.price.toLocaleString()}원`;
  document.getElementById("detail-original-price").innerText = `${product.originalPrice.toLocaleString()}원`;
  document.getElementById("detail-discount").innerText = product.discount;
  document.getElementById("detail-rating").innerText = `★ ${product.rating} (${product.reviews.toLocaleString()}건 선물 완료)`;
  document.getElementById("detail-category").innerText = `${product.brand} · ${product.category.toUpperCase()}`;

  window.currentDetailProduct = product;
}

function changeDetailQty(delta) {
  const input = document.getElementById("detail-qty-input");
  let val = parseInt(input.value) || 1;
  val = Math.max(1, val + delta);
  input.value = val;
}

function addDetailToCart() {
  if (!window.currentDetailProduct) return;
  const qty = parseInt(document.getElementById("detail-qty-input").value) || 1;
  const option = document.getElementById("detail-option-select").value;
  addToCart(window.currentDetailProduct.id, qty, option);
}

document.addEventListener("DOMContentLoaded", () => {
  renderBuildVersionBar();
  updateCartBadge();
});
