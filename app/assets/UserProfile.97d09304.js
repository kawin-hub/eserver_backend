import{o as r,b as s,w as t,p as e,q as a,C as l,E as i,x as m,j as g,a5 as b}from"./index.35991f09.js";import{u as v}from"./useAppAbility.b912f461.js";import{V as c}from"./VBadge.7f49e563.js";import{V as n}from"./VImg.632117c3.js";import{V as y}from"./VMenu.768d7784.js";import{V as I,a as u,b as f,c as k}from"./VList.8e9051e1.js";import{V as h}from"./VListItemAction.6c869a39.js";import{V as p}from"./VAvatar.6ed53308.js";import{V as S}from"./VDivider.0f44b1ce.js";import"./router.88351000.js";import"./forwardRefs.c003b6b8.js";import"./scopeId.a8f1d836.js";import"./VOverlay.a330b104.js";import"./lazy.7e795ed8.js";import"./easing.36b781ab.js";import"./dialog-transition.13a8c048.js";import"./index.a8f66a9c.js";const G={__name:"UserProfile",setup(x){const d=g(),V=v(),o=JSON.parse(localStorage.getItem("userData")||"null"),_=()=>{localStorage.removeItem("userData"),localStorage.removeItem("accessToken"),localStorage.removeItem("refreshTokenDetail"),localStorage.removeItem("rememberMe"),d.push("/login").then(()=>{localStorage.removeItem("userAbilities"),V.update(b)})};return(A,D)=>(r(),s(c,{dot:"",location:"bottom right","offset-x":"3","offset-y":"3",bordered:"",color:"success"},{default:t(()=>[e(p,{class:"cursor-pointer",color:"primary",variant:"tonal"},{default:t(()=>[a(o)&&a(o).avatar?(r(),s(n,{key:0,src:a(o).avatar},null,8,["src"])):(r(),s(l,{key:1,icon:"tabler-user"})),e(y,{activator:"parent",width:"230",location:"bottom end",offset:"14px"},{default:t(()=>[e(I,null,{default:t(()=>[e(u,null,{prepend:t(()=>[e(h,{start:""},{default:t(()=>[e(c,{dot:"",location:"bottom right","offset-x":"3","offset-y":"3",color:"success"},{default:t(()=>[e(p,{color:"primary",variant:"tonal"},{default:t(()=>[a(o)&&a(o).avatar?(r(),s(n,{key:0,src:a(o).avatar},null,8,["src"])):(r(),s(l,{key:1,icon:"tabler-user"}))]),_:1})]),_:1})]),_:1})]),default:t(()=>[e(f,{class:"font-weight-semibold"},{default:t(()=>[i(m(a(o).firstname+" "+a(o).lastname),1)]),_:1}),e(k,null,{default:t(()=>[i(m(a(o).role),1)]),_:1})]),_:1}),e(S,{class:"my-2"}),e(u,{link:"",onClick:_},{prepend:t(()=>[e(l,{class:"me-2",icon:"tabler-logout",size:"22"})]),default:t(()=>[e(f,null,{default:t(()=>[i("Logout")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}};export{G as default};