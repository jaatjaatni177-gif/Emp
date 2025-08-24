(async()=>{
  const token = localStorage.getItem('EMP_TOKEN');
  const id = localStorage.getItem('EMP_ID');
  if(!token || !id) location.href='index.html';
  async function api(payload){
    payload.token = token; payload.employee_id = id;
    const r = await fetch(window.CONFIG.API_BASE, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
    return r.json();
  }
  const res = await api({action:'getProfile'});
  if(!res.success){ alert('Session expired'); localStorage.clear(); location.href='index.html'; }
  document.getElementById('welcome').textContent = 'Welcome, ' + (res.data.name || '');
  const vals = [
    res.data.employee_id, res.data.emp_code, res.data.designation, res.data.father_name, res.data.gender,
    res.data.pf_number, res.data.dob, res.data.mobile, res.data.aadhar, res.data.id_proof,
    res.data.permanent_address, res.data.local_address, res.data.joining_date, res.data.emergency_contact, res.data.status
  ];
  const valuesEl = document.getElementById('values');
  valuesEl.innerHTML = vals.map(v=>`<div>${v||''}</div>`).join('');
  if(res.data.photo_url) document.getElementById('photo').src = res.data.photo_url;
  document.getElementById('logoutBtn').addEventListener('click', async ()=>{
    await api({action:'logout'});
    localStorage.clear(); location.href='index.html';
  });
})();
