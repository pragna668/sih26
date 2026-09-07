import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Role = "student" | "admin";
type RecordMap = { [key: string]: any };

const student = { name:"Irshad", roll:"CSE2024001", dept:"Computer Science & Engineering", year:"3rd Year", section:"CSE-A", cgpa:"8.2" };

const initialStudents = [
  {roll:"CSE2024001",name:"Irshad",dept:"CSE",year:"3rd Year",section:"CSE-A",attendance:86,cgpa:8.2},
  {roll:"CSE2024002",name:"Aarav Kumar",dept:"CSE",year:"3rd Year",section:"CSE-A",attendance:91,cgpa:8.7},
  {roll:"ECE2024010",name:"Meera Singh",dept:"ECE",year:"3rd Year",section:"ECE-A",attendance:79,cgpa:7.9},
  {roll:"EEE2024021",name:"Rohan Das",dept:"EEE",year:"2nd Year",section:"EEE-A",attendance:72,cgpa:7.1},
];

const initialAttendance = [
  {subject:"Data Structures",value:92,status:"Good"},
  {subject:"DBMS",value:84,status:"Good"},
  {subject:"Java",value:88,status:"Good"},
  {subject:"Operating Systems",value:76,status:"Warning"},
  {subject:"Computer Networks",value:81,status:"Good"},
  {subject:"Software Engineering",value:90,status:"Good"},
];

const initialAcademics = [
  {subject:"Data Structures",internal:82,exam:84,overall:83},
  {subject:"DBMS",internal:76,exam:74,overall:75},
  {subject:"Java",internal:88,exam:91,overall:90},
  {subject:"Operating Systems",internal:72,exam:70,overall:71},
  {subject:"Computer Networks",internal:79,exam:83,overall:81},
  {subject:"Software Engineering",internal:86,exam:88,overall:87},
];

const initialTimetable = [
  {day:"Monday",time:"09:00 AM",subject:"Data Structures",room:"A-204",faculty:"Dr. Priya"},
  {day:"Monday",time:"10:00 AM",subject:"Programming Lab",room:"CSE Lab 2",faculty:"Dr. Rahul"},
  {day:"Monday",time:"02:00 PM",subject:"DBMS",room:"A-301",faculty:"Dr. Meena"},
];

const initialExams = [
  {subject:"DBMS",date:"2026-09-08",time:"10:00 AM",room:"A-301",status:"Upcoming"},
  {subject:"Java",date:"2026-09-12",time:"10:00 AM",room:"A-204",status:"Upcoming"},
  {subject:"Operating Systems",date:"2026-09-15",time:"02:00 PM",room:"B-102",status:"Upcoming"},
];

const initialAnnouncements = [
  {title:"DBMS Exam Schedule Released",category:"Exams",date:"2026-09-06",body:"DBMS examination will be held on September 8."},
  {title:"Placement Drive: TCS",category:"Placements",date:"2026-09-06",body:"Eligible students can register before September 10."},
  {title:"Programming Lab Maintenance",category:"Campus",date:"2026-09-05",body:"CSE Lab 2 will be unavailable after 5 PM today."},
];

const studentNav=["Dashboard","AI Assistant","Academics","Attendance","Timetable","Exams","Announcements","Notifications","Campus","Placements","Faculty","Profile"];
const adminNav=["Command Center","Campus Intelligence","Students","Faculty","Attendance","Academics","Timetable","Exams","Announcements","Notifications","Labs","Rooms","Placements","Analytics","Settings"];
const icons:Record<string,string>={Dashboard:"⌂","Command Center":"⌂","AI Assistant":"✦",Academics:"▣",Attendance:"◔",Timetable:"◫",Exams:"▤",Announcements:"◉",Notifications:"●",Campus:"⌖",Placements:"◈",Faculty:"♙",Profile:"◎","Campus Intelligence":"✦",Students:"♙",Labs:"⚗",Rooms:"▦",Analytics:"◒",Settings:"⚙"};

function Badge({children,tone="blue"}:{children:React.ReactNode,tone?:string}){return <span className={`badge ${tone}`}>{children}</span>}
function Card({children,className=""}:{children:React.ReactNode,className?:string}){return <div className={`card ${className}`}>{children}</div>}
function Title({title,sub}:{title:string,sub:string}){return <div className="title"><div><div className="eyebrow">SMART CAMPUS</div><h1>{title}</h1><p>{sub}</p></div></div>}
function Stat({name,value,meta,symbol}:{name:string,value:string,meta:string,symbol:string}){return <Card className="stat"><div className="staticon">{symbol}</div><div><small>{name}</small><strong>{value}</strong><em>{meta}</em></div></Card>}

