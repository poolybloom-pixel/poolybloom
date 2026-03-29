// LOAD CART DARI STORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ELEMENT
const overlay = document.getElementById("overlay");
const buttons = document.querySelectorAll(".cart-btn");
const productCards = document.querySelectorAll(".product-card");

const detailPopup = document.getElementById("product-detail");
const detailImg = document.getElementById("detail-img");
const detailName = document.getElementById("detail-name");
const detailPrice = document.getElementById("detail-price");

const detailQty = document.getElementById("detail-qty");
const plusDetail = document.getElementById("plus-detail");
const minusDetail = document.getElementById("minus-detail");

const detailReq = document.getElementById("detail-req");
const addDetailCart = document.getElementById("add-detail-cart");
const closeDetail = document.getElementById("close-detail");

let currentProduct = {};
let qtyDetail = 1;
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

function attachCartEvents(){

const buttons = document.querySelectorAll(".cart-btn");

buttons.forEach(button => {

button.addEventListener("click", (e) => {

const id = button.dataset.id;
const name = button.dataset.name;
const price = parseInt(button.dataset.price);
const img = button.dataset.img;

const existing = cart.find(item => item.id === id);

if(existing){
    existing.qty += 1;
}else{
    cart.push({
        id: id,
        name: name,
        price: price,
        img: img,
        qty: 1,
        req: ""
    });
}

updateCart();
showNotification();

});

});

}


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
const totalQty = cart.reduce((sum,item)=>sum + item.qty,0);
cartCount.innerText = totalQty;
localStorage.setItem("cart", JSON.stringify(cart));
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

const subtotal = item.price * item.qty;

message += "🌷 *" + item.name + "*%0A";
message += "💰 Harga: Rp " + item.price + "%0A";
message += "🔢 Qty: " + item.qty + "%0A";
message += "🧾 Subtotal: Rp " + subtotal + "%0A";

if(item.req){
message += "📝 Request: " + item.req + "%0A";
}

message += "───────────────%0A";

total += subtotal;

});

message += "%0A━━━━━━━━━━━━━━━%0A";
message += "💸 *TOTAL BAYAR:* Rp " + total + "%0A%0A";
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

// ============================
// RENDER BADGE
// ============================

function renderBadges(){

document.querySelectorAll(".product-card").forEach(card => {

const badge = card.dataset.badge;

if(badge){

const label = document.createElement("div");
label.classList.add("badge");

if(badge === "best"){
label.innerText = "🔥 Best Seller";
}

if(badge === "new"){
label.innerText = "✨ New";
}

card.appendChild(label);

}

});

}

// ============================
// SEARCH PRODUCT
// ============================

const searchInput = document.getElementById("search-input");

if(searchInput){

searchInput.addEventListener("input", () => {

const keyword = searchInput.value.toLowerCase();
const products = document.querySelectorAll(".product-card");

products.forEach(item => {

const name = item.querySelector("h3").innerText.toLowerCase();

if(name.includes(keyword)){
item.style.display = "block";
}else{
item.style.display = "none";
}

});

});

}

// ============================
// PRODUCT POPUP
// ============================

const popup = document.getElementById("product-popup");
const popupImg = document.getElementById("popup-img");
const popupName = document.getElementById("popup-name");
const popupPrice = document.getElementById("popup-price");
const popupCartBtn = document.getElementById("popup-cart-btn");
const closePopup = document.getElementById("close-popup");

document.addEventListener("click", function(e){

// klik product card
if(e.target.closest(".product-card") && !e.target.classList.contains("cart-btn")){

const card = e.target.closest(".product-card");

const img = card.querySelector("img").src;
const name = card.querySelector("h3").innerText;
const priceText = card.querySelector(".price").innerText;
const price = parseInt(card.querySelector(".cart-btn").dataset.price);

popup.style.display = "flex";

popupImg.src = img;
popupName.innerText = name;
popupPrice.innerText = priceText;

// tombol add to cart di popup
popupCartBtn.onclick = () => {

const id = btn.dataset.id;
const existing = cart.find(item => item.id === id);

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
flyToCart(img, popupCartBtn);

};

}

// close popup
if(e.target.id === "close-popup" || e.target.id === "product-popup"){
popup.style.display = "none";
}

});


// INIT CART SAAT PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {

updateCart();
loadProducts(); // 🔥 ini penting

});

