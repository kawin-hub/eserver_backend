import{V as T}from"./VTooltip.f3c5ebde.js";import{V as s}from"./VBtn.3e0f2bdf.js";import{V as p,a as L}from"./VList.8e9051e1.js";import{V as r}from"./VMenu.768d7784.js";import{o as u,b as O,w as e,p as t,bl as l,bm as c,O as B,E as n,m as i,k as x,q as h,bq as y,D as k,c as f,F as D,a as C,x as P}from"./index.35991f09.js";import{V as S,c as A,e as $}from"./VCard.bb37f72e.js";import{V as j}from"./VDivider.0f44b1ce.js";import{_ as I}from"./AppCardCode.b2feb3c0.js";import{a as _,V as E}from"./VRow.f9366793.js";import"./scopeId.a8f1d836.js";import"./forwardRefs.c003b6b8.js";import"./VOverlay.a330b104.js";import"./router.88351000.js";import"./lazy.7e795ed8.js";import"./easing.36b781ab.js";import"./VImg.632117c3.js";import"./position.15b8fc3a.js";import"./index.a8f66a9c.js";import"./VAvatar.6ed53308.js";import"./dialog-transition.13a8c048.js";import"./AppCardCode.vue_vue_type_style_index_0_lang.88ef532c.js";import"./vue.runtime.esm-bundler.9fea2c52.js";const F=i("span",null,"I am a Tooltip",-1),R={__name:"DemoMenuActivatorAndTooltip",setup(V){const a=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(d,m)=>(u(),O(r,{location:"top"},{activator:e(({props:o})=>[t(T,{location:"top"},{activator:e(({props:v})=>[t(s,l(c(B(o,v))),{default:e(()=>[n(" Dropdown w/ Tooltip ")]),_:2},1040)]),default:e(()=>[F]),_:2},1024)]),default:e(()=>[t(p,{items:a})]),_:1}))}},G={__name:"DemoMenuPopover",setup(V){const a=x(!1);return(d,m)=>(u(),O(r,{modelValue:h(a),"onUpdate:modelValue":m[0]||(m[0]=o=>k(a)?a.value=o:null),location:"top"},{activator:e(({props:o})=>[t(s,l(c(o)),{default:e(()=>[n(" Menu as Popover ")]),_:2},1040)]),default:e(()=>[t(S,{"max-width":"300"},{default:e(()=>[t(p,null,{default:e(()=>[t(L,{"prepend-avatar":h(y),title:"John Leider",subtitle:"Founder of Vuetify"},null,8,["prepend-avatar"])]),_:1}),t(j),t(A,null,{default:e(()=>[n(" Gingerbread bear claw cake. Souffl\xE9 candy sesame snaps chocolate ice cream cake. Dessert candy canes oat cake pudding cupcake. Bear claw sweet wafer bonbon drag\xE9e toffee. ")]),_:1}),t($,null,{default:e(()=>[t(s,{icon:"tabler-heart"}),t(s,{icon:"tabler-bookmark"}),t(s,{icon:"tabler-thumb-down"})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}},H={__name:"DemoMenuOpenOnHover",setup(V){const a=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(d,m)=>(u(),O(r,{"open-on-hover":""},{activator:e(({props:o})=>[t(s,l(c(o)),{default:e(()=>[n(" On hover ")]),_:2},1040)]),default:e(()=>[t(p,{items:a})]),_:1}))}},J={class:"demo-space-x"},N={__name:"DemoMenuLocation",setup(V){const a=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(d,m)=>(u(),f("div",J,[t(r,{location:"top"},{activator:e(({props:o})=>[t(s,l(c(o)),{default:e(()=>[n(" Top ")]),_:2},1040)]),default:e(()=>[t(p,{items:a})]),_:1}),t(r,{location:"bottom"},{activator:e(({props:o})=>[t(s,l(c(o)),{default:e(()=>[n(" Bottom ")]),_:2},1040)]),default:e(()=>[t(p,{items:a})]),_:1}),t(r,{location:"start"},{activator:e(({props:o})=>[t(s,l(c(o)),{default:e(()=>[n(" Start ")]),_:2},1040)]),default:e(()=>[t(p,{items:a})]),_:1}),t(r,{location:"end"},{activator:e(({props:o})=>[t(s,l(c(o)),{default:e(()=>[n(" End ")]),_:2},1040)]),default:e(()=>[t(p,{items:a})]),_:1})]))}},X={class:"demo-space-x"},Y={__name:"DemoMenuCustomTransitions",setup(V){const a=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(d,m)=>(u(),f("div",X,[t(r,{transition:"scale-transition"},{activator:e(({props:o})=>[t(s,l(c(o)),{default:e(()=>[n(" Scale Transition ")]),_:2},1040)]),default:e(()=>[t(p,{items:a})]),_:1}),t(r,{transition:"slide-x-transition"},{activator:e(({props:o})=>[t(s,l(c(o)),{default:e(()=>[n(" Slide X Transition ")]),_:2},1040)]),default:e(()=>[t(p,{items:a})]),_:1}),t(r,{transition:"slide-y-transition"},{activator:e(({props:o})=>[t(s,l(c(o)),{default:e(()=>[n(" Slide Y Transition ")]),_:2},1040)]),default:e(()=>[t(p,{items:a})]),_:1})]))}},q={class:"demo-space-x"},U={__name:"DemoMenuBasic",setup(V){const a=["primary","secondary","success","info","warning","error"],d=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(m,o)=>(u(),f("div",q,[(u(),f(D,null,C(a,v=>t(r,{key:v},{activator:e(({props:b})=>[t(s,B({color:v},b),{default:e(()=>[n(P(v),1)]),_:2},1040,["color"])]),default:e(()=>[t(p,{items:d})]),_:2},1024)),64))]))}},z={ts:`<script lang="ts" setup>
import { mergeProps } from 'vue'

const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <VMenu location="top">
    <template #activator="{ props: menuProps }">
      <VTooltip location="top">
        <template #activator="{ props: tooltipProps }">
          <VBtn v-bind="mergeProps(menuProps, tooltipProps)">
            Dropdown w/ Tooltip
          </VBtn>
        </template>
        <span>I am a Tooltip</span>
      </VTooltip>
    </template>

    <VList :items="items" />
  </VMenu>
</template>
`,js:`<script setup>
import { mergeProps } from 'vue'

const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <VMenu location="top">
    <template #activator="{ props: menuProps }">
      <VTooltip location="top">
        <template #activator="{ props: tooltipProps }">
          <VBtn v-bind="mergeProps(menuProps, tooltipProps)">
            Dropdown w/ Tooltip
          </VBtn>
        </template>
        <span>I am a Tooltip</span>
      </VTooltip>
    </template>

    <VList :items="items" />
  </VMenu>
</template>
`},W={ts:`<script lang="ts" setup>
const menusVariant = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu
      v-for="menu in menusVariant"
      :key="menu"
    >
      <template #activator="{ props }">
        <VBtn
          :color="menu"
          v-bind="props"
        >
          {{ menu }}
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`,js:`<script setup>
const menusVariant = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
]

const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu
      v-for="menu in menusVariant"
      :key="menu"
    >
      <template #activator="{ props }">
        <VBtn
          :color="menu"
          v-bind="props"
        >
          {{ menu }}
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`},K={ts:`<script lang="ts" setup>
const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu transition="scale-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Scale Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu transition="slide-x-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Slide X Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu transition="slide-y-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Slide Y Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`,js:`<script setup>
const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu transition="scale-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Scale Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu transition="slide-x-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Slide X Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu transition="slide-y-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Slide Y Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`},Q={ts:`<script lang="ts" setup>
const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu location="top">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Top
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="bottom">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Bottom
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="start">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Start
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="end">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          End
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`,js:`<script setup>
const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu location="top">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Top
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="bottom">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Bottom
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="start">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Start
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="end">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          End
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`},Z={ts:`<script lang="ts" setup>
const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <VMenu open-on-hover>
    <template #activator="{ props }">
      <VBtn v-bind="props">
        On hover
      </VBtn>
    </template>

    <VList :items="items" />
  </VMenu>
</template>
`,js:`<script setup>
const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <VMenu open-on-hover>
    <template #activator="{ props }">
      <VBtn v-bind="props">
        On hover
      </VBtn>
    </template>

    <VList :items="items" />
  </VMenu>
</template>
`},tt={ts:`<script lang="ts" setup>
import avatar1 from '@images/avatars/avatar-1.png'

const menu = ref(false)
<\/script>

<template>
  <VMenu
    v-model="menu"
    location="top"
  >
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Menu as Popover
      </VBtn>
    </template>

    <VCard
      max-width="300"
    >
      <VList>
        <VListItem
          :prepend-avatar="avatar1"
          title="John Leider"
          subtitle="Founder of Vuetify"
        />
      </VList>

      <VDivider />

      <VCardText>
        Gingerbread bear claw cake. Souffl\xE9 candy sesame snaps chocolate ice cream cake.
        Dessert candy canes oat cake pudding cupcake. Bear claw sweet wafer bonbon drag\xE9e toffee.
      </VCardText>

      <VCardActions>
        <VBtn icon="tabler-heart" />
        <VBtn icon="tabler-bookmark" />
        <VBtn icon="tabler-thumb-down" />
      </VCardActions>
    </VCard>
  </VMenu>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'

const menu = ref(false)
<\/script>

<template>
  <VMenu
    v-model="menu"
    location="top"
  >
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Menu as Popover
      </VBtn>
    </template>

    <VCard
      max-width="300"
    >
      <VList>
        <VListItem
          :prepend-avatar="avatar1"
          title="John Leider"
          subtitle="Founder of Vuetify"
        />
      </VList>

      <VDivider />

      <VCardText>
        Gingerbread bear claw cake. Souffl\xE9 candy sesame snaps chocolate ice cream cake.
        Dessert candy canes oat cake pudding cupcake. Bear claw sweet wafer bonbon drag\xE9e toffee.
      </VCardText>

      <VCardActions>
        <VBtn icon="tabler-heart" />
        <VBtn icon="tabler-bookmark" />
        <VBtn icon="tabler-thumb-down" />
      </VCardActions>
    </VCard>
  </VMenu>
</template>
`},et=i("p",null," Remember to put the element that activates the menu in the activator slot. ",-1),ot=i("p",null,[n("Vuetify comes with 3 standard transitions, "),i("code",null,"scale"),n(", "),i("code",null,"slide-x"),n(" and "),i("code",null,"slide-y"),n(". Use "),i("code",null,"transition"),n(" prop to add transition to a menu.")],-1),nt=i("p",null,[n("Menu can be offset relative to the activator by using the "),i("code",null,"location"),n(" prop.")],-1),at=i("p",null,[n("Menus can be accessed using hover instead of clicking with the "),i("code",null,"open-on-hover"),n(" prop.")],-1),it=i("p",null,"A menu can be configured to be static when opened, allowing it to function as a popover. This can be useful when there are multiple interactive items within the menu contents.",-1),st=i("p",null,[n("With the new "),i("code",null,"v-slot"),n(" syntax, nested activators such as those seen with a "),i("code",null,"v-menu"),n(" and "),i("code",null,"v-tooltip"),n(" attached to the same activator button, need a particular setup in order to function correctly")],-1),kt={__name:"menu",setup(V){return(a,d)=>{const m=U,o=I,v=Y,b=N,M=H,w=G,g=R;return u(),O(E,{class:"match-height"},{default:e(()=>[t(_,{cols:"12",md:"6"},{default:e(()=>[t(o,{title:"Basic",code:W},{default:e(()=>[et,t(m)]),_:1},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(o,{title:"Custom transitions",code:K},{default:e(()=>[ot,t(v)]),_:1},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(o,{title:"Location",code:Q},{default:e(()=>[nt,t(b)]),_:1},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(o,{title:"Open on hover",code:Z},{default:e(()=>[at,t(M)]),_:1},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(o,{title:"Popover",code:tt},{default:e(()=>[it,t(w)]),_:1},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(o,{title:"Activator and tooltip",code:z},{default:e(()=>[st,t(g)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{kt as default};
