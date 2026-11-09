// 쇼핑몰 기본 스크립트
let cartCount = 0;

function addToCart(productName) {
    cartCount += 1;
    document.getElementById('cart-count').innerText = cartCount;
    alert(`"${productName}" 상품이 장바구니에 담겼습니다!`);
}

