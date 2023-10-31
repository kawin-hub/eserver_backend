import{k as u,$ as D,A as Q,o as h,c as w,p as t,w as o,q as n,D as _,m as a,E as $,F as U,a as B,b as J,bk as K,x as f,C as R,H as Y,I as Z,bd as pe}from"./index.49ef7351.js";import{u as N,_ as ee}from"./AddNewLotDrawer.bf6d7758.js";import{a as te}from"./formatters.1ccc6423.js";import ae from"./DeleteButtonInList.bbad5bba.js";import{x as le}from"./xlsx.full.min.cef7e216.js";import{c as E,V as se}from"./VCard.489135da.js";import{V as G,a as P}from"./VRow.04ed429a.js";import{V as M}from"./VSelect.dd7a9d71.js";import{V as I}from"./VDivider.fa0f54cb.js";import{V as oe}from"./VSpacer.8c8e1470.js";import{V as ne}from"./VTextField.45867489.js";import{V as T}from"./VBtn.5345231d.js";import{V as ie}from"./VTable.1ed5b077.js";import{V as re}from"./VAvatar.89c4d356.js";import{V as ue}from"./VImg.33aacaa5.js";import{V as ce}from"./VChip.d8bf415a.js";import{V as de}from"./VPagination.fc089f6f.js";import{V as me,a as ve}from"./VTabs.0297fe0f.js";import{V as W,a as H}from"./VWindowItem.8776e1a5.js";import"./index.823c123d.js";import"./validators.e45b77e0.js";import"./index.0d4b9ec4.js";import"./LoadingDialog.6589c96a.js";import"./position.5856deb4.js";import"./router.7394f425.js";import"./VDialog.1ef42ac0.js";import"./scopeId.1cbcff4d.js";import"./forwardRefs.c003b6b8.js";import"./VOverlay.1858ab35.js";import"./lazy.ff556122.js";import"./easing.36b781ab.js";import"./dialog-transition.d8941cb2.js";import"./VForm.fa4c11f3.js";import"./VInput.1ff489a8.js";import"./index.a19f3361.js";import"./VTextarea.07a701c1.js";/* empty css                   */import"./VField.6fbd17fb.js";import"./VCounter.f0f43262.js";import"./VSnackbar.d1a2f967.js";import"./VNavigationDrawer.1947d485.js";import"./ssrBoot.3f4cfd1b.js";import"./DialogCloseBtn.65a007fa.js";import"./VList.3a0b4683.js";import"./VMenu.d92d4813.js";import"./VCheckboxBtn.cc3cfdf3.js";import"./VSelectionControl.7a61433f.js";import"./VSlideGroup.f767825e.js";const fe={class:"me-3",style:{width:"80px"}},_e={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},he={style:{width:"10rem"}},xe=a("thead",null,[a("tr",null,[a("th",{scope:"col"},"ID"),a("th",{scope:"col"},"Customer"),a("th",{scope:"col"},"Total / RECEIVED"),a("th",{scope:"col"},"ISSUED DATE"),a("th",{scope:"col"},"DUE DATE"),a("th",{scope:"col"},"ACTIONS")])],-1),Ve={class:"d-flex align-center"},ge={key:1},we={class:"d-flex flex-column"},be={class:"text-capitalize text-base"},De={class:"text-capitalize text-base font-weight-semibold"},ye={class:"text-base"},Se={class:"text-center",style:{width:"5rem"}},Ae=a("tr",null,[a("td",{colspan:"7",class:"text-center"},"No data available")],-1),ke=[Ae],Te={class:"text-sm text-disabled"},$e={__name:"index",props:{dataSummary:{type:Object}},setup(X){const y=N,x=u(),r=u(10),c=u(1),d=u(1),m=u(0),C=u("add"),V=u([]),v=u([]),b=u(""),z=u(),S=()=>{y.fetchData().then(l=>{V.value=l.data.inventoryLocations;let s=0;V.value.forEach(e=>{e.status=="active"&&s++}),V.value.length-s})},O=()=>{if(V.value===void 0)return 0;var l=y.filterData({q:b.value,status:x.value,perPage:r.value,currentPage:c.value},V.value);v.value=l.items,d.value=l.totalPage,m.value=l.totalItems};D(S),D(O),D(()=>{c.value>d.value&&(c.value=d.value)});const F=[{title:"Active",value:"active"},{title:"Inactive",value:"inactive"}],L=l=>l==="pending"?"warning":l==="active"?"success":l==="inactive"?"secondary":"primary",g=u(!1);D(()=>{c.value>d.value&&(c.value=d.value)});const j=Q(()=>{const l=v.value.length?(c.value-1)*r.value+1:0,s=v.value.length+(c.value-1)*r.value;return`Showing ${l} to ${s} of ${m.value} entries`}),q=()=>{let l=v.value.map(i=>({name:i.name,description:i.description,status:i.status,createdAt:i.createdAt,updatedAt:i.updatedAt}));const s=new Date().toISOString().slice(0,10),e=le,A=e.utils.book_new(),k=e.utils.json_to_sheet(l);e.utils.sheet_add_aoa(k,[["Name","Description","Status","Created at","Updated at"]],{origin:"A1"}),k["!cols"]=[{wch:l.reduce((i,p)=>Math.max(i,p.name.length),10)},{wch:l.reduce((i,p)=>Math.max(i,p.description.length),10)},{wch:l.reduce((i,p)=>Math.max(i,p.status.length),10)},{wch:l.reduce((i,p)=>Math.max(i,p.createdAt.length),10)},{wch:l.reduce((i,p)=>Math.max(i,p.updatedAt.length),10)}],e.utils.book_append_sheet(A,k),e.writeFile(A,"categories-("+s+").xlsx")};return(l,s)=>(h(),w(U,null,[t(se,{title:"Search Filter"},{default:o(()=>[t(E,null,{default:o(()=>[t(G,null,{default:o(()=>[t(P,{cols:"12",sm:"4"},{default:o(()=>[t(M,{modelValue:n(x),"onUpdate:modelValue":s[0]||(s[0]=e=>_(x)?x.value=e:null),label:"Select Status",items:F,clearable:"","clear-icon":"tabler-x"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),t(I),t(E,{class:"d-flex flex-wrap py-4 gap-4"},{default:o(()=>[a("div",fe,[t(M,{modelValue:n(r),"onUpdate:modelValue":s[1]||(s[1]=e=>_(r)?r.value=e:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),t(oe),a("div",_e,[a("div",he,[t(ne,{modelValue:n(b),"onUpdate:modelValue":s[2]||(s[2]=e=>_(b)?b.value=e:null),placeholder:"Search",density:"compact"},null,8,["modelValue"])]),t(T,{variant:"tonal",color:"secondary","prepend-icon":"tabler-screen-share",onClick:q},{default:o(()=>[$(" Export ")]),_:1}),t(T,{"prepend-icon":"tabler-plus",to:{name:"projects-sale-quotation"}},{default:o(()=>[$(" New quotation ")]),_:1})])]),_:1}),t(I),t(ie,{class:"text-no-wrap"},{default:o(()=>[xe,a("tbody",null,[(h(!0),w(U,null,B(n(v),e=>(h(),w("tr",{key:e._id,style:{height:"3.75rem"}},[a("td",null,[a("div",Ve,[t(re,{variant:"tonal",color:"primary",class:"me-3",size:"38"},{default:o(()=>[e.avatar?(h(),J(ue,{key:0,src:n(K).api.url+e.avatar},null,8,["src"])):(h(),w("span",ge,f(n(te)(e.name)),1))]),_:2},1024),a("div",we,[a("h6",be,f(e.name),1)])])]),a("td",null,[a("span",De,f(new Date(e.updatedAt).toString().split("GMT")[0]),1)]),a("td",null,[a("span",ye,f(new Date(e.createdAt).toString().split("GMT")[0]),1)]),a("td",null,[t(ce,{label:"",color:L(e.status),size:"small",class:"text-capitalize"},{default:o(()=>[$(f(e.status),1)]),_:2},1032,["color"])]),a("td",Se,[t(T,{icon:"",size:"x-small",color:"default",variant:"text"},{default:o(()=>[t(R,{size:"22",icon:"tabler-edit",onClick:A=>{g.value=!0,C.value="edit",z.value=e}},null,8,["onClick"])]),_:2},1024),t(T,{icon:"",size:"x-small",color:"default",variant:"text"},{default:o(()=>[t(ae,{title:"Delete inventory lot",data:e,"fetch-data":S,"use-list-store":n(N)},null,8,["data","use-list-store"])]),_:2},1024)])]))),128))]),Y(a("tfoot",null,ke,512),[[Z,!n(v).length]])]),_:1}),t(I),t(E,{class:"d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5"},{default:o(()=>[a("span",Te,f(n(j)),1),t(de,{modelValue:n(c),"onUpdate:modelValue":s[3]||(s[3]=e=>_(c)?c.value=e:null),size:"small","total-visible":5,length:n(d)},null,8,["modelValue","length"])]),_:1})]),_:1}),t(ee,{isDrawerOpen:n(g),"onUpdate:isDrawerOpen":s[4]||(s[4]=e=>_(g)?g.value=e:null),fetchData:S,drawerType:n(C),editData:n(z),isAddNewDrawerVisible:n(g)},null,8,["isDrawerOpen","drawerType","editData","isAddNewDrawerVisible"])],64))}},Ee={class:"me-3",style:{width:"80px"}},Ie={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},Ce={style:{width:"10rem"}},ze=a("thead",null,[a("tr",null,[a("th",{scope:"col"},"ID"),a("th",{scope:"col"},"Customer"),a("th",{scope:"col"},"Total / RECEIVED"),a("th",{scope:"col"},"ISSUED DATE"),a("th",{scope:"col"},"DUE DATE"),a("th",{scope:"col"},"ACTIONS")])],-1),Ue={class:"d-flex align-center"},Ne={key:1},Pe={class:"d-flex flex-column"},Me={class:"text-capitalize text-base"},Oe={class:"text-capitalize text-base font-weight-semibold"},Fe={class:"text-base"},Le={class:"text-center",style:{width:"5rem"}},je=a("tr",null,[a("td",{colspan:"7",class:"text-center"},"No data available")],-1),qe=[je],Be={class:"text-sm text-disabled"},Re={__name:"index",props:{dataSummary:{type:Object}},setup(X){const y=N,x=u(),r=u(10),c=u(1),d=u(1),m=u(0),C=u("add"),V=u([]),v=u([]),b=u(""),z=u(),S=()=>{y.fetchData().then(l=>{V.value=l.data.inventoryLocations;let s=0;V.value.forEach(e=>{e.status=="active"&&s++}),V.value.length-s})},O=()=>{if(V.value===void 0)return 0;var l=y.filterData({q:b.value,status:x.value,perPage:r.value,currentPage:c.value},V.value);v.value=l.items,d.value=l.totalPage,m.value=l.totalItems};D(S),D(O),D(()=>{c.value>d.value&&(c.value=d.value)});const F=[{title:"Active",value:"active"},{title:"Inactive",value:"inactive"}],L=l=>l==="pending"?"warning":l==="active"?"success":l==="inactive"?"secondary":"primary",g=u(!1);D(()=>{c.value>d.value&&(c.value=d.value)});const j=Q(()=>{const l=v.value.length?(c.value-1)*r.value+1:0,s=v.value.length+(c.value-1)*r.value;return`Showing ${l} to ${s} of ${m.value} entries`}),q=()=>{let l=v.value.map(i=>({name:i.name,description:i.description,status:i.status,createdAt:i.createdAt,updatedAt:i.updatedAt}));const s=new Date().toISOString().slice(0,10),e=le,A=e.utils.book_new(),k=e.utils.json_to_sheet(l);e.utils.sheet_add_aoa(k,[["Name","Description","Status","Created at","Updated at"]],{origin:"A1"}),k["!cols"]=[{wch:l.reduce((i,p)=>Math.max(i,p.name.length),10)},{wch:l.reduce((i,p)=>Math.max(i,p.description.length),10)},{wch:l.reduce((i,p)=>Math.max(i,p.status.length),10)},{wch:l.reduce((i,p)=>Math.max(i,p.createdAt.length),10)},{wch:l.reduce((i,p)=>Math.max(i,p.updatedAt.length),10)}],e.utils.book_append_sheet(A,k),e.writeFile(A,"categories-("+s+").xlsx")};return(l,s)=>(h(),w(U,null,[t(se,{title:"Search Filter"},{default:o(()=>[t(E,null,{default:o(()=>[t(G,null,{default:o(()=>[t(P,{cols:"12",sm:"4"},{default:o(()=>[t(M,{modelValue:n(x),"onUpdate:modelValue":s[0]||(s[0]=e=>_(x)?x.value=e:null),label:"Select Status",items:F,clearable:"","clear-icon":"tabler-x"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),t(I),t(E,{class:"d-flex flex-wrap py-4 gap-4"},{default:o(()=>[a("div",Ee,[t(M,{modelValue:n(r),"onUpdate:modelValue":s[1]||(s[1]=e=>_(r)?r.value=e:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),t(oe),a("div",Ie,[a("div",Ce,[t(ne,{modelValue:n(b),"onUpdate:modelValue":s[2]||(s[2]=e=>_(b)?b.value=e:null),placeholder:"Search",density:"compact"},null,8,["modelValue"])]),t(T,{variant:"tonal",color:"secondary","prepend-icon":"tabler-screen-share",onClick:q},{default:o(()=>[$(" Export ")]),_:1})])]),_:1}),t(I),t(ie,{class:"text-no-wrap"},{default:o(()=>[ze,a("tbody",null,[(h(!0),w(U,null,B(n(v),e=>(h(),w("tr",{key:e._id,style:{height:"3.75rem"}},[a("td",null,[a("div",Ue,[t(re,{variant:"tonal",color:"primary",class:"me-3",size:"38"},{default:o(()=>[e.avatar?(h(),J(ue,{key:0,src:n(K).api.url+e.avatar},null,8,["src"])):(h(),w("span",Ne,f(n(te)(e.name)),1))]),_:2},1024),a("div",Pe,[a("h6",Me,f(e.name),1)])])]),a("td",null,[a("span",Oe,f(new Date(e.updatedAt).toString().split("GMT")[0]),1)]),a("td",null,[a("span",Fe,f(new Date(e.createdAt).toString().split("GMT")[0]),1)]),a("td",null,[t(ce,{label:"",color:L(e.status),size:"small",class:"text-capitalize"},{default:o(()=>[$(f(e.status),1)]),_:2},1032,["color"])]),a("td",Le,[t(T,{icon:"",size:"x-small",color:"default",variant:"text"},{default:o(()=>[t(R,{size:"22",icon:"tabler-edit",onClick:A=>{g.value=!0,C.value="edit",z.value=e}},null,8,["onClick"])]),_:2},1024),t(T,{icon:"",size:"x-small",color:"default",variant:"text"},{default:o(()=>[t(ae,{title:"Delete inventory lot",data:e,"fetch-data":S,"use-list-store":n(N)},null,8,["data","use-list-store"])]),_:2},1024)])]))),128))]),Y(a("tfoot",null,qe,512),[[Z,!n(v).length]])]),_:1}),t(I),t(E,{class:"d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5"},{default:o(()=>[a("span",Be,f(n(j)),1),t(de,{modelValue:n(c),"onUpdate:modelValue":s[3]||(s[3]=e=>_(c)?c.value=e:null),size:"small","total-visible":5,length:n(d)},null,8,["modelValue","length"])]),_:1})]),_:1}),t(ee,{isDrawerOpen:n(g),"onUpdate:isDrawerOpen":s[4]||(s[4]=e=>_(g)?g.value=e:null),fetchData:S,drawerType:n(C),editData:n(z),isAddNewDrawerVisible:n(g)},null,8,["isDrawerOpen","drawerType","editData","isAddNewDrawerVisible"])],64))}};const Ft={__name:"[tab]",setup(X){const y=[{title:"Quotations",icon:"tabler-category",tab:"quotations"},{title:"Invoices",icon:"tabler-category",tab:"invoices"}],x=pe(),r=u(x.params.tab);return(c,d)=>(h(),w("section",null,[t(G,null,{default:o(()=>[t(P,{cols:"12"},{default:o(()=>[t(me,{modelValue:n(r),"onUpdate:modelValue":d[0]||(d[0]=m=>_(r)?r.value=m:null),class:"v-tabs-pill"},{default:o(()=>[(h(),w(U,null,B(y,m=>t(ve,{key:m.icon,value:m.tab,to:{name:"projects-sale-tab",params:{tab:m.tab}}},{default:o(()=>[t(R,{size:"20",start:"",icon:m.icon},null,8,["icon"]),$(" "+f(m.title),1)]),_:2},1032,["value","to"])),64))]),_:1},8,["modelValue"])]),_:1}),t(P,{cols:"12"},{default:o(()=>[t(W,{modelValue:n(r),"onUpdate:modelValue":d[1]||(d[1]=m=>_(r)?r.value=m:null),class:"disable-tab-transition",touch:!1},{default:o(()=>[t(H,{value:"quotations"},{default:o(()=>[t($e)]),_:1})]),_:1},8,["modelValue"]),t(W,{modelValue:n(r),"onUpdate:modelValue":d[2]||(d[2]=m=>_(r)?r.value=m:null),class:"disable-tab-transition",touch:!1},{default:o(()=>[t(H,{value:"invoices"},{default:o(()=>[t(Re)]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]))}};export{Ft as default};