function Login({onLogin}:{onLogin:(r:Role)=>void}){
  const [choice,setChoice]=useState<"select"|Role>("select"),[id,setId]=useState(""),[password,setPassword]=useState(""),[error,setError]=useState("");
  if(choice==="select") return <div className="login"><div className="hero"><div className="hero-inner"><div className="brandmark">✦</div><Badge tone="glass">SMART CAMPUS PLATFORM</Badge><h1>One College.<br/><span>One Intelligent Platform.</span></h1><p>Connect academics, attendance, campus operations and AI-powered insights in one digital experience.</p><div className="hero-stats"><b>4,820+<small>Students</small></b><b>91%<small>Placement rate</small></b><b>24/7<small>Campus intelligence</small></b></div></div></div><div className="login-panel"><div className="brand"><div className="brandmark">✦</div><b>Smart College Assistant<small>Your Intelligent Digital Campus</small></b></div><div className="eyebrow">WELCOME BACK</div><h2>How would you like to sign in?</h2><p>Choose your portal to continue.</p><div className="login-options"><button onClick={()=>setChoice("student")}><div className="option-icon">🎓</div><span><b>Student Login</b><small>Access personal academic and campus information.</small></span><strong>→</strong></button><button onClick={()=>setChoice("admin")}><div className="option-icon purple">🏫</div><span><b>Admin Login</b><small>Monitor students, faculty and college operations.</small></span><strong>→</strong></button></div><small className="secure">✓ Role-based access · Hackathon prototype</small></div></div>;
  function submit(e:React.FormEvent){e.preventDefault();if(!id.trim()||!password.trim()){setError("Enter both fields to continue.");return;}onLogin(choice)}
  return <div className="auth"><form className="authbox" onSubmit={submit}><button type="button" className="back" onClick={()=>setChoice("select")}>← Back</button><div className="brandmark small">✦</div><Badge tone={choice==="student"?"blue":"purple"}>{choice==="student"?"STUDENT PORTAL":"ADMIN PORTAL"}</Badge><h1>{choice==="student"?"Student Login":"Admin Login"}</h1><p>Prototype mode: any non-empty ID and password are accepted.</p><label>{choice==="student"?"Student Roll Number":"Admin ID"}<input autoFocus value={id} onChange={e=>{setId(e.target.value);setError("")}} placeholder={choice==="student"?"CSE2024001":"ADMIN001"}/></label><label>Password<input type="password" value={password} onChange={e=>{setPassword(e.target.value);setError("")}} placeholder="Enter password"/></label>{error&&<div className="error">{error}</div>}<button type="submit" className="primary full">Login <span>→</span></button></form></div>
}

function Sidebar({role,page,setPage,logout}:any){const nav=role==="student"?studentNav:adminNav;return <aside><div className="sidebrand"><div className="brandmark">✦</div><div><b>Smart College</b><small>Intelligent Campus</small></div></div><div className="role">✓ {role==="student"?"Student Portal":"Admin Command Center"}</div><nav>{nav.map((x:string)=><button key={x} className={page===x?"active":""} onClick={()=>setPage(x)}><span className="navicon">{icons[x]||"•"}</span>{x}{x==="Notifications"&&<b className="navcount">4</b>}</button>)}</nav><div className="sidebottom"><span>● Live campus data</span><button onClick={logout}>↪ Sign out</button></div></aside>}
function Header({logout}:{logout:()=>void}){return <header><div className="mini"><div className="brandmark">✦</div> Smart College Assistant</div><div className="search"><span>⌕</span><input placeholder="Search students, rooms, labs..." /></div><span>●</span><button className="avatar" onClick={logout}>I</button></header>}

