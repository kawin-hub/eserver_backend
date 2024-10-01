import{L as p,o as s,c as u,p as t,w as o,E as e,k as f,q as m,D as b,F as h,m as r,x as D,b as y,y as P}from"./index.35991f09.js";import{V as l}from"./VAlert.91ecfd84.js";import{V as B}from"./VSlider.3cb142c4.js";import{V as g}from"./VBtn.3e0f2bdf.js";import{_ as G}from"./AppCardCode.b2feb3c0.js";import{a as d,V as T}from"./VRow.f9366793.js";import"./VAvatar.6ed53308.js";import"./router.88351000.js";import"./VImg.632117c3.js";import"./position.15b8fc3a.js";import"./VSliderTrack.ceba2c66.js";import"./index.a8f66a9c.js";import"./VInput.6bf7b46e.js";import"./form.e84299e4.js";import"./AppCardCode.vue_vue_type_style_index_0_lang.88ef532c.js";import"./vue.runtime.esm-bundler.9fea2c52.js";import"./VCard.bb37f72e.js";import"./VDivider.0f44b1ce.js";const q={ts:`<template>
  <VAlert color="primary">
    Good Morning! Start your day with some alerts.
  </VAlert>
</template>
`,js:`<template>
  <VAlert color="primary">
    Good Morning! Start your day with some alerts.
  </VAlert>
</template>
`},z={ts:`<template>
  <div class="demo-space-y">
    <VAlert
      color="primary"
      border="top"
      variant="tonal"
    >
      Good Morning! Start your day with some alerts.
    </VAlert>

    <VAlert
      border="end"
      color="secondary"
      variant="tonal"
    >
      Good Morning! Start your day with some alerts.
    </VAlert>

    <VAlert
      border="bottom"
      color="success"
      variant="tonal"
    >
      Good Morning! Start your day with some alerts.
    </VAlert>

    <VAlert
      border="start"
      color="info"
      variant="tonal"
    >
      Good Morning! Start your day with some alerts.
    </VAlert>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-y">
    <VAlert
      color="primary"
      border="top"
      variant="tonal"
    >
      Good Morning! Start your day with some alerts.
    </VAlert>

    <VAlert
      border="end"
      color="secondary"
      variant="tonal"
    >
      Good Morning! Start your day with some alerts.
    </VAlert>

    <VAlert
      border="bottom"
      color="success"
      variant="tonal"
    >
      Good Morning! Start your day with some alerts.
    </VAlert>

    <VAlert
      border="start"
      color="info"
      variant="tonal"
    >
      Good Morning! Start your day with some alerts.
    </VAlert>
  </div>
</template>
`},N={ts:`<script lang="ts" setup>
const isAlertVisible = ref(true)
<\/script>

<template>
  <VAlert
    v-model="isAlertVisible"
    closable
    close-label="Close Alert"
    color="primary"
  >
    Pudding wafer I love chocolate bar wafer chupa chups wafer. Cake gummies pudding gummies cake.
  </VAlert>

  <!-- Button -->
  <div class="text-center">
    <VBtn
      v-if="!isAlertVisible"
      @click="isAlertVisible = true"
    >
      Reset
    </VBtn>
  </div>
</template>
`,js:`<script setup>
const isAlertVisible = ref(true)
<\/script>

<template>
  <VAlert
    v-model="isAlertVisible"
    closable
    close-label="Close Alert"
    color="primary"
  >
    Pudding wafer I love chocolate bar wafer chupa chups wafer. Cake gummies pudding gummies cake.
  </VAlert>

  <!-- Button -->
  <div class="text-center">
    <VBtn
      v-if="!isAlertVisible"
      @click="isAlertVisible = true"
    >
      Reset
    </VBtn>
  </div>
</template>
`},J={ts:`<template>
  <div class="demo-space-y">
    <VAlert
      border="start"
      border-color="primary"
    >
      Cake sweet roll sesame snaps cheesecake halvah apple pie gingerbread cake.
    </VAlert>
    <VAlert
      border="start"
      border-color="secondary"
    >
      Cookie brownie tootsie roll pudding biscuit chupa chups. Drag\xE9e gingerbread carrot.
    </VAlert>
    <VAlert
      border="start"
      border-color="success"
    >
      Gingerbread jelly beans macaroon croissant souffl\xE9. Muffin halvah cake brownie cake.
    </VAlert>
    <VAlert
      border="start"
      border-color="info"
    >
      Muffin I love wafer pudding caramels jelly beans fruitcake I love cotton candy.
    </VAlert>

    <VAlert
      border="start"
      border-color="warning"
    >
      Cake sweet roll sesame snaps cheesecake halvah apple pie gingerbread cake.
    </VAlert>

    <VAlert
      border="start"
      border-color="error"
    >
      Lemon drops tootsie roll liquorice marzipan lollipop I love tiramisu tootsie roll.
    </VAlert>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-y">
    <VAlert
      border="start"
      border-color="primary"
    >
      Cake sweet roll sesame snaps cheesecake halvah apple pie gingerbread cake.
    </VAlert>
    <VAlert
      border="start"
      border-color="secondary"
    >
      Cookie brownie tootsie roll pudding biscuit chupa chups. Drag\xE9e gingerbread carrot.
    </VAlert>
    <VAlert
      border="start"
      border-color="success"
    >
      Gingerbread jelly beans macaroon croissant souffl\xE9. Muffin halvah cake brownie cake.
    </VAlert>
    <VAlert
      border="start"
      border-color="info"
    >
      Muffin I love wafer pudding caramels jelly beans fruitcake I love cotton candy.
    </VAlert>

    <VAlert
      border="start"
      border-color="warning"
    >
      Cake sweet roll sesame snaps cheesecake halvah apple pie gingerbread cake.
    </VAlert>

    <VAlert
      border="start"
      border-color="error"
    >
      Lemon drops tootsie roll liquorice marzipan lollipop I love tiramisu tootsie roll.
    </VAlert>
  </div>
</template>
`},E={ts:`<template>
  <div class="demo-space-y">
    <VAlert color="primary">
      I'm an alert with primary background color.
    </VAlert>

    <VAlert color="secondary">
      I'm an alert with secondary background color.
    </VAlert>

    <VAlert color="success">
      I'm an alert with success background color.
    </VAlert>

    <VAlert color="info">
      I'm an alert with info background color.
    </VAlert>

    <VAlert color="warning">
      I'm an alert with warning background color.
    </VAlert>

    <VAlert color="error">
      I'm an alert with error background color.
    </VAlert>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-y">
    <VAlert color="primary">
      I'm an alert with primary background color.
    </VAlert>

    <VAlert color="secondary">
      I'm an alert with secondary background color.
    </VAlert>

    <VAlert color="success">
      I'm an alert with success background color.
    </VAlert>

    <VAlert color="info">
      I'm an alert with info background color.
    </VAlert>

    <VAlert color="warning">
      I'm an alert with warning background color.
    </VAlert>

    <VAlert color="error">
      I'm an alert with error background color.
    </VAlert>
  </div>
</template>
`},R={ts:`<template>
  <div class="demo-space-y">
    <VAlert
      density="compact"
      color="primary"
      variant="tonal"
    >
      I'm a compact alert with a <strong>color</strong> of primary.
    </VAlert>

    <VAlert
      density="comfortable"
      color="secondary"
      variant="tonal"
    >
      I'm a comfortable alert with the <strong>variant</strong> prop and a <strong>color</strong> of secondary.
    </VAlert>

    <VAlert
      density="default"
      color="success"
      variant="tonal"
    >
      I'm a default alert with the <strong>color</strong> of success.
    </VAlert>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-y">
    <VAlert
      density="compact"
      color="primary"
      variant="tonal"
    >
      I'm a compact alert with a <strong>color</strong> of primary.
    </VAlert>

    <VAlert
      density="comfortable"
      color="secondary"
      variant="tonal"
    >
      I'm a comfortable alert with the <strong>variant</strong> prop and a <strong>color</strong> of secondary.
    </VAlert>

    <VAlert
      density="default"
      color="success"
      variant="tonal"
    >
      I'm a default alert with the <strong>color</strong> of success.
    </VAlert>
  </div>
</template>
`},L={ts:`<script lang="ts" setup>
const alertShadow = ref(5)
<\/script>

<template>
  <VSlider
    v-model="alertShadow"
    color="primary"
    :max="24"
    :min="0"
    :step="1"
    thumb-label
  />

  <VAlert
    color="primary"
    :elevation="alertShadow"
  >
    I'm an alert with box shadow.
  </VAlert>
</template>
`,js:`<script setup>
const alertShadow = ref(5)
<\/script>

<template>
  <VSlider
    v-model="alertShadow"
    color="primary"
    :max="24"
    :min="0"
    :step="1"
    thumb-label
  />

  <VAlert
    color="primary"
    :elevation="alertShadow"
  >
    I'm an alert with box shadow.
  </VAlert>
</template>
`},U={ts:`<template>
  <div class="demo-space-y">
    <VAlert
      color="primary"
      icon="tabler-egg-cracked"
    >
      Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
    </VAlert>

    <VAlert
      color="secondary"
      icon="tabler-device-desktop-analytics"
    >
      Phasellus blandit leo ut odio. Morbi mattis ullamcorper velit.
    </VAlert>

    <VAlert
      color="success"
      icon="tabler-brand-vue"
    >
      Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
    </VAlert>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-y">
    <VAlert
      color="primary"
      icon="tabler-egg-cracked"
    >
      Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
    </VAlert>

    <VAlert
      color="secondary"
      icon="tabler-device-desktop-analytics"
    >
      Phasellus blandit leo ut odio. Morbi mattis ullamcorper velit.
    </VAlert>

    <VAlert
      color="success"
      icon="tabler-brand-vue"
    >
      Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
    </VAlert>
  </div>
</template>
`},H={ts:`<template>
  <div class="demo-space-y">
    <VAlert
      variant="outlined"
      color="primary"
    >
      Duis vel nibh at velit scelerisque suscipit. Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.
    </VAlert>

    <VAlert
      variant="outlined"
      color="secondary"
    >
      Praesent venenatis metus at tortor pulvinar varius. Aenean commodo ligula eget dolor. Praesent ac massa at ligula laoreet iaculis.
    </VAlert>

    <VAlert
      variant="outlined"
      color="success"
    >
      Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non nisl sit amet velit hendrerit rutrum.
    </VAlert>

    <VAlert
      variant="outlined"
      color="info"
    >
      Marshmallow jelly beans toffee. Sweet roll lemon drops muffin biscuit. Gummies jujubes halvah dessert cream croissant.
    </VAlert>

    <VAlert
      variant="outlined"
      color="warning"
    >
      Tootsie roll candy canes wafer icing sweet jelly macaroon. Caramels icing fruitcake chocolate cake cake donut.
    </VAlert>

    <VAlert
      variant="outlined"
      color="error"
    >
      Jelly beans drag\xE9e jelly. Cotton candy danish chocolate cake. Carrot cake pastry jelly beans gummi bears.
    </VAlert>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-y">
    <VAlert
      variant="outlined"
      color="primary"
    >
      Duis vel nibh at velit scelerisque suscipit. Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.
    </VAlert>

    <VAlert
      variant="outlined"
      color="secondary"
    >
      Praesent venenatis metus at tortor pulvinar varius. Aenean commodo ligula eget dolor. Praesent ac massa at ligula laoreet iaculis.
    </VAlert>

    <VAlert
      variant="outlined"
      color="success"
    >
      Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non nisl sit amet velit hendrerit rutrum.
    </VAlert>

    <VAlert
      variant="outlined"
      color="info"
    >
      Marshmallow jelly beans toffee. Sweet roll lemon drops muffin biscuit. Gummies jujubes halvah dessert cream croissant.
    </VAlert>

    <VAlert
      variant="outlined"
      color="warning"
    >
      Tootsie roll candy canes wafer icing sweet jelly macaroon. Caramels icing fruitcake chocolate cake cake donut.
    </VAlert>

    <VAlert
      variant="outlined"
      color="error"
    >
      Jelly beans drag\xE9e jelly. Cotton candy danish chocolate cake. Carrot cake pastry jelly beans gummi bears.
    </VAlert>
  </div>
</template>
`},F={ts:`<template>
  <div class="demo-space-y">
    <VAlert
      prominent
      type="info"
    >
      <template #text>
        Macaroon I love tiramisu I love wafer apple pie jelly beans shortbread.
      </template>
    </VAlert>

    <VAlert
      color="success"
      icon="tabler-school"
      prominent
    >
      Cotton candy tart tiramisu lollipop gummi bears oat cake cupcake macaroon.
    </VAlert>

    <VAlert
      icon="tabler-shield-lock"
      prominent
      type="warning"
    >
      Ice cream candy I love wafer bonbon gingerbread candy canes tiramisu.
    </VAlert>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-y">
    <VAlert
      prominent
      type="info"
    >
      <template #text>
        Macaroon I love tiramisu I love wafer apple pie jelly beans shortbread.
      </template>
    </VAlert>

    <VAlert
      color="success"
      icon="tabler-school"
      prominent
    >
      Cotton candy tart tiramisu lollipop gummi bears oat cake cupcake macaroon.
    </VAlert>

    <VAlert
      icon="tabler-shield-lock"
      prominent
      type="warning"
    >
      Ice cream candy I love wafer bonbon gingerbread candy canes tiramisu.
    </VAlert>
  </div>
</template>
`},O={ts:`<template>
  <div class="demo-space-y">
    <VAlert
      variant="tonal"
      color="primary"
    >
      Maecenas nec odio et ante tincidunt tempus. Sed mollis, eros et ultrices tempus.
    </VAlert>

    <VAlert
      variant="tonal"
      color="secondary"
    >
      Nullam tincidunt adipiscing enim. In consectetuer turpis ut velit.
    </VAlert>

    <VAlert
      variant="tonal"
      color="success"
    >
      Vestibulum ullamcorper mauris at ligula. Nulla porta dolor.
    </VAlert>

    <VAlert
      variant="tonal"
      color="info"
    >
      Praesent blandit laoreet nibh. Praesent nonummy mi in odio. Phasellus tempus. Mauris turpis nunc.
    </VAlert>

    <VAlert
      variant="tonal"
      color="warning"
    >
      Marzipan topping croissant cake sweet roll ice cream souffl\xE9 chocolate. Jelly beans chupa chups tootsie roll biscuit.
    </VAlert>

    <VAlert
      variant="tonal"
      color="error"
    >
      Marzipan topping croissant cake sweet roll ice cream souffl\xE9 chocolate. Jelly beans chupa chups tootsie roll biscuit.
    </VAlert>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-y">
    <VAlert
      variant="tonal"
      color="primary"
    >
      Maecenas nec odio et ante tincidunt tempus. Sed mollis, eros et ultrices tempus.
    </VAlert>

    <VAlert
      variant="tonal"
      color="secondary"
    >
      Nullam tincidunt adipiscing enim. In consectetuer turpis ut velit.
    </VAlert>

    <VAlert
      variant="tonal"
      color="success"
    >
      Vestibulum ullamcorper mauris at ligula. Nulla porta dolor.
    </VAlert>

    <VAlert
      variant="tonal"
      color="info"
    >
      Praesent blandit laoreet nibh. Praesent nonummy mi in odio. Phasellus tempus. Mauris turpis nunc.
    </VAlert>

    <VAlert
      variant="tonal"
      color="warning"
    >
      Marzipan topping croissant cake sweet roll ice cream souffl\xE9 chocolate. Jelly beans chupa chups tootsie roll biscuit.
    </VAlert>

    <VAlert
      variant="tonal"
      color="error"
    >
      Marzipan topping croissant cake sweet roll ice cream souffl\xE9 chocolate. Jelly beans chupa chups tootsie roll biscuit.
    </VAlert>
  </div>
</template>
`},Y={ts:`<template>
  <div class="demo-space-y">
    <VAlert type="info">
      I'm a alert with a <strong>type</strong> of info
    </VAlert>

    <VAlert type="success">
      I'm a alert with a <strong>type</strong> of success
    </VAlert>

    <VAlert type="warning">
      I'm a alert with a <strong>type</strong> of warning
    </VAlert>

    <VAlert type="error">
      I'm a alert with a <strong>type</strong> of error
    </VAlert>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-y">
    <VAlert type="info">
      I'm a alert with a <strong>type</strong> of info
    </VAlert>

    <VAlert type="success">
      I'm a alert with a <strong>type</strong> of success
    </VAlert>

    <VAlert type="warning">
      I'm a alert with a <strong>type</strong> of warning
    </VAlert>

    <VAlert type="error">
      I'm a alert with a <strong>type</strong> of error
    </VAlert>
  </div>
</template>
`},K={ts:`<script lang="ts" setup>
const isAlertVisible = ref(true)
<\/script>

<template>
  <div class="alert-demo-v-model-wrapper">
    <VAlert
      v-model="isAlertVisible"
      color="warning"
      variant="tonal"
    >
      non adipiscing dolor urna a orci. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur blandit mollis lacus. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo.
    </VAlert>
  </div>

  <!-- button -->
  <VBtn @click="isAlertVisible = !isAlertVisible">
    {{ isAlertVisible ? "Hide Alert" : "Show Alert" }}
  </VBtn>
</template>

<style lang="scss">
.alert-demo-v-model-wrapper {
  margin-block-end: 1rem;
  min-block-size: 80px;
}
</style>
`,js:`<script setup>
const isAlertVisible = ref(true)
<\/script>

<template>
  <div class="alert-demo-v-model-wrapper">
    <VAlert
      v-model="isAlertVisible"
      color="warning"
      variant="tonal"
    >
      non adipiscing dolor urna a orci. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur blandit mollis lacus. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo.
    </VAlert>
  </div>

  <!-- button -->
  <VBtn @click="isAlertVisible = !isAlertVisible">
    {{ isAlertVisible ? "Hide Alert" : "Show Alert" }}
  </VBtn>
</template>

<style lang="scss">
.alert-demo-v-model-wrapper {
  margin-block-end: 1rem;
  min-block-size: 80px;
}
</style>
`},Q={},W={class:"demo-space-y"};function X(c,a){return s(),u("div",W,[t(l,{prominent:"",type:"info"},{text:o(()=>[e(" Macaroon I love tiramisu I love wafer apple pie jelly beans shortbread. ")]),_:1}),t(l,{color:"success",icon:"tabler-school",prominent:""},{default:o(()=>[e(" Cotton candy tart tiramisu lollipop gummi bears oat cake cupcake macaroon. ")]),_:1}),t(l,{icon:"tabler-shield-lock",prominent:"",type:"warning"},{default:o(()=>[e(" Ice cream candy I love wafer bonbon gingerbread candy canes tiramisu. ")]),_:1})])}const Z=p(Q,[["render",X]]),ee={__name:"DemoAlertElevation",setup(c){const a=f(5);return(_,i)=>(s(),u(h,null,[t(B,{modelValue:m(a),"onUpdate:modelValue":i[0]||(i[0]=n=>b(a)?a.value=n:null),color:"primary",max:24,min:0,step:1,"thumb-label":""},null,8,["modelValue"]),t(l,{color:"primary",elevation:m(a)},{default:o(()=>[e(" I'm an alert with box shadow. ")]),_:1},8,["elevation"])],64))}},te={},oe={class:"demo-space-y"};function re(c,a){return s(),u("div",oe,[t(l,{variant:"tonal",color:"primary"},{default:o(()=>[e(" Maecenas nec odio et ante tincidunt tempus. Sed mollis, eros et ultrices tempus. ")]),_:1}),t(l,{variant:"tonal",color:"secondary"},{default:o(()=>[e(" Nullam tincidunt adipiscing enim. In consectetuer turpis ut velit. ")]),_:1}),t(l,{variant:"tonal",color:"success"},{default:o(()=>[e(" Vestibulum ullamcorper mauris at ligula. Nulla porta dolor. ")]),_:1}),t(l,{variant:"tonal",color:"info"},{default:o(()=>[e(" Praesent blandit laoreet nibh. Praesent nonummy mi in odio. Phasellus tempus. Mauris turpis nunc. ")]),_:1}),t(l,{variant:"tonal",color:"warning"},{default:o(()=>[e(" Marzipan topping croissant cake sweet roll ice cream souffl\xE9 chocolate. Jelly beans chupa chups tootsie roll biscuit. ")]),_:1}),t(l,{variant:"tonal",color:"error"},{default:o(()=>[e(" Marzipan topping croissant cake sweet roll ice cream souffl\xE9 chocolate. Jelly beans chupa chups tootsie roll biscuit. ")]),_:1})])}const le=p(te,[["render",re]]),ae={},ne={class:"demo-space-y"};function se(c,a){return s(),u("div",ne,[t(l,{variant:"outlined",color:"primary"},{default:o(()=>[e(" Duis vel nibh at velit scelerisque suscipit. Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc. ")]),_:1}),t(l,{variant:"outlined",color:"secondary"},{default:o(()=>[e(" Praesent venenatis metus at tortor pulvinar varius. Aenean commodo ligula eget dolor. Praesent ac massa at ligula laoreet iaculis. ")]),_:1}),t(l,{variant:"outlined",color:"success"},{default:o(()=>[e(" Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non nisl sit amet velit hendrerit rutrum. ")]),_:1}),t(l,{variant:"outlined",color:"info"},{default:o(()=>[e(" Marshmallow jelly beans toffee. Sweet roll lemon drops muffin biscuit. Gummies jujubes halvah dessert cream croissant. ")]),_:1}),t(l,{variant:"outlined",color:"warning"},{default:o(()=>[e(" Tootsie roll candy canes wafer icing sweet jelly macaroon. Caramels icing fruitcake chocolate cake cake donut. ")]),_:1}),t(l,{variant:"outlined",color:"error"},{default:o(()=>[e(" Jelly beans drag\xE9e jelly. Cotton candy danish chocolate cake. Carrot cake pastry jelly beans gummi bears. ")]),_:1})])}const ie=p(ae,[["render",se]]);const ce={class:"alert-demo-v-model-wrapper"},de={__name:"DemoAlertVModelSupport",setup(c){const a=f(!0);return(_,i)=>(s(),u(h,null,[r("div",ce,[t(l,{modelValue:m(a),"onUpdate:modelValue":i[0]||(i[0]=n=>b(a)?a.value=n:null),color:"warning",variant:"tonal"},{default:o(()=>[e(" non adipiscing dolor urna a orci. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur blandit mollis lacus. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. ")]),_:1},8,["modelValue"])]),t(g,{onClick:i[1]||(i[1]=n=>a.value=!m(a))},{default:o(()=>[e(D(m(a)?"Hide Alert":"Show Alert"),1)]),_:1})],64))}},ue={class:"text-center"},pe={__name:"DemoAlertClosable",setup(c){const a=f(!0);return(_,i)=>(s(),u(h,null,[t(l,{modelValue:m(a),"onUpdate:modelValue":i[0]||(i[0]=n=>b(a)?a.value=n:null),closable:"","close-label":"Close Alert",color:"primary"},{default:o(()=>[e(" Pudding wafer I love chocolate bar wafer chupa chups wafer. Cake gummies pudding gummies cake. ")]),_:1},8,["modelValue"]),r("div",ue,[m(a)?P("",!0):(s(),y(g,{key:0,onClick:i[1]||(i[1]=n=>a.value=!0)},{default:o(()=>[e(" Reset ")]),_:1}))])],64))}},me={},_e={class:"demo-space-y"},fe=r("strong",null,"type",-1),be=r("strong",null,"type",-1),he=r("strong",null,"type",-1),ye=r("strong",null,"type",-1);function ge(c,a){return s(),u("div",_e,[t(l,{type:"info"},{default:o(()=>[e(" I'm a alert with a "),fe,e(" of info ")]),_:1}),t(l,{type:"success"},{default:o(()=>[e(" I'm a alert with a "),be,e(" of success ")]),_:1}),t(l,{type:"warning"},{default:o(()=>[e(" I'm a alert with a "),he,e(" of warning ")]),_:1}),t(l,{type:"error"},{default:o(()=>[e(" I'm a alert with a "),ye,e(" of error ")]),_:1})])}const ve=p(me,[["render",ge]]),Ae={},Ve={class:"demo-space-y"},we=r("strong",null,"color",-1),ke=r("strong",null,"variant",-1),Ie=r("strong",null,"color",-1),Ce=r("strong",null,"color",-1);function Se(c,a){return s(),u("div",Ve,[t(l,{density:"compact",color:"primary",variant:"tonal"},{default:o(()=>[e(" I'm a compact alert with a "),we,e(" of primary. ")]),_:1}),t(l,{density:"comfortable",color:"secondary",variant:"tonal"},{default:o(()=>[e(" I'm a comfortable alert with the "),ke,e(" prop and a "),Ie,e(" of secondary. ")]),_:1}),t(l,{density:"default",color:"success",variant:"tonal"},{default:o(()=>[e(" I'm a default alert with the "),Ce,e(" of success. ")]),_:1})])}const Me=p(Ae,[["render",Se]]),$e={},je={class:"demo-space-y"};function xe(c,a){return s(),u("div",je,[t(l,{border:"start","border-color":"primary"},{default:o(()=>[e(" Cake sweet roll sesame snaps cheesecake halvah apple pie gingerbread cake. ")]),_:1}),t(l,{border:"start","border-color":"secondary"},{default:o(()=>[e(" Cookie brownie tootsie roll pudding biscuit chupa chups. Drag\xE9e gingerbread carrot. ")]),_:1}),t(l,{border:"start","border-color":"success"},{default:o(()=>[e(" Gingerbread jelly beans macaroon croissant souffl\xE9. Muffin halvah cake brownie cake. ")]),_:1}),t(l,{border:"start","border-color":"info"},{default:o(()=>[e(" Muffin I love wafer pudding caramels jelly beans fruitcake I love cotton candy. ")]),_:1}),t(l,{border:"start","border-color":"warning"},{default:o(()=>[e(" Cake sweet roll sesame snaps cheesecake halvah apple pie gingerbread cake. ")]),_:1}),t(l,{border:"start","border-color":"error"},{default:o(()=>[e(" Lemon drops tootsie roll liquorice marzipan lollipop I love tiramisu tootsie roll. ")]),_:1})])}const De=p($e,[["render",xe]]),Pe={},Be={class:"demo-space-y"};function Ge(c,a){return s(),u("div",Be,[t(l,{color:"primary",border:"top",variant:"tonal"},{default:o(()=>[e(" Good Morning! Start your day with some alerts. ")]),_:1}),t(l,{border:"end",color:"secondary",variant:"tonal"},{default:o(()=>[e(" Good Morning! Start your day with some alerts. ")]),_:1}),t(l,{border:"bottom",color:"success",variant:"tonal"},{default:o(()=>[e(" Good Morning! Start your day with some alerts. ")]),_:1}),t(l,{border:"start",color:"info",variant:"tonal"},{default:o(()=>[e(" Good Morning! Start your day with some alerts. ")]),_:1})])}const Te=p(Pe,[["render",Ge]]),qe={},ze={class:"demo-space-y"};function Ne(c,a){return s(),u("div",ze,[t(l,{color:"primary",icon:"tabler-egg-cracked"},{default:o(()=>[e(" Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. ")]),_:1}),t(l,{color:"secondary",icon:"tabler-device-desktop-analytics"},{default:o(()=>[e(" Phasellus blandit leo ut odio. Morbi mattis ullamcorper velit. ")]),_:1}),t(l,{color:"success",icon:"tabler-brand-vue"},{default:o(()=>[e(" Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. ")]),_:1})])}const Je=p(qe,[["render",Ne]]),Ee={},Re={class:"demo-space-y"};function Le(c,a){return s(),u("div",Re,[t(l,{color:"primary"},{default:o(()=>[e(" I'm an alert with primary background color. ")]),_:1}),t(l,{color:"secondary"},{default:o(()=>[e(" I'm an alert with secondary background color. ")]),_:1}),t(l,{color:"success"},{default:o(()=>[e(" I'm an alert with success background color. ")]),_:1}),t(l,{color:"info"},{default:o(()=>[e(" I'm an alert with info background color. ")]),_:1}),t(l,{color:"warning"},{default:o(()=>[e(" I'm an alert with warning background color. ")]),_:1}),t(l,{color:"error"},{default:o(()=>[e(" I'm an alert with error background color. ")]),_:1})])}const Ue=p(Ee,[["render",Le]]),He={};function Fe(c,a){return s(),y(l,{color:"primary"},{default:o(()=>[e(" Good Morning! Start your day with some alerts. ")]),_:1})}const Oe=p(He,[["render",Fe]]),Ye=r("p",null,[e("The "),r("code",null,"color"),e(" prop is used to change the background color of the alert.")],-1),Ke=r("p",null,[e("The "),r("code",null,"icon"),e(" prop allows you to add an icon to the beginning of the alert component. If a "),r("code",null,"type"),e(" is provided, this will override the default type icon. Additionally, setting the "),r("code",null,"icon"),e(" prop to false will remove the icon altogether.")],-1),Qe=r("p",null,[e("The "),r("code",null,"border"),e(" prop adds a simple border to one of the 4 sides of the alert. This can be combined with props like "),r("code",null,"color"),e(", "),r("code",null,"type"),e(" and "),r("code",null,"icon"),e(" to provide unique accents to the alert.")],-1),We=r("p",null,[e("The "),r("code",null,"colored-border"),e(" prop removes the alert background in order to accent the "),r("code",null,"border"),e(" prop. If a type is set, it will use the type's default color. If no "),r("code",null,"color"),e(" or "),r("code",null,"type"),e(" is set, the color will default to the inverted color of the applied theme (black for light and white/gray for dark).")],-1),Xe=r("p",null,[e("The "),r("code",null,"density"),e(" prop decreases the height of the alert based upon 1 of 3 levels of density. "),r("code",null,"default"),e(", "),r("code",null,"comfortable"),e(", and "),r("code",null,"compact"),e(".")],-1),Ze=r("p",null,[e("The "),r("code",null,"type"),e(" prop provides 4 default v-alert styles: "),r("code",null,"success"),e(", "),r("code",null,"info"),e(", "),r("code",null,"warning"),e(", and "),r("code",null,"error"),e(". Each of these styles provide a default icon and color.")],-1),et=r("p",null,[e("The "),r("code",null,"closable"),e(" prop adds a close button to the end of the alert component. Clicking this button will set its value to false and effectively hide the alert.")],-1),tt=r("p",null,[e("Clicking this button will set its value to "),r("code",null,"false"),e(" and effectively hide the alert. You can restore the alert by binding "),r("code",null,"v-model"),e(" and setting it to true.")],-1),ot=r("p",null,[e("The "),r("code",null,'variant="outlined"'),e(" prop inverts the style of an alert, inheriting the currently applied "),r("code",null,"color"),e(", applying it to the text and border, and making its background transparent.")],-1),rt=r("p",null,[e("The "),r("code",null,"variant"),e(" prop provides an easy way to change the overall style of your alerts. The "),r("code",null,'variant="tonal"'),e(" prop is a simple alert variant that applies a reduced opacity background of the provided color.")],-1),lt=r("p",null,[e("Use "),r("code",null,"elevation"),e(" prop to set a box-shadow to alert.")],-1),at=r("p",null,[e("The "),r("code",null,"prominent"),e(" prop provides a more pronounced alert by increasing the size of the icon.")],-1),kt={__name:"alert",setup(c){return(a,_)=>{const i=Oe,n=G,v=Ue,A=Je,V=Te,w=De,k=Me,I=ve,C=pe,S=de,M=ie,$=le,j=ee,x=Z;return s(),y(T,null,{default:o(()=>[t(d,{cols:"12"},{default:o(()=>[t(n,{title:"Basic",code:q},{default:o(()=>[t(i)]),_:1},8,["code"])]),_:1}),t(d,{cols:"12"},{default:o(()=>[t(n,{title:"Colors",code:E},{default:o(()=>[Ye,t(v)]),_:1},8,["code"])]),_:1}),t(d,{cols:"12"},{default:o(()=>[t(n,{title:"Icons",code:U},{default:o(()=>[Ke,t(A)]),_:1},8,["code"])]),_:1}),t(d,{cols:"12"},{default:o(()=>[t(n,{title:"Border",code:z},{default:o(()=>[Qe,t(V)]),_:1},8,["code"])]),_:1}),t(d,{cols:"12"},{default:o(()=>[t(n,{title:"Colored Border",code:J},{default:o(()=>[We,t(w)]),_:1},8,["code"])]),_:1}),t(d,{cols:"12"},{default:o(()=>[t(n,{title:"Density",code:R},{default:o(()=>[Xe,t(k)]),_:1},8,["code"])]),_:1}),t(d,{cols:"12"},{default:o(()=>[t(n,{title:"Type",code:Y},{default:o(()=>[Ze,t(I)]),_:1},8,["code"])]),_:1}),t(d,{cols:"12"},{default:o(()=>[t(n,{title:"Closable",code:N},{default:o(()=>[et,t(C)]),_:1},8,["code"])]),_:1}),t(d,{cols:"12"},{default:o(()=>[t(n,{title:"v-model support",code:K},{default:o(()=>[tt,t(S)]),_:1},8,["code"])]),_:1}),t(d,{cols:"12"},{default:o(()=>[t(n,{title:"Outlined",code:H},{default:o(()=>[ot,t(M)]),_:1},8,["code"])]),_:1}),t(d,{cols:"12"},{default:o(()=>[t(n,{title:"Tonal",code:O},{default:o(()=>[rt,t($)]),_:1},8,["code"])]),_:1}),t(d,{cols:"12"},{default:o(()=>[t(n,{title:"Elevation",code:L},{default:o(()=>[lt,t(j)]),_:1},8,["code"])]),_:1}),t(d,{cols:"12"},{default:o(()=>[t(n,{title:"Prominent",code:F},{default:o(()=>[at,t(x)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{kt as default};
