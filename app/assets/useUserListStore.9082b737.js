import{bc as n,bn as o,a1 as a}from"./index.35991f09.js";const i=n("UserListStore",{actions:{fetchUsers(r){const s={method:"get",url:o.api.url+"products/categories",headers:{Authorization:"Bearer "+o.getUserData().accessToken}};return a(s)},addUser(r){return new Promise((s,t)=>{a.post("/apps/users/user",{user:r}).then(e=>s(e)).catch(e=>t(e))})},fetchUser(r){return new Promise((s,t)=>{a.get(`/apps/users/${r}`).then(e=>s(e)).catch(e=>t(e))})}}});export{i as u};