function Dashboard({go}:{go:(p:string)=>void}){
 return <><div className="welcome"><div><div className="eyebrow">STUDENT OVERVIEW · SEPTEMBER 6, 2026</div><h1>Good evening, {student.name} 👋</h1><p>Here's what's happening with your campus life today.</p></div><button className="primary" onClick={()=>go("AI Assistant")}>✦ Ask AI</button></div><div className="stats"><Stat name="Attendance" value="86%" meta="2% above target" symbol="◔"/><Stat name="CGPA" value="8.2" meta="+0.2 this semester" symbol="🎓"/><Stat name="Subjects" value="6" meta="All active" symbol="▣"/><Stat name="Upcoming Exams" value="3" meta="Next: DBMS" symbol="▤"/><Stat name="New Announcements" value="4" meta="2 important" symbol="●"/><Stat name="Placement Opportunities" value="8" meta="Matches available" symbol="◈"/></div><div className="twocol"><Card><div className="head"><div><h3>Today's Timetable</h3><p>Sunday · September 6</p></div><Badge tone="green">LIVE</Badge></div>{initialTimetable.map((x,i)=><div className="schedule" key={i}><time>{x.time}</time><div><b>{x.subject}</b><small>{x.room} · {x.faculty}</small></div><Badge tone={i===1?"green":"blue"}>{i===1?"LIVE":i===2?"NEXT":"DONE"}</Badge></div>)}</Card><Card><div className="head"><div><h3>Academic Snapshot</h3><p>Semester performance trend</p></div><Badge tone="green">Improving</Badge></div><div className="simple-chart">{[7.4,7.8,8.0,8.2].map((g,i)=><div className="chart-col" key={i}><div className="chart-bar" style={{height:`${Math.max(35,(g-7)*130)}px`}}><span>{g}</span></div><small>Sem {i+1}</small></div>)}</div></Card></div><div className="twocol"><Card><div className="head"><h3>Smart Alerts</h3><Badge>4 NEW</Badge></div><div className="alert"><span>⚠</span><span><b>DBMS exam in 2 days</b><small>Review Unit 3 before Tuesday.</small></span></div><div className="alert"><span>✓</span><span><b>Attendance is on track</b><small>You're above the 75% threshold.</small></span></div><div className="alert"><span>◈</span><span><b>8 placement matches found</b><small>TCS has a 94% match.</small></span></div></Card><Card className="insight"><Badge tone="purple">AI INSIGHT</Badge><h3>Your next best action</h3><p>DBMS is your lowest-scoring subject at 75%. A focused revision today could improve exam readiness.</p><button className="text" onClick={()=>go("AI Assistant")}>Open AI Coach →</button></Card></div></>
}

function Table({headers,rows}:{headers:string[],rows:any[][]}){return <div className="tablewrap"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j}>{j===0?<b>{v}</b>:v}</td>)}</tr>)}</tbody></table></div>}

function Academics({data,setData,admin=false}:{data:any[],setData?:any,admin?:boolean}){
 const [form,setForm]=useState({subject:"",internal:"",exam:""});
 const add=()=>{if(!form.subject||form.internal===""||form.exam==="")return;const internal=Number(form.internal),exam=Number(form.exam);setData?.([...data,{subject:form.subject,internal,exam,overall:Math.round((internal+exam)/2)}]);setForm({subject:"",internal:"",exam:""})};
 return <><Title title="Academics" sub={admin?"Manage marks and academic records. Changes are saved in this running prototype.":"Your academic performance, trends and subject-level progress."}/>{admin&&<InputPanel title="Add / Update Academic Record" fields={[["subject","Subject name"],["internal","Internal %"],["exam","Exam %"]]} values={form} setValues={setForm} onAdd={add} importRows={(rows:any[])=>setData?.([...data,...rows])}/>} {!admin&&<div className="stats three"><Stat name="Current GPA" value="8.2" meta="Semester 4" symbol="🎓"/><Stat name="Overall CGPA" value="8.2" meta="Top 18% of cohort" symbol="◒"/><Stat name="Assignments" value="92%" meta="Completion rate" symbol="✓"/></div>}<Card><div className="head"><h3>Subject Performance</h3><Badge tone="green">LIVE DATA</Badge></div><Table headers={["Subject","Internal","Exam","Overall","Status"]} rows={data.map(s=>[s.subject,s.internal+"%",s.exam+"%",s.overall+"%",s.overall>=85?"Strong":s.overall>=75?"Stable":"Needs attention"])}/></Card></>
}

