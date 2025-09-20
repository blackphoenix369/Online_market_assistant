const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get values from input fields
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }) // 👈 must match backend field names
    });

    const data = await res.json();

    if (res.ok) {
      // Store token if backend provides it
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      // Redirect after successful login
      window.location.href = "/dashboard.html";
    } else {
      // Show error message
      errorMsg.textContent = data.error || data.message || "Invalid credentials";
    }
  } catch (err) {
    console.error("Login request failed:", err);
    errorMsg.textContent = "Something went wrong! Please try again.";
  }
});
