import{_ as V}from"./DialogCloseBtn.9d70464b.js";import{V as v}from"./VDialog.61de6f6e.js";import{k as D,o as _,b as C,w as o,q as i,D as g,p as a,C as x,E as s,x as y}from"./index.35991f09.js";import{c as n,V as k}from"./VCard.bb37f72e.js";import{V as u}from"./VBtn.3e0f2bdf.js";import"./scopeId.a8f1d836.js";import"./forwardRefs.c003b6b8.js";import"./VOverlay.a330b104.js";import"./router.88351000.js";import"./lazy.7e795ed8.js";import"./easing.36b781ab.js";import"./VImg.632117c3.js";import"./dialog-transition.13a8c048.js";import"./VAvatar.6ed53308.js";import"./position.15b8fc3a.js";const R={__name:"DeleteButtonInList",props:{title:{type:String,required:!0},data:{type:Object,required:!0},fetchData:{type:Function,required:!0},useListStore:{type:Object,required:!0}},setup(p){const r=p,e=D(!1),d=r.useListStore,m=()=>{d.deleteItem({_id:r.data._id}).then(f=>{r.fetchData(),console.log("Deleted"),e.value=!1})};return(f,t)=>{const c=V;return _(),C(v,{modelValue:i(e),"onUpdate:modelValue":t[3]||(t[3]=l=>g(e)?e.value=l:null),persistent:"",class:"v-dialog-sm"},{activator:o(({props:l})=>[a(x,{size:"22",onClick:t[0]||(t[0]=b=>e.value=!0),icon:"tabler-trash"})]),default:o(()=>[a(c,{onClick:t[1]||(t[1]=l=>e.value=!i(e))}),a(k,{title:r.title},{default:o(()=>[a(n,null,{default:o(()=>[s(" Are you sure to delete "+y(r.data.name)+"? ",1)]),_:1}),a(n,{class:"d-flex justify-end gap-3 flex-wrap"},{default:o(()=>[a(u,{color:"secondary",variant:"tonal",onClick:t[2]||(t[2]=l=>e.value=!1)},{default:o(()=>[s(" Cancel ")]),_:1}),a(u,{onClick:m},{default:o(()=>[s(" Delete ")]),_:1})]),_:1})]),_:1},8,["title"])]),_:1},8,["modelValue"])}}};export{R as default};