function AttendancePage({data,setData,admin=false}:{data:any[],setData?:any,admin?:boolean}){
 const [form,setForm]=useState({subject:"",value:""});
 const add=()=>{if(!form.subject||form.value==="")return;const value=Math.max(0,Math.min(100,Number(form.value)));setData?.([...data,{subject:form.subject,value,status:value>=85?"Good":value>=75?"Warning":"Critical"}]);setForm({subject:"",value:""})};
 return <><Title title="Attendance" sub={admin?"Update live attendance for students/classes.":"Live subject-wise attendance synced from faculty updates."}/>{admin&&<InputPanel title="Update Attendance" fields={[["subject","Subject / Class"],["value","Attendance %"]]} values={form} setValues={setForm} onAdd={add} importRows={(rows:any[])=>setData?.([...data,...rows])}/>}<div className="attendance">{data.map((x:any)=><Card key={x.subject}><div className="att"><b>{x.subject}</b><strong>{x.value}%</strong></div><div className="bar"><i style={{width:`${x.value}%`}}/></div><div className="attfoot"><Badge tone={x.value>=85?"green":x.value>=75?"yellow":"red"}>{x.value>=85?"Good":x.value>=75?"Warning":"Critical"}</Badge><small>Live</small></div></Card>)}</div></>
}

function Timetable({data,setData,admin=false}:{data:any[],setData?:any,admin?:boolean}){
 const [form,setForm]=useState({day:"Monday",time:"",subject:"",room:"",faculty:""});
 const add=()=>{if(Object.values(form).some(v=>!v.trim()))return;setData?.([...data,form]);setForm({day:"Monday",time:"",subject:"",room:"",faculty:""})};
 return <><Title title="Timetable" sub={admin?"Create and manage class schedules, rooms and faculty.":"Your current and upcoming class schedule."}/>{admin&&<InputPanel title="Add Class Schedule" fields={[["day","Day"],["time","Time"],["subject","Subject"],["room","Room / Lab"],["faculty","Faculty"]]} values={form} setValues={setForm} onAdd={add} importRows={(rows:any[])=>setData?.([...data,...rows])}/>}<Card><Table headers={["Day","Time","Subject","Room","Faculty"]} rows={data.map(x=>[x.day,x.time,x.subject,x.room,x.faculty])}/></Card></>
}

function Exams({data,setData,admin=false}:{data:any[],setData?:any,admin?:boolean}){
 const [form,setForm]=useState({subject:"",date:"",time:"",room:""});
 const add=()=>{if(Object.values(form).some(v=>!v.trim()))return;setData?.([...data,{...form,status:"Upcoming"}]);setForm({subject:"",date:"",time:"",room:""})};
 return <><Title title="Exams" sub={admin?"Add and publish examination schedules.":"Your upcoming examination schedule."}/>{admin&&<InputPanel title="Create Exam" fields={[["subject","Subject"],["date","Date"],["time","Time"],["room","Room"]]} values={form} setValues={setForm} onAdd={add} importRows={(rows:any[])=>setData?.([...data,...rows])}/>}<Card><Table headers={["Subject","Date","Time","Room","Status"]} rows={data.map(x=>[x.subject,x.date,x.time,x.room,<Badge tone="blue">{x.status}</Badge>])}/></Card></>
}

function Announcements({data,setData,admin=false}:{data:any[],setData?:any,admin?:boolean}){
 const [form,setForm]=useState({title:"",category:"General",date:"2026-09-06",body:""});
 const add=()=>{if(!form.title||!form.body)return;setData?.([form,...data]);setForm({title:"",category:"General",date:"2026-09-06",body:""})};
 return <><Title title="Announcements" sub={admin?"Create, edit and publish targeted college announcements.":"Latest announcements from your college."}/>{admin&&<InputPanel title="Publish Announcement" fields={[["title","Title"],["category","Category"],["date","Publish date"],["body","Announcement details"]]} values={form} setValues={setForm} onAdd={add} button="Publish" importRows={(rows:any[])=>setData?.([...rows,...data])}/>}<div className="announcement-list">{data.map((x:any,i)=><Card key={i}><div className="annrow"><Badge>{x.category}</Badge><span><h3>{x.title}</h3><small>{x.date}</small><p>{x.body}</p></span>{i<4&&<Badge tone="green">NEW</Badge>}</div></Card>)}</div></>
}

