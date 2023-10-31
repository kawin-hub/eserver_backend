import{bd as S,k as C,Z as B,o as n,b as f,w as t,c as _,F as m,a as h,q as b,p as e,m as s,C as x,E as r,x as o,a1 as I,L as F,a3 as K,a4 as X,cT as Z,d2 as Q,d3 as Y,d4 as ee,d5 as te,y as E,D as G}from"./index.dc90d0c7.js";import{a as D,V as P}from"./VRow.a1d8e599.js";import{V as k,a as M,b as N,c as j}from"./VCard.ef7570db.js";import{V as w}from"./VBtn.5ca26f7c.js";import{V as T}from"./VMenu.b33cc928.js";import{V as $,a as g,b as y,c as W}from"./VList.b57c1041.js";import{V as A}from"./VDivider.09f7ba48.js";import{V as z}from"./VAvatar.6d3c69e8.js";import{V as H}from"./VChip.b4ad4a52.js";import{V as se,a as L}from"./VTimelineItem.3d298cd3.js";import{x as ae,p as le,s as oe}from"./xamarin.b5f42e99.js";import{V as ne}from"./VTable.b519be0a.js";import{V as q}from"./position.734f74ac.js";import{V as J}from"./VImg.3d76415f.js";import{V as ce}from"./VTooltip.7c5884ce.js";import{V as ie}from"./VSpacer.aeeabc4c.js";import{b as U}from"./route-block.6ee55eda.js";import{V as re,a as de}from"./VTabs.58b1a972.js";import{a as R,V as ue}from"./VWindowItem.f740b083.js";import"./router.9f5abff7.js";import"./forwardRefs.c003b6b8.js";import"./scopeId.51c205c4.js";import"./VOverlay.f4f2a002.js";import"./lazy.1f3570de.js";import"./easing.36b781ab.js";import"./dialog-transition.b4f36d59.js";import"./index.35436ddd.js";import"./VSlideGroup.f23fe18d.js";import"./ssrBoot.0ecfb30c.js";const _e={class:"vertical-more"},me={class:"mt-4 mb-0"},pe={class:"text-body-1"},fe={class:"d-flex align-center flex-wrap gap-2 mt-2"},he={class:"d-flex justify-space-around"},xe={class:"text-center"},be={class:"text-h6 font-weight-semibold"},ge=s("span",{class:"text-body-1"},"Projects",-1),ve={class:"text-center"},ye={class:"text-h6"},we=s("span",{class:"text-body-1"},"Tasks",-1),$e={class:"text-center"},Ve={class:"text-h6"},je=s("span",{class:"text-body-1"},"Connections",-1),ke={class:"d-flex justify-center gap-4 mt-5"},ze={__name:"index",setup(v){const c=S(),i=C([]);return B(c,()=>{c.params.tab==="connections"&&I.get("/pages/profile",{params:{tab:c.params.tab}}).then(a=>{i.value=a.data})},{immediate:!0}),(a,d)=>(n(),f(P,null,{default:t(()=>[(n(!0),_(m,null,h(b(i),l=>(n(),f(D,{key:l.name,sm:"6",lg:"4",cols:"12"},{default:t(()=>[e(k,null,{default:t(()=>[s("div",_e,[e(w,{icon:"",variant:"text",color:"default",size:"x-small"},{default:t(()=>[e(x,{size:"20  ",icon:"tabler-dots-vertical",class:"text-disabled"}),e(T,{activator:"parent"},{default:t(()=>[e($,{density:"compact"},{default:t(()=>[(n(),_(m,null,h(["Share connection","Block connection"],(u,V)=>e(g,{key:V,value:V},{default:t(()=>[e(y,null,{default:t(()=>[r(o(u),1)]),_:2},1024)]),_:2},1032,["value"])),64)),e(A,{class:"my-2"}),e(g,{title:"Delete",value:"Delete",class:"text-error"})]),_:1})]),_:1})]),_:1})]),e(M,null,{default:t(()=>[e(N,{class:"d-flex flex-column align-center justify-center"},{default:t(()=>[e(z,{size:"100",image:l.avatar},null,8,["image"]),s("p",me,o(l.name),1),s("span",pe,o(l.designation),1),s("div",fe,[(n(!0),_(m,null,h(l.chips,u=>(n(),f(H,{key:u.title,label:"",color:u.color,size:"small"},{default:t(()=>[r(o(u.title),1)]),_:2},1032,["color"]))),128))])]),_:2},1024)]),_:2},1024),e(j,null,{default:t(()=>[s("div",he,[s("div",xe,[s("h6",be,o(l.projects),1),ge]),s("div",ve,[s("h6",ye,o(l.tasks),1),we]),s("div",$e,[s("h6",Ve,o(l.connections),1),je])]),s("div",ke,[e(w,{"prepend-icon":l.isConnected?"tabler-user-check":"tabler-user-plus",variant:l.isConnected?"elevated":"tonal"},{default:t(()=>[r(" Connected ")]),_:2},1032,["prepend-icon","variant"]),e(w,{icon:"",variant:"tonal",color:"default",size:"small",class:"rounded"},{default:t(()=>[e(x,{size:"22",icon:"tabler-mail"})]),_:1})])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1}))}};const O=v=>(K("data-v-0ec62f33"),v=v(),X(),v),De=O(()=>s("p",{class:"text-xs"}," ABOUT ",-1)),Te={class:"font-weight-semibold me-1"},Ce=O(()=>s("p",{class:"text-xs mt-5"}," CONTACTS ",-1)),Pe={class:"font-weight-semibold me-1"},Ae=O(()=>s("p",{class:"text-xs mt-5"}," TEAMS ",-1)),Se={class:"font-weight-semibold me-1"},Ie=O(()=>s("p",{class:"text-xs"}," OVERVIEW ",-1)),Le={class:"font-weight-semibold me-1"},Re={__name:"About",props:{data:{type:null,required:!0}},setup(v){const c=v;return(i,p)=>(n(),_(m,null,[e(k,{class:"mb-4"},{default:t(()=>[e(j,null,{default:t(()=>[De,e($,{class:"card-list text-medium-emphasis"},{default:t(()=>[(n(!0),_(m,null,h(c.data.about,a=>(n(),f(g,{key:a.property},{prepend:t(()=>[e(x,{icon:a.icon,size:"20",class:"me-2"},null,8,["icon"])]),default:t(()=>[e(y,null,{default:t(()=>[s("span",Te,o(a.property)+":",1),s("span",null,o(a.value),1)]),_:2},1024)]),_:2},1024))),128))]),_:1}),Ce,e($,{class:"card-list text-medium-emphasis"},{default:t(()=>[(n(!0),_(m,null,h(c.data.contacts,a=>(n(),f(g,{key:a.property},{prepend:t(()=>[e(x,{icon:a.icon,size:"20",class:"me-2"},null,8,["icon"])]),default:t(()=>[e(y,null,{default:t(()=>[s("span",Pe,o(a.property)+":",1),s("span",null,o(a.value),1)]),_:2},1024)]),_:2},1024))),128))]),_:1}),Ae,e($,{class:"card-list text-medium-emphasis"},{default:t(()=>[(n(!0),_(m,null,h(c.data.teams,a=>(n(),f(g,{key:a.property},{prepend:t(()=>[e(x,{icon:a.icon,size:"20",color:a.color,class:"me-2"},null,8,["icon","color"])]),default:t(()=>[e(y,null,{default:t(()=>[s("span",Se,o(a.property)+":",1),s("span",null,o(a.value),1)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(j,null,{default:t(()=>[Ie,e($,{class:"card-list text-medium-emphasis"},{default:t(()=>[(n(!0),_(m,null,h(c.data.overview,a=>(n(),f(g,{key:a.property},{prepend:t(()=>[e(x,{icon:a.icon,size:"20",class:"me-2"},null,8,["icon"])]),default:t(()=>[e(y,null,{default:t(()=>[s("span",Le,o(a.property)+":",1),s("span",null,o(a.value),1)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})],64))}},Be=F(Re,[["__scopeId","data-v-0ec62f33"]]),Ee=s("div",{class:"d-flex justify-space-between align-center flex-wrap"},[s("h4",{class:"text-base font-weight-semibold me-1 mb-1"}," Client Meeting "),s("span",{class:"text-sm text-disabled text-no-wrap"},"Today")],-1),He=s("p",{class:"mb-2"}," Project meeting with john @10:15am ",-1),Oe={class:"d-flex align-center mt-3"},Fe=s("div",null,[s("h6",{class:"text-base font-weight-semibold"}," Lester McCarthy (Client) "),s("span",null," CEO of Infidel ")],-1),Me=s("div",{class:"d-flex justify-space-between align-center flex-wrap"},[s("h4",{class:"text-base font-weight-semibold me-1 mb-1"}," Create a new project for client \u{1F60E} "),s("span",{class:"text-sm text-disabled text-no-wrap"},"2 Day Ago")],-1),Ne=s("p",{class:"mb-1"}," Add files to new design folder ",-1),Ge=s("div",{class:"d-flex justify-space-between align-center flex-wrap"},[s("h4",{class:"text-base font-weight-semibold me-1 mb-1"}," Shared 2 New Project Files "),s("span",{class:"text-sm text-disabled text-no-wrap"},"6 Day Ago")],-1),Ue=s("p",{class:"mb-0"}," Sent by Mollie Dixon ",-1),We={class:"d-flex align-center mt-3"},qe=s("h6",{class:"font-weight-semibold text-sm me-3"}," App Guidelines ",-1),Je=s("h6",{class:"font-weight-semibold text-sm"}," Testing Results ",-1),Ke=s("div",{class:"d-flex justify-space-between align-center flex-wrap"},[s("h4",{class:"text-base font-weight-semibold me-1 mb-1"}," Project status updated "),s("span",{class:"text-sm text-disabled text-no-wrap"},"10 Day Ago")],-1),Xe=s("p",{class:"mb-1"}," WooCommerce iOS App Completed ",-1),Ze={__name:"ActivityTimeline",setup(v){return(c,i)=>(n(),f(k,null,{default:t(()=>[e(M,null,{prepend:t(()=>[e(x,{icon:"tabler-timeline"})]),append:t(()=>[s("div",null,[e(w,{icon:"",color:"default",variant:"text",size:"x-small"},{default:t(()=>[e(x,{size:"20",icon:"tabler-dots-vertical",class:"text-disabled"}),e(T,{activator:"parent"},{default:t(()=>[e($,{density:"compact"},{default:t(()=>[(n(),_(m,null,h(["Share timeline","Suggest edits0","Report bug"],(p,a)=>e(g,{key:a,value:a},{default:t(()=>[e(y,null,{default:t(()=>[r(o(p),1)]),_:2},1024)]),_:2},1032,["value"])),64))]),_:1})]),_:1})]),_:1})])]),default:t(()=>[e(N,null,{default:t(()=>[r("Activity Timeline")]),_:1})]),_:1}),e(j,null,{default:t(()=>[e(se,{density:"compact",align:"start","truncate-line":"both",class:"v-timeline-density-compact"},{default:t(()=>[e(L,{"dot-color":"warning",size:"x-small"},{default:t(()=>[Ee,He,s("div",Oe,[e(z,{size:"38",class:"me-3",image:b(Z)},null,8,["image"]),Fe])]),_:1}),e(L,{"dot-color":"primary",size:"x-small"},{default:t(()=>[Me,Ne]),_:1}),e(L,{"dot-color":"info",size:"x-small"},{default:t(()=>[Ge,Ue,s("div",We,[e(x,{color:"warning",icon:"tabler-file-text",size:"20",class:"me-2"}),qe,e(x,{color:"success",icon:"tabler-table",size:"20",class:"me-2"}),Je])]),_:1}),e(L,{"dot-color":"secondary",size:"x-small"},{default:t(()=>[Ke,Xe]),_:1})]),_:1})]),_:1})]),_:1}))}};const Qe={class:"me-n2"},Ye={__name:"Connection",props:{connectionsData:{type:Array,required:!0}},setup(v){const c=v;return(i,p)=>(n(),f(k,{title:"Connection"},{append:t(()=>[s("div",Qe,[e(w,{icon:"",variant:"text",color:"default",size:"x-small"},{default:t(()=>[e(x,{size:"20",icon:"tabler-dots-vertical",class:"text-disabled"}),e(T,{activator:"parent"},{default:t(()=>[e($,{density:"compact"},{default:t(()=>[(n(),_(m,null,h(["Share connections","Suggest edits","Report Bug"],(a,d)=>e(g,{key:d,value:d},{default:t(()=>[e(y,null,{default:t(()=>[r(o(a),1)]),_:2},1024)]),_:2},1032,["value"])),64))]),_:1})]),_:1})]),_:1})])]),default:t(()=>[e(j,null,{default:t(()=>[e($,{class:"card-list"},{default:t(()=>[(n(!0),_(m,null,h(c.connectionsData,a=>(n(),f(g,{key:a.name},{prepend:t(()=>[e(z,{size:"38",image:a.avatar},null,8,["image"])]),append:t(()=>[e(w,{icon:"",size:"30",class:"rounded",variant:a.isFriend?"elevated":"tonal"},{default:t(()=>[e(x,{size:"20",icon:a.isFriend?"tabler-user-x":"tabler-user-check"},null,8,["icon"])]),_:2},1032,["variant"])]),default:t(()=>[e(y,{class:"font-weight-medium"},{default:t(()=>[r(o(a.name),1)]),_:2},1024),e(W,null,{default:t(()=>[r(o(a.connections)+" Connections",1)]),_:2},1024)]),_:2},1024))),128)),e(g,null,{default:t(()=>[e(y,null,{default:t(()=>[e(w,{block:"",variant:"text"},{default:t(()=>[r(" View all connections ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}},et=F(Ye,[["__scopeId","data-v-6ba82612"]]),tt=s("thead",null,[s("tr",null,[s("th",{scope:"col"}," PROJECT "),s("th",{scope:"col"}," LEADER "),s("th",{scope:"col"}," PROGRESS "),s("th",{scope:"col"}," ACTION ")])],-1),st={class:"d-flex align-center"},at={class:"text-sm font-weight-medium"},lt={class:"text-xs text-medium-emphasis mb-0"},ot={style:{"min-width":"8rem"}},nt={class:"d-flex align-center gap-3"},ct={class:"text-medium-emphasis"},it={__name:"ProjectList",setup(v){const c=[{logo:Q,name:"BGC eCommerce App",project:"React Project",leader:"Eileen",progress:78,hours:"18:42"},{logo:Y,name:"Falcon Logo Design",project:"Figma Project",leader:"Owen",progress:25,hours:"20:42"},{logo:ee,name:"Dashboard Design",project:"Vuejs Project",leader:"Keith",progress:62,hours:"120:87"},{logo:ae,name:"Foodista mobile app",project:"Xamarin Project",leader:"Merline",progress:8,hours:"120:87"},{logo:le,name:"Dojo Email App",project:"Python Project",leader:"Harmonia",progress:51,hours:"230:10"},{logo:oe,name:"Blockchain Website",project:"Sketch Project",leader:"Allyson",progress:92,hours:"342:41"},{logo:te,name:"Hoffman Website",project:"HTML Project",leader:"Georgie",progress:80,hours:"12:45"}],i=p=>p<=25?"error":p>25&&p<=50?"warning":p>50&&p<=75?"primary":p>75&&p<=100?"success":"secondary";return(p,a)=>(n(),f(k,{title:"Project List"},{default:t(()=>[e(A),e(ne,{class:"text-no-wrap"},{default:t(()=>[tt,s("tbody",null,[(n(),_(m,null,h(c,d=>s("tr",{key:d.name},[s("td",st,[e(z,{size:34,class:"me-3",image:d.logo},null,8,["image"]),s("div",null,[s("h6",at,o(d.name),1),s("p",lt,o(d.project),1)])]),s("td",null,o(d.leader),1),s("td",ot,[s("div",nt,[e(q,{height:6,"model-value":d.progress,rounded:"",color:i(d.progress)},null,8,["model-value","color"]),s("span",null,o(d.progress)+"% ",1)])]),s("td",ct,[e(w,{icon:"",size:"small",variant:"text",color:"default"},{default:t(()=>[e(x,{size:"22",icon:"tabler-dots-vertical"}),e(T,{activator:"parent"},{default:t(()=>[e($,{density:"compact"},{default:t(()=>[(n(),_(m,null,h(["Download","Delete","View"],(l,u)=>e(g,{key:u,value:u},{default:t(()=>[e(y,null,{default:t(()=>[r(o(l),1)]),_:2},1024)]),_:2},1032,["value"])),64))]),_:1})]),_:1})]),_:1})])])),64))])]),_:1})]),_:1}))}};const rt={class:"me-n2"},dt={__name:"Teams",props:{teamsData:{type:Array,required:!0}},setup(v){const c=v;return(i,p)=>(n(),f(k,{title:"Teams"},{append:t(()=>[s("div",rt,[e(w,{icon:"",variant:"text",color:"default",size:"x-small"},{default:t(()=>[e(x,{size:"20",icon:"tabler-dots-vertical",class:"text-disabled"}),e(T,{activator:"parent"},{default:t(()=>[e($,{density:"compact"},{default:t(()=>[(n(),_(m,null,h(["Share connections","Suggest edits","Report Bug"],(a,d)=>e(g,{key:d,value:d},{default:t(()=>[e(y,null,{default:t(()=>[r(o(a),1)]),_:2},1024)]),_:2},1032,["value"])),64))]),_:1})]),_:1})]),_:1})])]),default:t(()=>[e(j,null,{default:t(()=>[e($,{class:"card-list"},{default:t(()=>[(n(!0),_(m,null,h(c.teamsData,a=>(n(),f(g,{key:a.title},{prepend:t(()=>[e(z,{size:"38",image:a.avatar},null,8,["image"])]),append:t(()=>[e(H,{label:"",color:a.ChipColor,size:"small",class:"font-weight-medium"},{default:t(()=>[r(o(a.chipText),1)]),_:2},1032,["color"])]),default:t(()=>[e(y,{class:"font-weight-medium"},{default:t(()=>[r(o(a.title),1)]),_:2},1024),e(W,null,{default:t(()=>[r(o(a.members)+" Members",1)]),_:2},1024)]),_:2},1024))),128)),e(g,null,{default:t(()=>[e(y,null,{default:t(()=>[e(w,{block:"",variant:"text"},{default:t(()=>[r(" View all teams ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}},ut=F(dt,[["__scopeId","data-v-2226d63e"]]),_t={__name:"index",setup(v){const c=S(),i=C();return B(c,()=>{c.params.tab==="profile"&&I.get("/pages/profile",{params:{tab:c.params.tab}}).then(a=>{i.value=a.data})},{immediate:!0}),(a,d)=>b(i)?(n(),f(P,{key:0},{default:t(()=>[e(D,{md:"4",cols:"12"},{default:t(()=>[e(Be,{data:b(i)},null,8,["data"])]),_:1}),e(D,{cols:"12",md:"8"},{default:t(()=>[e(P,null,{default:t(()=>[e(D,{cols:"12"},{default:t(()=>[e(Ze)]),_:1}),e(D,{cols:"12",md:"6"},{default:t(()=>[e(et,{"connections-data":b(i).connections},null,8,["connections-data"])]),_:1}),e(D,{cols:"12",md:"6"},{default:t(()=>[e(ut,{"teams-data":b(i).teamsTech},null,8,["teams-data"])]),_:1}),e(D,{cols:"12"},{default:t(()=>[e(it)]),_:1})]),_:1})]),_:1})]),_:1})):E("",!0)}},mt=s("p",{class:"mb-0"},[s("span",{class:"font-weight-medium me-1"},"Client:"),s("span",null,"Christian Jimenez")],-1),pt={class:"mt-n8 me-n3"},ft={class:"d-flex align-center justify-space-between flex-wrap gap-x-2 gap-y-4"},ht={class:"pa-2 bg-light-secondary rounded"},xt={class:"text-base font-weight-medium"},bt={class:"text-body-1"},gt=s("span",null,"Total Budget",-1),vt={class:"text-base font-weight-medium"},yt={class:"text-body-1"},wt={class:"text-base font-weight-medium mb-1"},$t={class:"text-body-1"},Vt={class:"mt-4 mb-0"},jt={class:"d-flex align-center justify-space-between flex-wrap gap-2"},kt={class:"text-base font-weight-semibold"},zt={class:"text-body-1"},Dt={class:"d-flex align-center justify-space-between flex-wrap text-sm mt-4 mb-2"},Tt=s("span",null,"95% Completed",-1),Ct={class:"d-flex align-center justify-space-between flex-wrap gap-2 mt-3"},Pt={class:"d-flex align-center"},At={class:"v-avatar-group me-2"},St=s("span",{class:"text-xs"}," 280 members ",-1),It={__name:"index",setup(v){const c=S(),i=C([]);return B(c,()=>{c.params.tab==="projects"&&I.get("/pages/profile",{params:{tab:c.params.tab}}).then(a=>{i.value=a.data})},{immediate:!0}),(a,d)=>b(i)?(n(),f(P,{key:0},{default:t(()=>[(n(!0),_(m,null,h(b(i),l=>(n(),f(D,{key:l.title,cols:"12",sm:"6",lg:"4"},{default:t(()=>[e(k,null,{default:t(()=>[e(M,null,{prepend:t(()=>[e(z,{image:l.avatar},null,8,["image"])]),append:t(()=>[s("div",pt,[e(w,{icon:"",variant:"text",color:"default",size:"x-small"},{default:t(()=>[e(x,{size:"20",icon:"tabler-dots-vertical",class:"text-disabled"}),e(T,{activator:"parent"},{default:t(()=>[e($,{density:"compact"},{default:t(()=>[(n(),_(m,null,h(["Rename Project","View Details","Add to favorites"],(u,V)=>e(g,{key:V,value:V},{default:t(()=>[e(y,null,{default:t(()=>[r(o(u),1)]),_:2},1024)]),_:2},1032,["value"])),64)),e(A,{class:"my-2"}),e(g,{title:"Leave Project",value:"Leave Project",class:"text-error"})]),_:1})]),_:1})]),_:1})])]),default:t(()=>[e(N,null,{default:t(()=>[r("Social Banners")]),_:1}),mt]),_:2},1024),e(j,null,{default:t(()=>[s("div",ft,[s("div",ht,[s("h6",xt,[r(o(l.budgetSpent)+" ",1),s("span",bt,"/ "+o(l.budget),1)]),gt]),s("div",null,[s("h6",vt,[r(" Start Date: "),s("span",yt,o(l.startDate),1)]),s("h6",wt,[r(" Deadline: "),s("span",$t,o(l.deadline),1)])])]),s("p",Vt,o(l.description),1)]),_:2},1024),e(A),e(j,null,{default:t(()=>[s("div",jt,[s("h6",kt,[r(" All Hours: "),s("span",zt,o(l.hours),1)]),e(H,{label:"",color:l.chipColor,size:"small"},{default:t(()=>[r(o(l.daysLeft)+" Days left ",1)]),_:2},1032,["color"])]),s("div",Dt,[s("span",null,"Task: "+o(l.tasks),1),Tt]),e(q,{rounded:"","rounded-bar":"",height:"8","model-value":l.completedTask,max:l.totalTask,color:"primary"},null,8,["model-value","max"]),s("div",Ct,[s("div",Pt,[s("div",At,[(n(!0),_(m,null,h(l.avatarGroup,u=>(n(),f(z,{key:u.name,image:u.avatar,size:32},null,8,["image"]))),128))]),St]),s("span",null,[e(x,{icon:"tabler-message-dots",class:"me-1"}),s("span",null,o(l.comments),1)])])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})):E("",!0)}},Lt={class:"me-n3"},Rt={class:"text-base"},Bt={class:"v-avatar-group"},Et={class:"d-flex align-center gap-2"},Ht={__name:"index",setup(v){const c=S(),i=C([]);return B(c,()=>{c.params.tab==="teams"&&I.get("/pages/profile",{params:{tab:c.params.tab}}).then(a=>{i.value=a.data})},{immediate:!0}),(a,d)=>b(i)?(n(),f(P,{key:0},{default:t(()=>[(n(!0),_(m,null,h(b(i),l=>(n(),f(D,{key:l.title,cols:"12",md:"6",lg:"4"},{default:t(()=>[e(k,{title:l.title},{prepend:t(()=>[e(z,{size:"38",image:l==null?void 0:l.avatar},null,8,["image"])]),append:t(()=>[s("div",Lt,[e(w,{icon:"",variant:"text",color:"default",size:"x-small"},{default:t(()=>[e(x,{size:"20",icon:"tabler-star",class:"text-disabled"})]),_:1}),e(w,{icon:"",variant:"text",color:"default",size:"x-small"},{default:t(()=>[e(x,{size:"20",icon:"tabler-dots-vertical",class:"text-disabled"}),e(T,{activator:"parent"},{default:t(()=>[e($,{density:"compact"},{default:t(()=>[(n(),_(m,null,h(["Rename Team","View Details","Add to favorites"],(u,V)=>e(g,{key:V,value:V},{default:t(()=>[e(y,null,{default:t(()=>[r(o(u),1)]),_:2},1024)]),_:2},1032,["value"])),64)),e(A,{class:"my-2"}),e(g,{title:"Delete Team",value:"Delete Team",class:"text-error"})]),_:1})]),_:1})]),_:1})])]),default:t(()=>[e(j,null,{default:t(()=>[s("span",Rt,o(l.description),1)]),_:2},1024),e(j,{class:"d-flex align-center"},{default:t(()=>[s("div",Bt,[(n(!0),_(m,null,h(l.avatarGroup,u=>(n(),f(z,{key:u.name,size:"32"},{default:t(()=>[e(J,{src:u.avatar},null,8,["src"]),e(ce,{activator:"parent",location:"top"},{default:t(()=>[r(o(u.name),1)]),_:2},1024)]),_:2},1024))),128))]),e(ie),s("div",Et,[(n(!0),_(m,null,h(l.chips,u=>(n(),f(H,{key:u.title,label:"",color:u.color,size:"small",class:"font-weight-medium"},{default:t(()=>[r(o(u.title),1)]),_:2},1032,["color"]))),128))])]),_:2},1024)]),_:2},1032,["title"])]),_:2},1024))),128))]),_:1})):E("",!0)}};const Ot={class:"d-flex h-0"},Ft={class:"user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0"},Mt={class:"text-h6 text-center text-sm-start font-weight-semibold mb-3"},Nt={class:"d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4"},Gt={class:"d-flex flex-wrap justify-center justify-sm-start flex-grow-1 gap-2"},Ut={class:"d-flex"},Wt={class:"text-body-1"},qt={class:"d-flex align-center"},Jt={class:"text-body-1"},Kt={class:"d-flex align-center"},Xt={class:"text-body-1"},Zt={__name:"UserProfileHeader",setup(v){const c=C();return(()=>{I.get("/pages/profile-header").then(p=>{c.value=p.data})})(),(p,a)=>b(c)?(n(),f(k,{key:0},{default:t(()=>[e(J,{src:b(c).coverImg},null,8,["src"]),e(j,{class:"d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5"},{default:t(()=>{var d,l,u,V;return[s("div",Ot,[e(z,{rounded:"",size:"120",image:b(c).profileImg,class:"user-profile-avatar mx-auto"},null,8,["image"])]),s("div",Ft,[s("h6",Mt,o((d=b(c))==null?void 0:d.fullName),1),s("div",Nt,[s("div",Gt,[s("span",Ut,[e(x,{size:"20",icon:"tabler-color-swatch",class:"me-1"}),s("span",Wt,o((l=b(c))==null?void 0:l.designation),1)]),s("span",qt,[e(x,{size:"20",icon:"tabler-map-pin",class:"me-2"}),s("span",Jt,o((u=b(c))==null?void 0:u.location),1)]),s("span",Kt,[e(x,{size:"20",icon:"tabler-calendar",class:"me-2"}),s("span",Xt,o((V=b(c))==null?void 0:V.joiningDate),1)])]),e(w,{"prepend-icon":"tabler-check"},{default:t(()=>[r(" Connected ")]),_:1})])])]}),_:1})]),_:1})):E("",!0)}},Qt={__name:"[tab]",setup(v){const c=S(),i=C(c.params.tab),p=[{title:"Profile",icon:"tabler-user-check",tab:"profile"},{title:"Team",icon:"tabler-users",tab:"teams"},{title:"Projects",icon:"tabler-layout-grid",tab:"projects"},{title:"Connections",icon:"tabler-link",tab:"connections"}];return(a,d)=>(n(),_("div",null,[e(Zt,{class:"mb-5"}),e(re,{modelValue:b(i),"onUpdate:modelValue":d[0]||(d[0]=l=>G(i)?i.value=l:null),class:"v-tabs-pill"},{default:t(()=>[(n(),_(m,null,h(p,l=>e(de,{key:l.icon,value:l.tab,to:{name:"pages-user-profile-tab",params:{tab:l.tab}}},{default:t(()=>[e(x,{size:"20",start:"",icon:l.icon},null,8,["icon"]),r(" "+o(l.title),1)]),_:2},1032,["value","to"])),64))]),_:1},8,["modelValue"]),e(ue,{modelValue:b(i),"onUpdate:modelValue":d[1]||(d[1]=l=>G(i)?i.value=l:null),class:"mt-5 disable-tab-transition",touch:!1},{default:t(()=>[e(R,{value:"profile"},{default:t(()=>[e(_t)]),_:1}),e(R,{value:"teams"},{default:t(()=>[e(Ht)]),_:1}),e(R,{value:"projects"},{default:t(()=>[e(It)]),_:1}),e(R,{value:"connections"},{default:t(()=>[e(ze)]),_:1})]),_:1},8,["modelValue"])]))}};typeof U=="function"&&U(Qt);export{Qt as default};
