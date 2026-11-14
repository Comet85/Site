/**
 * AURA SELECT — Editorial Tech & Lifestyle Curated Store Core Script
 * - Build Version Tracking System (Updated to v0.02)
 * - Curated Lifestyle & Design Object Catalog
 * - LocalStorage Cart & Checkout Management
 */

const SITE_BUILD_VERSION = "0.02";
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
    name: "브러시드 알루미늄 모듈형 데스크 램프 L1",
    brand: "LUMEN STUDIO",
    category: "lighting",
    price: 189000,
    originalPrice: 230000,
    discount: "18%",
    rating: 4.9,
    reviews: 214,
    icon: "🛋️",
    badge: "EXCLUSIVE"
  },
  {
    id: 2,
    name: "액티브 노이즈 캔슬링 스튜디오 헤드폰 Pro",
    brand: "SONIC LAB",
    category: "audio",
    price: 329000,
    originalPrice: 390000,
    discount: "16%",
    rating: 4.9,
    reviews: 482,
    icon: "🎧",
    badge: "BEST"
  },
  {
    id: 3,
    name: "아노다이징 풀알루미늄 커스텀 기계식 키보드",
    brand: "KEYCRAFT",
    category: "desk",
    price: 215000,
    originalPrice: 260000,
    discount: "17%",
    rating: 4.8,
    reviews: 319,
    icon: "⌨️",
    badge: "CURATED"
  },
  {
    id: 4,
    name: "시더우드 & 베르가못 보태니컬 디퓨저 250ml",
    brand: "ATELIER SCENT",
    category: "fragrance",
    price: 68000,
    originalPrice: 82000,
    discount: "17%",
    rating: 4.9,
    reviews: 640,
    icon: "🌿",
    badge: "BEST"
  },
  {
    id: 5,
    name: "미니멀 세라믹 드립 케틀 & 푸어오버 세트",
    brand: "BREW WORKS",
    category: "living",
    price: 112000,
    originalPrice: 140000,
    discount: "20%",
    rating: 4.8,
    reviews: 178,
    icon: "☕",
    badge: "EDITION"
  },
  {
    id: 6,
    name: "맥세이프 3-in-1 솔리드 스톤 충전 독",
    brand: "MONO TECH",
    category: "desk",
    price: 94000,
    originalPrice: 115000,
    discount: "18%",
    rating: 4.7,
    reviews: 256,
    icon: "⚡",
    badge: "NEW"
  },
  {
    id: 7,
    name: "발수 나일론 아키텍처 모듈 백팩 20L",
    brand: "NOMAD GEAR",
    category: "apparel",
    price: 158000,
    originalPrice: 195000,
    discount: "19%",
    rating: 4.8,
    reviews: 142,
    icon: "🎒",
    badge: "LIMITED"
  },
  {
    id: 8,
    name: "우드 레조넌스 블루투스 북쉘프 스피커",
    brand: "SONIC LAB",
    category: "audio",
    price: 275000,
    originalPrice: 340000,
    discount: "19%",
    rating: 4.9,
    reviews: 195,
    icon: "📻",
    badge: "CURATED"
  }
];

function getCart() {
  const saved = localStorage.getItem("aura_select_cart");
  return saved ? JSON.parse(saved) : [];
}

function saveCart(cart) {
  localStorage.setItem("aura_select_cart", JSON.stringify(cart));
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

function showToast(message, icon = "✨") {
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

function addToCart(productId, quantity = 1, option = "스페이스 실버 / 기본 패키지") {
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
  showToast(`[${product.brand}] 상품이 쇼핑백에 담겼습니다.`, "🛍️");
}

function renderProductCards(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: white; border-radius: 12px; border: 1px solid #e2e8f0;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
        <h4 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 6px;">선택한 조건에 부합하는 큐레이션 상품이 없습니다.</h4>
        <p style="color: #64748b; font-size: 0.9rem;">필터 옵션을 초기화하거나 다른 카테고리를 선택해 보세요.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="product-card">
      ${p.badge ? `<span class="product-badge ${p.badge === 'BEST' ? 'best' : ''}">${p.badge}</span>` : ''}
      <div class="product-thumb">
        <a href="product-detail.html?id=${p.id}" style="line-height: 1;">${p.icon}</a>
        <span class="product-brand-chip">${p.brand}</span>
      </div>
      <div class="product-info">
        <span class="product-cat">${p.category}</span>
        <a href="product-detail.html?id=${p.id}" class="product-name">${p.name}</a>
        <div class="product-rating">
          ★ ${p.rating} <span class="rating-num">(${p.reviews.toLocaleString()} 리뷰)</span>
        </div>
        <div class="price-row">
          <span class="discount">${p.discount}</span>
          <span class="price">${p.price.toLocaleString()}원</span>
          <span class="original-price">${p.originalPrice.toLocaleString()}원</span>
        </div>
        <div class="card-actions">
          <button class="btn-card-cart" onclick="addToCart(${p.id})">쇼핑백 담기</button>
          <a href="product-detail.html?id=${p.id}" class="btn btn-outline" style="padding: 10px 14px; font-size: 0.84rem;">상세</a>
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
          <div style="font-size: 2.2rem; background: #f1f5f9; padding: 12px; border-radius: 10px;">${item.icon}</div>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #0f766e;">${item.brand || 'AURA SELECT'}</div>
            <div style="font-weight: 800; margin-bottom: 4px;">${item.name}</div>
            <div style="font-size: 0.82rem; color: #64748b;">옵션: ${item.option}</div>
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
        <td style="font-weight: 900; color: #0f766e;">${itemTotal.toLocaleString()}원</td>
        <td>
          <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.8rem;" onclick="removeCartItem(${index})">삭제</button>
        </td>
      </tr>
    `;
  }).join("");

  const shipping = subtotal >= 100000 || subtotal === 0 ? 0 : 3000;
  const grandTotal = subtotal + shipping;

  document.getElementById("cart-subtotal").innerText = `${subtotal.toLocaleString()}원`;
  document.getElementById("cart-shipping").innerText = shipping === 0 ? "무료배송 (멤버십/10만원 이상)" : `${shipping.toLocaleString()}원`;
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
  showToast("선택한 상품이 쇼핑백에서 제외되었습니다.", "🗑️");
}

function clearCart() {
  localStorage.removeItem("aura_select_cart");
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
  document.getElementById("detail-rating").innerText = `★ ${product.rating} (${product.reviews.toLocaleString()}개 구매 리뷰)`;
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
