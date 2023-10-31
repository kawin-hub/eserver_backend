import{m as T,u as _,b as w,c as A}from"./VBtn.5ca26f7c.js";import{a6 as p,a9 as y,aa as B,ab as $,A as c,ac as R,ad as b,ae as x,p as l,af as D,az as g,aj as P,aB as S,H as V,aA as G,C as L,I as j,ai as z}from"./index.dc90d0c7.js";import{R as F,b as H,c as N,f as O,g as q}from"./router.9f5abff7.js";import{b as J}from"./index.35436ddd.js";import{m as I,u as K}from"./lazy.1f3570de.js";const r=Symbol.for("vuetify:v-expansion-panel"),M=["default","accordion","inset","popout"],ae=p({name:"VExpansionPanels",props:{color:String,variant:{type:String,default:"default",validator:e=>M.includes(e)},readonly:Boolean,...T(),...y(),...B()},emits:{"update:modelValue":e=>!0},setup(e,o){let{slots:n}=o;_(e,r);const{themeClasses:a}=$(e),i=c(()=>e.variant&&`v-expansion-panels--variant-${e.variant}`);return R({VExpansionPanel:{color:b(e,"color")},VExpansionPanelTitle:{readonly:b(e,"readonly")}}),x(()=>l(e.tag,{class:["v-expansion-panels",a.value,i.value]},n)),{}}}),E=D({color:String,expandIcon:{type:g,default:"$expand"},collapseIcon:{type:g,default:"$collapse"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1},readonly:Boolean},"v-expansion-panel-title"),Q=p({name:"VExpansionPanelTitle",directives:{Ripple:F},props:{...E()},setup(e,o){let{slots:n}=o;const a=P(r);if(!a)throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");const{backgroundColorClasses:i,backgroundColorStyles:u}=S(e,"color"),d=c(()=>({collapseIcon:e.collapseIcon,disabled:a.disabled.value,expanded:a.isSelected.value,expandIcon:e.expandIcon,readonly:e.readonly}));return x(()=>{var v;return V(l("button",{class:["v-expansion-panel-title",{"v-expansion-panel-title--active":a.isSelected.value},i.value],style:u.value,type:"button",tabindex:a.disabled.value?-1:void 0,disabled:a.disabled.value,"aria-expanded":a.isSelected.value,onClick:e.readonly?void 0:a.toggle},[l("span",{class:"v-expansion-panel-title__overlay"},null),(v=n.default)==null?void 0:v.call(n,d.value),!e.hideActions&&l("span",{class:"v-expansion-panel-title__icon"},[n.actions?n.actions(d.value):l(L,{icon:a.isSelected.value?e.collapseIcon:e.expandIcon},null)])]),[[G("ripple"),e.ripple]])}),{}}}),U=p({name:"VExpansionPanelText",props:{...I()},setup(e,o){let{slots:n}=o;const a=P(r);if(!a)throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");const{hasContent:i,onAfterLeave:u}=K(e,a.isSelected);return x(()=>{var d;return l(J,{onAfterLeave:u},{default:()=>[V(l("div",{class:"v-expansion-panel-text"},[n.default&&i.value&&l("div",{class:"v-expansion-panel-text__wrapper"},[(d=n.default)==null?void 0:d.call(n)])]),[[j,a.isSelected.value]])]})}),{}}}),ne=p({name:"VExpansionPanel",props:{title:String,text:String,bgColor:String,...H(),...w(),...I(),...N(),...y(),...E()},emits:{"group:selected":e=>!0},setup(e,o){let{slots:n}=o;const a=A(e,r),{backgroundColorClasses:i,backgroundColorStyles:u}=S(e,"bgColor"),{elevationClasses:d}=O(e),{roundedClasses:v}=q(e),C=c(()=>(a==null?void 0:a.disabled.value)||e.disabled),m=c(()=>a.group.items.value.reduce((s,t,f)=>(a.group.selected.value.includes(t.id)&&s.push(f),s),[])),h=c(()=>{const s=a.group.items.value.findIndex(t=>t.id===a.id);return!a.isSelected.value&&m.value.some(t=>t-s===1)}),k=c(()=>{const s=a.group.items.value.findIndex(t=>t.id===a.id);return!a.isSelected.value&&m.value.some(t=>t-s===-1)});return z(r,a),x(()=>{var s;const t=!!(n.text||e.text),f=!!(n.title||e.title);return l(e.tag,{class:["v-expansion-panel",{"v-expansion-panel--active":a.isSelected.value,"v-expansion-panel--before-active":h.value,"v-expansion-panel--after-active":k.value,"v-expansion-panel--disabled":C.value},v.value,i.value],style:u.value,"aria-expanded":a.isSelected.value},{default:()=>[l("div",{class:["v-expansion-panel__shadow",...d.value]},null),f&&l(Q,{key:"title",collapseIcon:e.collapseIcon,color:e.color,expandIcon:e.expandIcon,hideActions:e.hideActions,ripple:e.ripple},{default:()=>[n.title?n.title():e.title]}),t&&l(U,{key:"text",eager:e.eager},{default:()=>[n.text?n.text():e.text]}),(s=n.default)==null?void 0:s.call(n)]})}),{}}});export{ae as V,ne as a,Q as b,U as c};
