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
            <button id="decrement">-</button>
            <span class="number">1</span>
            <button class="increment">+</button>
          </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
  `;
  cartContent.appendChild(cartBox);

  cartBox.querySelector('.cart-remove').addEventListener('click', () => {
    cartBox.remove();
  });

  cartBox.querySelector('.cart-quantity').addEventListener('click', event => {
    let numberElement = cartBox.querySelector('.number');
    let decrementButton = cartBox.querySelector('#decrement');
    let quantity = numberElement.textContent;

    if(event.target.id === 'decrement' && quantity > 1){
      quantity --;
      if(quantity === 1){
        decrementButton.style.color = '#999';
      }
    }
    else if(event.target.id === 'increment'){
      quantity ++;
      decrementButton.style.color = '#333';
    }
    numberElement.textContent = quantity;
  });

};