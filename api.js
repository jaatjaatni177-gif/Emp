const API_URL = "https://script.google.com/macros/s/AKfycbwNyxMm0Gq3-5yD-Wcd5MuBkVVOxnutSJdwhaXTHJ3Kp_TiFjgm2w3APxuIH2rAeHztFg/exec";
function guard(){ const empId=localStorage.getItem('empId'), token=localStorage.getItem('token'); if(!empId||!token) location.href='index.html'; const who=document.getElementById('who'); if(who) who.textContent='Welcome, '+(localStorage.getItem('name')||''); }
guard();
async function callApi(action, extra={}){
  const empId=localStorage.getItem('empId'), token=localStorage.getItem('token');
  const out=document.getElementById('out');
  out.textContent='Loading...';
  try{
    const res = await fetch(API_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(Object.assign({action, empId, token}, extra)) });
    const data = await res.json();
    if (!res.ok || data.error) { out.textContent = 'Error: '+(data.error||'Request failed'); return; }
    out.textContent = JSON.stringify(data, null, 2);
  }catch(e){ out.textContent = 'Network error'; }
}
(async function loadProfile(){
  try{
    const d = await (await fetch(API_URL, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'profile', empId:localStorage.getItem('empId'), token:localStorage.getItem('token')})})).json();
    if (d.error) { localStorage.clear(); location.href='index.html'; return; }
    const p = d.profile || d;
    const wrap = document.getElementById('profile');
    const fields = ['EmpID','EmpCode','Name','Designation','FatherName','Gender','PFNumber','DOB','Mobile','Aadhar','IDProof','PermanentAddress','LocalAddress','JoiningDate','EmergencyContact','Status'];
    if (wrap) wrap.innerHTML = fields.map(k=>`<div class="kv"><div style="font-weight:700">${k.replace(/([A-Z])/g,' $1').trim()}:</div><div>${p[k]||''}</div></div>`).join('');
  }catch(e){ document.getElementById('profile').textContent='Error loading profile'; }
})();
document.getElementById('btnAttendance').addEventListener('click', ()=>callApi('attendance'));
document.getElementById('btnSalary').addEventListener('click', ()=>callApi('salary'));
document.getElementById('btnDocs').addEventListener('click', ()=>callApi('documents'));
document.getElementById('btnLeaveStatus').addEventListener('click', ()=>callApi('leaves'));
document.getElementById('btnLeaveBalance').addEventListener('click', ()=>callApi('leavebalance'));
document.getElementById('btnComplainStatus').addEventListener('click', ()=>callApi('complaints'));
document.getElementById('btnBonus').addEventListener('click', ()=>callApi('bonus'));
document.getElementById('btnLogout').addEventListener('click', async ()=>{ try{ await fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'logout', empId:localStorage.getItem('empId'), token:localStorage.getItem('token')})}); }catch(e){} localStorage.clear(); location.href='index.html'; });