function InputPanel({title,fields,values,setValues,onAdd,button="Add",importRows}:{title:string,fields:[string,string][],values:any,setValues:any,onAdd:()=>void,button?:string,importRows:(rows:any[])=>void}){
 function update(k:string,v:string){setValues((x:any)=>({...x,[k]:v}))}
 function importFile(e:React.ChangeEvent<HTMLInputElement>){
   const file=e.target.files?.[0]; if(!file)return;
   const reader=new FileReader();
   reader.onload=()=>{try{
     const raw=String(reader.result||""); let rows:any[]=[];
     if(file.name.toLowerCase().endsWith(".json")) rows=JSON.parse(raw);
     else {
       const lines=raw.split(/\r?\n/).filter(Boolean); if(lines.length<2)throw new Error("CSV needs a header row and at least one data row.");
       const headers=lines[0].split(",").map(x=>x.trim());
       rows=lines.slice(1).map(line=>{const vals=line.split(",").map(x=>x.trim());const obj:any={};headers.forEach((h,i)=>obj[h]=vals[i]??"");return obj});
     }
     if(!Array.isArray(rows))throw new Error("File must contain an array of records.");
     importRows(rows);
     alert(`Imported ${rows.length} record(s) successfully.`);
   }catch(err:any){alert("Import failed: "+(err?.message||"Check your CSV/JSON format."))}
   };
   reader.readAsText(file); e.target.value="";
 }
 return <Card className="input-panel"><div className="head"><div><h3>{title}</h3><p>Enter data manually or import a CSV/JSON file.</p></div><label className="upload">⇧ Import CSV/JSON<input type="file" accept=".csv,.json,text/csv,application/json" onChange={importFile}/></label></div><div className="formgrid">{fields.map(([k,label])=><label key={k}>{label}<input value={values[k]??""} onChange={e=>update(k,e.target.value)} placeholder={label}/></label>)}</div><button className="primary" onClick={onAdd}>{button} record <span>→</span></button><div className="importhint">CSV headers should match the fields shown above. JSON should be an array of objects.</div></Card>
}

function Students({data}:{data:any[]}){const [q,setQ]=useState("");const results=useMemo(()=>data.filter(s=>Object.values(s).some(v=>String(v).toLowerCase().includes(q.toLowerCase()))),[data,q]);return <><Title title="Student Management" sub="Search and monitor every student using roll number, name, department or year."/><Card><div className="adminsearch"><span>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setQ(e.currentTarget.value)} placeholder="Search Roll Number, name, department..." /><button className="primary" onClick={()=>setQ(q)}>Search</button></div><div className="searchstatus">{results.length} student{results.length!==1?"s":""} found</div>{results.map(s=><div className="studentresult" key={s.roll}><div className="resultavatar">{s.name[0]}</div><span><Badge tone={s.attendance>=75?"green":"red"}>{s.attendance>=75?"LOW RISK":"HIGH RISK"}</Badge><h3>{s.name} · {s.roll}</h3><small>{s.dept} · {s.year} · {s.section}</small></span><div className="resultstats"><b>{s.attendance}%<small>Attendance</small></b><b>{s.cgpa}<small>CGPA</small></b></div><button className="secondary" onClick={()=>alert(`${s.name}\\n${s.roll}\\nAttendance: ${s.attendance}%\\nCGPA: ${s.cgpa}`)}>View profile</button></div>)}</Card></>}

function DashboardAdmin({students}:{students:any[]}){return <><div className="welcome"><div><div className="eyebrow">ADMIN CONTROL · LIVE CAMPUS</div><h1>College Command Center</h1><p>One view of students, faculty, academics and campus operations.</p></div><Badge tone="green">● LIVE MONITORING</Badge></div><div className="stats"><Stat name="Students" value="4,820" meta="+124 this year" symbol="♙"/><Stat name="Faculty" value="286" meta="12 departments" symbol="🎓"/><Stat name="Departments" value="12" meta="48 labs" symbol="🏫"/><Stat name="Average Attendance" value="87%" meta="+2.4% this month" symbol="◔"/><Stat name="Placement Rate" value="91%" meta="386 placed" symbol="◈"/><Stat name="Live Notifications" value="24" meta="8 need attention" symbol="●"/></div><div className="twocol"><Card><div className="head"><h3>Live Attendance Monitor</h3><Badge tone="green">● LIVE</Badge></div>{students.slice(0,4).map((s,i)=><div className="monitor" key={s.roll}><span><b>{s.section}</b><small>{s.name} · {s.roll}</small></span><strong>{s.attendance}%</strong><small>{i+1}0 sec ago</small></div>)}</Card><Card><div className="head"><h3>Quick Actions</h3></div><div className="quickactions"><p>Use the Admin sidebar to enter and publish live data.</p><Badge tone="blue">Attendance</Badge><Badge tone="purple">Academics</Badge><Badge tone="green">Timetable</Badge><Badge>Exams</Badge><Badge>Announcements</Badge></div></Card></div></>}

