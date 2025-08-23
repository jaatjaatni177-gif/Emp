document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const empId = document.getElementById("empId").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbwNyxMm0Gq3-5yD-Wcd5MuBkVVOxnutSJdwhaXTHJ3Kp_TiFjgm2w3APxuIH2rAeHztFg/exec?action=login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ empId, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("empId", empId);
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("loginError").innerText = "Invalid ID or Password";
    }
  } catch (err) {
    document.getElementById("loginError").innerText = "Error connecting to server";
  }
});