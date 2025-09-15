const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("email").value; // or "username" if your DB uses username
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }) // ⚠ should match backend field names
    });

    const data = await res.json();

    if (res.ok) {
      // If you want JWT token later, backend should return it
      // localStorage.setItem("token", data.token);
      window.location.href = "/dashboard.html"; // redirect on successful login
    } else {
      errorMsg.textContent = data.error || "Invalid credentials"; // matches backend JSON
    }
  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Something went wrong!";
  }
});
