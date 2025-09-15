const logoutBtn = document.getElementById("logoutBtn");
const productList = document.getElementById("productList");

// Redirect to login if not logged in
const token = localStorage.getItem("token");
if (!token) window.location.href = "/index.html";

// Example product list (replace with API fetch if needed)
const products = [
  { name: "Product 1", price: 100 },
  { name: "Product 2", price: 250 }
];

productList.innerHTML = products.map(p => `<div>${p.name} - $${p.price}</div>`).join("");

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/index.html";
});
