import{V as d}from"./VSwitch.8abe3094.js";import{k as m,o as h,c as v,p as t,q as a,D as p,b,w as r,E as c,m as n,x as O,F as f,a as L}from"./index.49ef7351.js";import{a as y}from"./VBtn.5345231d.js";import{_ as D}from"./AppCardCode.24f58ad6.js";import{a as S,V as $}from"./VRow.04ed429a.js";import"./VSelectionControl.7a61433f.js";import"./router.7394f425.js";import"./VInput.1ff489a8.js";import"./index.a19f3361.js";import"./VImg.33aacaa5.js";import"./position.5856deb4.js";import"./vue.runtime.esm-bundler.70e5cfe2.js";import"./VCard.489135da.js";import"./VAvatar.89c4d356.js";import"./VDivider.fa0f54cb.js";const U={class:"demo-space-x"},C={__name:"DemoSwitchStates",setup(w){const e=m("on"),o=m("on"),i=m("on");return(l,s)=>(h(),v("div",U,[t(d,{modelValue:a(e),"onUpdate:modelValue":s[0]||(s[0]=u=>p(e)?e.value=u:null),value:"on",label:"On"},null,8,["modelValue"]),t(d,{label:"Off"}),t(d,{modelValue:a(o),"onUpdate:modelValue":s[1]||(s[1]=u=>p(o)?o.value=u:null),value:"on",disabled:"",label:"On disabled"},null,8,["modelValue"]),t(d,{disabled:"",label:"Off disabled"}),t(d,{modelValue:a(i),"onUpdate:modelValue":s[2]||(s[2]=u=>p(i)?i.value=u:null),loading:"warning",value:"on",label:"On loading"},null,8,["modelValue"]),t(d,{loading:"warning",label:"Off loading"})]))}},J={class:"demo-space-x"},T={__name:"DemoSwitchTrueAndFalseValue",setup(w){const e=m(1),o=m("Show");return(i,l)=>(h(),v("div",J,[t(d,{modelValue:a(e),"onUpdate:modelValue":l[0]||(l[0]=s=>p(e)?e.value=s:null),label:a(e).toString(),"true-value":1,"false-value":0},null,8,["modelValue","label"]),t(d,{modelValue:a(o),"onUpdate:modelValue":l[1]||(l[1]=s=>p(o)?o.value=s:null),label:a(o).toString(),"true-value":"Show","false-value":"Hide"},null,8,["modelValue","label"])]))}},A={__name:"DemoSwitchLabelSlot",setup(w){const e=m(!1);return(o,i)=>(h(),b(d,{modelValue:a(e),"onUpdate:modelValue":i[0]||(i[0]=l=>p(e)?e.value=l:null)},{label:r(()=>[c(" Turn on the progress: "),t(y,{indeterminate:a(e),size:"24",class:"ms-2"},null,8,["indeterminate"])]),_:1},8,["modelValue"]))}},F={class:"demo-space-x"},M={class:"mt-2 mb-0"},z={__name:"DemoSwitchModelAsArray",setup(w){const e=m(["John"]);return(o,i)=>(h(),v(f,null,[n("div",F,[t(d,{modelValue:a(e),"onUpdate:modelValue":i[0]||(i[0]=l=>p(e)?e.value=l:null),label:"John",value:"John"},null,8,["modelValue"]),t(d,{modelValue:a(e),"onUpdate:modelValue":i[1]||(i[1]=l=>p(e)?e.value=l:null),label:"Jacob",value:"Jacob"},null,8,["modelValue"])]),n("p",M,O(a(e)),1)],64))}},I={class:"demo-space-x"},P={__name:"DemoSwitchColors",setup(w){const e=m(["Primary","Secondary","Success","Info","Warning","Error"]),o=m(["Primary","Secondary","Success","Info","Warning","Error"]);return(i,l)=>(h(),v("div",I,[(h(!0),v(f,null,L(a(o),s=>(h(),b(d,{key:s,modelValue:a(e),"onUpdate:modelValue":l[0]||(l[0]=u=>p(e)?e.value=u:null),label:s,value:s,color:s.toLowerCase()},null,8,["modelValue","label","value","color"]))),128))]))}},k={class:"demo-space-x"},E={__name:"DemoSwitchInset",setup(w){const e=m(!0),o=m(!1);return(i,l)=>(h(),v("div",k,[t(d,{modelValue:a(e),"onUpdate:modelValue":l[0]||(l[0]=s=>p(e)?e.value=s:null),inset:"",label:`Switch 1: ${a(e).toString()}`},null,8,["modelValue","label"]),t(d,{modelValue:a(o),"onUpdate:modelValue":l[1]||(l[1]=s=>p(o)?o.value=s:null),inset:"",label:`Switch 2: ${a(o).toString()}`},null,8,["modelValue","label"])]))}},j={class:"demo-space-x"},B={__name:"DemoSwitchBasic",setup(w){const e=m(!0),o=m(!1),i=l=>{const s=l.toString();return s.charAt(0).toUpperCase()+s.slice(1)};return(l,s)=>(h(),v("div",j,[t(d,{modelValue:a(e),"onUpdate:modelValue":s[0]||(s[0]=u=>p(e)?e.value=u:null),label:i(a(e))},null,8,["modelValue","label"]),t(d,{modelValue:a(o),"onUpdate:modelValue":s[1]||(s[1]=u=>p(o)?o.value=u:null),label:i(a(o))},null,8,["modelValue","label"])]))}},W={ts:`<script lang="ts" setup>
const toggleSwitch = ref(true)
const toggleFalseSwitch = ref(false)

const capitalizedLabel = (label: boolean) => {
  const convertLabelText = label.toString()

  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="toggleSwitch"
      :label="capitalizedLabel(toggleSwitch)"
    />

    <VSwitch
      v-model="toggleFalseSwitch"
      :label="capitalizedLabel(toggleFalseSwitch)"
    />
  </div>
</template>
`,js:`<script setup>
const toggleSwitch = ref(true)
const toggleFalseSwitch = ref(false)

const capitalizedLabel = label => {
  const convertLabelText = label.toString()
  
  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="toggleSwitch"
      :label="capitalizedLabel(toggleSwitch)"
    />

    <VSwitch
      v-model="toggleFalseSwitch"
      :label="capitalizedLabel(toggleFalseSwitch)"
    />
  </div>
</template>
`},H={ts:`<script lang="ts" setup>
const selectedSwitch = ref(['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Error'])
const switches = ref(['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Error'])
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-for="item in switches"
      :key="item"
      v-model="selectedSwitch"
      :label="item"
      :value="item"
      :color="item.toLowerCase()"
    />
  </div>
</template>
`,js:`<script setup>
const selectedSwitch = ref([
  'Primary',
  'Secondary',
  'Success',
  'Info',
  'Warning',
  'Error',
])

const switches = ref([
  'Primary',
  'Secondary',
  'Success',
  'Info',
  'Warning',
  'Error',
])
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-for="item in switches"
      :key="item"
      v-model="selectedSwitch"
      :label="item"
      :value="item"
      :color="item.toLowerCase()"
    />
  </div>
</template>
`},N={ts:`<script lang="ts" setup>
const insetSwitch1 = ref(true)
const insetSwitch2 = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="insetSwitch1"
      inset
      :label="\`Switch 1: \${insetSwitch1.toString()}\`"
    />
    <VSwitch
      v-model="insetSwitch2"
      inset
      :label="\`Switch 2: \${insetSwitch2.toString()}\`"
    />
  </div>
</template>
`,js:`<script setup>
const insetSwitch1 = ref(true)
const insetSwitch2 = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="insetSwitch1"
      inset
      :label="\`Switch 1: \${insetSwitch1.toString()}\`"
    />
    <VSwitch
      v-model="insetSwitch2"
      inset
      :label="\`Switch 2: \${insetSwitch2.toString()}\`"
    />
  </div>
</template>
`},R={ts:`<script lang="ts" setup>
const switchMe = ref(false)
<\/script>

<template>
  <VSwitch v-model="switchMe">
    <template #label>
      Turn on the progress: <VProgressCircular
        :indeterminate="switchMe"
        size="24"
        class="ms-2"
      />
    </template>
  </VSwitch>
</template>
`,js:`<script setup>
const switchMe = ref(false)
<\/script>

<template>
  <VSwitch v-model="switchMe">
    <template #label>
      Turn on the progress: <VProgressCircular
        :indeterminate="switchMe"
        size="24"
        class="ms-2"
      />
    </template>
  </VSwitch>
</template>
`},q={ts:`<script lang="ts" setup>
const people = ref(['John'])
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="people"
      label="John"
      value="John"
    />

    <VSwitch
      v-model="people"
      label="Jacob"
      value="Jacob"
    />
  </div>

  <p class="mt-2 mb-0">
    {{ people }}
  </p>
</template>
`,js:`<script setup>
const people = ref(['John'])
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="people"
      label="John"
      value="John"
    />

    <VSwitch
      v-model="people"
      label="Jacob"
      value="Jacob"
    />
  </div>

  <p class="mt-2 mb-0">
    {{ people }}
  </p>
</template>
`},Y={ts:`<script setup lang="ts">
const switchOn = ref('on')
const switchOnDisabled = ref('on')
const switchOnLoading = ref('on')
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="switchOn"
      value="on"
      label="On"
    />

    <VSwitch label="Off" />

    <VSwitch
      v-model="switchOnDisabled"
      value="on"
      disabled
      label="On disabled"
    />

    <VSwitch
      disabled
      label="Off disabled"
    />

    <VSwitch
      v-model="switchOnLoading"
      loading="warning"
      value="on"
      label="On loading"
    />

    <VSwitch
      loading="warning"
      label="Off loading"
    />
  </div>
</template>
`,js:`<script setup>
const switchOn = ref('on')
const switchOnDisabled = ref('on')
const switchOnLoading = ref('on')
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="switchOn"
      value="on"
      label="On"
    />

    <VSwitch label="Off" />

    <VSwitch
      v-model="switchOnDisabled"
      value="on"
      disabled
      label="On disabled"
    />

    <VSwitch
      disabled
      label="Off disabled"
    />

    <VSwitch
      v-model="switchOnLoading"
      loading="warning"
      value="on"
      label="On loading"
    />

    <VSwitch
      loading="warning"
      label="Off loading"
    />
  </div>
</template>
`},G={ts:`<script lang="ts" setup>
const switch1 = ref(1)
const switch2 = ref('Show')
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="switch1"
      :label="switch1.toString()"
      :true-value="1"
      :false-value="0"
    />

    <VSwitch
      v-model="switch2"
      :label="switch2.toString()"
      true-value="Show"
      false-value="Hide"
    />
  </div>
</template>
`,js:`<script setup>
const switch1 = ref(1)
const switch2 = ref('Show')
<\/script>

<template>
  <div class="demo-space-x">
    <VSwitch
      v-model="switch1"
      :label="switch1.toString()"
      :true-value="1"
      :false-value="0"
    />

    <VSwitch
      v-model="switch2"
      :label="switch2.toString()"
      true-value="Show"
      false-value="Hide"
    />
  </div>
</template>
`},K=n("p",null,[c("A "),n("code",null,"v-switch"),c(" in its simplest form provides a toggle between 2 values.")],-1),Q=n("p",null,"You can make switch render in inset mode.",-1),X=n("p",null,[c("Switches can be colored by using any of the builtin colors and contextual names using the "),n("code",null,"color"),c(" prop.")],-1),Z=n("p",null,[c("Multiple "),n("code",null,"v-switch"),c("'s can share the same "),n("code",null,"v-model"),c(" by using an array.")],-1),ee=n("p",null,[c("Switch labels can be defined in "),n("code",null,"label"),c(" slot - that will allow to use HTML content.")],-1),te=n("p",null,[c(" Use "),n("code",null,"false-value"),c(" and "),n("code",null,"true-value"),c(" prop to sets value for truthy and falsy state ")],-1),le=n("p",null,[n("code",null,"v-switch"),c(" can have different states such as "),n("code",null,"default"),c(", "),n("code",null,"disabled"),c(", and "),n("code",null,"loading"),c(".")],-1),be={__name:"switch",setup(w){return(e,o)=>{const i=B,l=D,s=E,u=P,_=z,g=A,V=T,x=C;return h(),b($,null,{default:r(()=>[t(S,{cols:"12",md:"6"},{default:r(()=>[t(l,{title:"Basic",code:W},{default:r(()=>[K,t(i)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:r(()=>[t(l,{title:"Inset",code:N},{default:r(()=>[Q,t(s)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:r(()=>[t(l,{title:"Colors",code:H},{default:r(()=>[X,t(u)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:r(()=>[t(l,{title:"Model as array",code:q},{default:r(()=>[Z,t(_)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:r(()=>[t(l,{title:"Label slot",code:R},{default:r(()=>[ee,t(g)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:r(()=>[t(l,{title:"True and False Value",code:G},{default:r(()=>[te,t(V)]),_:1},8,["code"])]),_:1}),t(S,{cols:"12",md:"6"},{default:r(()=>[t(l,{title:"States",code:Y},{default:r(()=>[le,t(x)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{be as default};
