import{_ as Y}from"./AppDateTimePicker.fa0b4675.js";import{a as u,V as I}from"./VRow.04ed429a.js";import{V as $}from"./VSelect.dd7a9d71.js";import{V as B}from"./VTextarea.07a701c1.js";import{V as x}from"./VTextField.45867489.js";import{V as D}from"./VBtn.5345231d.js";import{k as v,Z as N,bl as w,A as E,o as y,c as C,m as t,p as e,w as o,q as m,D as g,x as c,C as A,F as j,bc as q,a1 as P,b as L,v as O,y as R,a as z,E as h}from"./index.49ef7351.js";import{V as T,c as V}from"./VCard.489135da.js";import{V as S}from"./VDivider.fa0f54cb.js";import{V as k}from"./VInput.1ff489a8.js";import{V as U}from"./VSwitch.8abe3094.js";import"./VField.6fbd17fb.js";import"./index.a19f3361.js";import"./position.5856deb4.js";import"./router.7394f425.js";import"./easing.36b781ab.js";import"./VList.3a0b4683.js";import"./VAvatar.89c4d356.js";import"./VImg.33aacaa5.js";import"./forwardRefs.c003b6b8.js";import"./dialog-transition.d8941cb2.js";import"./VMenu.d92d4813.js";import"./scopeId.1cbcff4d.js";import"./VOverlay.1858ab35.js";import"./lazy.ff556122.js";import"./VCheckboxBtn.cc3cfdf3.js";import"./VSelectionControl.7a61433f.js";import"./VChip.d8bf415a.js";/* empty css                   */import"./VCounter.f0f43262.js";const F={class:"add-products-header mb-2 d-none d-md-flex"},Z=t("span",{class:"text-sm"}," Item ",-1),G=t("span",{class:"text-sm"}," Unit price ",-1),H=t("span",{class:"text-sm"}," Amount ",-1),W=t("span",{class:"text-sm"}," Discount / Unit ",-1),K=t("span",{class:"text-sm"}," Price ",-1),J={class:"pa-5 flex-grow-1"},Q={class:"text-sm-center my-2"},X=t("span",{class:"d-inline d-md-none"},"Price: ",-1),tt={class:"text-body-1"},et={class:"d-flex flex-column justify-space-between border-s pa-1"},st={__name:"InvoiceProductEdit",props:{id:{type:Number,required:!0},data:{type:Object,required:!0},baseDiscount:{type:Number,required:!0},purchasedProducts:{type:Object}},emits:["removeProduct","totalAmount"],setup(r,{emit:s}){const l=r,p=[{title:"LS179",cost:5e3,hours:1,description:"Outdoor Camera 1080P",discount:0},{title:"LS174",cost:2500,hours:1,description:"Dimmer & Motion Sensor Switch",discount:0},{title:"LS170GD",cost:2800,hours:1,description:"Stellar Switch 1 way (Gold Color)",discount:0},{title:"LS082WH-HKZB",cost:5500,hours:1,description:"Smart Station Zigbee.",discount:0}],d=v({title:"LS179",cost:5e3,hours:1,description:"Outdoor Camera 1080P",discount:0});N(d,()=>{l.data.cost=structuredClone(w(d.value.cost)),l.data.hours=structuredClone(w(d.value.hours)),l.data.discount=structuredClone(w(d.value.cost*l.baseDiscount/100)),l.data.description=structuredClone(w(d.value.description)),l.data.title=structuredClone(w(d.value.title))});const f=()=>{s("removeProduct",l.id)},b=E(function(){return l.data.discount===void 0?0:Number(l.data.cost)*Number(l.data.hours)-Number(l.data.discount)*Number(l.data.hours)});return N(b,()=>{s("totalAmount",b.value)},{immediate:!0}),(_,a)=>(y(),C(j,null,[t("div",F,[e(I,{class:"font-weight-medium px-4"},{default:o(()=>[e(u,{cols:"12",md:""},{default:o(()=>[Z]),_:1}),e(u,{cols:"12",md:"2"},{default:o(()=>[G]),_:1}),e(u,{cols:"12",md:"2"},{default:o(()=>[H]),_:1}),e(u,{cols:"12",md:"2"},{default:o(()=>[W]),_:1}),e(u,{cols:"12",md:"2"},{default:o(()=>[K]),_:1})]),_:1})]),e(T,{flat:"",border:"",class:"d-flex flex-row"},{default:o(()=>[t("div",J,[e(I,null,{default:o(()=>[e(u,{cols:"12",md:"4"},{default:o(()=>[e($,{modelValue:m(d),"onUpdate:modelValue":a[0]||(a[0]=n=>g(d)?d.value=n:null),items:p,label:"Select Item","return-object":"",class:"mb-3"},null,8,["modelValue"]),e(B,{modelValue:l.data.description,"onUpdate:modelValue":a[1]||(a[1]=n=>l.data.description=n),rows:"2",label:"Description",placeholder:"Description"},null,8,["modelValue"])]),_:1}),e(u,{cols:"12",md:"2",sm:"4"},{default:o(()=>[e(x,{modelValue:l.data.cost,"onUpdate:modelValue":a[2]||(a[2]=n=>l.data.cost=n),type:"number",label:"Unit price"},null,8,["modelValue"])]),_:1}),e(u,{cols:"12",md:"2",sm:"4"},{default:o(()=>[e(x,{modelValue:l.data.hours,"onUpdate:modelValue":a[3]||(a[3]=n=>l.data.hours=n),type:"number",label:"Amount"},null,8,["modelValue"])]),_:1}),e(u,{cols:"12",md:"2",sm:"4"},{default:o(()=>[e(x,{modelValue:l.data.discount,"onUpdate:modelValue":a[4]||(a[4]=n=>l.data.discount=n),type:"number",label:"Discount"},null,8,["modelValue"])]),_:1}),e(u,{cols:"12",md:"2",sm:"4"},{default:o(()=>[t("p",Q,[X,t("span",tt,"\u0E3F"+c(m(b)),1)])]),_:1})]),_:1})]),t("div",et,[e(D,{icon:"",size:"x-small",color:"default",variant:"text",onClick:f},{default:o(()=>[e(A,{size:"20",icon:"tabler-x"})]),_:1}),e(D,{icon:"",size:"x-small",color:"default",variant:"text"},{default:o(()=>[e(A,{size:"20",icon:"tabler-settings"})]),_:1})])]),_:1})],64))}},at=q("InvoiceStore",{actions:{fetchInvoices(r){return P.get("apps/invoices",{params:r})},fetchInvoice(r){return P.get(`/apps/invoices/${r}`)},fetchClients(){return P.get("/apps/invoice/clients")}}}),ot={class:"ma-sm-4"},lt={class:"d-flex align-center mb-6"},nt={class:"font-weight-bold text-xl"},dt=t("p",{class:"mb-0"},"Office 149, 450 South Brand Brooklyn",-1),it=t("p",{class:"mb-0"},"San Diego County, CA 91905, USA",-1),ct=t("p",{class:"mb-0"},"+1 (123) 456 7891, +44 (876) 543 2198",-1),ut={class:"mt-4 ma-sm-4"},mt={class:"d-flex align-center font-weight-medium justify-sm-end text-xl mb-3"},rt=t("span",{class:"me-3"},"Invoice",-1),pt={class:"d-flex align-center justify-sm-end mb-3"},_t=t("span",{class:"me-3"},"Date Issued",-1),ft={class:"d-flex align-center justify-sm-end mb-0"},bt=t("span",{class:"me-3"},"Due Date",-1),ht={class:"ma-sm-4",style:{width:"15.5rem"}},vt=t("h6",{class:"text-sm font-weight-medium mb-3"},"Invoice To:",-1),Vt=t("br",null,null,-1),yt={class:"mb-1"},xt={class:"mb-1"},Dt={key:0,class:"mb-1"},wt={class:"mb-1"},gt={class:"mb-0"},St=t("br",null,null,-1),Ct={class:"ma-sm-4"},Pt=t("h6",{class:"text-sm font-weight-medium mb-3"},"Bill To:",-1),kt=t("td",{class:"pe-6"},"Total Due:",-1),Ut={class:"font-weight-semibold"},It=t("td",{class:"pe-6"},"Bank Name:",-1),Nt=t("td",{class:"pe-6"},"Country:",-1),$t=t("td",{class:"pe-6"},"IBAN:",-1),Tt=t("td",{class:"pe-6"},"SWIFT Code:",-1),At={class:"mt-4 ma-sm-4"},Bt={class:"mx-sm-4 my-2"},jt={class:"d-flex align-center mb-4"},Lt={class:"my-2 mx-sm-4"},Mt=t("td",{class:"text-end"},[t("div",{class:"me-5"},[t("p",{class:"mb-2"},"Subtotal:"),t("p",{class:"mb-2"},"Discount:"),t("p",{class:"mb-2"},"Tax:"),t("p",{class:"mb-2"},"Total:")])],-1),Yt={class:"font-weight-semibold"},Et={class:"mb-2"},qt=t("p",{class:"mb-2"},"\u0E3F 00.00",-1),Ot=t("p",{class:"mb-2"},"\u0E3F 00.00",-1),Rt=t("p",{class:"mb-2"},"\u0E3F 00.00",-1),zt=t("p",{class:"font-weight-semibold mb-2"},"Note:",-1),Ft={__name:"quotationEditable",props:{data:{type:null,required:!0}},setup(r){const s=r,l=at(),p=v([]);let d=0;l.fetchClients().then(_=>{p.value=_.data}).catch(_=>{console.log(_)});const f=()=>{s.data.purchasedProducts.push({title:"App Design",cost:24,hours:1,description:"Designed UI kit & app pages.",discount:0})};N(s.data.purchasedProducts,()=>{});const b=_=>{s.data.purchasedProducts.splice(_,1)};return(_,a)=>{const n=Y;return y(),L(T,null,{default:o(()=>[e(V,{class:"d-flex flex-wrap justify-space-between flex-column flex-sm-row"},{default:o(()=>[t("div",ot,[t("div",lt,[t("h6",nt,c(m(O).app.title),1)]),dt,it,ct]),t("div",ut,[t("h6",mt,[rt,t("span",null,[e(x,{modelValue:s.data.invoice.id,"onUpdate:modelValue":a[0]||(a[0]=i=>s.data.invoice.id=i),disabled:"",prefix:"#",density:"compact",style:{width:"8.9rem"}},null,8,["modelValue"])])]),t("p",pt,[_t,t("span",null,[e(n,{modelValue:s.data.invoice.issuedDate,"onUpdate:modelValue":a[1]||(a[1]=i=>s.data.invoice.issuedDate=i),density:"compact",placeholder:"YYYY-MM-DD",style:{width:"8.9rem"},config:{position:"auto right"}},null,8,["modelValue"])])]),t("p",ft,[bt,t("span",null,[e(n,{modelValue:s.data.invoice.dueDate,"onUpdate:modelValue":a[2]||(a[2]=i=>s.data.invoice.dueDate=i),density:"compact",placeholder:"YYYY-MM-DD",style:{width:"8.9rem"},config:{position:"auto right"}},null,8,["modelValue"])])])])]),_:1}),e(S),e(V,{class:"d-flex flex-wrap justify-space-between flex-column flex-sm-row gap-4"},{default:o(()=>[t("div",ht,[vt,e($,{modelValue:s.data.invoice.client,"onUpdate:modelValue":a[3]||(a[3]=i=>s.data.invoice.client=i),items:m(p),"item-title":"name","item-value":"name",placeholder:"Select Customer","return-object":"",class:"mb-6",density:"compact"},null,8,["modelValue","items"]),e(x,{modelValue:s.data.invoice.client.baseDiscount,"onUpdate:modelValue":a[4]||(a[4]=i=>s.data.invoice.client.baseDiscount=i),type:"number",label:"Discount in percentage"},null,8,["modelValue"]),Vt,t("p",yt,c(s.data.invoice.client.name),1),t("p",xt,c(s.data.invoice.client.company),1),s.data.invoice.client.address?(y(),C("p",Dt,c(s.data.invoice.client.address)+", "+c(s.data.invoice.client.country),1)):R("",!0),t("p",wt,c(s.data.invoice.client.contact),1),t("p",gt,c(s.data.invoice.client.companyEmail),1),St]),t("div",Ct,[Pt,t("table",null,[t("tbody",null,[t("tr",null,[kt,t("td",Ut,c(s.data.paymentDetails.totalDue),1)]),t("tr",null,[It,t("td",null,c(s.data.paymentDetails.bankName),1)]),t("tr",null,[Nt,t("td",null,c(s.data.paymentDetails.country),1)]),t("tr",null,[$t,t("td",null,c(s.data.paymentDetails.iban),1)]),t("tr",null,[Tt,t("td",null,c(s.data.paymentDetails.swiftCode),1)])])])])]),_:1}),e(S),e(V,{class:"add-products-form"},{default:o(()=>[(y(!0),C(j,null,z(s.data.purchasedProducts,(i,M)=>(y(),C("div",{key:i.title,class:"ma-sm-4"},[e(st,{id:M,data:i,baseDiscount:s.data.invoice.client.baseDiscount===void 0?0:s.data.invoice.client.baseDiscount,subtotal:m(d),onRemoveProduct:b},null,8,["id","data","baseDiscount","subtotal"])]))),128)),t("div",At,[e(D,{onClick:f},{default:o(()=>[h(" Add Item ")]),_:1})])]),_:1}),e(S),e(V,{class:"d-flex justify-space-between flex-wrap flex-column flex-sm-row"},{default:o(()=>[t("div",Bt,[t("div",jt,[e(x,{style:{width:"15rem"},modelValue:s.data.thanksNote,"onUpdate:modelValue":a[5]||(a[5]=i=>s.data.thanksNote=i),placeholder:"Thanks for your business"},null,8,["modelValue"])])]),t("div",Lt,[t("table",null,[t("tr",null,[Mt,t("td",Yt,[t("p",Et,"$ "+c(m(d)),1),qt,Ot,Rt])])])])]),_:1}),e(S),e(V,{class:"mx-sm-4"},{default:o(()=>[zt,e(B,{modelValue:s.data.note,"onUpdate:modelValue":a[6]||(a[6]=i=>s.data.note=i),rows:2},null,8,["modelValue"])]),_:1})]),_:1})}}},Zt={class:"d-flex align-center justify-space-between"},Gt={class:"d-flex align-center justify-space-between"},Ht={class:"d-flex align-center justify-space-between"},Se={__name:"index",setup(r){const s=v({invoice:{id:5037,issuedDate:"",service:"",total:0,avatar:"",invoiceStatus:"",balance:"",dueDate:"",client:{address:"",company:"",companyEmail:"",contact:"",country:"",name:""}},paymentDetails:{totalDue:"$12,110.55",bankName:"American Bank",country:"United States",iban:"ETD95476213874685",swiftCode:"BR91905"},purchasedProducts:[{title:"",cost:0,hours:0,description:""}],note:"",paymentMethod:"",salesperson:"",thanksNote:""}),l=v(!0),p=v(!1),d=v(!1),f=v("Bank Account"),b=["Bank Account","PayPal","UPI Transfer"];return(_,a)=>(y(),L(I,null,{default:o(()=>[e(u,{cols:"12",md:"9"},{default:o(()=>[e(Ft,{data:m(s)},null,8,["data"])]),_:1}),e(u,{cols:"12",md:"3"},{default:o(()=>[e(T,{class:"mb-8"},{default:o(()=>[e(V,null,{default:o(()=>[e(D,{block:"","prepend-icon":"tabler-send",class:"mb-2"},{default:o(()=>[h(" Send Invoice ")]),_:1}),e(D,{block:"",color:"default",variant:"tonal",class:"mb-2",to:{name:"apps-invoice-preview-id",params:{id:"5036"}}},{default:o(()=>[h(" Preview ")]),_:1}),e(D,{block:"",color:"default",variant:"tonal"},{default:o(()=>[h(" Save ")]),_:1})]),_:1})]),_:1}),e($,{modelValue:m(f),"onUpdate:modelValue":a[0]||(a[0]=n=>g(f)?f.value=n:null),items:b,label:"Accept Payment Via",class:"mb-6"},null,8,["modelValue"]),t("div",Zt,[e(k,{for:"payment-terms"},{default:o(()=>[h(" Payment Terms ")]),_:1}),t("div",null,[e(U,{id:"payment-terms",modelValue:m(l),"onUpdate:modelValue":a[1]||(a[1]=n=>g(l)?l.value=n:null)},null,8,["modelValue"])])]),t("div",Gt,[e(k,{for:"client-notes"},{default:o(()=>[h(" Client Notes ")]),_:1}),t("div",null,[e(U,{id:"client-notes",modelValue:m(p),"onUpdate:modelValue":a[2]||(a[2]=n=>g(p)?p.value=n:null)},null,8,["modelValue"])])]),t("div",Ht,[e(k,{for:"payment-stub"},{default:o(()=>[h(" Payment Stub ")]),_:1}),t("div",null,[e(U,{id:"payment-stub",modelValue:m(d),"onUpdate:modelValue":a[3]||(a[3]=n=>g(d)?d.value=n:null)},null,8,["modelValue"])])])]),_:1})]),_:1}))}};export{Se as default};
