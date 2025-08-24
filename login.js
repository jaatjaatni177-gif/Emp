(async()=>{
  const loginBtn = document.getElementById('loginBtn');
  const msg = document.getElementById('msg');
  loginBtn.addEventListener('click', async ()=>{
    msg.textContent='';
    const id = document.getElementById('employeeId').value.trim();
    const pw = document.getElementById('password').value;
    if(!id||!pw){ msg.textContent='Enter both fields'; return; }
    const hashed = await sha256(pw);
    try{
      const res = await fetch(window.CONFIG.API_BASE, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({action:'login', employee_id:id, password_hash:hashed})
      });
      const data = await res.json();
      if(data.success){
        // store token & id
        localStorage.setItem('EMP_TOKEN', data.token);
        localStorage.setItem('EMP_ID', id);
        location.href='dashboard.html';
      } else {
        msg.textContent = data.message || 'Login failed';
      }
    }catch(e){ msg.textContent='Network error'; console.error(e); }
  });
})();