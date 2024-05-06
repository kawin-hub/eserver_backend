import{k as f,$ as G,o as b,b as A,w as l,p as t,q as s,D as F,E as v,be as O,L as B,m as e,c as z,F as C,a as P,x as y,C as _,P as R,al as K,bd as Q}from"./index.35991f09.js";import{_ as M}from"./AppDateTimePicker.f12e24e3.js";import{b as D}from"./route-block.182765af.js";import{a as i,V as g}from"./VRow.f9366793.js";import{V as S,c as h}from"./VCard.bb37f72e.js";import{V as U}from"./VDivider.0f44b1ce.js";import{V as L}from"./VForm.9ba2d763.js";import{V as x}from"./VTextField.4609cb9e.js";import{V as H}from"./VSelect.1bdb2ecc.js";import{V as p}from"./VBtn.3e0f2bdf.js";import{V as N}from"./VTable.0fe7de7a.js";import{M as I}from"./FileInputSelectionSlot.ae91cc9f.js";import{V as X}from"./VSpacer.80b37d7c.js";import{V as Y}from"./VTextarea.0a746d96.js";import{V as ee}from"./VNavigationDrawer.92fc0e14.js";import{V as te}from"./VAutocomplete.75de4477.js";import{V as T}from"./VChip.81c7dee3.js";import{V as le,a as ae}from"./VTabs.6d0b43a6.js";import{V as k,a as j}from"./VWindowItem.f35c6905.js";import"./VField.93eb26cb.js";import"./index.a8f66a9c.js";import"./VInput.6bf7b46e.js";import"./router.88351000.js";import"./form.e84299e4.js";import"./VImg.632117c3.js";import"./position.15b8fc3a.js";import"./easing.36b781ab.js";import"./VAvatar.6ed53308.js";import"./forwardRefs.c003b6b8.js";/* empty css                   */import"./VCounter.cb1a1153.js";import"./VList.8e9051e1.js";import"./dialog-transition.13a8c048.js";import"./VMenu.768d7784.js";import"./scopeId.a8f1d836.js";import"./VOverlay.a330b104.js";import"./lazy.7e795ed8.js";import"./VCheckboxBtn.a302f7e6.js";import"./VSelectionControl.6ac8e090.js";import"./no-image.bc16c952.js";import"./ConfirmationPopup.26c6d5ed.js";import"./DialogCloseBtn.9d70464b.js";import"./VDialog.61de6f6e.js";/* empty css                                                                               */import"./VFileInput.c9eefa19.js";import"./ssrBoot.8b43ebe3.js";import"./filter.f86a5c3d.js";import"./VSlideGroup.6d88d719.js";const J={__name:"customer",setup(V){const r={installationNumber:"PRO123456",projectType:"Install",customerType:"Project",salesman:"Sale 001",customerName:"Company 01",customerContactNumber:"091-919-9218",mainInstallationContactName:"Eva Davis",mainInstallationContactNumber:"091-212-2245",projectName:"Supalai Palm Spring Rama 2",siteAddress:"\u0E16\u0E19\u0E19\u0E1E\u0E23\u0E30\u0E23\u0E32\u0E21 2 \u0E15\u0E33\u0E1A\u0E25\u0E42\u0E04\u0E01\u0E02\u0E32\u0E21 \u0E2D\u0E33\u0E40\u0E20\u0E2D\u0E40\u0E21\u0E37\u0E2D\u0E07\u0E2A\u0E21\u0E38\u0E17\u0E23\u0E2A\u0E32\u0E04\u0E23 \u0E08\u0E31\u0E07\u0E2B\u0E27\u0E31\u0E14\u0E2A\u0E21\u0E38\u0E17\u0E23\u0E2A\u0E32\u0E04\u0E23 74000",siteGoogleMap:"https://goo.gl/maps/ViC5o53rnu3u4pKU7",estimateInstallationDate:"2024-02-20",DoneDate:"",projectStatus:"\u0E2A\u0E48\u0E07\u0E04\u0E33\u0E02\u0E2D"};f();const a=f(structuredClone(r));f(!1),f([]);const c=[{title:"\u0E2A\u0E48\u0E07\u0E04\u0E33\u0E02\u0E2D",value:"request"},{title:"\u0E23\u0E31\u0E1A\u0E04\u0E33\u0E02\u0E2D",value:"receive"},{title:"\u0E23\u0E2D\u0E19\u0E31\u0E14\u0E2B\u0E21\u0E32\u0E22\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07",value:"await"},{title:"\u0E19\u0E31\u0E14\u0E2B\u0E21\u0E32\u0E22\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E41\u0E25\u0E49\u0E27",value:"appointment"},{title:"\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E41\u0E25\u0E49\u0E27",value:"installed"},{title:"\u0E04\u0E49\u0E32\u0E07\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07",value:"not complete"},{title:"\u0E2A\u0E48\u0E07\u0E21\u0E2D\u0E1A\u0E07\u0E32\u0E19\u0E41\u0E25\u0E49\u0E27",value:"done"},{title:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E42\u0E1B\u0E23\u0E40\u0E08\u0E47\u0E04",value:"cancel"}];f("");const m=f(""),$=()=>{a.value=structuredClone(r)};return G(()=>{}),(w,o)=>(b(),A(g,null,{default:l(()=>[t(i,{cols:"12"},{default:l(()=>[t(S,{title:"\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E07\u0E32\u0E19\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07"},{default:l(()=>[t(U),t(h,{class:"pt-2"},{default:l(()=>[t(L,{class:"mt-6"},{default:l(()=>[t(g,null,{default:l(()=>[t(i,{cols:"12",md:"6"},{default:l(()=>[t(x,{modelValue:s(a).installationNumber,"onUpdate:modelValue":o[0]||(o[0]=d=>s(a).installationNumber=d),label:"\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E07\u0E32\u0E19\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(x,{modelValue:s(a).customerType,"onUpdate:modelValue":o[1]||(o[1]=d=>s(a).customerType=d),label:"\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(x,{modelValue:s(a).projectType,"onUpdate:modelValue":o[2]||(o[2]=d=>s(a).projectType=d),label:"\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E07\u0E32\u0E19",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(x,{modelValue:s(a).salesman,"onUpdate:modelValue":o[3]||(o[3]=d=>s(a).salesman=d),label:"\u0E1D\u0E48\u0E32\u0E22\u0E02\u0E32\u0E22",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(x,{modelValue:s(a).customerName,"onUpdate:modelValue":o[4]||(o[4]=d=>s(a).customerName=d),label:"\u0E0A\u0E37\u0E48\u0E2D\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(x,{modelValue:s(a).customerContactNumber,"onUpdate:modelValue":o[5]||(o[5]=d=>s(a).customerContactNumber=d),label:"\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(x,{modelValue:s(a).mainInstallationContactName,"onUpdate:modelValue":o[6]||(o[6]=d=>s(a).mainInstallationContactName=d),label:"\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E07\u0E32\u0E19\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07 (\u0E2B\u0E25\u0E31\u0E01)",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(x,{modelValue:s(a).mainInstallationContactNumber,"onUpdate:modelValue":o[7]||(o[7]=d=>s(a).mainInstallationContactNumber=d),label:"\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E17\u0E1E\u0E4C\u0E1C\u0E39\u0E49\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E07\u0E32\u0E19\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07 (\u0E2B\u0E25\u0E31\u0E01)",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"12"},{default:l(()=>[t(x,{modelValue:s(a).projectName,"onUpdate:modelValue":o[8]||(o[8]=d=>s(a).projectName=d),label:"\u0E0A\u0E37\u0E48\u0E2D\u0E07\u0E32\u0E19",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"12"},{default:l(()=>[t(x,{modelValue:s(a).siteAddress,"onUpdate:modelValue":o[9]||(o[9]=d=>s(a).siteAddress=d),label:"\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"12"},{default:l(()=>[t(x,{modelValue:s(a).siteGoogleMap,"onUpdate:modelValue":o[10]||(o[10]=d=>s(a).siteGoogleMap=d),label:"Google Map",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(x,{modelValue:s(a).estimateInstallationDate,"onUpdate:modelValue":o[11]||(o[11]=d=>s(a).estimateInstallationDate=d),label:"\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(M,{modelValue:s(m),"onUpdate:modelValue":o[12]||(o[12]=d=>F(m)?m.value=d:null),label:" -- \u0E40\u0E25\u0E37\u0E2D\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E48\u0E07\u0E21\u0E2D\u0E1A\u0E07\u0E32\u0E19 -- ",clearable:"","clear-icon":"tabler-x"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"12"},{default:l(()=>[t(H,{modelValue:s(a).projectStatus,"onUpdate:modelValue":o[13]||(o[13]=d=>s(a).projectStatus=d),label:" -- \u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E07\u0E32\u0E19\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07 -- ",items:c,"menu-props":{maxHeight:200}},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:l(()=>[t(p,null,{default:l(()=>[v("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25")]),_:1}),t(p,{color:"secondary",variant:"tonal",type:"reset",onClick:O($,["prevent"])},{default:l(()=>[v(" \u0E25\u0E49\u0E32\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1}),t(U)]),_:1})]),_:1})]),_:1}))}};typeof D=="function"&&D(J);const W={},se=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32"),e("th",{scope:"col"},"\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14"),e("th",{scope:"col"},"\u0E08\u0E33\u0E19\u0E27\u0E19"),e("th",{scope:"col"},"\u0E04\u0E49\u0E32\u0E07\u0E40\u0E1A\u0E34\u0E01")])],-1),oe=e("tr",null,[e("td",null,[e("span",{class:"text-base"},"LS082WH-HKZB")]),e("td",null,[e("span",{class:"text-base"},"Smart Station Zigbee")]),e("td",null,[e("span",{class:"text-base"},"35")]),e("td",null,[e("span",{class:"text-base"},"10")])],-1),ne=e("tr",null,[e("td",null,[e("span",{class:"text-base"},"LS062WH")]),e("td",null,[e("span",{class:"text-base"},"Cube Motion Sensor (White color)")]),e("td",null,[e("span",{class:"text-base"},"10")]),e("td",null,[e("span",{class:"text-base"},"10")])],-1),de=e("tr",null,[e("td",null,[e("span",{class:"text-base"},"LS258")]),e("td",null,[e("span",{class:"text-base"},"New Indoor 1080P Camera")]),e("td",null,[e("span",{class:"text-base"},"5")]),e("td",null,[e("span",{class:"text-base"},"0")])],-1),ie=e("tr",null,[e("td",null,[e("span",{class:"text-base"},"SD-01-005")]),e("td",null,[e("span",{class:"text-base"},"Micro SD 64 GB For Camera")]),e("td",null,[e("span",{class:"text-base"},"5")]),e("td",null,[e("span",{class:"text-base"},"0")])],-1),ue=e("tr",null,[e("td",null,[e("span",{class:"text-base"},"LS136")]),e("td",null,[e("span",{class:"text-base"},"Universial remote Control (Spot) CoSS")]),e("td",null,[e("span",{class:"text-base"},"2")]),e("td",null,[e("span",{class:"text-base"},"2")])],-1),re={class:"text-capitalize text-base font-weight-semibold"},ce={class:"text-capitalize text-base font-weight-semibold"},pe={class:"text-capitalize text-base font-weight-semibold"},me={class:"text-capitalize text-base font-weight-semibold"};function _e(V,r){return b(),A(g,null,{default:l(()=>[t(i,{cols:"12"},{default:l(()=>[t(S,{title:"\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"},{default:l(()=>[t(U),t(h,{class:"pt-2"},{default:l(()=>[t(N,{class:"text-no-wrap"},{default:l(()=>[se,e("tbody",null,[oe,ne,de,ie,ue,(b(!0),z(C,null,P(V.filterData,a=>(b(),z("tr",{key:a._id,style:{height:"3.75rem"}},[e("td",null,[e("span",re,y(new Date(a.updatedAt).toString().split("GMT")[0]),1)]),e("td",null,[e("span",ce,y(new Date(a.updatedAt).toString().split("GMT")[0]),1)]),e("td",null,[e("span",pe,y(new Date(a.updatedAt).toString().split("GMT")[0]),1)]),e("td",null,[e("span",me,y(new Date(a.updatedAt).toString().split("GMT")[0]),1)])]))),128))])]),_:1}),t(U)]),_:1})]),_:1})]),_:1})]),_:1})}typeof D=="function"&&D(W);const fe=B(W,[["render",_e]]);const q={},be={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},xe=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32"),e("th",{scope:"col"},"\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14"),e("th",{scope:"col"},"\u0E08\u0E33\u0E19\u0E27\u0E19"),e("th",{scope:"col"},"\u0E04\u0E49\u0E32\u0E07\u0E40\u0E1A\u0E34\u0E01"),e("th",{scope:"col"},"\u0E40\u0E1A\u0E34\u0E01")])],-1),ye=e("td",null,[e("span",{class:"text-base"},"LS082WH-HKZB")],-1),Ve=e("td",null,[e("span",{class:"text-base"},"Smart Station Zigbee")],-1),ve=e("td",null,[e("span",{class:"text-base"},"35")],-1),we=e("td",null,[e("span",{class:"text-base"},"10")],-1),he={class:"text-center",style:{width:"5rem"}},De=e("td",null,[e("span",{class:"text-base"},"LS062WH")],-1),Fe=e("td",null,[e("span",{class:"text-base"},"Cube Motion Sensor (White color)")],-1),Ue=e("td",null,[e("span",{class:"text-base"},"10")],-1),ge=e("td",null,[e("span",{class:"text-base"},"10")],-1),$e={class:"text-center",style:{width:"5rem"}},Se=e("td",null,[e("span",{class:"text-base"},"LS258")],-1),ze=e("td",null,[e("span",{class:"text-base"},"New Indoor 1080P Camera")],-1),Ae=e("td",null,[e("span",{class:"text-base"},"5")],-1),Ce=e("td",null,[e("span",{class:"text-base"},"0")],-1),Pe={class:"text-center",style:{width:"5rem"}},Te=e("td",null,[e("span",{class:"text-base"},"SD-01-005")],-1),ke=e("td",null,[e("span",{class:"text-base"},"Micro SD 64 GB For Camera")],-1),je=e("td",null,[e("span",{class:"text-base"},"5")],-1),Ie=e("td",null,[e("span",{class:"text-base"},"0")],-1),Ne={class:"text-center",style:{width:"5rem"}},Me=e("td",null,[e("span",{class:"text-base"},"LS136")],-1),Oe=e("td",null,[e("span",{class:"text-base"},"Universial remote Control (Spot) CoSS")],-1),Le=e("td",null,[e("span",{class:"text-base"},"2")],-1),Ge=e("td",null,[e("span",{class:"text-base"},"2")],-1),Be={class:"text-center",style:{width:"5rem"}},He={class:"text-capitalize text-base font-weight-semibold"},Je={class:"text-capitalize text-base font-weight-semibold"},We={class:"text-capitalize text-base font-weight-semibold"},qe={class:"text-center",style:{width:"5rem"}};function Ee(V,r){return b(),A(g,null,{default:l(()=>[t(i,{cols:"12"},{default:l(()=>[t(S,null,{default:l(()=>[t(h,{class:"d-flex flex-wrap gap-4"},{default:l(()=>[e("div",be,[t(p,{"prepend-icon":"tabler-plus",onClick:r[0]||(r[0]=a=>{V.isAddNewCategoryDrawerVisible=!0,V.drawerType="add"})},{default:l(()=>[v(" \u0E40\u0E1A\u0E34\u0E01\u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ")]),_:1})])]),_:1}),t(U),t(h,{class:"pt-2"},{default:l(()=>[t(N,{class:"text-no-wrap"},{default:l(()=>[xe,e("tbody",null,[e("tr",null,[ye,Ve,ve,we,e("td",he,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-plus"})]),_:1})])]),e("tr",null,[De,Fe,Ue,ge,e("td",$e,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-plus"})]),_:1})])]),e("tr",null,[Se,ze,Ae,Ce,e("td",Pe,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-plus"})]),_:1})])]),e("tr",null,[Te,ke,je,Ie,e("td",Ne,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-plus"})]),_:1})])]),e("tr",null,[Me,Oe,Le,Ge,e("td",Be,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-plus"})]),_:1})])]),(b(!0),z(C,null,P(V.filterData,a=>(b(),z("tr",{key:a._id,style:{height:"3.75rem"}},[e("td",null,[e("span",He,y(new Date(a.updatedAt).toString().split("GMT")[0]),1)]),e("td",null,[e("span",Je,y(new Date(a.updatedAt).toString().split("GMT")[0]),1)]),e("td",null,[e("span",We,y(new Date(a.updatedAt).toString().split("GMT")[0]),1)]),e("td",qe,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-plus"})]),_:1})])]))),128))])]),_:1}),t(U)]),_:1})]),_:1})]),_:1})]),_:1})}typeof D=="function"&&D(q);const Ze=B(q,[["render",Ee]]),Re={class:"d-flex align-center pa-6 pb-1"},Ke=e("h6",{class:"text-h6"}," \u0E04\u0E27\u0E32\u0E21\u0E04\u0E34\u0E14\u0E40\u0E2B\u0E47\u0E19 ",-1),Qe={__name:"commentDrawer",props:{isDrawerOpen:{type:Boolean,required:!0},relatedImageFiles:{type:Object,default:[]},relatedPDFFiles:{type:Object,default:[]},alreadyUploaded:{type:Object,default:[]},relatedImageFilesAlreadyUploaded:{type:Object,default:[]},deletedImageFile:{type:Object}},emits:["update:isDrawerOpen","submit"],setup(V,{emit:r}){const a=V;f([]);const c=f(""),m=()=>{r("update:isDrawerOpen",!1),r("submit",{comment:c.value})},$=w=>{r("update:isDrawerOpen",w)};return(w,o)=>(b(),A(ee,{temporary:"",location:"end",width:400,"model-value":a.isDrawerOpen,class:"scrollable-content","onUpdate:modelValue":$},{default:l(()=>[e("div",Re,[Ke,t(X),t(p,{icon:"",size:"32",color:"default",variant:"tonal",class:"rounded",onClick:o[0]||(o[0]=d=>$(!1))},{default:l(()=>[t(_,{size:"18",icon:"tabler-x"})]),_:1})]),t(s(R),{options:{wheelPropagation:!1}},{default:l(()=>[t(S,{flat:""},{default:l(()=>[t(h,null,{default:l(()=>[t(L,{onSubmit:O(m,["prevent"])},{default:l(()=>[t(g,null,{default:l(()=>[t(i,{cols:"12"},{default:l(()=>[t(Y,{modelValue:w.textareaValue,"onUpdate:modelValue":o[1]||(o[1]=d=>w.textareaValue=d),label:"\u0E04\u0E27\u0E32\u0E21\u0E04\u0E34\u0E14\u0E40\u0E2B\u0E47\u0E19","auto-grow":""},null,8,["modelValue"])]),_:1}),t(i,{cols:"12"},{default:l(()=>[t(S,{title:"\u0E41\u0E19\u0E1A\u0E23\u0E39\u0E1B\u0E17\u0E35\u0E48\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E02\u0E49\u0E2D\u0E07"},{default:l(()=>[t(h,null,{default:l(()=>[t(I,{acceptType:"image/*",label:"\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E39\u0E1B",prependIcon:"tabler-camera",files:a.relatedImageFiles,filesAlreadyUploaded:a.relatedImageFilesAlreadyUploaded,"onUpdate:filesAlreadyUploaded":o[2]||(o[2]=d=>a.relatedImageFilesAlreadyUploaded=d),popUpTitle:"Delete related image.",popUpLabel:"Are you sure you want to delete",deletedFile:a.deletedImageFile,"onUpdate:deletedFile":o[3]||(o[3]=d=>a.deletedImageFile=d)},null,8,["files","filesAlreadyUploaded","deletedFile"])]),_:1})]),_:1})]),_:1}),t(i,{cols:"12"},{default:l(()=>[t(p,{type:"submit",class:"me-3"},{default:l(()=>[v(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E04\u0E27\u0E32\u0E21\u0E04\u0E34\u0E14\u0E40\u0E2B\u0E47\u0E19 ")]),_:1}),t(p,{color:"secondary",variant:"tonal",onClick:o[4]||(o[4]=d=>w.$emit("update:isDrawerOpen",!1))},{default:l(()=>[v(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 ")]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model-value"]))}};const Xe=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32"),e("th",{scope:"col"},"\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14"),e("th",{scope:"col"},"\u0E08\u0E33\u0E19\u0E27\u0E19"),e("th",{scope:"col"},"\u0E01\u0E32\u0E23\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23")])],-1),Ye=e("td",null,[e("span",{class:"text-base"},"LS082WH-HKZB")],-1),et=e("td",null,[e("span",{class:"text-base"},"Smart Station Zigbee")],-1),tt=e("td",null,[e("span",{class:"text-base"},"35")],-1),lt={class:"text-center",style:{width:"5rem"}},at=e("td",null,[e("span",{class:"text-base"},"LS062WH")],-1),st=e("td",null,[e("span",{class:"text-base"},"Cube Motion Sensor (White color)")],-1),ot=e("td",null,[e("span",{class:"text-base"},"10")],-1),nt={class:"text-center",style:{width:"5rem"}},dt=e("td",null,[e("span",{class:"text-base"},"LS258")],-1),it=e("td",null,[e("span",{class:"text-base"},"New Indoor 1080P Camera")],-1),ut=e("td",null,[e("span",{class:"text-base"},"5")],-1),rt={class:"text-center",style:{width:"5rem"}},ct=e("td",null,[e("span",{class:"text-base"},"SD-01-005")],-1),pt=e("td",null,[e("span",{class:"text-base"},"Micro SD 64 GB For Camera")],-1),mt=e("td",null,[e("span",{class:"text-base"},"5")],-1),_t={class:"text-center",style:{width:"5rem"}},ft=e("td",null,[e("span",{class:"text-base"},"LS136")],-1),bt=e("td",null,[e("span",{class:"text-base"},"Universial remote Control (Spot) CoSS")],-1),xt=e("td",null,[e("span",{class:"text-base"},"2")],-1),yt={class:"text-center",style:{width:"5rem"}},Vt={class:"text-capitalize text-base font-weight-semibold"},vt={class:"text-capitalize text-base font-weight-semibold"},wt={class:"text-capitalize text-base font-weight-semibold"},ht={class:"text-center",style:{width:"5rem"}},E={__name:"subJob",setup(V){const r={jobNumber:"JOB1234",deliveryDate:"",installationDate:"",total:"57",jobStatus:"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23"};f();const a=f(structuredClone(r));f(!1);const c=f([]),m=f(!1),$=[{title:"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23",value:"in progress"},{title:"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07",value:"installing"},{title:"\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E41\u0E25\u0E49\u0E27",value:"done"}],w=["\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 01","\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 02","\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 03"],o=()=>{a.value=structuredClone(r)};return G(()=>{}),(d,u)=>(b(),A(g,null,{default:l(()=>[t(i,{cols:"12"},{default:l(()=>[t(S,{title:"\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E40\u0E1A\u0E34\u0E01\u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C\u0E07\u0E32\u0E19\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07"},{default:l(()=>[t(p,{block:"","prepend-icon":"tabler-messages",class:"mb-2",onClick:u[0]||(u[0]=n=>m.value=!0)},{default:l(()=>[v(" \u0E04\u0E27\u0E32\u0E21\u0E04\u0E34\u0E14\u0E40\u0E2B\u0E47\u0E19 ")]),_:1}),t(U),t(h,{class:"pt-2"},{default:l(()=>[t(L,{class:"mt-6"},{default:l(()=>[t(g,null,{default:l(()=>[t(i,{cols:"12",md:"6"},{default:l(()=>[t(x,{modelValue:s(a).jobNumber,"onUpdate:modelValue":u[1]||(u[1]=n=>s(a).jobNumber=n),label:"\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E07\u0E32\u0E19",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(x,{modelValue:s(a).total,"onUpdate:modelValue":u[2]||(u[2]=n=>s(a).total=n),label:"\u0E08\u0E33\u0E19\u0E27\u0E19\u0E23\u0E27\u0E21",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(M,{modelValue:s(a).deliveryDate,"onUpdate:modelValue":u[3]||(u[3]=n=>s(a).deliveryDate=n),label:" -- \u0E40\u0E25\u0E37\u0E2D\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E48\u0E07\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 -- ",clearable:"","clear-icon":"tabler-x"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(te,{label:" -- \u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E48\u0E07\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 -- ",items:w,placeholder:"Select State",clearable:"","clear-icon":"tabler-x"})]),_:1}),t(i,{cols:"12",md:"12"},{default:l(()=>[t(x,{modelValue:s(a).deliveryAddress,"onUpdate:modelValue":u[4]||(u[4]=n=>s(a).deliveryAddress=n),label:"\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E48\u0E07\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32",onkeydown:"return false"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(M,{modelValue:s(a).installationDate,"onUpdate:modelValue":u[5]||(u[5]=n=>s(a).installationDate=n),label:" -- \u0E40\u0E25\u0E37\u0E2D\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07 -- ",clearable:"","clear-icon":"tabler-x"},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",md:"6"},{default:l(()=>[t(H,{modelValue:s(a).jobStatus,"onUpdate:modelValue":u[6]||(u[6]=n=>s(a).jobStatus=n),label:" -- \u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E07\u0E32\u0E19 -- ",items:$,"menu-props":{maxHeight:200}},null,8,["modelValue"])]),_:1}),t(i,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:l(()=>[t(p,null,{default:l(()=>[v("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25")]),_:1}),t(p,{color:"secondary",variant:"tonal",type:"reset",onClick:O(o,["prevent"])},{default:l(()=>[v(" \u0E25\u0E49\u0E32\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1}),t(U),t(h,{class:"pt-2"},{default:l(()=>[t(N,{class:"text-no-wrap"},{default:l(()=>[Xe,e("tbody",null,[e("tr",null,[Ye,et,tt,e("td",lt,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-plus"})]),_:1}),t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-minus"})]),_:1})])]),e("tr",null,[at,st,ot,e("td",nt,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-plus"})]),_:1}),t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-minus"})]),_:1})])]),e("tr",null,[dt,it,ut,e("td",rt,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-plus"})]),_:1}),t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-minus"})]),_:1})])]),e("tr",null,[ct,pt,mt,e("td",_t,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-plus"})]),_:1}),t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-minus"})]),_:1})])]),e("tr",null,[ft,bt,xt,e("td",yt,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-plus"})]),_:1}),t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-minus"})]),_:1})])]),(b(!0),z(C,null,P(s(c),n=>(b(),z("tr",{key:n._id,style:{height:"3.75rem"}},[e("td",null,[e("span",Vt,y(new Date(n.updatedAt).toString().split("GMT")[0]),1)]),e("td",null,[e("span",vt,y(new Date(n.updatedAt).toString().split("GMT")[0]),1)]),e("td",null,[e("span",wt,y(new Date(n.updatedAt).toString().split("GMT")[0]),1)]),e("td",ht,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-minus"})]),_:1}),t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-plus"})]),_:1})])]))),128))])]),_:1}),t(U)]),_:1})]),_:1})]),_:1}),t(Qe,{isDrawerOpen:s(m),"onUpdate:isDrawerOpen":u[7]||(u[7]=n=>F(m)?m.value=n:null)},null,8,["isDrawerOpen"])]),_:1}))}};typeof D=="function"&&D(E);const Dt=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E07\u0E32\u0E19"),e("th",{scope:"col"},"\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07/\u0E2A\u0E48\u0E07\u0E02\u0E2D\u0E07"),e("th",{scope:"col"},"\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E40\u0E1A\u0E34\u0E01\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32"),e("th",{scope:"col"},"\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E07\u0E32\u0E19"),e("th",{scope:"col"},"\u0E01\u0E32\u0E23\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23")])],-1),Ft=e("td",null,[e("span",{class:"text-base"},"JOB1237")],-1),Ut=e("td",null,[e("span",{class:"text-base"},"2024-02-14")],-1),gt=e("td",null,[e("span",{class:"text-base"},"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23")],-1),$t={class:"text-center",style:{width:"5rem"}},St=e("td",null,[e("span",{class:"text-base"},"JOB1236")],-1),zt=e("td",null,[e("span",{class:"text-base"},"2023-12-27")],-1),At=e("td",null,[e("span",{class:"text-base"},"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23")],-1),Ct={class:"text-center",style:{width:"5rem"}},Pt=e("td",null,[e("span",{class:"text-base"},"JOB1235")],-1),Tt=e("td",null,[e("span",{class:"text-base"},"2023-12-25")],-1),kt=e("td",null,[e("span",{class:"text-base"},"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07")],-1),jt={class:"text-center",style:{width:"5rem"}},It=e("td",null,[e("span",{class:"text-base"},"JOB1234")],-1),Nt=e("td",null,[e("span",{class:"text-base"},"2023-12-25")],-1),Mt=e("td",null,[e("span",{class:"text-base"},"\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E41\u0E25\u0E49\u0E27")],-1),Ot={class:"text-center",style:{width:"5rem"}},Lt={class:"text-capitalize text-base font-weight-semibold"},Gt={class:"text-capitalize text-base font-weight-semibold"},Bt={class:"text-capitalize text-base font-weight-semibold"},Ht={class:"text-center",style:{width:"5rem"}},Z={__name:"listJob",setup(V){const r=a=>a==="request"?"warning":a==="complete"?"info":a==="not complete"?"error":a==="done"?"success":"primary";return(a,c)=>(b(),A(g,null,{default:l(()=>[t(i,{cols:"12"},{default:l(()=>[t(S,{title:"\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E07\u0E32\u0E19"},{default:l(()=>[t(U),t(h,{class:"pt-2"},{default:l(()=>[t(N,{class:"text-no-wrap"},{default:l(()=>[Dt,e("tbody",null,[e("tr",null,[Ft,Ut,e("td",null,[t(T,{label:"",color:r("request"),size:"small",class:"text-capitalize"},{default:l(()=>[v(" \u0E2A\u0E48\u0E07\u0E04\u0E33\u0E02\u0E2D ")]),_:1},8,["color"])]),gt,e("td",$t,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-edit"})]),_:1})])]),e("tr",null,[St,zt,e("td",null,[t(T,{label:"",color:r("not complete"),size:"small",class:"text-capitalize"},{default:l(()=>[v(" \u0E04\u0E49\u0E32\u0E07\u0E40\u0E1A\u0E34\u0E01\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 ")]),_:1},8,["color"])]),At,e("td",Ct,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-edit"})]),_:1})])]),e("tr",null,[Pt,Tt,e("td",null,[t(T,{label:"",color:r("complete"),size:"small",class:"text-capitalize"},{default:l(()=>[v(" \u0E40\u0E1A\u0E34\u0E01\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E41\u0E25\u0E49\u0E27 ")]),_:1},8,["color"])]),kt,e("td",jt,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-edit"})]),_:1})])]),e("tr",null,[It,Nt,e("td",null,[t(T,{label:"",color:r("done"),size:"small",class:"text-capitalize"},{default:l(()=>[v(" \u0E2A\u0E48\u0E07\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E41\u0E25\u0E49\u0E27 ")]),_:1},8,["color"])]),Mt,e("td",Ot,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-edit"})]),_:1})])]),(b(!0),z(C,null,P(a.filterData,m=>(b(),z("tr",{key:m._id,style:{height:"3.75rem"}},[e("td",null,[e("span",Lt,y(new Date(m.updatedAt).toString().split("GMT")[0]),1)]),e("td",null,[e("span",Gt,y(new Date(m.updatedAt).toString().split("GMT")[0]),1)]),e("td",null,[e("span",Bt,y(new Date(m.updatedAt).toString().split("GMT")[0]),1)]),e("td",Ht,[t(p,{icon:"",size:"x-small",color:"default",variant:"text"},{default:l(()=>[t(_,{size:"22",icon:"tabler-plus"})]),_:1})])]))),128))])]),_:1}),t(U)]),_:1})]),_:1})]),_:1})]),_:1}))}};typeof D=="function"&&D(Z);const Jt={__name:"file",props:{relatedPDFFiles:{type:Object,default:[]},alreadyUploaded:{type:Object,default:[]},relatedImageFilesAlreadyUploaded:{type:Object,default:[]},relatedPDFFilesAlreadyUploaded:{type:Object,default:[]},deletedFile:{type:Object}},setup(V){const r=V;return f([]),(a,c)=>(b(),A(g,null,{default:l(()=>[t(i,{cols:"12"},{default:l(()=>[t(S,{title:"\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E2A\u0E48\u0E07\u0E21\u0E2D\u0E1A\u0E07\u0E32\u0E19 (PDF)"},{default:l(()=>[t(h,null,{default:l(()=>[t(I,{acceptType:"application/pdf",label:"Choose PDF",files:r.relatedPDFFiles,filesAlreadyUploaded:r.relatedPDFFilesAlreadyUploaded,"onUpdate:filesAlreadyUploaded":c[0]||(c[0]=m=>r.relatedPDFFilesAlreadyUploaded=m),popUpTitle:"Delete related PDF.",popUpLabel:"Are you sure you want to delete",deletedFile:r.deletedFile.pdf,"onUpdate:deletedFile":c[1]||(c[1]=m=>r.deletedFile.pdf=m)},null,8,["files","filesAlreadyUploaded","deletedFile"])]),_:1})]),_:1})]),_:1}),t(i,{cols:"12"},{default:l(()=>[t(S,{title:"\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E1D\u0E48\u0E32\u0E22\u0E1A\u0E31\u0E0D\u0E0A\u0E35 (PDF)"},{default:l(()=>[t(h,null,{default:l(()=>[t(I,{acceptType:"application/pdf",label:"Choose PDF",files:r.relatedPDFFiles,filesAlreadyUploaded:r.relatedPDFFilesAlreadyUploaded,"onUpdate:filesAlreadyUploaded":c[2]||(c[2]=m=>r.relatedPDFFilesAlreadyUploaded=m),popUpTitle:"Delete related PDF.",popUpLabel:"Are you sure you want to delete",deletedFile:r.deletedFile.pdf,"onUpdate:deletedFile":c[3]||(c[3]=m=>r.deletedFile.pdf=m)},null,8,["files","filesAlreadyUploaded","deletedFile"])]),_:1})]),_:1})]),_:1}),t(i,{cols:"12"},{default:l(()=>[t(S,{title:"\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E1D\u0E48\u0E32\u0E22\u0E02\u0E32\u0E22 (PDF)"},{default:l(()=>[t(h,null,{default:l(()=>[t(I,{acceptType:"application/pdf",label:"Choose PDF",files:r.relatedPDFFiles,filesAlreadyUploaded:r.relatedPDFFilesAlreadyUploaded,"onUpdate:filesAlreadyUploaded":c[4]||(c[4]=m=>r.relatedPDFFilesAlreadyUploaded=m),popUpTitle:"Delete related PDF.",popUpLabel:"Are you sure you want to delete",deletedFile:r.deletedFile.pdf,"onUpdate:deletedFile":c[5]||(c[5]=m=>r.deletedFile.pdf=m)},null,8,["files","filesAlreadyUploaded","deletedFile"])]),_:1})]),_:1})]),_:1})]),_:1}))}};const Wt={__name:"[tab]",setup(V){const r=[{title:"\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32",icon:"tabler-category",tab:"customers"},{title:"\u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07",icon:"tabler-category",tab:"devices"},{title:"\u0E07\u0E32\u0E19\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07",icon:"tabler-category",tab:"jobs"},{title:"\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23",icon:"tabler-category",tab:"files"}],a=Q(),c=f(a.params.tab),m=f([]),$=f([]),w=K({image:[],pdf:[]}),o=f([]);return a.query.id!==void 0&&(pageType.action="update",pageType.title="UPDATE MODEL"),(d,u)=>(b(),z("section",null,[t(g,null,{default:l(()=>[t(i,{cols:"12"},{default:l(()=>[t(le,{modelValue:s(c),"onUpdate:modelValue":u[0]||(u[0]=n=>F(c)?c.value=n:null),class:"v-tabs-pill"},{default:l(()=>[(b(),z(C,null,P(r,n=>t(ae,{key:n.icon,value:n.tab,to:{name:"projects-installation-update-tab",params:{tab:n.tab}}},{default:l(()=>[t(_,{size:"20",start:"",icon:n.icon},null,8,["icon"]),v(" "+y(n.title),1)]),_:2},1032,["value","to"])),64))]),_:1},8,["modelValue"])]),_:1}),t(i,{cols:"12"},{default:l(()=>[t(k,{modelValue:s(c),"onUpdate:modelValue":u[1]||(u[1]=n=>F(c)?c.value=n:null),class:"disable-tab-transition",touch:!1},{default:l(()=>[t(j,{value:"customers"},{default:l(()=>[t(J)]),_:1})]),_:1},8,["modelValue"]),t(k,{modelValue:s(c),"onUpdate:modelValue":u[2]||(u[2]=n=>F(c)?c.value=n:null),class:"disable-tab-transition",touch:!1},{default:l(()=>[t(j,{value:"devices"},{default:l(()=>[t(fe)]),_:1})]),_:1},8,["modelValue"]),t(k,{modelValue:s(c),"onUpdate:modelValue":u[3]||(u[3]=n=>F(c)?c.value=n:null),class:"disable-tab-transition",touch:!1},{default:l(()=>[t(j,{value:"jobs"},{default:l(()=>[t(i,{cols:"12"},{default:l(()=>[t(g,null,{default:l(()=>[t(i,{cols:"7"},{default:l(()=>[t(Ze),t(Z)]),_:1}),t(i,{cols:"5"},{default:l(()=>[t(E)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),t(k,{modelValue:s(c),"onUpdate:modelValue":u[9]||(u[9]=n=>F(c)?c.value=n:null),class:"disable-tab-transition",touch:!1},{default:l(()=>[t(j,{value:"files"},{default:l(()=>[t(Jt,{models:s(m),"onUpdate:models":u[4]||(u[4]=n=>F(m)?m.value=n:null),selectedItems:d.selectedItems,"onUpdate:selectedItems":u[5]||(u[5]=n=>d.selectedItems=n),relatedPDFFilesAlreadyUploaded:s($),"onUpdate:relatedPDFFilesAlreadyUploaded":u[6]||(u[6]=n=>F($)?$.value=n:null),relatedPDFFiles:s(o),"onUpdate:relatedPDFFiles":u[7]||(u[7]=n=>F(o)?o.value=n:null),deletedFile:s(w),"onUpdate:deletedFile":u[8]||(u[8]=n=>F(w)?w.value=n:null)},null,8,["models","selectedItems","relatedPDFFilesAlreadyUploaded","relatedPDFFiles","deletedFile"])]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]))}};typeof D=="function"&&D(Wt);export{Wt as default};