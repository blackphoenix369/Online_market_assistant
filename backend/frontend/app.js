const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard.html";
    } else {
      errorMsg.textContent = data.message || "Invalid email or password";
    }
  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Something went wrong!";
  }
});
