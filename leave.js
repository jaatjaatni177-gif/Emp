const API_URL = "https://script.google.com/macros/s/AKfycbwNyxMm0Gq3-5yD-Wcd5MuBkVVOxnutSJdwhaXTHJ3Kp_TiFjgm2w3APxuIH2rAeHztFg/exec";
if(!localStorage.getItem('empId')||!localStorage.getItem('token')) location.href='index.html';
document.getElementById('btnSubmit').addEventListener('click', async ()=>{
  const from=document.getElementById('from').value, to=document.getElementById('to').value, type=document.getElementById('type').value, reason=document.getElementById('reason').value, msg=document.getElementById('msg');
  msg.textContent='Submitting...';
  try{
    const res = await fetch(API_URL, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'leaveapply', empId:localStorage.getItem('empId'), token:localStorage.getItem('token'), leaveType:type, from, to, reason})});
    const data = await res.json();
    if (data.error) msg.textContent = 'Error: '+data.error; else msg.textContent = data.message || 'Submitted';
  }catch(e){ msg.textContent='Network error'; }
});
document.getElementById('btnLogout').addEventListener('click', ()=>{ localStorage.clear(); location.href='index.html'; });
