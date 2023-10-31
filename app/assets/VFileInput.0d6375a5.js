import{m as Y,f as q,V as G}from"./VField.1bfe0f1f.js";import{m as J,f as K,a as Q}from"./VInput.3420ac64.js";import{f as W}from"./forwardRefs.c003b6b8.js";import{a6 as X,ap as Z,aE as ee,am as le,A as c,cY as R,k as p,ae as te,aD as ne,p as n,O as C,F as k,b2 as $,ay as ae}from"./index.dc90d0c7.js";import{V as oe}from"./VChip.b4ad4a52.js";import{V as ue}from"./VCounter.07f4b2d1.js";const me=X({name:"VFileInput",inheritAttrs:!1,props:{chips:Boolean,counter:Boolean,counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},multiple:Boolean,hint:String,persistentHint:Boolean,placeholder:String,showSize:{type:[Boolean,Number],default:!1,validator:e=>typeof e=="boolean"||[1e3,1024].includes(e)},...J({prependIcon:"$file"}),modelValue:{type:Array,default:()=>[],validator:e=>Z(e).every(v=>v!=null&&typeof v=="object")},...Y({clearable:!0})},emits:{"click:control":e=>!0,"update:modelValue":e=>!0},setup(e,v){let{attrs:w,emit:A,slots:a}=v;const{t:V}=ee(),o=le(e,"modelValue"),h=c(()=>typeof e.showSize!="boolean"?e.showSize:void 0),I=c(()=>{var l;return((l=o.value)!=null?l:[]).reduce((t,u)=>{let{size:d=0}=u;return t+d},0)}),S=c(()=>R(I.value,h.value)),g=c(()=>{var l;return((l=o.value)!=null?l:[]).map(t=>{const{name:u="",size:d=0}=t;return e.showSize?`${u} (${R(d,h.value)})`:u})}),D=c(()=>{var u;var l;const t=(u=(l=o.value)==null?void 0:l.length)!=null?u:0;return e.showSize?V(e.counterSizeString,t,S.value):V(e.counterString,t)}),F=p(),b=p(),r=p(!1),i=p(),N=c(()=>e.messages.length?e.messages:e.persistentHint?e.hint:"");function y(){if(i.value!==document.activeElement){var l;(l=i.value)==null||l.focus()}r.value||(r.value=!0)}function E(l){$(e["onClick:prepend"],l),z(l)}function z(l){var t;(t=i.value)==null||t.click(),A("click:control",l)}function _(l){l.stopPropagation(),y(),ae(()=>{o.value=[],i!=null&&i.value&&(i.value.value=""),$(e["onClick:clear"],l)})}return te(()=>{const l=!!(a.counter||e.counter),t=!!(l||a.details),[u,d]=ne(w),[{modelValue:ie,...j}]=K(e),[x]=q(e);return n(Q,C({ref:F,modelValue:o.value,"onUpdate:modelValue":f=>o.value=f,class:"v-file-input","onClick:prepend":E,"onClick:append":e["onClick:append"]},u,j,{focused:r.value,messages:N.value}),{...a,default:f=>{let{isDisabled:m,isDirty:P,isReadonly:H,isValid:L}=f;return n(G,C({ref:b,"prepend-icon":e.prependIcon,"onClick:control":z,"onClick:clear":_,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},x,{active:P.value||r.value,dirty:P.value,focused:r.value,error:L.value===!1}),{...a,default:M=>{let{props:{class:O,...T}}=M;return n(k,null,[n("input",C({ref:i,type:"file",readonly:H.value,disabled:m.value,multiple:e.multiple,name:e.name,onClick:s=>{s.stopPropagation(),y()},onChange:s=>{var B;if(!s.target)return;const U=s.target;o.value=[...(B=U.files)!=null?B:[]]},onFocus:y,onBlur:()=>r.value=!1},T,d),null),n("div",{class:O},[o.value.length>0&&(a.selection?a.selection({fileNames:g.value,totalBytes:I.value,totalBytesReadable:S.value}):e.chips?g.value.map(s=>n(oe,{key:s,size:"small",color:e.color},{default:()=>[s]})):g.value.join(", "))])])}})},details:t?f=>{var m;return n(k,null,[(m=a.details)==null?void 0:m.call(a,f),l&&n(k,null,[n("span",null,null),n(ue,{active:!!o.value.length,value:D.value},a.counter)])])}:void 0})}),W({},F,b,i)}});export{me as V};
