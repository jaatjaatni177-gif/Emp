// Enter your deployed Apps Script Web App URL here
const API_URL = "https://script.google.com/macros/s/AKfycbwNyxMm0Gq3-5yD-Wcd5MuBkVVOxnutSJdwhaXTHJ3Kp_TiFjgm2w3APxuIH2rAeHztFg/exec";

document.getElementById('btnLogin').addEventListener('click', async () => {
  const empId = document.getElementById('empId').value.trim();
  const password = document.getElementById('password').value;
  const msg = document.getElementById('msg'); msg.textContent='';
  if (!empId || !password) { msg.textContent = 'Enter EmpID & Password'; return; }
  try {
    const res = await fetch(API_URL, { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'login', empId, password}) });
    const data = await res.json();
    if (!res.ok || data.error) { msg.textContent = data.error || 'Login failed'; return; }
    localStorage.setItem('empId', data.empId || empId);
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name || '');
    localStorage.setItem('tokenExpiry', data.tokenExpiry || '');
    window.location.href = 'dashboard.html';
  } catch(e){ msg.textContent = 'Network error'; }
});
