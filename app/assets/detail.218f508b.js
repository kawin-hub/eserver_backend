import{j as D,bd as k,k as L,o as n,b as T,w as t,p as e,q as u,D as U,bj as I,m as l,C as N,c,F as g,a as w,E as f,x as _,bk as P,be as R,al as S}from"./index.dc90d0c7.js";import{u as B}from"./modelListStore.c24e5f41.js";import{r as A}from"./validators.e45b77e0.js";import{a as s,V as b}from"./VRow.a1d8e599.js";import{V as y,c as q}from"./VCard.ef7570db.js";import{V}from"./VTextField.43a06b61.js";import{V as z}from"./VSelect.a1d5e943.js";import{V as v}from"./VBtn.5ca26f7c.js";import{V as F}from"./VMenu.b33cc928.js";import{V as j,a as K,b as O}from"./VList.b57c1041.js";import{V as W}from"./VDivider.09f7ba48.js";import{V as $}from"./VTable.b519be0a.js";import{V as G}from"./VAvatar.6d3c69e8.js";import{V as H}from"./VImg.3d76415f.js";import{b as x}from"./route-block.6ee55eda.js";import"./index.cb840b2e.js";import"./index.0d4b9ec4.js";import"./router.9f5abff7.js";import"./position.734f74ac.js";/* empty css                   */import"./VField.1bfe0f1f.js";import"./index.35436ddd.js";import"./VInput.3420ac64.js";import"./easing.36b781ab.js";import"./forwardRefs.c003b6b8.js";import"./VCounter.07f4b2d1.js";import"./dialog-transition.b4f36d59.js";import"./VCheckboxBtn.732d4006.js";import"./VSelectionControl.64caeaf6.js";import"./VChip.b4ad4a52.js";import"./scopeId.51c205c4.js";import"./VOverlay.f4f2a002.js";import"./lazy.1f3570de.js";const J={class:"me-n2"},Q=l("thead",null,[l("tr",null,[l("th",{class:"font-weight-semibold"},"Images"),l("th",{class:"font-weight-semibold"},"Model code"),l("th",{class:"font-weight-semibold"},"Name"),l("th",{class:"font-weight-semibold",width:"130"},"Price")])],-1),X={style:{"padding-block":"0.61rem"}},Y={style:{"padding-block":"0.61rem"}},Z={style:{"padding-block":"0.61rem"}},ee={__name:"index",emits:["update:models"],setup(E,{emit:h}){D(),k();const m=B,d=L([]);let i=0;(()=>{m.fetchData().then(r=>{d.value=r.data.productModels,d.value.forEach(o=>{o.priceUpdated=o.price})})})();const C=()=>{d.value.forEach(r=>{r.priceUpdated=r.price-r.price*i/100})};return(r,o)=>(n(),T(b,null,{default:t(()=>[e(s,{cols:"12"},{default:t(()=>[e(y,{title:"New Pricelist"},{default:t(()=>[e(q,{class:"pt-2"},{default:t(()=>[e(b,null,{default:t(()=>[e(s,{md:"12",cols:"12"},{default:t(()=>[e(V,{label:"Price list name"})]),_:1}),e(s,{md:"6",cols:"12"},{default:t(()=>[e(V,{label:"Percentage",prefix:"%",modelValue:u(i),"onUpdate:modelValue":o[0]||(o[0]=a=>U(i)?i.value=a:i=a),onKeydown:o[1]||(o[1]=I(a=>C(),["enter"])),type:"number"},null,8,["modelValue"])]),_:1}),e(s,{cols:"12",md:"6"},{default:t(()=>[e(z,{label:"Choose Status",items:[{title:"Inactive",value:"inactive"},{title:"Active",value:"active"}],"item-title":"title","item-value":"value",rules:[u(A)]},null,8,["rules"])]),_:1}),e(s,null,{default:t(()=>[e(y,{title:"Products"},{append:t(()=>[l("div",J,[e(v,{icon:"",color:"default",size:"x-small",variant:"plain"},{default:t(()=>[e(N,{size:"22",icon:"tabler-dots-vertical"}),e(F,{activator:"parent"},{default:t(()=>[e(j,null,{default:t(()=>[(n(),c(g,null,w(["Download"],(a,p)=>e(K,{key:p,value:p},{default:t(()=>[e(O,null,{default:t(()=>[f(_(a),1)]),_:2},1024)]),_:2},1032,["value"])),64))]),_:1})]),_:1})]),_:1})])]),default:t(()=>[e(W),e($,{class:"text-no-wrap"},{default:t(()=>[Q,l("tbody",null,[(n(!0),c(g,null,w(u(d),(a,p)=>(n(),c("tr",{key:a._id},[l("td",null,[e(G,{variant:"tonal",class:"me-3",size:"38"},{default:t(()=>[e(H,{src:u(P).api.url+a.avatar,width:"50"},null,8,["src"])]),_:2},1024)]),l("td",X,_(a.modelCode),1),l("td",Y,_(a.name),1),l("td",Z,[e(V,{modelValue:a.priceUpdated,"onUpdate:modelValue":M=>a.priceUpdated=M},null,8,["modelValue","onUpdate:modelValue"])])]))),128))])]),_:1})]),_:1})]),_:1}),e(s,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[e(v,{type:"submit"},{default:t(()=>[f("Save changes")]),_:1}),e(v,{color:"secondary",variant:"tonal",type:"reset",onClick:o[2]||(o[2]=R(()=>{},["prevent"]))},{default:t(()=>[f(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}},te={__name:"detail",setup(E){const h=k(),m=S({action:"new",title:"CREATE NEW MODEL"});return h.query.id!==void 0&&(m.action="update",m.title="UPDATE MODEL"),(d,i)=>(n(),c("section",null,[e(b,null,{default:t(()=>[e(s,{cols:"12"},{default:t(()=>[e(ee)]),_:1})]),_:1})]))}};typeof x=="function"&&x(te);export{te as default};
