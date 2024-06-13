// let carts = document.querySelectorAll('.add-cart');

// for (let i = 0; i < carts.length; i++) {
//     carts[i].addEventListener('click', () => {
//         event.preventDefault();
//         cartNumber();
//     })
// }

// function onLoadCartNumbers() {
//     let productNumbers = localStorage.getItem('cartNumbers');

//     if (productNumbers) {
//         document.querySelector('.item-count').textContent = productNumbers;

//     }
// }

// function cartNumber() {
//     let productNumbers = localStorage.getItem('cartNumbers');

//     productNumbers = parseInt(productNumbers);

//     if (productNumbers) {
//         localStorage.setItem('cartNumbers', productNumbers + 1);
//         document.querySelector('.item-count').textContent = productNumbers + 1;

//     } else {
//         localStorage.setItem('cartNumbers', 1);
//         document.querySelector('.item-count').textContent = 1;
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     onLoadCartNumbers();
// });