function AI(){const [q,setQ]=useState("");const [messages,setMessages]=useState<any[]>([]);function ask(x:string){const a=/attendance/i.test(x)?"Your overall attendance is 86%. DBMS is 84% and Operating Systems is 76%.":/exam/i.test(x)?"Your next exam is DBMS on September 8 at 10:00 AM in Room A-301.":/placement|company/i.test(x)?"You currently match 8 companies. TCS is your strongest match at 94%.":"Your CGPA is 8.2 and attendance is 86%. Java is strongest at 90%; DBMS needs the most attention.";setMessages(v=>[...v,{u:x,a}]);setQ("")}return <><Title title="AI College Assistant" sub="Ask about your academics, attendance, exams and placements."/><Card className="chat"><div className="chathead"><div className="aiicon">✦</div><b>Campus AI<small>● Ready · Personal data only</small></b></div><div className="messages">{!messages.length&&<div className="empty"><div className="aiorb">✦</div><h2>How can I help, {student.name}?</h2></div>}{messages.map((m,i)=><React.Fragment key={i}><div className="bubble user">{m.u}</div><div className="bubble ai">{m.a}</div></React.Fragment>)}</div><div className="chips">{["How am I performing?","What is my attendance?","When is my next exam?","Which companies am I eligible for?"].map(x=><button key={x} onClick={()=>ask(x)}>{x}</button>)}</div><div className="chatinput"><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&q.trim()&&ask(q)} placeholder="Ask your campus assistant..."/><button onClick={()=>q.trim()&&ask(q)}>→</button></div></Card></>}

function Generic({title}:{title:string}){return <><Title title={title} sub="Manage live college operations with role-protected controls."/><Card><div className="empty"><div className="aiorb">⚙</div><h2>{title} workspace</h2><p>This module is ready for live database integration.</p><button className="primary">＋ Add record</button></div></Card></>}

function App(){
 const [role,setRole]=useState<Role|null>(null),[page,setPage]=useState("Dashboard");
 const [students,setStudents]=useState(initialStudents),[attendance,setAttendance]=useState(initialAttendance),[academics,setAcademics]=useState(initialAcademics),[timetable,setTimetable]=useState(initialTimetable),[exams,setExams]=useState(initialExams),[announcements,setAnnouncements]=useState(initialAnnouncements);
 if(!role)return <Login onLogin={r=>{setRole(r);setPage(r==="student"?"Dashboard":"Command Center")}}/>;
 const go=(p:string)=>setPage(p);
 let content:React.ReactNode;
 if(role==="student"){
  content=page==="Dashboard"?<Dashboard go={go}/>:page==="AI Assistant"?<AI/>:page==="Academics"?<Academics data={academics}/>:page==="Attendance"?<AttendancePage data={attendance}/>:page==="Timetable"?<Timetable data={timetable}/>:page==="Exams"?<Exams data={exams}/>:page==="Announcements"?<Announcements data={announcements}/>:<Generic title={page}/>;
 }else{
  content=page==="Command Center"?<DashboardAdmin students={students}/>:page==="Students"?<Students data={students}/>:page==="Attendance"?<AttendancePage data={attendance} setData={setAttendance} admin/>:page==="Academics"?<Academics data={academics} setData={setAcademics} admin/>:page==="Timetable"?<Timetable data={timetable} setData={setTimetable} admin/>:page==="Exams"?<Exams data={exams} setData={setExams} admin/>:page==="Announcements"?<Announcements data={announcements} setData={setAnnouncements} admin/>:page==="Campus Intelligence"?<Generic title="Campus Intelligence"/>:<Generic title={page}/>;
 }
 return <div className="app"><Sidebar role={role} page={page} setPage={setPage} logout={()=>setRole(null)}/><main><Header logout={()=>setRole(null)}/><section>{content}</section></main></div>
}

class ErrorBoundary extends React.Component<{children:React.ReactNode},{error:Error|null}>{state={error:null as Error|null};static getDerivedStateFromError(error:Error){return{error}};render(){if(this.state.error)return <div className="error-screen"><div className="error-card"><h1>Something went wrong</h1><p>{this.state.error.message}</p><button onClick={()=>location.reload()}>Reload application</button></div></div>;return this.props.children}}

createRoot(document.getElementById("root")!).render(<ErrorBoundary><App/></ErrorBoundary>);
