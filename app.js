
const DEFAULT_SUBJECTS = [
  {name:"English Home Language", isLO:false},
  {name:"Afrikaans First Additional", isLO:false},
  {name:"Mathematics", isLO:false, toggle:"Maths Literacy"},
  {name:"Life Orientation", isLO:true},
  {name:"Physical Sciences", isLO:false},
  {name:"Life Sciences", isLO:false},
  {name:"Geography", isLO:false},
];

const COURSES = [
  {uni:"UJ", course:"BSc Computer Science", faculty:"Science", aps:30, cat:"tech", req:{Mathematics:60, "English Home Language":50}},
  {uni:"UJ", course:"Diploma in IT", faculty:"Science", aps:24, cat:"tech", req:{Mathematics:50}},
  {uni:"UJ", course:"BCom Accounting", faculty:"Commerce", aps:28, cat:"commerce", req:{Mathematics:50}},
  {uni:"UJ", course:"BEd Senior Phase", faculty:"Education", aps:26, cat:"humanities", req:{"English Home Language":50}},
  {uni:"UJ", course:"LLB", faculty:"Law", aps:32, cat:"humanities", req:{"English Home Language":60}},
  {uni:"Wits", course:"BSc Information Systems", faculty:"Science", aps:40, cat:"tech", req:{Mathematics:60, "English Home Language":60}},
  {uni:"Wits", course:"BCom", faculty:"Commerce", aps:34, cat:"commerce", req:{Mathematics:50, "English Home Language":50}},
  {uni:"Wits", course:"MBChB Medicine", faculty:"Health", aps:45, cat:"health", req:{Mathematics:60, "Physical Sciences":60, "English Home Language":60}},
  {uni:"Wits", course:"BA", faculty:"Humanities", aps:34, cat:"humanities", req:{"English Home Language":60}},
  {uni:"UP", course:"BSc Data Science", faculty:"EBIT", aps:34, cat:"tech", req:{Mathematics:60, "Physical Sciences":50}},
  {uni:"UP", course:"BSc Computer Science", faculty:"EBIT", aps:32, cat:"tech", req:{Mathematics:60}},
  {uni:"UP", course:"BCom Accounting", faculty:"EMS", aps:34, cat:"commerce", req:{Mathematics:60, "English Home Language":50}},
  {uni:"UP", course:"BCom Business Management", faculty:"EMS", aps:30, cat:"commerce", req:{Mathematics:50}},
  {uni:"UP", course:"LLB", faculty:"Law", aps:34, cat:"humanities", req:{"English Home Language":60}},
  {uni:"UP", course:"BSc Nursing", faculty:"Health", aps:30, cat:"health", req:{Mathematics:50, "Physical Sciences":50}},
  {uni:"UCT", course:"BSc Computer Science", faculty:"Science", aps:40, cat:"tech", req:{Mathematics:70, "English Home Language":60}},
  {uni:"UCT", course:"BCom", faculty:"Commerce", aps:38, cat:"commerce", req:{Mathematics:60}},
  {uni:"UCT", course:"LLB", faculty:"Law", aps:42, cat:"humanities", req:{"English Home Language":65}},
  {uni:"UCT", course:"MBChB", faculty:"Health", aps:45, cat:"health", req:{Mathematics:60, "Physical Sciences":60}},
  {uni:"Stellenbosch", course:"BSc Computer Science", faculty:"Science", aps:36, cat:"tech", req:{Mathematics:65}},
  {uni:"UNISA", course:"Diploma in IT", faculty:"Science", aps:20, cat:"tech", req:{Mathematics:40}},
  {uni:"UNISA", course:"Higher Certificate in Business", faculty:"Commerce", aps:18, cat:"commerce", req:{}},
  {uni:"TUT", course:"Diploma in Computer Science", faculty:"ICT", aps:24, cat:"tech", req:{Mathematics:50}},
  {uni:"TUT", course:"Diploma in Nursing", faculty:"Health", aps:24, cat:"health", req:{"English Home Language":50}},
  {uni:"UJ", course:"B Nursing", faculty:"Health", aps:28, cat:"health", req:{Mathematics:50, "Life Sciences":50}},
  {uni:"DUT", course:"Diploma in IT", faculty:"IT", aps:22, cat:"tech", req:{Mathematics:45}},
  {uni:"NWU", course:"BSc IT", faculty:"Natural", aps:28, cat:"tech", req:{Mathematics:50}},
  {uni:"UFS", course:"BSc Computer Science & IT", faculty:"Natural", aps:30, cat:"tech", req:{Mathematics:60}},
  {uni:"UKZN", course:"BCom General", faculty:"Commerce", aps:30, cat:"commerce", req:{Mathematics:50}},
  {uni:"UWC", course:"BSc Computer Science", faculty:"Science", aps:32, cat:"tech", req:{Mathematics:60}},
  {uni:"CPUT", course:"Diploma in ICT", faculty:"Informatics", aps:25, cat:"tech", req:{Mathematics:50}},
  {uni:"VUT", course:"Diploma in Business Management", faculty:"Management", aps:22, cat:"commerce", req:{}},
];

