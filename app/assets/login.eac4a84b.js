import{k as n,o as A,b as F,w as t,p as e,m as l,q as a,x as P,v as j,be as q,D as V,E as f,bd as J,j as E,r as O,a1 as U,bn as $,d1 as G}from"./index.35991f09.js";import{u as W}from"./useAppAbility.b912f461.js";import{_ as z}from"./AuthProvider.46f4d9a9.js";import{u as x,m as H,a as K}from"./useGenerateImageVariant.b126668b.js";import{a as v,b as Q}from"./validators.9dda6c80.js";import{a as X,b as Y,c as Z,d as ee}from"./auth-v2-login-illustration-light.a2530d13.js";import{b as w}from"./route-block.182765af.js";import{V as k}from"./VImg.632117c3.js";import{a as i,V as I}from"./VRow.f9366793.js";import{V as te,c as _}from"./VCard.bb37f72e.js";import{V as se}from"./VAlert.91ecfd84.js";import{V as S}from"./VTextField.4609cb9e.js";import{V as ae}from"./VCheckbox.bdf702c3.js";import{V as oe}from"./VBtn.3e0f2bdf.js";import{V as D}from"./VDivider.0f44b1ce.js";import{V as re}from"./VForm.9ba2d763.js";import"./index.0d4b9ec4.js";import"./router.88351000.js";import"./VAvatar.6ed53308.js";import"./position.15b8fc3a.js";/* empty css                   */import"./VField.93eb26cb.js";import"./index.a8f66a9c.js";import"./VInput.6bf7b46e.js";import"./form.e84299e4.js";import"./easing.36b781ab.js";import"./forwardRefs.c003b6b8.js";import"./VCounter.cb1a1153.js";import"./VCheckboxBtn.a302f7e6.js";import"./VSelectionControl.6ac8e090.js";const le={class:"position-relative auth-bg rounded-lg w-100 ma-8 me-0"},ne={class:"d-flex align-center justify-center w-100 h-100"},ie={class:"text-h5 font-weight-semibold mb-1"},me=l("p",{class:"mb-0"}," Please sign-in to your account and start the adventure ",-1),ue=l("p",{class:"text-caption mb-2"},[f(" Please do not share your "),l("strong",null,"username and password"),f(" to anyone. ")],-1),de={class:"d-flex align-center flex-wrap justify-space-between mt-2 mb-4"},ce=l("span",{class:"mx-4"},"or",-1),pe={__name:"login",setup(fe){const L=x(ee,Z,Y,X,!0),T=x(K,H),u=n(!1),b=J(),C=E(),R=W(),g=n({email:void 0,password:void 0}),h=n(),d=n("admin@inhouse.co.th"),c=n("12345678"),p=n(!1),B=()=>{U.post($.api.url+"users/auth",{email:d.value,password:c.value}).then(o=>{const{accessToken:s,refreshTokenDetail:m}=o.data;m.refreshToken,m.exp;const r=G.decode(s),{userAbilities:y,userData:N}=r.userInfo;localStorage.setItem("userAbilities",JSON.stringify(y)),R.update(y),localStorage.setItem("userData",JSON.stringify(N)),localStorage.setItem("accessToken",s),localStorage.setItem("refreshTokenDetail",JSON.stringify(m)),localStorage.setItem("rememberMe",p.value),C.replace(b.query.to?String(b.query.to):"/")}).catch(o=>{const{errors:s}=o.response.data;g.value=s,console.error(o.response.data)})},M=()=>{var o;(o=h.value)==null||o.validate().then(({valid:s})=>{s&&B()})};return(o,s)=>{const m=O("RouterLink");return A(),F(I,{"no-gutters":"",class:"auth-wrapper"},{default:t(()=>[e(i,{lg:"8",class:"d-none d-lg-flex"},{default:t(()=>[l("div",le,[l("div",ne,[e(k,{"max-width":"505",src:a(L),class:"auth-illustration mt-16 mb-2"},null,8,["src"])]),e(k,{src:a(T),class:"auth-footer-mask"},null,8,["src"])])]),_:1}),e(i,{cols:"12",lg:"4",class:"d-flex align-center justify-center"},{default:t(()=>[e(te,{flat:"","max-width":500,class:"mt-12 mt-sm-0 pa-4"},{default:t(()=>[e(_,null,{default:t(()=>[l("h5",ie," Welcome to "+P(a(j).app.title)+"! \u{1F44B}\u{1F3FB} ",1),me]),_:1}),e(_,null,{default:t(()=>[e(se,{color:"primary",variant:"tonal"},{default:t(()=>[ue]),_:1})]),_:1}),e(_,null,{default:t(()=>[e(a(re),{ref_key:"refVForm",ref:h,onSubmit:q(M,["prevent"])},{default:t(()=>[e(I,null,{default:t(()=>[e(i,{cols:"12"},{default:t(()=>[e(S,{modelValue:a(d),"onUpdate:modelValue":s[0]||(s[0]=r=>V(d)?d.value=r:null),label:"Email",type:"email",rules:[a(v),a(Q)],"error-messages":a(g).email},null,8,["modelValue","rules","error-messages"])]),_:1}),e(i,{cols:"12"},{default:t(()=>[e(S,{modelValue:a(c),"onUpdate:modelValue":s[1]||(s[1]=r=>V(c)?c.value=r:null),label:"Password",rules:[a(v)],type:a(u)?"text":"password","error-messages":a(g).password,"append-inner-icon":a(u)?"tabler-eye-off":"tabler-eye","onClick:appendInner":s[2]||(s[2]=r=>u.value=!a(u))},null,8,["modelValue","rules","type","error-messages","append-inner-icon"]),l("div",de,[e(ae,{modelValue:a(p),"onUpdate:modelValue":s[3]||(s[3]=r=>V(p)?p.value=r:null),label:"Remember me"},null,8,["modelValue"]),e(m,{class:"text-primary ms-2 mb-1",to:{name:"forgot-password"}},{default:t(()=>[f(" Forgot Password? ")]),_:1})]),e(oe,{block:"",type:"submit"},{default:t(()=>[f(" Login ")]),_:1})]),_:1}),e(i,{cols:"12",class:"d-flex align-center"},{default:t(()=>[e(D),ce,e(D)]),_:1}),e(i,{cols:"12",class:"text-center"},{default:t(()=>[e(z)]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1})]),_:1})}}};typeof w=="function"&&w(pe);export{pe as default};
