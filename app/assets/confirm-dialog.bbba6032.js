import{_ as y}from"./DialogCloseBtn.9d70464b.js";import{k as V,o as s,b as u,w as l,C as g,E as i,x as r,p as o,q as f,D as k}from"./index.35991f09.js";import{V as d}from"./VBtn.3e0f2bdf.js";import{V as _,c as p}from"./VCard.bb37f72e.js";import{V as C}from"./VDialog.61de6f6e.js";const q={__name:"confirm-dialog",props:{title:{type:String,required:!0},data:{type:Object,required:!0,_id:String,name:String,body:String},callBack:{type:Function},icon:{type:String,default:"tabler-trash"},buttonStyle:{type:Object,default:{visible:!1,label:"\u0E01\u0E14\u0E15\u0E23\u0E07\u0E19\u0E35\u0E49"}},buttonLable:{type:Object,default:{submit:"\u0E15\u0E01\u0E25\u0E07",cancel:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}}},setup(c){const t=c,a=V(!1),b=()=>{a.value=!1,t.callBack(t.data._id,t.data.name,t.data)};return(S,e)=>{const m=y;return s(),u(C,{modelValue:f(a),"onUpdate:modelValue":e[4]||(e[4]=n=>k(a)?a.value=n:null),persistent:"",class:"v-dialog-sm"},{activator:l(({props2:n})=>[t.buttonStyle.visible?(s(),u(d,{key:1,variant:"tonal","prepend-icon":"tabler-send",onClick:e[1]||(e[1]=v=>a.value=!0)},{default:l(()=>[i(r(t.buttonStyle.label),1)]),_:1})):(s(),u(g,{key:0,size:"22",onClick:e[0]||(e[0]=v=>a.value=!0),icon:t.icon},null,8,["icon"]))]),default:l(()=>[o(m,{onClick:e[2]||(e[2]=n=>a.value=!f(a))}),o(_,{title:t.title},{default:l(()=>[o(p,null,{default:l(()=>[i(r(t.data.body),1)]),_:1}),o(p,{class:"d-flex justify-end gap-3 flex-wrap"},{default:l(()=>[o(d,{color:"secondary",variant:"tonal",onClick:e[3]||(e[3]=n=>a.value=!1)},{default:l(()=>[i(r(t.buttonLable.cancel),1)]),_:1}),o(d,{onClick:b},{default:l(()=>[i(r(t.buttonLable.submit),1)]),_:1})]),_:1})]),_:1},8,["title"])]),_:1},8,["modelValue"])}}};export{q as _};