function apsLevel(p){
  if(p>=80) return 7; if(p>=70) return 6; if(p>=60) return 5; if(p>=50) return 4; if(p>=40) return 3; if(p>=30) return 2; return 1;
}
function levelBadge(l){ return `<span class="badge lvl-${l}">${l}</span>`; }

let subjects = JSON.parse(JSON.stringify(DEFAULT_SUBJECTS)).map(s=>({...s, march:"", june:"", sept:""}));
let currentFilter="all";

function renderTable(){
  const body=document.getElementById("marksBody");
  body.innerHTML="";
  subjects.forEach((sub,i)=>{
    const march=parseInt(sub.march)||0, june=parseInt(sub.june)||0, sept=parseInt(sub.sept)||0;
    const lvl=apsLevel(sept);
    let trend="—"; let cls="trend-flat";
    if(sub.march!=="" && sub.sept!==""){
      const diff=sept-march;
      if(diff>0){ trend=`↗ +${diff}%`; cls="trend-up"; }
      else if(diff<0){ trend=`↘ ${diff}%`; cls="trend-down"; }
      else { trend=`→ 0%`; }
    }
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td>
        <select data-i="${i}" class="subName" style="min-width:170px">
          <option ${sub.name.includes("English")?"selected":""}>English Home Language</option>
          <option ${sub.name==="Mathematics"?"selected":""}>Mathematics</option>
          <option ${sub.name==="Maths Literacy"?"selected":""}>Maths Literacy</option>
          <option ${sub.name==="Afrikaans First Additional"?"selected":""}>Afrikaans First Additional</option>
          <option ${sub.name==="IsiZulu FAL"?"selected":""}>IsiZulu FAL</option>
          <option ${sub.name==="Life Orientation"?"selected":""}>Life Orientation</option>
          <option ${sub.name==="Physical Sciences"?"selected":""}>Physical Sciences</option>
          <option ${sub.name==="Life Sciences"?"selected":""}>Life Sciences</option>
          <option ${sub.name==="Geography"?"selected":""}>Geography</option>
          <option ${sub.name==="Accounting"?"selected":""}>Accounting</option>
          <option ${sub.name==="History"?"selected":""}>History</option>
          <option ${sub.name==="Business Studies"?"selected":""}>Business Studies</option>
          <option ${sub.name==="Economics"?"selected":""}>Economics</option>
          <option ${sub.name==="CAT"?"selected":""}>CAT</option>
          <option ${sub.name==="IT"?"selected":""}>IT</option>
        </select>
        ${sub.isLO?'<small style="color:#6B6A8A"> (LO)</small>':''}
      </td>
      <td><input type="number" min="0" max="100" data-i="${i}" data-k="march" value="${sub.march}" placeholder="0"/></td>
      <td><input type="number" min="0" max="100" data-i="${i}" data-k="june" value="${sub.june}" placeholder="0"/></td>
      <td><input type="number" min="0" max="100" data-i="${i}" data-k="sept" value="${sub.sept}" placeholder="0"/></td>
      <td>${sub.sept===""?"—":levelBadge(lvl)}</td>
      <td class="${cls}">${trend}</td>
    `;
    body.appendChild(tr);
  });
  attachListeners();
}

function attachListeners(){
  document.querySelectorAll("#marksBody input").forEach(inp=>{
    inp.addEventListener("input",(e)=>{
      const i=e.target.dataset.i, k=e.target.dataset.k;
      subjects[i][k]=e.target.value;
      if(k==="sept") renderTable();
    });
  });
  document.querySelectorAll(".subName").forEach(sel=>{
    sel.addEventListener("change",(e)=>{
      const i=e.target.dataset.i;
      subjects[i].name=e.target.value;
      subjects[i].isLO = e.target.value==="Life Orientation";
      renderTable();
    });
  });
}

function calcAPS(term){
  // term: march/june/sept
  const levels = subjects.filter(s=>!s.isLO && s[term]!=="" ).map(s=>({name:s.name, level:apsLevel(parseInt(s[term])||0), mark:parseInt(s[term])||0}));
  levels.sort((a,b)=>b.level-a.level);
  const best6 = levels.slice(0,6);
  const sum = best6.reduce((a,c)=>a+c.level,0);
  return {sum, best6, all:levels};
}

function predictFinal(){
  let preds=[];
  subjects.forEach(s=>{
    const m=parseInt(s.march)||0, ju=parseInt(s.june)||0, se=parseInt(s.sept)||0;
    if(s.march===""||s.june===""||s.sept==="") { preds.push(se); return; }
    // simple linear trend: avg improvement + weighted sept
    const improvement = (se - m)/2; // avg over 2 intervals
    let pred = se + improvement*0.6;
    pred = Math.max(0, Math.min(100, Math.round(pred)));
    preds.push(pred);
  });
  // calc APS from preds
  const tmp = subjects.map((s,i)=>({name:s.name, isLO:s.isLO, sept:preds[i]}));
  const levels = tmp.filter(s=>!s.isLO).map(s=>({name:s.name, level:apsLevel(s.sept), mark:s.sept})).sort((a,b)=>b.level-a.level).slice(0,6);
  const sum = levels.reduce((a,c)=>a+c.level,0);
  return {preds, aps:sum, levels};
}

function drawAPSChart(m,j,s,p){
  const c=document.getElementById("apsChart"); const ctx=c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height);
  const vals=[m,j,s,p]; const labels=["Mar","Jun","Sep","AI Pred"];
  const max=Math.max(42, ...vals)+2, min=Math.min(0,...vals)-1;
  const pad=40; const w=c.width-pad*2, h=c.height-pad*2;
  // grid
  ctx.strokeStyle="#E8E2FF"; ctx.lineWidth=1;
  for(let i=0;i<=4;i++){ const y=pad+(h/4)*i; ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(pad+w,y); ctx.stroke(); ctx.fillStyle="#6B6A8A"; ctx.font="11px Inter"; ctx.fillText((max - (max-min)*(i/4)).toFixed(0), 5, y+3); }
  // line
  const pts=vals.map((v,i)=>({x:pad + (w/(vals.length-1))*i, y:pad + h - ((v-min)/(max-min))*h}));
  ctx.strokeStyle="#2D1B69"; ctx.lineWidth=3; ctx.beginPath(); pts.forEach((pt,i)=>{ if(i===0) ctx.moveTo(pt.x,pt.y); else ctx.lineTo(pt.x,pt.y); }); ctx.stroke();
  // points
  pts.forEach((pt,i)=>{ ctx.fillStyle=i===3?"#C73667":"#2D1B69"; ctx.beginPath(); ctx.arc(pt.x,pt.y,6,0,Math.PI*2); ctx.fill(); ctx.fillStyle="#fff"; ctx.font="bold 11px Inter"; ctx.fillText(vals[i], pt.x-6, pt.y-12); ctx.fillStyle="#1A1433"; ctx.font="11px Inter"; ctx.fillText(labels[i], pt.x-12, c.height-6); });
}

function drawSubjectChart(){
  const c=document.getElementById("subjectChart"); const ctx=c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height);
  const data=subjects.filter(s=>s.sept!=="").map(s=>({name:s.name, mark:parseInt(s.sept)||0}));
  if(data.length===0) return;
  const max=100; const padL=120, pad=20; const barH=22, gap=12; c.height=pad*2+data.length*(barH+gap);
  ctx.font="11px Inter";
  data.forEach((d,i)=>{
    const y=pad + i*(barH+gap); const w=(d.mark/max)*(c.width-padL-20);
    ctx.fillStyle=d.mark<40?"#FFE5E5":d.mark<60?"#FFF4D6":"#E6FFF3"; ctx.fillRect(padL, y, c.width-padL-20, barH);
    ctx.fillStyle=d.mark<40?"#E84545":d.mark<60?"#D99100":"#0FA37A"; ctx.fillRect(padL, y, w, barH);
    ctx.fillStyle="#1A1433"; ctx.fillText(d.name.slice(0,18), 6, y+14);
    ctx.fillStyle="#1A1433"; ctx.font="bold 11px JetBrains Mono"; ctx.fillText(d.mark+"%", padL+w+6, y+14); ctx.font="11px Inter";
  });
}

function renderCourses(septAPS){
  const septMap={}; subjects.forEach(s=>{ if(s.sept!=="") septMap[s.name]=parseInt(s.sept)||0; });
  // also map Mathematics alias
  if(septMap["Mathematics"]===undefined && septMap["Maths Literacy"]!==undefined) septMap["Mathematics"]=septMap["Maths Literacy"];

  const qualified=[], almost=[], not=[];
  COURSES.forEach(course=>{
    if(currentFilter!=="all" && course.cat!==currentFilter) return;
    if(septAPS < course.aps-3){ not.push({...course, reason:`APS ${septAPS} < ${course.aps}`}); return; }
    // check subject req
    let failReq=false; let reqDetails=[];
    for(const [subj, min] of Object.entries(course.req)){
      const have=septMap[subj] ?? septMap["Mathematics"] ?? 0; // fallback for Maths
      const actual = septMap[subj] !== undefined ? septMap[subj] : (subj==="Mathematics"? (septMap["Mathematics"]||0) : 0);
      // try to find subject
      let found=false; let mark=0;
      for(const [k,v] of Object.entries(septMap)){ if(k.includes(subj.split(" ")[0]) || subj.includes(k.split(" ")[0])){ if(v>=min) {found=true; mark=v; break;} else {mark=v;} } }
      // direct match
      if(septMap[subj]!==undefined){ found=septMap[subj]>=min; mark=septMap[subj]; }
      else if(subj==="Mathematics" && (septMap["Mathematics"]!==undefined || septMap["Maths Literacy"]!==undefined)){ const m=septMap["Mathematics"]??septMap["Maths Literacy"]; found=m>=min; mark=m; }
      else if(Object.keys(course.req).length===0){ found=true; }
      else { // if subject not taken, consider fail unless elective
        if(subj.includes("English") && septMap["English Home Language"]!==undefined){ found=septMap["English Home Language"]>=min; mark=septMap["English Home Language"]; }
        else found=false;
      }
      reqDetails.push({subj, min, mark, ok:found});
      if(!found) failReq=true;
    }
    if(Object.keys(course.req).length===0) reqDetails.push({subj:"No specific subject", min:0, mark:0, ok:true});
    const item={...course, reqDetails, septAPS};

    if(!failReq && septAPS>=course.aps) qualified.push(item);
    else if(septAPS>=course.aps-3 && !failReq) almost.push(item);
    else if(septAPS>=course.aps-2) almost.push(item);
    else not.push(item);
  });

  function cardHTML(c){
    const reqs=c.reqDetails.map(r=>`<span class="req-chip ${r.ok?'ok':'fail'}">${r.subj}: ${r.mark}% ${r.ok?'✓':'needs '+r.min+'%'}</span>`).join("");
    return `<div class="course"><h4>${c.course}</h4><div class="meta">${c.uni} • ${c.faculty} • Req APS ${c.aps} • Your APS ${c.septAPS}</div><div class="req">${reqs}</div></div>`;
  }

  document.getElementById("qualifiedList").innerHTML=qualified.map(cardHTML).join("")||"<p style='font-size:12px;color:#6B6A8A'>No courses yet - enter marks</p>";
  document.getElementById("almostList").innerHTML=almost.map(cardHTML).join("")||"<p style='font-size:12px;color:#6B6A8A'>Great progress potential</p>";
  document.getElementById("notList").innerHTML=not.map(cardHTML).join("")||"<p style='font-size:12px;color:#6B6A8A'>—</p>";
  document.getElementById("qCount").textContent=qualified.length;
  document.getElementById("aCount").textContent=almost.length;
  document.getElementById("nCount").textContent=not.length;
}

function calculate(){
  if(subjects.every(s=>s.sept==="")){ alert("Please enter at least September marks"); return; }
  const m=calcAPS("march").sum, j=calcAPS("june").sum, s=calcAPS("sept").sum;
  const pred=predictFinal();
  document.getElementById("marchAPS").textContent=m;
  document.getElementById("juneAPS").textContent=j;
  document.getElementById("septAPS").textContent=s;
  document.getElementById("predAPS").textContent=pred.aps;

  const trendText = s>m ? `You improved by ${s-m} APS points from March to September. Keep it up!` : s===m ? "Your APS stayed stable. Push for final exam boost!" : `APS dropped by ${m-s}. Focus on weak subjects.`;
  document.getElementById("trendInsight").textContent = `AI Insight: ${trendText} Predicted Final APS is ${pred.aps} based on linear trend model (Sept + 0.6 * avg improvement).`;

  document.getElementById("resultsSection").classList.remove("hidden");
  drawAPSChart(m,j,s,pred.aps);
  drawSubjectChart();

  // risk flags
  const flags=document.getElementById("riskFlags"); flags.innerHTML="";
  subjects.forEach(sub=>{ const mark=parseInt(sub.sept); if(sub.sept!=="" && mark<40){ const d=document.createElement("div"); d.className="flag flag-risk"; d.textContent=`⚠️ ${sub.name}: ${mark}% - At Risk (<40%)`; flags.appendChild(d); } });
  if(s>=35){ const d=document.createElement("div"); d.className="flag flag-ok"; d.textContent=`✅ APS ${s} - Bachelor's Degree Pass potential`; flags.appendChild(d); }
  else if(s>=25){ const d=document.createElement("div"); d.className="flag flag-ok"; d.textContent=`ℹ️ APS ${s} - Diploma Pass potential`; flags.appendChild(d); }

  renderCourses(s);
  document.getElementById("resultsSection").scrollIntoView({behavior:"smooth"});
}

function loadDemo(){
  document.getElementById("schoolName").value="Parktown Secondary School";
  document.getElementById("learnerName").value="Thabo Nkosi";
  document.getElementById("learnerClass").value="12B";
  const demo=[
    {m:58,j:62,s:68},{m:62,j:65,s:72},{m:45,j:52,s:61},{m:70,j:68,s:75},{m:55,j:58,s:64},{m:48,j:55,s:62},{m:60,j:63,s:70}
  ];
  subjects.forEach((sub,i)=>{ sub.march=demo[i]?.m||""; sub.june=demo[i]?.j||""; sub.sept=demo[i]?.s||""; });
  renderTable();
  calculate();
}

document.getElementById("calcBtn").addEventListener("click", calculate);
document.getElementById("loadDemoBtn").addEventListener("click", loadDemo);
document.getElementById("addSubjectBtn").addEventListener("click", ()=>{
  subjects.push({name:"Business Studies", isLO:false, march:"", june:"", sept:""});
  renderTable();
});
document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click", (e)=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    e.target.classList.add("active");
    currentFilter=e.target.dataset.f;
    const s=calcAPS("sept").sum;
    renderCourses(s);
  });
});

renderTable();
