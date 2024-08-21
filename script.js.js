const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click', () => {
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click', () => {
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
  loadContent();
}

function loadContent() {
  //Remove Food Items From Cart
  let btnRemove = document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn) => {
    btn.addEventListener('click', removeItem);
  });

  //Product Item Change Event
  let qtyElements = document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input) => {
    input.addEventListener('change', changeQty);
  });

  //Add to Cart Buttons
  let cartBtns = document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn) => {
    btn.addEventListener('click', addCart);
  });

  updateTotal();
}

// Remove Item
function removeItem() {
  if (confirm('Are you sure you want to remove this item?')) {
    let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList = itemList.filter(el => el.title != title);
    this.parentElement.remove();
    loadContent();
  }
}

// Change Quantity
function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

let itemList = [];

// Add to Cart
function addCart() {
  let food = this.parentElement;
  let title = food.querySelector('.food-title').innerHTML;
  let price = food.querySelector('.food-price').innerHTML;
  let imgSrc = food.querySelector('.food-img').src;

  let newProduct = { title, price, imgSrc };

  // Check if the product is already in the cart
  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("Product already added to the cart");
    return;
  } else {
    itemList.push(newProduct);
  }

  let newProductElement = createCartProduct(title, price, imgSrc);
  let element = document.createElement('div');
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector('.cart-content');
  cartBasket.append(element);
  loadContent();
}

function createCartProduct(title, price, imgSrc) {
  return `
    <div class="cart-box">
      <img src="${imgSrc}" class="cart-img">
      <div class="detail-box">
        <div class="cart-food-title">${title}</div>
        <div class="price-box">
          <div class="cart-price">${price}</div>
          <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity">
      </div>
      <ion-icon name="trash" class="cart-remove"></ion-icon>
    </div>
  `;
}

function updateTotal() {
  const cartItems = document.querySelectorAll('.cart-box');
  const totalValue = document.querySelector('.total-price');

  let total = 0;

  cartItems.forEach(product => {
    let priceElement = product.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
    let qty = product.querySelector('.cart-quantity').value;
    total += (price * qty);
    product.querySelector('.cart-amt').innerText = "Rs." + (price * qty);
  });

  totalValue.innerHTML = 'Rs.' + total;

  // Add Product Count in Cart Icon
  const cartCount = document.querySelector('.cart-count');
  let count = itemList.length;
  cartCount.innerHTML = count;

  if (count == 0) {
    cartCount.style.display = 'none';
  } else {
    cartCount.style.display = 'block';
  }
}

// Filter and Search
const buttons = document.querySelectorAll('.btn');
const boxes = document.querySelectorAll('.food-box'); // Ensure this is selecting the right class
const searchBox = document.querySelector("#search");

/* Search Product by Textbox */
searchBox.addEventListener('keyup', (e) => {
  let searchText = e.target.value.toLowerCase().trim();

  boxes.forEach((box) => {
    const data = box.dataset.item;
    if (data.includes(searchText)) {
      box.style.display = 'block';
    } else {
      box.style.display = 'none';
    }
  });

  buttons.forEach((button) => {
    button.classList.remove('btn-clicked');
  });
  buttons[0].classList.add('btn-clicked');
});

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveBtn(e);
    const btnfilter = e.target.dataset.filter;

    boxes.forEach((box => {
      if (btnfilter == 'all') {
        box.style.display = "block";
      } else {
        const boxfilter = box.dataset.item;
        if (btnfilter == boxfilter) {
          box.style.display = "block";
        } else {
          box.style.display = "none";
        }
      }
    }));
  });
});

function setActiveBtn(e) {
  buttons.forEach((button) => {
    button.classList.remove('btn-clicked');
  });
  e.target.classList.add('btn-clicked');
}
// product rating
const stars=document.querySelectorAll('.star');
const current_rating=document.querySelector('.current-rating');

stars.forEach((star,index)=>{
  star.addEventListener('click',()=>{

    let current_star=index+1;
    current_rating.innerText=`${current_star} of 5`;

    stars.forEach((star,i)=>{
        if(current_star>=i+1){
          star.innerHTML='&#9733;';
        }else{
          star.innerHTML='&#9734;';
        }
    });

  });
});