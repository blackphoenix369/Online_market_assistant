const logoutBtn = document.getElementById("logoutBtn");
const productList = document.getElementById("productList");

// Check login status
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/index.html";
}

// Verify token with backend (optional but recommended)
async function verifyToken() {
  try {
    const res = await fetch("/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Invalid token");
  } catch (err) {
    console.error("Token verification failed:", err);
    localStorage.removeItem("token");
    window.location.href = "/index.html";
  }
}

// Load products (static for now, replace with API later)
async function loadProducts() {
  const products = [
    { name: "Product 1", price: 100 },
    { name: "Product 2", price: 250 }
  ];

  productList.innerHTML = products
    .map((p) => `<div>${p.name} - $${p.price}</div>`)
    .join("");
}

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/index.html";
});

// Run on page load
verifyToken();
loadProducts();
