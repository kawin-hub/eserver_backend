import{V as y}from"./VTextField.43a06b61.js";import{k as n,o as u,c as p,m as c,F as _,a as g,b as h,O as v,q as k}from"./index.dc90d0c7.js";const b=c("h6",{class:"text-base font-weight-bold mb-3"}," Type your 6 digit security code ",-1),x={__name:"AppOtpInput",props:{totalInput:{type:Number,required:!1,default:6},default:{type:String,required:!1,default:""}},emits:["updateOtp"],setup(i,{emit:f}){const s=i,o=n([]),a=n(null);o.value=s.default.split("");const d={style:"max-width: 54px; text-align: center;"},m=(e,t)=>{if(e.code!=="Tab"&&e.code!=="ArrowRight"&&e.code!=="ArrowLeft"&&e.preventDefault(),e.code==="Backspace"&&(o.value[t-1]="",a.value!==null&&t>1)){const l=a.value.children[t-2].querySelector("input");l&&l.focus()}if(/^([0-9])$/.test(e.key)&&(o.value[t-1]=e.key,a.value!==null&&t!==0&&t<a.value.children.length)){const l=a.value.children[t].querySelector("input");l&&l.focus()}f("updateOtp",o.value.join(""))};return(e,t)=>(u(),p("div",null,[b,c("div",{ref_key:"refOtpComp",ref:a,class:"d-flex align-center gap-4"},[(u(!0),p(_,null,g(s.totalInput,r=>(u(),h(y,v({key:r,"model-value":k(o)[r-1]},d,{maxlength:"1",onKeydown:l=>m(l,r)}),null,16,["model-value","onKeydown"]))),128))],512)]))}};export{x as _};
