import{_ as I}from"./AppDateTimePicker.f12e24e3.js";import{a as n,V as w}from"./VRow.f9366793.js";import{V as j}from"./VSelect.1bdb2ecc.js";import{V as $}from"./VTextarea.0a746d96.js";import{V as y}from"./VTextField.4609cb9e.js";import{V as A}from"./VTooltip.f3c5ebde.js";import{V as q}from"./VBtn.3e0f2bdf.js";import{k as u,Z as U,bp as h,A as S,o as b,c as v,m as t,p as e,w as a,q as r,D as B,E as _,x as c,C as N,F as z,V as Y,v as P,a as L,b as M}from"./index.35991f09.js";import{V as k,c as p}from"./VCard.bb37f72e.js";import{V as g}from"./VDivider.0f44b1ce.js";import{V as R}from"./VAutocomplete.75de4477.js";import{b as T}from"./route-block.182765af.js";import"./VField.93eb26cb.js";import"./index.a8f66a9c.js";import"./VInput.6bf7b46e.js";import"./router.88351000.js";import"./form.e84299e4.js";import"./VImg.632117c3.js";import"./position.15b8fc3a.js";import"./easing.36b781ab.js";import"./VList.8e9051e1.js";import"./VAvatar.6ed53308.js";import"./forwardRefs.c003b6b8.js";import"./dialog-transition.13a8c048.js";import"./VMenu.768d7784.js";import"./scopeId.a8f1d836.js";import"./VOverlay.a330b104.js";import"./lazy.7e795ed8.js";import"./VCheckboxBtn.a302f7e6.js";import"./VSelectionControl.6ac8e090.js";import"./VChip.81c7dee3.js";/* empty css                   */import"./VCounter.cb1a1153.js";import"./filter.f86a5c3d.js";const E={class:"add-products-header mb-2 d-none d-md-flex"},W=t("span",{class:"text-sm"}," \u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 ",-1),H=t("span",{class:"text-sm"}," \u0E23\u0E32\u0E04\u0E32 ",-1),O=t("span",{class:"text-sm"}," \u0E08\u0E33\u0E19\u0E27\u0E19 ",-1),Q=t("span",{class:"text-sm"}," \u0E23\u0E32\u0E04\u0E32\u0E23\u0E27\u0E21 ",-1),G={class:"pa-5 flex-grow-1"},Z={class:"text-body-2 text-no-wrap mt-4"},J=t("p",{class:"mb-1"}," \u0E2A\u0E48\u0E27\u0E19\u0E25\u0E14 ",-1),K=t("span",null,"0%",-1),X={class:"mx-2"},tt={class:"text-sm-center my-2"},et=t("span",{class:"d-inline d-md-none"},"Price: ",-1),at={class:"text-body-1"},st={class:"d-flex flex-column justify-space-between border-s pa-1"},ot={__name:"QuotationProductEdit",props:{id:{type:Number,required:!0},data:{type:Object,required:!0,default:()=>({title:"App Design",cost:24,amount:1,description:"Designed UI kit & app pages."})}},emits:["removeProduct","totalAmount"],setup(x,{emit:s}){const l=x,V=[{title:"App Design",cost:24,amount:1,description:"Designed UI kit & app pages."},{title:"App Customization",cost:26,amount:1,description:"Customization & Bug Fixes."},{title:"ABC Template",cost:28,amount:1,description:"Vuetify admin template."},{title:"App Development",cost:32,amount:1,description:"Native App Development."}],i=u({title:"App Customization",cost:26,amount:1,description:"Customization & Bug Fixes."});U(i,()=>{l.data.cost=structuredClone(h(i.value.cost)),l.data.amount=structuredClone(h(i.value.amount)),l.data.description=structuredClone(h(i.value.description)),l.data.title=structuredClone(h(i.value.title))});const D=()=>{s("removeProduct",l.id)},f=S(()=>Number(l.data.cost)*Number(l.data.amount));return U(f,()=>{s("totalAmount",f.value)},{immediate:!0}),(C,o)=>(b(),v(z,null,[t("div",E,[e(w,{class:"font-weight-medium px-4"},{default:a(()=>[e(n,{cols:"12",md:"6"},{default:a(()=>[W]),_:1}),e(n,{cols:"12",md:"2"},{default:a(()=>[H]),_:1}),e(n,{cols:"12",md:"2"},{default:a(()=>[O]),_:1}),e(n,{cols:"12",md:"2"},{default:a(()=>[Q]),_:1})]),_:1})]),e(k,{flat:"",border:"",class:"d-flex flex-row"},{default:a(()=>[t("div",G,[e(w,null,{default:a(()=>[e(n,{cols:"12",md:"6"},{default:a(()=>[e(j,{modelValue:r(i),"onUpdate:modelValue":o[0]||(o[0]=m=>B(i)?i.value=m:null),items:V,label:" -- \u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 -- ","return-object":"",class:"mb-3"},null,8,["modelValue"]),e($,{modelValue:l.data.description,"onUpdate:modelValue":o[1]||(o[1]=m=>l.data.description=m),rows:"2",label:"\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32",placeholder:"Description"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12",md:"2",sm:"4"},{default:a(()=>[e(y,{modelValue:l.data.cost,"onUpdate:modelValue":o[2]||(o[2]=m=>l.data.cost=m),type:"number",label:"\u0E23\u0E32\u0E04\u0E32"},null,8,["modelValue"]),t("div",Z,[J,K,t("span",X,[_(" 0% "),e(A,{activator:"parent"},{default:a(()=>[_("Tax 1")]),_:1})]),t("span",null,[_(" 0% "),e(A,{activator:"parent"},{default:a(()=>[_("Tax 2")]),_:1})])])]),_:1}),e(n,{cols:"12",md:"2",sm:"4"},{default:a(()=>[e(y,{modelValue:l.data.amount,"onUpdate:modelValue":o[3]||(o[3]=m=>l.data.amount=m),type:"number",label:"\u0E08\u0E33\u0E19\u0E27\u0E19"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12",md:"2",sm:"4"},{default:a(()=>[t("p",tt,[et,t("span",at,"$"+c(r(f)),1)])]),_:1})]),_:1})]),t("div",st,[e(q,{icon:"",size:"x-small",color:"default",variant:"text",onClick:D},{default:a(()=>[e(N,{size:"20",icon:"tabler-x"})]),_:1}),e(q,{icon:"",size:"x-small",color:"default",variant:"text"},{default:a(()=>[e(N,{size:"20",icon:"tabler-settings"})]),_:1})])]),_:1})],64))}},lt={class:"ma-sm-4"},dt={class:"d-flex align-center mb-6"},nt={class:"font-weight-bold text-xl"},it={class:"mt-4 ma-sm-4"},mt={class:"d-flex align-center font-weight-medium justify-sm-end text-xl mb-3"},ut=t("span",{class:"me-3"},"\u0E43\u0E1A\u0E40\u0E2A\u0E19\u0E2D\u0E23\u0E32\u0E04\u0E32",-1),ct={class:"d-flex align-center justify-sm-end mb-3"},rt=t("span",{class:"me-3"},"\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2D\u0E2D\u0E01\u0E43\u0E1A\u0E40\u0E2A\u0E19\u0E2D\u0E23\u0E32\u0E04\u0E32",-1),pt={class:"d-flex align-center justify-sm-end mb-0"},_t=t("span",{class:"me-3"},"\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E04\u0E23\u0E1A\u0E01\u0E33\u0E2B\u0E19\u0E14",-1),ft=t("div",{class:"ma-sm-4"},[t("h6",{class:"text-sm font-weight-medium mb-3"}," \u0E08\u0E32\u0E01: "),t("table",null,[t("tbody",null,[t("p",{class:"mb-0"}," \u0E1A\u0E23\u0E34\u0E29\u0E31\u0E17 \u0E2D\u0E34\u0E19\u0E40\u0E2E\u0E49\u0E32\u0E2A\u0E4C \u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35 \u0E08\u0E33\u0E01\u0E31\u0E14 (\u0E2A\u0E33\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19\u0E43\u0E2B\u0E0D\u0E48) "),t("p",{class:"mb-0"}," \u0E40\u0E25\u0E02\u0E17\u0E35\u0E48 77/577 \u0E0B\u0E2D\u0E22\u0E08\u0E15\u0E38\u0E42\u0E0A\u0E15\u0E34 19 "),t("p",{class:"mb-0"}," \u0E41\u0E02\u0E27\u0E07\u0E2D\u0E2D\u0E40\u0E07\u0E34\u0E19 \u0E40\u0E02\u0E15\u0E2A\u0E32\u0E22\u0E44\u0E2B\u0E21 \u0E01\u0E23\u0E38\u0E07\u0E40\u0E17\u0E1E\u0E21\u0E2B\u0E32\u0E19\u0E04\u0E23 10220 "),t("p",{class:"mb-0"}," \u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C 088-620-1206 "),t("p",{class:"mb-0"}," \u0E40\u0E25\u0E02\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27\u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35 0745565007058 ")])])],-1),bt={class:"ma-sm-4",style:{width:"20.5rem"}},xt=t("h6",{class:"text-sm font-weight-medium mb-3"}," \u0E16\u0E36\u0E07: ",-1),Vt={class:"mb-0"},ht={class:"mb-0"},gt={class:"mb-0"},vt={class:"mb-0"},wt={class:"mb-0"},yt={class:"mt-4 ma-sm-4"},qt={class:"mx-sm-4 my-2"},Dt={class:"d-flex align-center mb-4"},Ct=t("h6",{class:"text-sm font-weight-semibold me-2"}," \u0E1E\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19\u0E02\u0E32\u0E22: ",-1),$t=t("div",{class:"my-2 mx-sm-4"},[t("table",null,[t("tr",null,[t("td",{class:"text-end"},[t("div",{class:"me-5"},[t("p",{class:"mb-2"}," \u0E23\u0E27\u0E21\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19: "),t("p",{class:"mb-2"}," \u0E2A\u0E48\u0E27\u0E19\u0E25\u0E14: "),t("p",{class:"mb-2"}," \u0E20\u0E32\u0E29\u0E35\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E40\u0E1E\u0E34\u0E48\u0E21 7%: "),t("p",{class:"mb-2"}," \u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E38\u0E17\u0E18\u0E34: ")])]),t("td",{class:"font-weight-semibold"},[t("p",{class:"mb-2"}," \u0E3F10,000.00 "),t("p",{class:"mb-2"}," \u0E3F00.00 "),t("p",{class:"mb-2"}," \u0E3F700.00 "),t("p",{class:"mb-2"}," \u0E3F10,700.00 ")])])])],-1),kt=t("p",{class:"font-weight-semibold mb-2"}," \u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38: ",-1),At={__name:"QuotationEditable",props:{data:{type:null,required:!0}},setup(x){const s=x;u("");const l=u(`\u0E27\u0E34\u0E18\u0E35\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19:
\u0E0A\u0E37\u0E48\u0E2D\u0E1A\u0E31\u0E0D\u0E0A\u0E35: \u0E1A\u0E08\u0E01. \u0E2D\u0E34\u0E19\u0E40\u0E2E\u0E49\u0E32\u0E2A\u0E4C \u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35
\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E0D\u0E0A\u0E35: 123-456-789
\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23: \u0E01\u0E23\u0E38\u0E07\u0E40\u0E17\u0E1E`),V=["California","Colorado","Florida","Georgia","Texas","Wyoming"],i=[{title:"Warm",value:"warm"},{title:"Hot",value:"hot"},{title:"Cold",value:"cold"},{title:"Done",value:"done"}];u([]);const D=()=>{s.data.purchasedProducts.push({title:"App Design",cost:24,amount:1,description:"Designed UI kit & app pages."})},f=C=>{s.data.purchasedProducts.splice(C,1)};return(C,o)=>{const m=I;return b(),v("section",null,[e(w,null,{default:a(()=>[e(n,{cols:"12",md:"9"},{default:a(()=>[e(k,null,{default:a(()=>[e(p,{class:"d-flex flex-wrap justify-space-between flex-column flex-sm-row"},{default:a(()=>[t("div",lt,[t("div",dt,[e(r(Y),{nodes:r(P).app.logo,class:"me-3"},null,8,["nodes"]),t("h6",nt,c(r(P).app.title),1)])]),t("div",it,[t("h6",mt,[ut,t("span",null,[e(y,{modelValue:s.data.quotation.quotation,"onUpdate:modelValue":o[0]||(o[0]=d=>s.data.quotation.quotation=d),prefix:"#",density:"compact",style:{width:"8.9rem"}},null,8,["modelValue"])])]),t("p",ct,[rt,t("span",null,[e(m,{modelValue:s.data.quotation.issuedDate,"onUpdate:modelValue":o[1]||(o[1]=d=>s.data.quotation.issuedDate=d),density:"compact",placeholder:"YYYY-MM-DD",style:{width:"8.9rem"},config:{position:"auto right"}},null,8,["modelValue"])])]),t("p",pt,[_t,t("span",null,[e(m,{modelValue:s.data.quotation.dueDate,"onUpdate:modelValue":o[2]||(o[2]=d=>s.data.quotation.dueDate=d),density:"compact",placeholder:"YYYY-MM-DD",style:{width:"8.9rem"},config:{position:"auto right"}},null,8,["modelValue"])])])])]),_:1}),e(g),e(p,{class:"d-flex flex-wrap justify-space-between flex-column flex-sm-row gap-4"},{default:a(()=>[ft,t("div",bt,[xt,e(R,{label:" -- \u0E40\u0E25\u0E37\u0E2D\u0E01 Lead -- ",items:V,placeholder:"Select State"}),t("p",Vt," Lead 01"+c(s.data.quotation.lead.leadFirstame)+" Lastname01 "+c(s.data.quotation.lead.leadLastname),1),t("p",ht," 02-222-2222"+c(s.data.quotation.lead.leadContactNumber),1),t("p",gt," Company 01"+c(s.data.quotation.lead.companyName)+" \u0E2A\u0E33\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19\u0E43\u0E2B\u0E0D\u0E48 "+c(s.data.quotation.lead.branch),1),t("p",vt," 11/22 \u0E41\u0E02\u0E27\u0E07\u0E2B\u0E31\u0E27\u0E2B\u0E21\u0E32\u0E01 \u0E40\u0E02\u0E15\u0E1A\u0E32\u0E07\u0E01\u0E30\u0E1B\u0E34 \u0E01\u0E17\u0E21."+c(s.data.quotation.lead.address),1),t("p",wt," \u0E40\u0E25\u0E02\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27\u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35 1234567890123"+c(s.data.quotation.lead.taxId),1)])]),_:1}),e(g),e(p,{class:"add-products-form"},{default:a(()=>[(b(!0),v(z,null,L(s.data.purchasedProducts,(d,F)=>(b(),v("div",{key:d.title,class:"ma-sm-4"},[e(ot,{id:F,data:d,onRemoveProduct:f},null,8,["id","data"])]))),128)),t("div",yt,[e(q,{onClick:D},{default:a(()=>[_(" \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 ")]),_:1})])]),_:1}),e(g),e(p,{class:"d-flex justify-space-between flex-wrap flex-column flex-sm-row"},{default:a(()=>[t("div",qt,[t("div",Dt,[Ct,e(y,{modelValue:s.data.salesperson,"onUpdate:modelValue":o[3]||(o[3]=d=>s.data.salesperson=d),style:{width:"12rem"}},null,8,["modelValue"])]),e($,{modelValue:r(l),"onUpdate:modelValue":o[4]||(o[4]=d=>B(l)?l.value=d:null),placeholder:"\u0E27\u0E34\u0E18\u0E35\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19","auto-grow":""},null,8,["modelValue"])]),$t]),_:1}),e(g),e(p,{class:"mx-sm-4"},{default:a(()=>[kt,e($,{modelValue:s.data.note,"onUpdate:modelValue":o[5]||(o[5]=d=>s.data.note=d),rows:2,"auto-grow":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(n,{cols:"12",md:"3"},{default:a(()=>[e(k,{class:"mb-8"},{default:a(()=>[e(p,null,{default:a(()=>[e(n,{cols:"12",md:"12"},{default:a(()=>[e(j,{modelValue:s.data.quotationStatus,"onUpdate:modelValue":o[6]||(o[6]=d=>s.data.quotationStatus=d),label:" -- \u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E43\u0E1A\u0E40\u0E2A\u0E19\u0E2D\u0E23\u0E32\u0E04\u0E32 -- ",items:i,"menu-props":{maxHeight:200}},null,8,["modelValue"])]),_:1}),e(q,{block:""},{default:a(()=>[_(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])}}},Ut={__name:"index",setup(x){const s=u({quotation:{documentNumber:5037,issuedDate:"",dueDate:"",lead:{leadFirstame:"",leadLastname:"",leadContactNumber:"",companyName:"",taxId:"",branch:"",address:""}},purchasedProducts:[{title:"",cost:0,amount:0,description:""}],salesperson:"",paymentMethod:`\u0E27\u0E34\u0E18\u0E35\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19:
\u0E0A\u0E37\u0E48\u0E2D\u0E1A\u0E31\u0E0D\u0E0A\u0E35: \u0E1A\u0E08\u0E01. \u0E2D\u0E34\u0E19\u0E40\u0E2E\u0E49\u0E32\u0E2A\u0E4C \u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35
\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E0D\u0E0A\u0E35: 123-456-789
\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23: \u0E01\u0E23\u0E38\u0E07\u0E40\u0E17\u0E1E`,note:"\u0E01\u0E23\u0E38\u0E13\u0E32\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E15\u0E32\u0E21\u0E1A\u0E34\u0E25\u0E19\u0E35\u0E49\u0E01\u0E48\u0E2D\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E04\u0E23\u0E1A\u0E01\u0E33\u0E2B\u0E19\u0E14",quotationStatus:"Warm"});return u(!1),u(!0),u(!1),u(!1),u("Bank Account"),(l,V)=>(b(),M(w,null,{default:a(()=>[e(n,{cols:"12",md:"12"},{default:a(()=>[e(At,{data:r(s)},null,8,["data"])]),_:1})]),_:1}))}};typeof T=="function"&&T(Ut);export{Ut as default};
