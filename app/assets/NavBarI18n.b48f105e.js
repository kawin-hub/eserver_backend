import{M as m,o as r,b as s,w as a,p as o,C as u,c as g,F as f,a as _,E as d,x as L,t as h}from"./index.35991f09.js";import{V}from"./VMenu.768d7784.js";import{V as b,a as v,b as x}from"./VList.8e9051e1.js";import{V as C}from"./VBtn.3e0f2bdf.js";import"./forwardRefs.c003b6b8.js";import"./scopeId.a8f1d836.js";import"./VOverlay.a330b104.js";import"./router.88351000.js";import"./lazy.7e795ed8.js";import"./easing.36b781ab.js";import"./VImg.632117c3.js";import"./dialog-transition.13a8c048.js";import"./index.a8f66a9c.js";import"./VAvatar.6ed53308.js";import"./VDivider.0f44b1ce.js";import"./position.15b8fc3a.js";const k={__name:"I18n",props:{languages:{type:Array,required:!0},location:{type:null,required:!1,default:"bottom end"}},emits:["change"],setup(l,{emit:c}){const t=l,{locale:i}=m({useScope:"global"});return(n,p)=>(r(),s(C,{icon:"",variant:"text",color:"default",size:"small"},{default:a(()=>[o(u,{icon:"tabler-language",size:"24"}),o(V,{activator:"parent",location:t.location,offset:"14px"},{default:a(()=>[o(b,{"min-width":"175px"},{default:a(()=>[(r(!0),g(f,null,_(t.languages,e=>(r(),s(v,{key:e.i18nLang,value:e.i18nLang,onClick:I=>{i.value=e.i18nLang,n.$emit("change",e.i18nLang)}},{default:a(()=>[o(x,null,{default:a(()=>[d(L(e.label),1)]),_:2},1024)]),_:2},1032,["value","onClick"]))),128))]),_:1})]),_:1},8,["location"])]),_:1}))}},G={__name:"NavBarI18n",setup(l){const{isAppRtl:c}=h(),t=[{label:"English",i18nLang:"en"},{label:"French",i18nLang:"fr"},{label:"Arabic",i18nLang:"ar"}],i=n=>{c.value=n==="ar"};return(n,p)=>(r(),s(k,{languages:t,onChange:i}))}};export{G as default};