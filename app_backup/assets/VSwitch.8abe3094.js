import{m as L,f as D,V as R}from"./VSelectionControl.7a61433f.js";import{m as U,u as z,f as M,a as N}from"./VInput.1ff489a8.js";import{b as O,L as j}from"./position.5856deb4.js";import{a6 as q,am as d,A as c,ah as E,ae as G,aD as H,k as J,p as t,O as m}from"./index.49ef7351.js";import{a as K}from"./VBtn.5345231d.js";const te=q({name:"VSwitch",inheritAttrs:!1,props:{indeterminate:Boolean,inset:Boolean,flat:Boolean,loading:{type:[Boolean,String],default:!1},...U(),...L()},emits:{"update:focused":e=>!0,"update:modelValue":()=>!0,"update:indeterminate":e=>!0},setup(e,v){let{attrs:f,slots:a}=v;const o=d(e,"indeterminate"),u=d(e,"modelValue"),{loaderClasses:h}=O(e),{isFocused:V,focus:C,blur:g}=z(e),w=c(()=>typeof e.loading=="string"&&e.loading!==""?e.loading:e.color),k=E(),p=c(()=>e.id||`switch-${k}`);function S(){o.value&&(o.value=!1)}return G(()=>{const[_,y]=H(f),[P,Q]=M(e),[b,T]=D(e),r=J();function x(){var l,n;(l=r.value)==null||(n=l.input)==null||n.click()}return t(N,m({class:["v-switch",{"v-switch--inset":e.inset},{"v-switch--indeterminate":o.value},h.value]},_,P,{id:p.value,focused:V.value}),{...a,default:l=>{let{id:n,isDisabled:A,isReadonly:B,isValid:$}=l;return t(R,m({ref:r},b,{modelValue:u.value,"onUpdate:modelValue":[i=>u.value=i,S],id:n.value,type:"checkbox","aria-checked":o.value?"mixed":void 0,disabled:A.value,readonly:B.value,onFocus:C,onBlur:g},y),{...a,default:()=>t("div",{class:"v-switch__track",onClick:x},null),input:i=>{let{textColorClasses:I,textColorStyles:F}=i;return t("div",{class:["v-switch__thumb",I.value],style:F.value},[e.loading&&t(j,{name:"v-switch",active:!0,color:$.value===!1?void 0:w.value},{default:s=>a.loader?a.loader(s):t(K,{active:s.isActive,color:s.color,indeterminate:!0,size:"16",width:"2"},null)})])}})}})}),{}}});export{te as V};
