/**
 * Shopping Mall Core Application Script
 * - LocalStorage based Cart Management
 * - Toast Notification System
 * - Interactive Mock Functions
 */

// Mock Product Database
const PRODUCTS_DATA = [
  { id: 1, name: "오버핏 프리미엄 코튼 후드티", category: "fashion", price: 59000, originalPrice: 79000, discount: "25%", rating: 4.9, reviews: 142, icon: "🧥", badge: "HOT" },
  { id: 2, name: "노이즈 캔슬링 블루투스 헤드폰", category: "electronics", price: 189000, originalPrice: 240000, discount: "21%", rating: 4.8, reviews: 310, icon: "🎧", badge: "BEST" },
  { id: 3, name: "모던 미니멀 기계식 키보드", category: "electronics", price: 89000, originalPrice: 110000, discount: "19%", rating: 4.7, reviews: 89, icon: "⌨️", badge: "NEW" },
  { id: 4, name: "딥 모이스처 히알루론산 세럼", category: "beauty", price: 32000, originalPrice: 40000, discount: "20%", rating: 4.9, reviews: 520, icon: "🧴", badge: "BEST" },
  { id: 5, name: "데일리 클래식 레더 스니커즈", category: "fashion", price: 95000, originalPrice: 120000, discount: "20%", rating: 4.6, reviews: 75, icon: "👟", badge: "" },
  { id: 6, name: "대용량 스테인리스 보온 텀블러", category: "living", price: 28000, originalPrice: 35000, discount: "20%", rating: 4.8, reviews: 204, icon: "☕", badge: "SALE" },
  { id: 7, name: "스마트 무선 충전 데스크 매트", category: "electronics", price: 45000, originalPrice: 55000, discount: "18%", rating: 4.5, reviews: 63, icon: "⚡", badge: "" },
  { id: 8, name: "아로마 릴렉싱 소이 캔들 250g", category: "living", price: 24000, originalPrice: 30000, discount: "20%", rating: 4.7, reviews: 118, icon: "🕯️", badge: "NEW" }
];

// Initialize Cart from LocalStorage
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

// Toast Notification
function showToast(message, icon = "✅") {
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

// Add Item to Cart
function addToCart(productId, quantity = 1, option = "기본") {
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
      price: product.price,
      icon: product.icon,
      option: option,
      quantity: quantity
    });
  }

  saveCart(cart);
  showToast(`"${product.name}" 상품이 장바구니에 담겼습니다!`, "🛒");
}

// Render Products Grid
function renderProductCards(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = products.map(p => `
    <div class="product-card">
      ${p.badge ? `<span class="product-badge ${p.badge === 'BEST' ? 'best' : ''}">${p.badge}</span>` : ''}
      <div class="product-thumb">
        <a href="product-detail.html?id=${p.id}">${p.icon}</a>
      </div>
      <div class="product-info">
        <span class="product-cat">${p.category}</span>
        <a href="product-detail.html?id=${p.id}" class="product-name">${p.name}</a>
        <div class="product-rating">
          ★ ${p.rating} <span class="rating-num">(${p.reviews})</span>
        </div>
        <div class="price-row">
          <span class="discount">${p.discount}</span>
          <span class="price">${p.price.toLocaleString()}원</span>
          <span class="original-price">${p.originalPrice.toLocaleString()}원</span>
        </div>
        <div class="card-actions">
          <button class="btn-card-cart" onclick="addToCart(${p.id})">담기</button>
          <a href="product-detail.html?id=${p.id}" class="btn btn-outline" style="padding: 10px 14px; font-size: 0.85rem;">상세보기</a>
        </div>
      </div>
    </div>
  `).join("");
}

// Cart Page Render Logic
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
          <div style="font-size: 2.2rem; background: #f1f5f9; padding: 10px; border-radius: 8px;">${item.icon}</div>
          <div>
            <div style="font-weight: 700; margin-bottom: 4px;">${item.name}</div>
            <div style="font-size: 0.82rem; color: #64748b;">옵션: ${item.option}</div>
          </div>
        </td>
        <td style="font-weight: 600;">${item.price.toLocaleString()}원</td>
        <td>
          <div class="quantity-control">
            <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
            <input type="text" class="quantity-input" value="${item.quantity}" readonly>
            <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
          </div>
        </td>
        <td style="font-weight: 800; color: #2563eb;">${itemTotal.toLocaleString()}원</td>
        <td>
          <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.8rem;" onclick="removeCartItem(${index})">삭제</button>
        </td>
      </tr>
    `;
  }).join("");

  const shipping = subtotal >= 50000 || subtotal === 0 ? 0 : 3000;
  const grandTotal = subtotal + shipping;

  document.getElementById("cart-subtotal").innerText = `${subtotal.toLocaleString()}원`;
  document.getElementById("cart-shipping").innerText = shipping === 0 ? "무료배송" : `${shipping.toLocaleString()}원`;
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
  showToast("상품이 장바구니에서 삭제되었습니다.");
}

function clearCart() {
  localStorage.removeItem("shop_cart");
  updateCartBadge();
  renderCartPage();
}

// Product Detail Page Logic
function initDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id")) || 1;
  const product = PRODUCTS_DATA.find(p => p.id === id) || PRODUCTS_DATA[0];

  document.getElementById("detail-icon").innerText = product.icon;
  document.getElementById("detail-title").innerText = product.name;
  document.getElementById("detail-price").innerText = `${product.price.toLocaleString()}원`;
  document.getElementById("detail-original-price").innerText = `${product.originalPrice.toLocaleString()}원`;
  document.getElementById("detail-discount").innerText = product.discount;
  document.getElementById("detail-rating").innerText = `★ ${product.rating} (${product.reviews}개 리뷰)`;
  document.getElementById("detail-category").innerText = product.category.toUpperCase();

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

// Document Ready Setup
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
});
