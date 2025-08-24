(async()=>{
  const token = localStorage.getItem('EMP_TOKEN'); const id = localStorage.getItem('EMP_ID');
  if(!token||!id) location.href='index.html';
  const form = document.getElementById('leaveForm'); const msg = document.getElementById('leaveMsg');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault(); msg.textContent='';
    const fd = new FormData(form);
    const payload = {action:'applyLeave', from:fd.get('fromDate'), to:fd.get('toDate'), type:fd.get('type'), reason:fd.get('reason') , token};
    try{
      const r = await fetch(window.CONFIG.API_BASE, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
      const j = await r.json();
      msg.textContent = j.success ? 'Leave Applied' : (j.message||'Error');
    }catch(e){ msg.textContent='Network error'; }
  });
})();