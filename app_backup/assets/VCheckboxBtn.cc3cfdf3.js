import{m,V as d}from"./VSelectionControl.7a61433f.js";import{af as f,az as k,a6 as b,am as o,A as c,ae as x,p as I,O as h,aK as V}from"./index.49ef7351.js";const v=f({indeterminate:Boolean,indeterminateIcon:{type:k,default:"$checkboxIndeterminate"},...m({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"v-checkbox-btn"),C=b({name:"VCheckboxBtn",props:v(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,i){let{slots:r}=i;const n=o(e,"indeterminate"),t=o(e,"modelValue");function l(a){n.value&&(n.value=!1)}const u=c(()=>e.indeterminate?e.indeterminateIcon:e.falseIcon),s=c(()=>e.indeterminate?e.indeterminateIcon:e.trueIcon);return x(()=>I(d,h(e,{modelValue:t.value,"onUpdate:modelValue":[a=>t.value=a,l],class:"v-checkbox-btn",type:"checkbox",inline:!0,falseIcon:u.value,trueIcon:s.value,"aria-checked":e.indeterminate?"mixed":void 0}),r)),{}}});function P(e){return V(e,Object.keys(C.props))}export{C as V,P as f,v as m};
