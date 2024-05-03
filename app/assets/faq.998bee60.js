import{k as _,Z as x,o as n,c,p as t,q as l,D as h,w as a,H as w,I as q,F as V,a as v,s as B,C as g,m as s,E as T,a1 as E,b,x as d}from"./index.35991f09.js";import{_ as F}from"./AppSearchHeader.9db2e545.js";import{a as y,V as k}from"./VRow.f9366793.js";import{V as L,a as N}from"./VTabs.6d0b43a6.js";import{V as S}from"./VImg.632117c3.js";import{V as W,a as Q}from"./VWindowItem.f35c6905.js";import{V as D}from"./VChip.81c7dee3.js";import{V as I}from"./VAvatar.6ed53308.js";import{V as P,a as R}from"./VExpansionPanel.6e9ed4d6.js";import{V as A,c as C}from"./VCard.bb37f72e.js";import"./VTextField.4609cb9e.js";/* empty css                   */import"./VField.93eb26cb.js";import"./index.a8f66a9c.js";import"./VInput.6bf7b46e.js";import"./router.88351000.js";import"./form.e84299e4.js";import"./position.15b8fc3a.js";import"./easing.36b781ab.js";import"./forwardRefs.c003b6b8.js";import"./VCounter.cb1a1153.js";import"./VBtn.3e0f2bdf.js";import"./VSlideGroup.6d88d719.js";import"./lazy.7e795ed8.js";import"./ssrBoot.8b43ebe3.js";const H="/assets/sitting-girl-with-laptop.7faa3bb5.png";const j={class:"d-flex align-center mb-6"},G={class:"text-h6"},O={class:"text-sm"},Y=s("span",{class:"text-base font-weight-medium"}," No Results Found!! ",-1),Z={class:"text-center pt-15"},$=s("h5",{class:"text-h5 mb-2"}," You still have a question? ",-1),J=s("p",null," If you can't find question in our FAQ, you can contact us. We'll answer you shortly! ",-1),K={class:"text-h6 mb-2"},qe={__name:"faq",setup(M){const u=_(""),r=_([]),z=()=>E.get("/pages/faqs",{params:{q:u.value}}).then(f=>{r.value=f.data}).catch(f=>{console.error(f)}),i=_("Payment"),p=_(0);x(i,()=>p.value=0),x(u,z,{immediate:!0});const U=[{icon:"tabler-phone",via:"+ (810) 2548 2568",tagLine:"We are always happy to help!"},{icon:"tabler-mail",via:"hello@help.com",tagLine:"Best way to get answer faster!"}];return(f,o)=>(n(),c("section",null,[t(F,{modelValue:l(u),"onUpdate:modelValue":o[0]||(o[0]=e=>h(u)?u.value=e:null),title:"Hello, how can we help?",subtitle:"or select a category to quickly find the help you require","custom-class":"mb-7"},null,8,["modelValue"]),t(k,null,{default:a(()=>[w(t(y,{cols:"12",sm:"4",lg:"3",class:"position-relative"},{default:a(()=>[t(L,{modelValue:l(i),"onUpdate:modelValue":o[1]||(o[1]=e=>h(i)?i.value=e:null),direction:"vertical",class:"v-tabs-pill",grow:""},{default:a(()=>[(n(!0),c(V,null,v(l(r),e=>(n(),b(N,{key:e.faqTitle,value:e.faqTitle,class:"text-high-emphasis"},{default:a(()=>[t(g,{icon:e.faqIcon,size:20,start:""},null,8,["icon"]),T(" "+d(e.faqTitle),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),t(S,{width:245,src:l(H),class:"d-none d-sm-block mt-10 mx-auto"},null,8,["src"])]),_:1},512),[[q,l(r).length]]),t(y,{cols:"12",sm:"8",lg:"9"},{default:a(()=>[t(W,{modelValue:l(i),"onUpdate:modelValue":o[3]||(o[3]=e=>h(i)?i.value=e:null),class:"faq-v-window disable-tab-transition"},{default:a(()=>[(n(!0),c(V,null,v(l(r),e=>(n(),b(Q,{key:e.faqTitle,value:e.faqTitle},{default:a(()=>[s("div",j,[t(I,{rounded:"",color:"primary",variant:"tonal",class:"me-3",size:"large"},{default:a(()=>[t(g,{size:32,icon:e.faqIcon},null,8,["icon"])]),_:2},1024),s("div",null,[s("h6",G,d(e.faqTitle),1),s("span",O,d(e.faqSubtitle),1)])]),t(P,{modelValue:l(p),"onUpdate:modelValue":o[2]||(o[2]=m=>h(p)?p.value=m:null),multiple:""},{default:a(()=>[(n(!0),c(V,null,v(e.faqs,m=>(n(),b(R,{key:m.question,title:m.question,text:m.answer},null,8,["title","text"]))),128))]),_:2},1032,["modelValue"])]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"])]),_:1}),w(t(y,{cols:"12",class:B(l(r).length?"":"d-flex justify-center align-center")},{default:a(()=>[t(g,{icon:"tabler-help",start:"",size:"20"}),Y]),_:1},8,["class"]),[[q,!l(r).length]])]),_:1}),s("div",Z,[t(D,{label:"",color:"primary",size:"small",class:"mb-2"},{default:a(()=>[T(" QUESTION? ")]),_:1}),$,J,t(k,{class:"mt-4"},{default:a(()=>[(n(),c(V,null,v(U,e=>t(y,{key:e.icon,sm:"6",cols:"12"},{default:a(()=>[t(A,{flat:"",variant:"tonal"},{default:a(()=>[t(C,null,{default:a(()=>[t(I,{rounded:"",color:"primary",variant:"tonal",class:"me-3"},{default:a(()=>[t(g,{icon:e.icon},null,8,["icon"])]),_:2},1024)]),_:2},1024),t(C,null,{default:a(()=>[s("h6",K,d(e.via),1),s("span",null,d(e.tagLine),1)]),_:2},1024)]),_:2},1024)]),_:2},1024)),64))]),_:1})])]))}};export{qe as default};
