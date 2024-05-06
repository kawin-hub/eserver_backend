import{_ as te}from"./InvoiceSendInvoiceDrawer.ca4ee002.js";import{M as L}from"./FileInputSelectionSlot.ae91cc9f.js";import{u as ae}from"./useQuotationListStore.dc1b9404.js";import{u as z}from"./useInvoiceListStore.d49afa11.js";import{r as oe}from"./validators.9dda6c80.js";import{j as le,bd as H,k as c,Z as se,$ as ne,o as w,c as $,p as t,w as o,m as e,q as f,V as ie,v as M,x as d,E as r,y as B,b as j,bn as A,al as de,D as ce}from"./index.35991f09.js";import{a as re}from"./avatar-14.bdf4c093.js";import{a as v,V as q}from"./VRow.f9366793.js";import{V as y,c as p}from"./VCard.bb37f72e.js";import{V as S}from"./VDivider.0f44b1ce.js";import{V as me}from"./VTable.0fe7de7a.js";import{V as m}from"./VBtn.3e0f2bdf.js";import{V as ue}from"./VAvatar.6ed53308.js";import{V as Z}from"./VForm.9ba2d763.js";import{V as C}from"./VTextField.4609cb9e.js";import{V as pe}from"./VSelect.1bdb2ecc.js";import{b as Q}from"./route-block.182765af.js";import"./VSpacer.80b37d7c.js";import"./VTextarea.0a746d96.js";/* empty css                   */import"./VField.93eb26cb.js";import"./index.a8f66a9c.js";import"./VInput.6bf7b46e.js";import"./router.88351000.js";import"./form.e84299e4.js";import"./VImg.632117c3.js";import"./position.15b8fc3a.js";import"./easing.36b781ab.js";import"./forwardRefs.c003b6b8.js";import"./VCounter.cb1a1153.js";import"./VChip.81c7dee3.js";import"./VNavigationDrawer.92fc0e14.js";import"./ssrBoot.8b43ebe3.js";import"./no-image.bc16c952.js";import"./ConfirmationPopup.26c6d5ed.js";import"./DialogCloseBtn.9d70464b.js";import"./VDialog.61de6f6e.js";import"./scopeId.a8f1d836.js";import"./VOverlay.a330b104.js";import"./lazy.7e795ed8.js";import"./dialog-transition.13a8c048.js";/* empty css                                                                               */import"./VFileInput.c9eefa19.js";import"./VMenu.768d7784.js";import"./VList.8e9051e1.js";import"./index.a44853ab.js";import"./index.0d4b9ec4.js";import"./VCheckboxBtn.a302f7e6.js";import"./VSelectionControl.6ac8e090.js";const fe={class:"ma-sm-4"},ve={class:"d-flex align-center mb-6"},_e={class:"font-weight-bold text-xl"},be={class:"mt-4 ma-sm-4"},ye={class:"font-weight-medium text-xl mb-6"},he={class:"mb-2"},Ie=e("span",null,"Created date: ",-1),xe={class:"font-weight-semibold"},Fe={class:"mb-2"},ge=e("span",null,"Due date: ",-1),we={class:"font-weight-semibold"},De={class:"mb-2"},Ve=e("div",{class:"ma-sm-4"},[e("h6",{class:"text-sm font-weight-medium mb-3"},"From:"),e("table",null,[e("tbody",null,[e("p",{class:"mb-0"}," \u0E1A\u0E23\u0E34\u0E29\u0E31\u0E17 \u0E2D\u0E34\u0E19\u0E40\u0E2E\u0E49\u0E32\u0E2A\u0E4C \u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35 \u0E08\u0E33\u0E01\u0E31\u0E14 (\u0E2A\u0E33\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19\u0E43\u0E2B\u0E0D\u0E48) "),e("p",{class:"mb-0"},"\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48 77/577 \u0E0B\u0E2D\u0E22\u0E08\u0E15\u0E38\u0E42\u0E0A\u0E15\u0E34 19"),e("p",{class:"mb-0"},"\u0E41\u0E02\u0E27\u0E07\u0E2D\u0E2D\u0E40\u0E07\u0E34\u0E19 \u0E40\u0E02\u0E15\u0E2A\u0E32\u0E22\u0E44\u0E2B\u0E21 \u0E01\u0E23\u0E38\u0E07\u0E40\u0E17\u0E1E\u0E21\u0E2B\u0E32\u0E19\u0E04\u0E23 10220"),e("p",{class:"mb-0"},"\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C 088-620-1206"),e("p",{class:"mb-0"},"\u0E40\u0E25\u0E02\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27\u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35 0745565007058")])])],-1),Ne={class:"ma-sm-4",style:{width:"19rem"}},Pe=e("h6",{class:"text-sm font-weight-medium mb-3"},"To:",-1),ke={class:"mb-0"},Ue={class:"mb-0"},Ae={class:"mb-0"},Se={class:"mb-0"},Te={class:"mb-0"},Re=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"#"),e("th",{scope:"col"},"Item & Description"),e("th",{scope:"col",class:"text-center"},"Price"),e("th",{scope:"col",class:"text-center"},"Amount"),e("th",{scope:"col",class:"text-center"},"Discount"),e("th",{scope:"col",class:"text-center"},"Summary")])],-1),Be=e("td",{class:"text-no-wrap"},d("1"),-1),Ce={class:"text-no-wrap"},je={class:"text-center"},qe=e("td",{class:"text-center"},d("1"),-1),Ee=e("td",{class:"text-center"},d("0"),-1),Oe={class:"text-center"},Le={class:"my-2 mx-sm-4"},$e={class:"d-flex align-center mb-1"},Me=e("h6",{class:"text-sm font-weight-semibold me-1"},"Sales person:",-1),Qe=e("div",{class:"d-flex align-center mb-1"},[e("h6",{class:"text-sm font-weight-semibold me-1"}," Payment method: ")],-1),ze=e("div",{class:"d-flex align-center mb-1"},[e("h6",{class:"text-sm font-weight-semibold me-1"},"Account name:"),e("span",null,"\u0E1A\u0E08\u0E01. \u0E2D\u0E34\u0E19\u0E40\u0E2E\u0E49\u0E32\u0E2A\u0E4C \u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35 ")],-1),He=e("div",{class:"d-flex align-center mb-1"},[e("h6",{class:"text-sm font-weight-semibold me-1"}," Account number: "),e("span",null,"171-430192-2")],-1),Ze=e("div",{class:"d-flex align-center mb-1"},[e("h6",{class:"text-sm font-weight-semibold me-1"},"Bank name:"),e("span",null,"\u0E44\u0E17\u0E22\u0E1E\u0E32\u0E13\u0E34\u0E0A\u0E22\u0E4C")],-1),Ge={class:"my-2 mx-sm-4"},Je={class:"text-end"},Ke={class:"me-5"},We=e("p",{class:"mb-2"},"Extra discount:",-1),Xe=e("p",{class:"mb-2"},"Sub total:",-1),Ye=e("p",{class:"mb-2"},"Total discount:",-1),et={class:"mb-2"},tt=e("p",{class:"mb-2"},"Total:",-1),at={class:"font-weight-semibold"},ot=e("p",{class:"mb-2"},"\u0E3F"+d("0"),-1),lt={class:"mb-2"},st=e("p",{class:"mb-2"},"\u0E3F"+d("0"),-1),nt={class:"mb-2"},it={class:"mb-2"},dt={class:"d-flex mx-sm-4"},ct=e("h6",{class:"text-sm font-weight-semibold me-1"},"Note:",-1),rt={class:"d-flex gap-2"},mt={class:"w-50"},ut={class:"w-50"},pt={key:0},ft={class:"d-flex gap-2"},vt={class:"w-50"},_t={class:"w-50"},bt={__name:"InvoiceEditable",props:{data:{type:null,required:!0},refForm:{type:Object},invoiceImageFiles:{type:Object,default:[]},invoicePDFFiles:{type:Object,default:[]},alreadyUploaded:{type:Object,default:[]},invoiceImageFilesAlreadyUploaded:{type:Object,default:[]},invoicePDFFilesAlreadyUploaded:{type:Object,default:[]},deletedFile:{type:Object},deletedPDFFile:{type:Object}},setup(E){const a=E,h=le();H();const D=c(!1),F=c(!1),V=c(),N=c(0),T=c(0),l=c(0),P=c(0),_=c(),b=c({visible:!1,icon:"tabler-xbox-x",color:"error",title:"\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E15\u0E32\u0E21\u0E17\u0E35\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E33\u0E2B\u0E19\u0E14"}),u={avatarImg:re,lineName:"abcdefg",amount:"250000",percent:"25"},R=[{title:"\u0E0A\u0E33\u0E23\u0E30\u0E04\u0E23\u0E1A",value:"paid"},{title:"\u0E23\u0E2D\u0E0A\u0E33\u0E23\u0E30",value:"unpaid"}],I=c(!1),s=()=>{const g=a.data.quotation_id;ae.fetchData("?_id="+g).then(n=>{if(n.data.code==1){var i=n.data.data;V.value=i.documentNumber,N.value=i.summary.extraDiscount,T.value=i.summary.totalDiscount,_.value=i.summary.vat,P.value=a.data.baht*_.value/(100+_.value),l.value=P.value+a.data.baht}})};se(a.data.paymentStatus,()=>{a.data.paymentStatus=="paid"}),ne(()=>{s()},[a.data.quotation_id]);const G=()=>{window.open(A.api.url+a.data.pdfPath)},J=()=>{window.open(A.api.url+a.data.pdfPath)},K=()=>{window.open(A.api.url+a.data.pdfTaxPath)},W=()=>{window.open(A.api.url+a.data.pdfTaxPath)},X=()=>{var g;(g=a.refForm)==null||g.validate().then(async({valid:n})=>{if(n){F.value=!0,D.value=!0;const x=new FormData;for(var i of a.invoiceImageFiles)x.append("paymentImages",i);for(var Y of a.invoicePDFFiles)x.append("paymentDocuments",Y);for(var O of a.deletedFile.image)x.append("paymentImagesRemove",O);console.log(O);for(var ee of a.deletedFile.pdf)x.append("paymentDocumentsRemove",ee);Object.entries(a.data).forEach(([k,U])=>{k=="quotation_id",x.append(k,U)}),z.updateItem(x).then(k=>{const U=k.data;console.log(U),U.code==1?h.push({name:"projects-account-tab",params:{tab:"invoice"},query:{action:"updateSuccess",companyName:a.data.invoice.invoiceNumber}}).catch(ht=>{}).finally(()=>{F.value=!1,D.value=!1}):b.value={visible:!0,icon:"tabler-xbox-x",color:"error",title:"\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E01\u0E32\u0E23\u0E2D\u0E31\u0E1E\u0E40\u0E14\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E41\u0E08\u0E49\u0E07\u0E40\u0E08\u0E49\u0E32\u0E17\u0E35\u0E48\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E41\u0E01\u0E49\u0E44\u0E02"}})}})};return(g,n)=>(w(),$("section",null,[t(q,null,{default:o(()=>[t(v,{cols:"12",md:"9"},{default:o(()=>[t(y,null,{default:o(()=>[t(p,{class:"d-flex flex-wrap justify-space-between flex-column flex-sm-row"},{default:o(()=>[e("div",fe,[e("div",ve,[t(f(ie),{nodes:f(M).app.logo,class:"me-3"},null,8,["nodes"]),e("h6",_e,d(f(M).app.title),1)])]),e("div",be,[e("h6",ye," Invoice #"+d(a.data.documentNumber),1),e("p",he,[Ie,e("span",xe,d(a.data.invoice.issuedDate),1)]),e("p",Fe,[ge,e("span",we,d(a.data.invoice.dueDate),1)]),e("p",De,[e("span",null,"\u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07: #"+d(V.value),1)])])]),_:1}),t(S),t(p,{class:"d-flex flex-wrap justify-space-between flex-column flex-sm-row gap-4"},{default:o(()=>[Ve,e("div",Ne,[Pe,e("p",ke,d(a.data.invoice.customerInfo.companyInfo.firstname)+" "+d(a.data.invoice.customerInfo.companyInfo.lastname),1),e("p",Ue," \u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C "+d(a.data.invoice.customerInfo.companyInfo.contactNumber),1),e("p",Ae,d(a.data.invoice.customerInfo.companyInfo.companyName)+" "+d(a.data.invoice.customerInfo.companyInfo.branch),1),e("p",Se," \u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 "+d(a.data.invoice.customerInfo.companyInfo.address),1),e("p",Te," \u0E40\u0E25\u0E02\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27\u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35 "+d(a.data.invoice.customerInfo.companyInfo.taxId),1)])]),_:1}),t(S),t(me,null,{default:o(()=>[Re,e("tbody",null,[e("tr",null,[Be,e("td",Ce,d(a.data.invoiceNumbers),1),e("td",je,"\u0E3F"+d(a.data.baht),1),qe,Ee,e("td",Oe,"\u0E3F"+d(a.data.baht),1)])])]),_:1}),t(S,{class:"my-2"}),t(p,{class:"d-flex justify-space-between flex-column flex-sm-row print-row"},{default:o(()=>[e("div",Le,[e("div",$e,[Me,e("span",null,d(a.data.createdBy.firstname+" "+a.data.createdBy.lastname),1)]),Qe,ze,He,Ze]),e("div",Ge,[e("table",null,[e("tr",null,[e("td",Je,[e("div",Ke,[We,Xe,Ye,e("p",et,"Vat "+d(_.value)+"%:",1),tt])]),e("td",at,[ot,e("p",lt,"\u0E3F"+d(a.data.baht),1),st,e("p",nt,"\u0E3F"+d(P.value),1),e("p",it,"\u0E3F"+d(l.value),1)])])])])]),_:1}),t(S),t(p,null,{default:o(()=>[e("div",dt,[ct,e("span",null,d(a.data.note),1)])]),_:1})]),_:1})]),_:1}),t(v,{cols:"12",md:"3",class:"d-print-none"},{default:o(()=>[t(y,{class:"mb-8"},{default:o(()=>[t(p,null,{default:o(()=>[t(m,{block:"",variant:"elevated",color:"secondary",class:"d-flex align-center"},{default:o(()=>[r(" LINE PROFILE ")]),_:1})]),_:1}),t(p,{class:"d-flex justify-center"},{default:o(()=>[t(ue,{rounded:"",size:"100",class:"me-6",image:u.avatarImg},null,8,["image"])]),_:1}),t(p,{class:"pt-2"},{default:o(()=>[t(Z,{class:"mt-6"},{default:o(()=>[t(q,null,{default:o(()=>[t(v,{md:"12",cols:"12"},{default:o(()=>[t(C,{modelValue:a.data.invoice.customerInfo.lineId,"onUpdate:modelValue":n[0]||(n[0]=i=>a.data.invoice.customerInfo.lineId=i),label:"LINE NAME"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(y,{class:"mb-8"},{default:o(()=>[t(p,null,{default:o(()=>[t(m,{block:"",color:"warning",variant:"tonal","prepend-icon":"tabler-clipboard-text",class:"mb-2"},{default:o(()=>[r(" \u0E43\u0E1A\u0E41\u0E08\u0E49\u0E07\u0E2B\u0E19\u0E35\u0E49 ")]),_:1}),t(m,{block:"",variant:"tonal",color:"default","prepend-icon":"tabler-send",class:"mb-2"},{default:o(()=>[r(" \u0E2A\u0E48\u0E07\u0E43\u0E1A\u0E41\u0E08\u0E49\u0E07\u0E2B\u0E19\u0E35\u0E49\u0E1C\u0E48\u0E32\u0E19 LINE ")]),_:1}),t(m,{block:"",color:"default",variant:"tonal","prepend-icon":"tabler-send",class:"mb-2",onClick:n[1]||(n[1]=i=>I.value=!0)},{default:o(()=>[r(" \u0E2A\u0E48\u0E07\u0E43\u0E1A\u0E41\u0E08\u0E49\u0E07\u0E2B\u0E19\u0E35\u0E49\u0E1C\u0E48\u0E32\u0E19\u0E2D\u0E35\u0E40\u0E21\u0E25 ")]),_:1}),e("div",rt,[e("div",mt,[t(m,{block:"",variant:"tonal",color:"default","prepend-icon":"tabler-download",class:"mb-2",onClick:G},{default:o(()=>[r(" \u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14 ")]),_:1})]),e("div",ut,[t(m,{block:"",variant:"tonal",color:"default","prepend-icon":"tabler-printer",class:"mb-2",onClick:J},{default:o(()=>[r(" \u0E1B\u0E23\u0E34\u0E19\u0E17\u0E4C ")]),_:1})])]),a.data.paymentStatus!="paid"?(w(),$("div",pt,[t(v,{cols:"12",md:"12"},{default:o(()=>[t(pe,{modelValue:a.data.paymentStatus,"onUpdate:modelValue":n[2]||(n[2]=i=>a.data.paymentStatus=i),label:" -- \u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E43\u0E1A\u0E41\u0E08\u0E49\u0E07\u0E2B\u0E19\u0E35\u0E49 -- ",items:R,"menu-props":{maxHeight:200},rules:[f(oe)(a.data.paymentStatus,"\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2B\u0E21\u0E27\u0E14\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22")]},null,8,["modelValue","rules"])]),_:1})])):B("",!0),e("div",null,[t(v,{cols:"12",md:"12"},{default:o(()=>[a.data.paymentStatus=="paid"?(w(),j(m,{key:0,block:"",color:"success",variant:"tonal","prepend-icon":"tabler-coin-bitcoin",class:"mb-0"},{default:o(()=>[r(" \u0E0A\u0E33\u0E23\u0E30\u0E41\u0E25\u0E49\u0E27 ")]),_:1})):B("",!0)]),_:1}),t(m,{block:"",class:"mb-2",onClick:X},{default:o(()=>[r(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 ")]),_:1})])]),_:1})]),_:1}),a.data.paymentStatus!="unpaid"?(w(),j(y,{key:0,class:"mb-8"},{default:o(()=>[t(p,null,{default:o(()=>[t(m,{block:"",color:"warning",variant:"tonal","prepend-icon":"tabler-clipboard-text",class:"mb-2"},{default:o(()=>[r(" \u0E43\u0E1A\u0E01\u0E33\u0E01\u0E31\u0E1A\u0E20\u0E32\u0E29\u0E35 ")]),_:1}),t(m,{block:"",variant:"tonal",color:"default","prepend-icon":"tabler-send",class:"mb-2"},{default:o(()=>[r(" \u0E2A\u0E48\u0E07\u0E43\u0E1A\u0E01\u0E33\u0E01\u0E31\u0E1A\u0E20\u0E32\u0E29\u0E35\u0E1C\u0E48\u0E32\u0E19 LINE ")]),_:1}),t(m,{block:"",color:"default",variant:"tonal","prepend-icon":"tabler-send",class:"mb-2",onClick:n[3]||(n[3]=i=>I.value=!0)},{default:o(()=>[r(" \u0E2A\u0E48\u0E07\u0E43\u0E1A\u0E01\u0E33\u0E01\u0E31\u0E1A\u0E20\u0E32\u0E29\u0E35\u0E1C\u0E48\u0E32\u0E19\u0E2D\u0E35\u0E40\u0E21\u0E25 ")]),_:1}),e("div",ft,[e("div",vt,[t(m,{block:"",variant:"tonal",color:"default","prepend-icon":"tabler-download",class:"mb-2",onClick:K},{default:o(()=>[r(" \u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14 ")]),_:1})]),e("div",_t,[t(m,{block:"",variant:"tonal",color:"default","prepend-icon":"tabler-printer",class:"mb-2",onClick:W},{default:o(()=>[r(" \u0E1B\u0E23\u0E34\u0E19\u0E17\u0E4C ")]),_:1})])])]),_:1})]),_:1})):B("",!0),t(y,{class:"mb-8"},{default:o(()=>[t(p,null,{default:o(()=>[t(m,{block:"",color:"warning",variant:"tonal","prepend-icon":"tabler-coin-bitcoin",class:"mb-0"},{default:o(()=>[r(" \u0E22\u0E2D\u0E14\u0E23\u0E27\u0E21\u0E43\u0E1A\u0E40\u0E2A\u0E19\u0E2D\u0E23\u0E32\u0E04\u0E32 ")]),_:1}),t(v,{cols:"12"},{default:o(()=>[t(C,{modelValue:a.data.baht,"onUpdate:modelValue":n[4]||(n[4]=i=>a.data.baht=i),label:"\u0E22\u0E2D\u0E14",prefix:"\u0E3F",readonly:""},null,8,["modelValue"])]),_:1}),t(v,{cols:"12"},{default:o(()=>[t(C,{modelValue:a.data.invoice.amountRecieved.percent,"onUpdate:modelValue":n[5]||(n[5]=i=>a.data.invoice.amountRecieved.percent=i),label:"\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30\u0E04\u0E34\u0E14\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E1B\u0E2D\u0E23\u0E4C\u0E40\u0E0B\u0E47\u0E19",prefix:"%",readonly:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),t(v,{cols:"9",class:"d-print-none"},{default:o(()=>[t(y,{title:"\u0E41\u0E19\u0E1A\u0E23\u0E39\u0E1B\u0E17\u0E35\u0E48\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E02\u0E49\u0E2D\u0E07"},{default:o(()=>[t(p,null,{default:o(()=>[t(L,{acceptType:"image/*",label:"\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E39\u0E1B",prependIcon:"tabler-camera",files:a.invoiceImageFiles,filesAlreadyUploaded:a.invoiceImageFilesAlreadyUploaded,"onUpdate:filesAlreadyUploaded":n[6]||(n[6]=i=>a.invoiceImageFilesAlreadyUploaded=i),popUpTitle:"Delete related image.",popUpLabel:"Are you sure you want to delete",deletedFile:a.deletedFile.image,"onUpdate:deletedFile":n[7]||(n[7]=i=>a.deletedFile.image=i)},null,8,["files","filesAlreadyUploaded","deletedFile"])]),_:1})]),_:1})]),_:1}),t(v,{cols:"9",class:"d-print-none"},{default:o(()=>[t(y,{title:"\u0E41\u0E19\u0E1A\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E17\u0E35\u0E48\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E02\u0E49\u0E2D\u0E07 (PDF)"},{default:o(()=>[t(p,null,{default:o(()=>[t(L,{acceptType:"application/pdf",label:"\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23 PDF",files:a.invoicePDFFiles,filesAlreadyUploaded:a.invoicePDFFilesAlreadyUploaded,"onUpdate:filesAlreadyUploaded":n[8]||(n[8]=i=>a.invoicePDFFilesAlreadyUploaded=i),popUpTitle:"Delete related PDF.",popUpLabel:"Are you sure you want to delete",deletedFile:a.deletedFile.pdf,"onUpdate:deletedFile":n[9]||(n[9]=i=>a.deletedFile.pdf=i)},null,8,["files","filesAlreadyUploaded","deletedFile"])]),_:1})]),_:1})]),_:1}),t(te,{isDrawerOpen:I.value,"onUpdate:isDrawerOpen":n[10]||(n[10]=i=>I.value=i)},null,8,["isDrawerOpen"])]),_:1})]))}},yt={__name:"index",setup(E){const a=H(),h=c(),D=c([]),F=c([]),V=c([]),N=c([]),T=de({image:[],pdf:[]}),l=c({_id:null,quotation_id:null,paymentImages:[],documentNumber:"",companyInfo_id:"",lead_id:"",invoice:{invoiceNumber:"",issuedDate:"",service:"",total:0,avatar:"",balance:"",dueDate:"",amountRecieved:{baht:0,percent:0},customerInfo:{companyInfo:{firstname:"",lastname:"",contactNumber:"",companyName:"",taxId:"",branch:"",address:""},lineId:""}},paymentDetails:{totalDue:"$12,110.55",bankName:"American Bank",country:"United States",iban:"ETD95476213874685",swiftCode:"BR91905"},products:[{_id:"",modelCode:"",name:"",quantity:"",discountBaht:"",totalPricePerRow:""}],paymentMethod:"",salesperson:"",extraDiscount:"",paymentMethod:"",totalDiscount:"",totalAmount:0,totalPrice:"",vat:"",totalVat:"",thanksNote:"",paymentStatus:"\u0E23\u0E2D\u0E0A\u0E33\u0E23\u0E30",createdBy:{firstname:"",lastname:""},baht:0,pdfPath:"",pdfTaxPath:"",note:"",invoiceNumbers:""});return(()=>{const _=a.query._id;typeof _==null||z.fetchData("?_id="+_).then(b=>{if(console.log(b.data),b.data.code==1){const s=b.data.data[0];l.value._id=a.query._id,l.value.quotation_id=s.quotation_id,l.value.paymentStatus=s.paymentStatus,l.value.note=s.note,l.value.invoiceNumbers=s.invoiceNumbers,l.value.documentNumber=s.documentNumber,l.value.companyInfo_id=s.customerInfo.companyInfo.companyInfo_id,l.value.lead_id=s.customerInfo.lead_id,l.value.invoice.issuedDate=s.issuedDate.split("T")[0]+" "+s.issuedDate.split("T00")[1].split(":")[0],l.value.invoice.dueDate=s.dueDate.split("T")[0]+" "+s.dueDate.split("T00")[1].split(":")[0],l.value.products=s.products;for(var u=0;u<l.value.products.length;u++){var R=isNaN(l.value.products[u].price)?0:parseFloat(l.value.products[u].price),I=isNaN(l.value.products[u].quantity)?0:parseFloat(l.value.products[u].quantity);l.value.products[u].totalPricePerRow=R*I,l.value.totalAmount+=l.value.products[u].totalPricePerRow}l.value.invoice.customerInfo.companyInfo.firstname=s.customerInfo.companyInfo.firstname,l.value.invoice.customerInfo.companyInfo.lastname=s.customerInfo.companyInfo.lastname,l.value.invoice.customerInfo.companyInfo.contactNumber=s.customerInfo.companyInfo.contactNumber,l.value.invoice.customerInfo.companyInfo.companyName=s.customerInfo.companyInfo.companyName,l.value.invoice.customerInfo.companyInfo.taxId=s.customerInfo.companyInfo.taxId,l.value.invoice.customerInfo.companyInfo.branch=s.customerInfo.companyInfo.branch,l.value.invoice.customerInfo.companyInfo.address=s.customerInfo.companyInfo.address,l.value.baht=s.amountRecieved.baht,l.value.invoice.amountRecieved.percent=s.amountRecieved.percent,l.value.invoice.customerInfo.lineId=s.customerInfo.lineId,l.value.createdBy.firstname=s.createdBy.firstname,l.value.createdBy.lastname=s.createdBy.lastname,F.value=s.paymentImages,N.value=s.paymentDocuments,l.value.pdfPath=s.pdfPath,l.value.pdfTaxPath=s.pdfTaxPath}})})(),(_,b)=>(w(),j(q,null,{default:o(()=>[t(v,{cols:"12",md:"12"},{default:o(()=>[t(Z,{ref_key:"refForm",ref:h,class:"mt-6"},{default:o(()=>[t(bt,{data:f(l),refForm:f(h),"onUpdate:refForm":b[0]||(b[0]=u=>ce(h)?h.value=u:null),invoiceImageFiles:f(D),invoiceImageFilesAlreadyUploaded:f(F),invoicePDFFiles:f(V),invoicePDFFilesAlreadyUploaded:f(N),deletedFile:f(T),class:"d-flex justify-space-between flex-wrap flex-column flex-sm-row print-row"},null,8,["data","refForm","invoiceImageFiles","invoiceImageFilesAlreadyUploaded","invoicePDFFiles","invoicePDFFilesAlreadyUploaded","deletedFile"])]),_:1},512)]),_:1})]),_:1}))}};typeof Q=="function"&&Q(yt);export{yt as default};