let currentSize = "all";
let currentCategory = "all";

// ============================
// SORT PRODUCT
// ============================

const sortSelect = document.getElementById("sort-select");

if(sortSelect){

sortSelect.addEventListener("change", () => {

const container = document.getElementById("shop-container");
const cards = Array.from(container.querySelectorAll(".product-card"));

cards.sort((a,b) => {

const priceA = parseInt(a.querySelector(".cart-btn").dataset.price);
const priceB = parseInt(b.querySelector(".cart-btn").dataset.price);

if(sortSelect.value === "low"){
return priceA - priceB;
}

if(sortSelect.value === "high"){
return priceB - priceA;
}

return 0;

});

container.innerHTML = "";

cards.forEach(card => container.appendChild(card));

});

}

// ============================
// OPEN DETAIL
// ============================




// ============================
// CLOSE DETAIL
// ============================

if(closeDetail){
closeDetail.addEventListener("click", ()=>{
detailPopup.style.display = "none";
});
}


// ============================
// QTY CONTROL
// ============================

if(plusDetail){
plusDetail.addEventListener("click", ()=>{
qtyDetail++;
detailQty.innerText = qtyDetail;
});
}

if(minusDetail){
minusDetail.addEventListener("click", ()=>{
if(qtyDetail > 1){
qtyDetail--;
detailQty.innerText = qtyDetail;
}
});
}


// ============================
// ADD FROM DETAIL
// ============================

if(addDetailCart){
addDetailCart.addEventListener("click", ()=>{

const existing = cart.find(item => item.id === currentProduct.id);

if(existing){
existing.qty += qtyDetail;
existing.req = detailReq.value;
}else{
cart.push({
name: currentProduct.name,
price: currentProduct.price,
img: currentProduct.img,
qty: qtyDetail,
req: detailReq.value
});
}

updateCart();
showNotification();

detailPopup.style.display = "none";

});
}

function goCategory(category){
window.location.href = "category.html?category=" + category;
}


// ============================
// LOAD PRODUCT FROM JSON
// ============================

function loadProducts(){

// ambil parameter dari URL
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");

fetch("data/products.json")
.then(res => res.json())
.then(data => {

const container = document.getElementById("shop-container");

if(!container) return;

container.innerHTML = "";

// 🔥 FILTER DI SINI
let filteredData = data;

// 🔥 FILTER BERDASARKAN URL
if(selectedCategory){
    filteredData = data.filter(p => p.category === selectedCategory);
}

filteredData.forEach(product => {

container.innerHTML += `
<div class="product-card" 
data-category="${product.category}" 
data-size="${product.size || 'standard'}"
data-badge="${product.badge}">

<img src="${product.image}">

<h3>${product.name}</h3>

<p class="price">Rp${product.price}</p>

<button class="cart-btn"
data-name="${product.name}"
data-price="${product.price}"
data-img="${product.image}">
Add to Cart
</button>

</div>
`;

});

// jalankan ulang fitur
renderBadges();
attachCartEvents();

// AUTO AKTIFKAN CATEGORY DARI URL
// AUTO APPLY FILTER DARI URL
if(selectedCategory){

    const btn = document.querySelector(`.filter-btn[data-cat="${selectedCategory}"]`);

    if(btn){
        filterProduct(selectedCategory, btn); // 🔥 WAJIB INI
    }

}else{
    filterProduct("all"); // default
}

});

}

document.addEventListener("click", function(e){

const card = e.target.closest(".product-card");
if(!card || e.target.classList.contains("cart-btn")) return;

const btn = card.querySelector(".cart-btn");

currentProduct = {
id: btn.dataset.id,
name: btn.dataset.name,
price: parseInt(btn.dataset.price),
img: btn.dataset.img
};

detailImg.src = currentProduct.img;
detailName.innerText = currentProduct.name;
detailPrice.innerText = "Rp " + currentProduct.price;

qtyDetail = 1;
detailQty.innerText = qtyDetail;
detailReq.value = "";

detailPopup.style.display = "flex";

});

function filterProduct(category, el){

currentCategory = category;
currentSize = "all"; // 🔥 INI PENTING BANGET

const sizeBox = document.getElementById("size-filter");

if(category === "flowerbox" || category === "keychain" || category === "figure"){
    sizeBox.style.display = "none";
}else{
    sizeBox.style.display = "flex";
}

// reset active category button
document.querySelectorAll(".size-btn").forEach(btn=>{
btn.classList.remove("active");
});

const firstSize = document.querySelector(".size-btn");
if(firstSize) firstSize.classList.add("active");

// 🔥 JALANKAN FILTER SETELAH SEMUA SIAP
applyFilter();
}

