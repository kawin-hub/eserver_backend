import{as as h,aC as p,am as y,ah as S,A as a,k as b,ae as x,p as A,O as d}from"./index.dc90d0c7.js";import{u as C}from"./scopeId.51c205c4.js";import{f as T}from"./forwardRefs.c003b6b8.js";import{m as $,f as w,a as I}from"./VOverlay.f4f2a002.js";const H=h()({name:"VTooltip",props:{id:String,text:String,...p($({closeOnBack:!1,location:"end",locationStrategy:"connected",minWidth:0,offset:10,openOnClick:!1,openOnHover:!0,origin:"auto",scrim:!1,scrollStrategy:"reposition",transition:!1}),["absolute","persistent","eager"])},emits:{"update:modelValue":t=>!0},setup(t,v){let{slots:i}=v;const n=y(t,"modelValue"),{scopeId:m}=C(),f=S(),r=a(()=>t.id||`v-tooltip-${f}`),l=b(),g=a(()=>t.location.split(" ").length>1?t.location:t.location+" center"),V=a(()=>t.origin==="auto"||t.origin==="overlap"||t.origin.split(" ").length>1||t.location.split(" ").length>1?t.origin:t.origin+" center"),O=a(()=>t.transition?t.transition:n.value?"scale-transition":"fade-transition");return x(()=>{const[P]=w(t);return A(I,d({ref:l,class:["v-tooltip"],id:r.value},P,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,transition:O.value,absolute:!0,location:g.value,origin:V.value,persistent:!0,role:"tooltip",eager:!0,activatorProps:d({"aria-describedby":r.value},t.activatorProps)},m),{activator:i.activator,default:function(){var c;for(var e,s=arguments.length,u=new Array(s),o=0;o<s;o++)u[o]=arguments[o];return(c=(e=i.default)==null?void 0:e.call(i,...u))!=null?c:t.text}})}),T({},l)}});export{H as V};
