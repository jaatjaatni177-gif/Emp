document.getElementById("complainForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const empId = localStorage.getItem("empId");
  const token = localStorage.getItem("token");
  const complainText = document.getElementById("complainText").value;

  const res = await fetch("https://script.google.com/macros/s/AKfycbwNyxMm0Gq3-5yD-Wcd5MuBkVVOxnutSJdwhaXTHJ3Kp_TiFjgm2w3APxuIH2rAeHztFg/exec?action=complain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ empId, token, complainText })
  });
  const data = await res.json();
  document.getElementById("msg").innerText = data.success ? "Complain Submitted" : "Error: " + data.message;
});