function filterSize(size, el){

currentSize = size;

document.querySelectorAll(".size-btn").forEach(btn=>{
btn.classList.remove("active");
});

if(el) el.classList.add("active");

applyFilter();
}

function applyFilter(){

const products = document.querySelectorAll(".product-card");

// 🔥 TARO DI SINI
console.log("CATEGORY:", currentCategory, "SIZE:", currentSize);

products.forEach(item => {

const cat = item.dataset.category;
const size = item.dataset.size;

if(
(currentCategory === "all" || cat === currentCategory) &&
(currentSize === "all" || size === currentSize)
){
item.style.display = "block";
item.classList.remove("hide");
item.classList.add("show");
}else{
item.style.display = "none";
item.classList.remove("show");
item.classList.add("hide");
}

});

}

function loadCategoryPage(){

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const title = document.getElementById("category-title");
const sizeSelect = document.getElementById("size-select");

const search = document.getElementById("search-input");
const sort = document.getElementById("sort-select");

// ❗ AMANKAN: kalau bukan halaman category, stop
if(!title || !sizeSelect) return;

// ❗ DEFAULT CATEGORY (biar ga null)
let currentCategory = category || "classic";

// 🔥 UBAH JUDUL
title.innerText =
currentCategory.charAt(0).toUpperCase() +
currentCategory.slice(1) + " Bouquet";

// 🔥 SHOW / HIDE SIZE
if(currentCategory === "flowerbox" || currentCategory === "keychain" || currentCategory === "figure"){
sizeSelect.style.display = "none";
}else{
sizeSelect.style.display = "inline-block";
}

// 🔥 LOAD DATA
fetch("data/products.json")
.then(res => res.json())
.then(data => {

let filtered = data.filter(p => p.category === currentCategory);

// RENDER AWAL
renderCategoryProducts(filtered);

// 🔍 SEARCH
search.addEventListener("input", () => {
applyAllFilter();
});

// 🔽 SORT
sort.addEventListener("change", () => {
applyAllFilter();
});

// 🔽 SIZE
sizeSelect.addEventListener("change", () => {
applyAllFilter();
});

// 🔥 SATU FUNCTION UNTUK SEMUA FILTER
function applyAllFilter(){

let result = data.filter(p => p.category === currentCategory);

// SIZE
const sizeVal = sizeSelect.value;
if(sizeVal !== "all"){
result = result.filter(p => p.size === sizeVal);
}

// SEARCH
const keyword = search.value.toLowerCase();
if(keyword){
result = result.filter(p =>
p.name.toLowerCase().includes(keyword)
);
}

// SORT
if(sort.value === "low"){
result.sort((a,b)=>a.price-b.price);
}

if(sort.value === "high"){
result.sort((a,b)=>b.price-a.price);
}

renderCategoryProducts(result);

}

});

}

const categorySelect = document.getElementById("category-select");
const sizeSelect = document.getElementById("size-select");

if(categorySelect){

categorySelect.addEventListener("change", () => {

currentCategory = categorySelect.value;
currentSize = "all";
sizeSelect.value = "all";

// hide size kalau category tertentu
if(currentCategory === "flowerbox" || currentCategory === "keychain" || currentCategory === "figure"){
sizeSelect.style.display = "none";
}else{
sizeSelect.style.display = "inline-block";
}

applyFilter();

});

}

if(sizeSelect){

sizeSelect.addEventListener("change", () => {

currentSize = sizeSelect.value;
applyFilter();

});

}
function renderCategoryProducts(products){

const container = document.getElementById("shop-container");

if(!container) return;

container.innerHTML = "";

products.forEach(product => {

container.innerHTML += `
<div class="product-card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p class="price">Rp${product.price}</p>

<button class="cart-btn"
data-id="${product.id}"
data-name="${product.name}"
data-price="${product.price}"
data-img="${product.image}">
Add to Cart
</button>

</div>
`;

});

attachCartEvents();
renderBadges();

}

// AUTO RUN
document.addEventListener("DOMContentLoaded", loadCategoryPage);