import{j as D,bd as k,k as L,o as n,b as T,w as t,p as e,q as u,D as U,cS as S,m as l,C as I,c,F as g,a as w,E as f,x as _,bn as N,be as P,al as R}from"./index.35991f09.js";import{u as B}from"./modelListStore.3cabc70f.js";import{a as A}from"./validators.9dda6c80.js";import{a as s,V as h}from"./VRow.f9366793.js";import{V as y,c as q}from"./VCard.bb37f72e.js";import{V}from"./VTextField.4609cb9e.js";import{V as z}from"./VSelect.1bdb2ecc.js";import{V as v}from"./VBtn.3e0f2bdf.js";import{V as F}from"./VMenu.768d7784.js";import{V as K,a as O,b as j}from"./VList.8e9051e1.js";import{V as W}from"./VDivider.0f44b1ce.js";import{V as $}from"./VTable.0fe7de7a.js";import{V as G}from"./VAvatar.6ed53308.js";import{V as H}from"./VImg.632117c3.js";import{b as x}from"./route-block.182765af.js";import"./index.a44853ab.js";import"./index.0d4b9ec4.js";import"./router.88351000.js";import"./position.15b8fc3a.js";/* empty css                   */import"./VField.93eb26cb.js";import"./index.a8f66a9c.js";import"./VInput.6bf7b46e.js";import"./form.e84299e4.js";import"./easing.36b781ab.js";import"./forwardRefs.c003b6b8.js";import"./VCounter.cb1a1153.js";import"./dialog-transition.13a8c048.js";import"./VCheckboxBtn.a302f7e6.js";import"./VSelectionControl.6ac8e090.js";import"./VChip.81c7dee3.js";import"./scopeId.a8f1d836.js";import"./VOverlay.a330b104.js";import"./lazy.7e795ed8.js";const J={class:"me-n2"},Q=l("thead",null,[l("tr",null,[l("th",{class:"font-weight-semibold"},"Images"),l("th",{class:"font-weight-semibold"},"Model code"),l("th",{class:"font-weight-semibold"},"Name"),l("th",{class:"font-weight-semibold",width:"130"},"Price")])],-1),X={style:{"padding-block":"0.61rem"}},Y={style:{"padding-block":"0.61rem"}},Z={style:{"padding-block":"0.61rem"}},ee={__name:"index",emits:["update:models"],setup(E,{emit:b}){D(),k();const m=B,d=L([]);let i=0;(()=>{m.fetchData().then(r=>{d.value=r.data.productModels,d.value.forEach(o=>{o.priceUpdated=o.price})})})();const C=()=>{d.value.forEach(r=>{r.priceUpdated=r.price-r.price*i/100})};return(r,o)=>(n(),T(h,null,{default:t(()=>[e(s,{cols:"12"},{default:t(()=>[e(y,{title:"New Pricelist"},{default:t(()=>[e(q,{class:"pt-2"},{default:t(()=>[e(h,null,{default:t(()=>[e(s,{md:"12",cols:"12"},{default:t(()=>[e(V,{label:"Price list name"})]),_:1}),e(s,{md:"6",cols:"12"},{default:t(()=>[e(V,{label:"Percentage",prefix:"%",modelValue:u(i),"onUpdate:modelValue":o[0]||(o[0]=a=>U(i)?i.value=a:i=a),onKeydown:o[1]||(o[1]=S(a=>C(),["enter"])),type:"number"},null,8,["modelValue"])]),_:1}),e(s,{cols:"12",md:"6"},{default:t(()=>[e(z,{label:"Choose Status",items:[{title:"Inactive",value:"inactive"},{title:"Active",value:"active"}],"item-title":"title","item-value":"value",rules:[u(A)]},null,8,["rules"])]),_:1}),e(s,null,{default:t(()=>[e(y,{title:"Products"},{append:t(()=>[l("div",J,[e(v,{icon:"",color:"default",size:"x-small",variant:"plain"},{default:t(()=>[e(I,{size:"22",icon:"tabler-dots-vertical"}),e(F,{activator:"parent"},{default:t(()=>[e(K,null,{default:t(()=>[(n(),c(g,null,w(["Download"],(a,p)=>e(O,{key:p,value:p},{default:t(()=>[e(j,null,{default:t(()=>[f(_(a),1)]),_:2},1024)]),_:2},1032,["value"])),64))]),_:1})]),_:1})]),_:1})])]),default:t(()=>[e(W),e($,{class:"text-no-wrap"},{default:t(()=>[Q,l("tbody",null,[(n(!0),c(g,null,w(u(d),(a,p)=>(n(),c("tr",{key:a._id},[l("td",null,[e(G,{variant:"tonal",class:"me-3",size:"38"},{default:t(()=>[e(H,{src:u(N).api.url+a.avatar,width:"50"},null,8,["src"])]),_:2},1024)]),l("td",X,_(a.modelCode),1),l("td",Y,_(a.name),1),l("td",Z,[e(V,{modelValue:a.priceUpdated,"onUpdate:modelValue":M=>a.priceUpdated=M},null,8,["modelValue","onUpdate:modelValue"])])]))),128))])]),_:1})]),_:1})]),_:1}),e(s,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[e(v,{type:"submit"},{default:t(()=>[f("Save changes")]),_:1}),e(v,{color:"secondary",variant:"tonal",type:"reset",onClick:o[2]||(o[2]=P(()=>{},["prevent"]))},{default:t(()=>[f(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}},te={__name:"detail",setup(E){const b=k(),m=R({action:"new",title:"CREATE NEW MODEL"});return b.query.id!==void 0&&(m.action="update",m.title="UPDATE MODEL"),(d,i)=>(n(),c("section",null,[e(h,null,{default:t(()=>[e(s,{cols:"12"},{default:t(()=>[e(ee)]),_:1})]),_:1})]))}};typeof x=="function"&&x(te);export{te as default};
