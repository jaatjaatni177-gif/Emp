const API_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
if(!localStorage.getItem('empId')||!localStorage.getItem('token')) location.href='index.html';
document.getElementById('btnSubmit').addEventListener('click', async ()=>{
  const subject=document.getElementById('subject').value, desc=document.getElementById('desc').value, msg=document.getElementById('msg');
  msg.textContent='Submitting...';
  try{
    const res = await fetch(API_URL, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'complaincreate', empId:localStorage.getItem('empId'), token:localStorage.getItem('token'), subject, description:desc})});
    const data = await res.json();
    if (data.error) msg.textContent = 'Error: '+data.error; else msg.textContent = data.message || 'Submitted';
  }catch(e){ msg.textContent='Network error'; }
});
document.getElementById('btnLogout').addEventListener('click', ()=>{ localStorage.clear(); location.href='index.html'; });