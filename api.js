async function loadAttendance() {
  const empId = localStorage.getItem("empId");
  const token = localStorage.getItem("token");
  const res = await fetch("https://script.google.com/macros/s/AKfycbwNyxMm0Gq3-5yD-Wcd5MuBkVVOxnutSJdwhaXTHJ3Kp_TiFjgm2w3APxuIH2rAeHztFg/exec?action=attendance&empId=" + empId + "&token=" + token);
  const data = await res.json();
  let html = "<h3>Attendance</h3><table border='1'><tr><th>EmpID</th><th>Date</th><th>In Time</th><th>Out Time</th><th>Days</th></tr>";
  data.forEach(r => { html += `<tr><td>${r.EmpID}</td><td>${r.Date}</td><td>${r.InTime}</td><td>${r.OutTime}</td><td>${r.Days}</td></tr>`; });
  html += "</table>";
  document.getElementById("content").innerHTML = html;
}

async function loadSalary() {
  const empId = localStorage.getItem("empId");
  const token = localStorage.getItem("token");
  const res = await fetch("https://script.google.com/macros/s/AKfycbwNyxMm0Gq3-5yD-Wcd5MuBkVVOxnutSJdwhaXTHJ3Kp_TiFjgm2w3APxuIH2rAeHztFg/exec?action=salary&empId=" + empId + "&token=" + token);
  const data = await res.json();
  let html = "<h3>Salary</h3><table border='1'><tr><th>EmpID</th><th>Month</th><th>Basic</th><th>Allowance</th><th>Deductions</th><th>Net Pay</th></tr>";
  data.forEach(r => { html += `<tr><td>${r.EmpID}</td><td>${r.Month}</td><td>${r.Basic}</td><td>${r.Allowance}</td><td>${r.Deductions}</td><td>${r.NetPay}</td></tr>`; });
  html += "</table>";
  document.getElementById("content").innerHTML = html;
}