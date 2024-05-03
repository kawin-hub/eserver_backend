import{_ as w}from"./AppSearchHeader.9db2e545.js";import{a as g,V as f}from"./VRow.f9366793.js";import{V as k,c as i}from"./VCard.bb37f72e.js";import{V as $}from"./VImg.632117c3.js";import{V as b}from"./VBtn.3e0f2bdf.js";import{o,b as m,w as t,p as e,c as d,F as C,a as V,m as a,x as h,E as n,L,r as A,k as B,q as _,y as H,a1 as D}from"./index.35991f09.js";import{V as N}from"./VAvatar.6ed53308.js";import"./VTextField.4609cb9e.js";/* empty css                   */import"./VField.93eb26cb.js";import"./index.a8f66a9c.js";import"./VInput.6bf7b46e.js";import"./router.88351000.js";import"./form.e84299e4.js";import"./position.15b8fc3a.js";import"./easing.36b781ab.js";import"./forwardRefs.c003b6b8.js";import"./VCounter.cb1a1153.js";const R={class:"text-h6 my-3"},v={__name:"HelpCenterLandingArticlesOverview",props:{articles:{type:Array,required:!0}},setup(p){const s=p;return(y,c)=>(o(),m(f,null,{default:t(()=>[e(g,{cols:"12",lg:"10",class:"mx-auto mb-8"},{default:t(()=>[e(f,null,{default:t(()=>[(o(!0),d(C,null,V(s.articles,r=>(o(),m(g,{key:r.title,cols:"12",md:"4"},{default:t(()=>[e(k,{flat:"",border:""},{default:t(()=>[e(i,{class:"text-center"},{default:t(()=>[e($,{src:r.img,"aspect-ratio":"1",width:"58",class:"mx-auto"},null,8,["src"]),a("h6",R,h(r.title),1),a("p",null,h(r.subtitle),1),e(b,{size:"small",variant:"tonal",to:{name:"pages-help-center-category-subcategory-article",params:{category:"getting-started",subcategory:"account",article:"changing-your-username"}}},{default:t(()=>[n(" Read More ")]),_:1})]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1}))}},q={},F={class:"bg-var-theme-background py-12"},K=a("h5",{class:"text-h5 text-center mb-6"}," Still need help? ",-1),S=a("p",null,[n(" Our specialists are always happy to help. Contact us during standard business hours or email us "),a("br"),n(" 24/7 and we'll get back to you. ")],-1),E={class:"d-flex justify-center gap-4 flex-wrap"};function I(p,s){return o(),d("div",F,[e(i,{class:"text-center py-6"},{default:t(()=>[K,S,a("div",E,[e(b,null,{default:t(()=>[n("Visit our community")]),_:1}),e(b,null,{default:t(()=>[n("Contact us")]),_:1})])]),_:1})])}const O=L(q,[["render",I]]),T={class:"ps-6",style:{"list-style":"disc"}},j={class:"mt-4"},z={__name:"HelpCenterLandingKnowledgeBase",props:{categories:{type:Array,required:!0}},setup(p){const s=p,y=c=>c.subCategories.map(r=>r.articles.length).reduce((r,u)=>r+u,0);return(c,r)=>{const u=A("RouterLink");return o(),m(f,null,{default:t(()=>[e(g,{cols:"12",lg:"10",class:"mx-auto mb-8"},{default:t(()=>[e(f,null,{default:t(()=>[(o(!0),d(C,null,V(s.categories,l=>(o(),m(g,{key:l.title,cols:"12",sm:"6",md:"4"},{default:t(()=>[e(k,{title:l.title},{prepend:t(()=>[e(N,{icon:l.icon,rounded:"",color:l.avatarColor,variant:"tonal"},null,8,["icon","color"])]),default:t(()=>[e(i,null,{default:t(()=>[a("ul",T,[(o(!0),d(C,null,V(l.subCategories,x=>(o(),d("li",{key:x.title,class:"text-primary mb-2"},[e(u,{to:{name:"pages-help-center-category-subcategory",params:{category:l.slug,subcategory:x.slug}}},{default:t(()=>[n(h(x.title),1)]),_:2},1032,["to"])]))),128))]),a("div",j,[e(u,{to:{name:"pages-help-center-category-subcategory",params:{category:l.slug,subcategory:l.subCategories[0].slug}},class:"text-base font-weight-semibold"},{default:t(()=>[n(h(y(l))+" articles ",1)]),_:2},1032,["to"])])]),_:2},1024)]),_:2},1032,["title"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})}}},M=a("h5",{class:"text-h5 text-center my-6"}," Popular Articles ",-1),P=a("h5",{class:"text-h5 text-center my-6"}," Knowledge Base ",-1),G=a("h5",{class:"text-h5 text-center my-6"}," Keep Learning ",-1),pe={__name:"index",setup(p){const s=B();return(()=>D.get("/pages/help-center/landing").then(c=>{s.value=c.data}))(),(c,r)=>{const u=w;return _(s)?(o(),m(k,{key:0},{default:t(()=>[e(u,{title:"Hello, how can we help?",subtitle:"Common troubleshooting topics: eCommerce, Blogging to payment","custom-class":"rounded-0"}),e(i,{class:"py-12"},{default:t(()=>[M,e(v,{articles:_(s).popularArticles},null,8,["articles"])]),_:1}),a("div",null,[e(i,{class:"bg-var-theme-background py-12"},{default:t(()=>[P,e(z,{categories:_(s).categories},null,8,["categories"])]),_:1})]),e(i,{class:"py-12"},{default:t(()=>[G,e(v,{articles:_(s).keepLearning},null,8,["articles"])]),_:1}),e(O)]),_:1})):H("",!0)}}};export{pe as default};
