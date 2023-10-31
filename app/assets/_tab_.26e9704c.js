import{k as c,$ as D,A as J,o as _,c as b,p as t,w as l,q as r,D as v,m as a,E as A,F as U,a as R,b as K,bk as Q,x as f,C as B,H as Y,I as Z,bd as tt}from"./index.dc90d0c7.js";import{u as P,_ as et}from"./AddNewLotDrawer.c44b7b97.js";import{a as at}from"./formatters.1ccc6423.js";import lt from"./DeleteButtonInList.33aae4fe.js";import{x as ot}from"./xlsx.full.min.98caecf6.js";import{c as I,V as st}from"./VCard.ef7570db.js";import{V as F,a as z}from"./VRow.a1d8e599.js";import{V as L}from"./VSelect.a1d5e943.js";import{V as N}from"./VDivider.09f7ba48.js";import{V as rt}from"./VSpacer.aeeabc4c.js";import{V as it}from"./VTextField.43a06b61.js";import{V as S}from"./VBtn.5ca26f7c.js";import{V as nt}from"./VTable.b519be0a.js";import{V as ut}from"./VAvatar.6d3c69e8.js";import{V as dt}from"./VImg.3d76415f.js";import{V as ct}from"./VChip.b4ad4a52.js";import{V as pt}from"./VPagination.51e71dc0.js";import{V as mt,a as vt}from"./VTabs.58b1a972.js";import{V as M,a as O}from"./VWindowItem.f740b083.js";import"./index.cb840b2e.js";import"./validators.e45b77e0.js";import"./index.0d4b9ec4.js";import"./LoadingDialog.7ea8ccb7.js";import"./position.734f74ac.js";import"./router.9f5abff7.js";import"./VDialog.e968e9e0.js";import"./scopeId.51c205c4.js";import"./forwardRefs.c003b6b8.js";import"./VOverlay.f4f2a002.js";import"./lazy.1f3570de.js";import"./easing.36b781ab.js";import"./dialog-transition.b4f36d59.js";import"./VForm.2d60ea09.js";import"./VInput.3420ac64.js";import"./index.35436ddd.js";import"./VTextarea.86d845be.js";/* empty css                   */import"./VField.1bfe0f1f.js";import"./VCounter.07f4b2d1.js";import"./VSnackbar.e0f85ae8.js";import"./VNavigationDrawer.3d1350c1.js";import"./ssrBoot.0ecfb30c.js";import"./DialogCloseBtn.f0270141.js";import"./VList.b57c1041.js";import"./VMenu.b33cc928.js";import"./VCheckboxBtn.732d4006.js";import"./VSelectionControl.64caeaf6.js";import"./VSlideGroup.f23fe18d.js";const ft={class:"me-3",style:{width:"80px"}},_t={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},Vt={style:{width:"10rem"}},ht=a("thead",null,[a("tr",null,[a("th",{scope:"col"},"LOT NUMBER"),a("th",{scope:"col"},"CREATED AT"),a("th",{scope:"col"},"ORDERED / RECEIVED"),a("th",{scope:"col"},"STATUS"),a("th",{scope:"col"},"ACTION")])],-1),xt={class:"d-flex align-center"},bt={key:1},gt={class:"d-flex flex-column"},wt={class:"text-capitalize text-base"},yt={class:"text-capitalize text-base font-weight-semibold"},Dt={class:"text-base"},St={class:"text-center",style:{width:"5rem"}},At=a("tr",null,[a("td",{colspan:"7",class:"text-center"},"No data available")],-1),Tt=[At],kt={class:"text-sm text-disabled"},Et={__name:"index",props:{dataSummary:{type:Object}},setup(j){const w=P,V=c(),i=c(10),p=c(1),d=c(1),u=c(0),T=c("add"),g=c([]),h=c([]),y=c(""),$=c(),k=()=>{w.fetchData().then(o=>{g.value=o.data.inventoryLocations;let s=0;g.value.forEach(e=>{e.status=="active"&&s++}),g.value.length-s})},q=()=>{if(g.value===void 0)return 0;var o=w.filterData({q:y.value,status:V.value,perPage:i.value,currentPage:p.value},g.value);h.value=o.items,d.value=o.totalPage,u.value=o.totalItems};D(k),D(q),D(()=>{p.value>d.value&&(p.value=d.value)});const G=[{title:"Active",value:"active"},{title:"Inactive",value:"inactive"}],W=o=>o==="pending"?"warning":o==="active"?"success":o==="inactive"?"secondary":"primary",x=c(!1);D(()=>{p.value>d.value&&(p.value=d.value)});const X=J(()=>{const o=h.value.length?(p.value-1)*i.value+1:0,s=h.value.length+(p.value-1)*i.value;return`Showing ${o} to ${s} of ${u.value} entries`}),H=()=>{let o=h.value.map(n=>({name:n.name,description:n.description,status:n.status,createdAt:n.createdAt,updatedAt:n.updatedAt}));const s=new Date().toISOString().slice(0,10),e=ot,E=e.utils.book_new(),C=e.utils.json_to_sheet(o);e.utils.sheet_add_aoa(C,[["Name","Description","Status","Created at","Updated at"]],{origin:"A1"}),C["!cols"]=[{wch:o.reduce((n,m)=>Math.max(n,m.name.length),10)},{wch:o.reduce((n,m)=>Math.max(n,m.description.length),10)},{wch:o.reduce((n,m)=>Math.max(n,m.status.length),10)},{wch:o.reduce((n,m)=>Math.max(n,m.createdAt.length),10)},{wch:o.reduce((n,m)=>Math.max(n,m.updatedAt.length),10)}],e.utils.book_append_sheet(E,C),e.writeFile(E,"categories-("+s+").xlsx")};return(o,s)=>(_(),b(U,null,[t(st,{title:"Search Filter"},{default:l(()=>[t(I,null,{default:l(()=>[t(F,null,{default:l(()=>[t(z,{cols:"12",sm:"4"},{default:l(()=>[t(L,{modelValue:r(V),"onUpdate:modelValue":s[0]||(s[0]=e=>v(V)?V.value=e:null),label:"Select Status",items:G,clearable:"","clear-icon":"tabler-x"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),t(N),t(I,{class:"d-flex flex-wrap py-4 gap-4"},{default:l(()=>[a("div",ft,[t(L,{modelValue:r(i),"onUpdate:modelValue":s[1]||(s[1]=e=>v(i)?i.value=e:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),t(rt),a("div",_t,[a("div",Vt,[t(it,{modelValue:r(y),"onUpdate:modelValue":s[2]||(s[2]=e=>v(y)?y.value=e:null),placeholder:"Search",density:"compact"},null,8,["modelValue"])]),t(S,{variant:"tonal",color:"secondary","prepend-icon":"tabler-screen-share",onClick:H},{default:l(()=>[A(" Export ")]),_:1}),t(S,{"prepend-icon":"tabler-plus",onClick:s[3]||(s[3]=e=>{x.value=!0,T.value="add"})},{default:l(()=>[A(" Add Lot ")]),_:1})])]),_:1}),t(N),t(nt,{class:"text-no-wrap"},{default:l(()=>[ht,a("tbody",null,[(_(!0),b(U,null,R(r(h),e=>(_(),b("tr",{key:e._id,style:{height:"3.75rem"}},[a("td",null,[a("div",xt,[t(ut,{variant:"tonal",color:"primary",class:"me-3",size:"38"},{default:l(()=>[e.avatar?(_(),K(dt,{key:0,src:r(Q).api.url+e.avatar},null,8,["src"])):(_(),b("span",bt,f(r(at)(e.name)),1))]),_:2},1024),a("div",gt,[a("h6",wt,f(e.name),1)])])]),a("td",null,[a("span",yt,f(new Date(e.updatedAt).toString().split("GMT")[0]),1)]),a("td",null,[a("span",Dt,f(new Date(e.createdAt).toString().split("GMT")[0]),1)]),a("td",null,[t(ct,{label:"",color:W(e.status),size:"small",class:"text-capitalize"},{default:l(()=>[A(f(e.status),1)]),_:2},1032,["color"])]),a("td",St,[t(S,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(B,{size:"22",icon:"tabler-edit",onClick:E=>{x.value=!0,T.value="edit",$.value=e}},null,8,["onClick"])]),_:2},1024),t(S,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(lt,{title:"Delete inventory lot",data:e,"fetch-data":k,"use-list-store":r(P)},null,8,["data","use-list-store"])]),_:2},1024)])]))),128))]),Y(a("tfoot",null,Tt,512),[[Z,!r(h).length]])]),_:1}),t(N),t(I,{class:"d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5"},{default:l(()=>[a("span",kt,f(r(X)),1),t(pt,{modelValue:r(p),"onUpdate:modelValue":s[4]||(s[4]=e=>v(p)?p.value=e:null),size:"small","total-visible":5,length:r(d)},null,8,["modelValue","length"])]),_:1})]),_:1}),t(et,{isDrawerOpen:r(x),"onUpdate:isDrawerOpen":s[5]||(s[5]=e=>v(x)?x.value=e:null),fetchData:k,drawerType:r(T),editData:r($),isAddNewDrawerVisible:r(x)},null,8,["isDrawerOpen","drawerType","editData","isAddNewDrawerVisible"])],64))}};const Ct=a("div",null,"Inventory",-1),Se={__name:"[tab]",setup(j){const w=[{title:"Inventory",icon:"tabler-category",tab:"inventories"},{title:"Product lots",icon:"tabler-category",tab:"lots"}],V=tt(),i=c(V.params.tab);return(p,d)=>(_(),b("section",null,[t(F,null,{default:l(()=>[t(z,{cols:"12"},{default:l(()=>[t(mt,{modelValue:r(i),"onUpdate:modelValue":d[0]||(d[0]=u=>v(i)?i.value=u:null),class:"v-tabs-pill"},{default:l(()=>[(_(),b(U,null,R(w,u=>t(vt,{key:u.icon,value:u.tab,to:{name:"warehouse-stock-tab",params:{tab:u.tab}}},{default:l(()=>[t(B,{size:"20",start:"",icon:u.icon},null,8,["icon"]),A(" "+f(u.title),1)]),_:2},1032,["value","to"])),64))]),_:1},8,["modelValue"])]),_:1}),t(z,{cols:"12"},{default:l(()=>[t(M,{modelValue:r(i),"onUpdate:modelValue":d[1]||(d[1]=u=>v(i)?i.value=u:null),class:"disable-tab-transition",touch:!1},{default:l(()=>[t(O,{value:"inventories"},{default:l(()=>[Ct]),_:1})]),_:1},8,["modelValue"]),t(M,{modelValue:r(i),"onUpdate:modelValue":d[2]||(d[2]=u=>v(i)?i.value=u:null),class:"disable-tab-transition",touch:!1},{default:l(()=>[t(O,{value:"lots"},{default:l(()=>[t(Et)]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]))}};export{Se as default};
