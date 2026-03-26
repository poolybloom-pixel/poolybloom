// CART DATA
let cart = [];

// ELEMENT
const overlay = document.getElementById("overlay");
const buttons = document.querySelectorAll(".cart-btn");
const cartIcon = document.getElementById("cart-icon");
const cartPopup = document.getElementById("cart-popup");
const closeCart = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

const notification = document.getElementById("cart-notification");


// ============================
// ADD TO CART
// ============================

buttons.forEach(button => {

button.addEventListener("click", () => {

const name = button.dataset.name;
const price = parseInt(button.dataset.price);
const img = button.dataset.img;

const existing = cart.find(item => item.name === name);

if(existing){
existing.qty += 1;
}else{

cart.push({
name:name,
price:price,
img:img,
qty:1,
req:""
});

}

updateCart();
showNotification();
cartCount.classList.add("cart-bounce");

setTimeout(()=>{
cartCount.classList.remove("cart-bounce");
},400);

});

});


// ============================
// NOTIFICATION
// ============================

function showNotification(){

notification.style.display = "block";

setTimeout(()=>{
notification.style.display = "none";
},2000);

}


// ============================
// UPDATE CART
// ============================

function updateCart(){

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

total += item.price * item.qty;

cartItems.innerHTML += `

<div class="cart-item">

<img src="${item.img}">

<div class="cart-details">

<h4>${item.name}</h4>

<p>Rp ${item.price}</p>

<div class="qty-control">

<button onclick="decreaseQty(${index})">−</button>

<span>${item.qty}</span>

<button onclick="increaseQty(${index})">+</button>

<button class="remove-btn"
onclick="removeItem(${index})">Hapus</button>

</div>

<textarea placeholder="Request (contoh: ganti warna pink)"
onchange="updateReq(${index},this.value)"></textarea>

</div>

</div>

`;

});

cartTotal.innerText = total;
cartCount.innerText = cart.length;

}


// ============================
// UPDATE REQUEST
// ============================

function updateReq(index,value){

cart[index].req = value;

}


// ============================
// OPEN CART
// ============================

if(cartIcon){
cartIcon.addEventListener("click", ()=>{
    cartPopup.classList.add("active");
    document.body.classList.add("blur");
});
}

// ============================
// CLOSE CART
// ============================

if(closeCart){
closeCart.addEventListener("click", ()=>{
    cartPopup.classList.remove("active");
    document.body.classList.remove("blur");
});
}



function increaseQty(index){

cart[index].qty += 1;
updateCart();

}

function decreaseQty(index){

if(cart[index].qty > 1){
cart[index].qty -= 1;
}else{
cart.splice(index,1);
}

updateCart();

}

function removeItem(index){

cart.splice(index,1);
updateCart();

}


const checkoutBtn = document.getElementById("checkout-btn");
const checkoutForm = document.getElementById("checkout-form");
const sendOrder = document.getElementById("send-order");
const closeCheckout = document.getElementById("close-checkout");

if(checkoutBtn){
checkoutBtn.addEventListener("click", ()=>{

if(cart.length === 0){
alert("Keranjang masih kosong 🌸");
return;
}

checkoutForm.style.display = "flex";

});
}

if(closeCheckout){
closeCheckout.addEventListener("click", ()=>{

checkoutForm.style.display = "none";

});
}


if(sendOrder){
sendOrder.addEventListener("click", ()=>{

const name = document.getElementById("cust-name").value;
const phone = document.getElementById("cust-phone").value;
const date = document.getElementById("pickup-date").value;
const today = new Date();
today.setHours(0,0,0,0);

const pickup = new Date(date);
pickup.setHours(0,0,0,0);

const diffTime = pickup - today;
const diffDays = diffTime / (1000 * 60 * 60 * 24);

if(diffDays < 2){

alert("Pengambilan minimal H+2 ya 🌷");
return;

}

if(!name || !phone || !date){
alert("Isi semua data dulu ya 🌷");
return;
}

let message = "🌸 *ORDER POOLY BLOOM* 🌸%0A";
message += "━━━━━━━━━━━━━━━%0A%0A";

message += "👤 Nama: " + name + "%0A";
message += "📞 No HP: " + phone + "%0A";
message += "📅 Tanggal Ambil: " + date + "%0A%0A";

message += "💐 *DETAIL PESANAN* %0A%0A";

let total = 0;

cart.forEach(item=>{

message += "🌷 " + item.name + "%0A";
message += "💰 Harga: Rp " + item.price + "%0A";
message += "🔢 Qty: " + item.qty + "%0A";

if(item.req){
message += "📝 Request: " + item.req + "%0A";
}

message += "🖼️ Foto: " + item.img + "%0A";

message += "───────────────%0A";

total += item.price * item.qty;

});

message += "%0A✨ *TOTAL BAYAR:* Rp " + total + "%0A%0A";
message += "Terima kasih sudah order di Pooly Bloom 💗";

const url = "https://wa.me/62895352962123?text=" + message;

window.open(url,"_blank");

});
}



function flyToCart(imgSrc,button){

const img = document.createElement("img");
img.src = imgSrc;

img.style.position="fixed";
img.style.width="60px";
img.style.height="60px";
img.style.objectFit="cover";
img.style.borderRadius="10px";
img.style.zIndex="3000";

const rect = button.getBoundingClientRect();

img.style.top = rect.top+"px";
img.style.left = rect.left+"px";

document.body.appendChild(img);

const cartRect = cartIcon.getBoundingClientRect();

setTimeout(()=>{

img.style.transition="1s ease";

img.style.top = cartRect.top+"px";
img.style.left = cartRect.left+"px";
img.style.opacity="0";

},10);

setTimeout(()=>{
img.remove();
},1000);

}

document.addEventListener("DOMContentLoaded", function(){

const toggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const closeMenu = document.getElementById("close-menu");
const overlay = document.getElementById("overlay");

toggle.addEventListener("click", ()=>{
navMenu.classList.add("active");
overlay.classList.add("active");
});

closeMenu.addEventListener("click", ()=>{
navMenu.classList.remove("active");
overlay.classList.remove("active");
});

overlay.addEventListener("click", ()=>{
navMenu.classList.remove("active");
overlay.classList.remove("active");
});

});