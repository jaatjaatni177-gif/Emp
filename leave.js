document.getElementById("leaveForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const empId = localStorage.getItem("empId");
  const token = localStorage.getItem("token");
  const leaveDate = document.getElementById("leaveDate").value;
  const reason = document.getElementById("reason").value;

  const res = await fetch("https://script.google.com/macros/s/AKfycbwNyxMm0Gq3-5yD-Wcd5MuBkVVOxnutSJdwhaXTHJ3Kp_TiFjgm2w3APxuIH2rAeHztFg/exec?action=leave", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ empId, token, leaveDate, reason })
  });
  const data = await res.json();
  document.getElementById("msg").innerText = data.success ? "Leave Applied" : "Error: " + data.message;
});