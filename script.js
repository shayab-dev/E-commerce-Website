let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let cartClose = document.querySelector('#cart-close');

cartIcon.addEventListener('click', () => cart.classList.add('active'));
cartClose.addEventListener('click', ()=> cart.classList.remove('active'));

let addCartButtons = document.querySelectorAll('.add-cart');
addCartButtons.forEach(button => {
  button.addEventListener('click', event => {
    let productBox = event.target.closest('.product-box');
    addToCart(productBox);
  });
});

let cartContent = document.querySelector('.cart-content');
let addToCart = productBox => {
  let productImageSrc = productBox.querySelector('img').src;
  let productTitle = productBox.querySelector('.product-title').textContent;
  let productPrice = productBox.querySelector('.price').textContent;

  let cartItems = cartContent.querySelectorAll('.cart-product-title');
  for(let item of cartItems){
    if(item.textContent === productTitle){
      alert('This item is already in the cart.');
      return;
    }
  }


  let cartBox = document.createElement('div');
  cartBox.classList.add('cart-box');
  cartBox.innerHTML = `
    <img src="${productImageSrc}" class="cart-img">
        <div class="cart-detail">
          <h2 class="cart-product-title">${productTitle}</h2>
          <span class="cart-price">${productPrice}</span>
          <div class="cart-quantity">
            <button class="decrement">-</button>
            <span class="number">1</span>
            <button class="increment">+</button>
          </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
  `;

  cartContent.appendChild(cartBox);

  cartBox.querySelector('.cart-remove').addEventListener('click', () => {
    cartBox.remove();

    updateCartCount(-1);

    updateTotalPrice();
  });

  cartBox.querySelector('.cart-quantity').addEventListener('click', event => {
    let numberElement = cartBox.querySelector('.number');
    let decrementButton = cartBox.querySelector('.decrement');
    let quantity = parseInt(numberElement.textContent);

    if(event.target.classList.contains('decrement') && quantity > 1){
      quantity --;
      if(quantity === 1){
        decrementButton.style.color = '#999';
      }
    }
    else if(event.target.classList.contains('increment')){
      quantity ++;
      decrementButton.style.color = '#333';
    }
    numberElement.textContent = quantity;

    updateTotalPrice();

  });
  updateCartCount(1);

  updateTotalPrice();

};

let updateTotalPrice = () => {
  let totalPriceElement = document.querySelector('.total-price');
  let cartBoxes = cartContent.querySelectorAll('.cart-box');
  let total = 0;

  cartBoxes.forEach(cartBox => {
    let priceElement = cartBox.querySelector('.cart-price');
    let quantityElement = cartBox.querySelector('.number');
    let price = parseFloat(priceElement.textContent.replace('$', ''));
    let quantity = quantityElement.textContent;
    total += price * quantity;
  });
  totalPriceElement.textContent = `$${total}`;
};

let cartItemCount = 0;
let updateCartCount = change => {
  let cartItemCountBadge = document.querySelector('.cart-item-count');
  cartItemCount += change;
  if(cartItemCount > 0){
    cartItemCountBadge.style.visibility = 'visible';
    cartItemCountBadge.textContent = cartItemCount;
  }
  else {
    cartItemCountBadge.style.visibility = 'hidden';
    cartItemCountBadge.textContent = '';
  }
};

let buyNowButton = document.querySelector('.btn-buy');
buyNowButton.addEventListener('click', () => {
  let cartBoxes = cartContent.querySelectorAll('.cart-box');
  if(cartBoxes.length === 0){
    alert('Your cart is empty. Please add items.');
    return;
  }

  cartBoxes.forEach(cartBox => cartBox.remove());

  cartItemCount = 0;
  updateCartCount(0);

  updateTotalPrice();

  alert('Thank you for your purchase!');
});