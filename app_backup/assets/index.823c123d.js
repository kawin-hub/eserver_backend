import{bk as a,a1 as n}from"./index.49ef7351.js";class C{constructor(t){this.url=t.url}fetchData(){const t={method:"get",url:this.url,headers:{Authorization:"Bearer "+a.getUserData().accessToken}};return n(t)}filterData(t,e){var{q:u="",status:c=null,perPage:o=10,currentPage:i=1}=t!=null?t:{};const l=u.toLowerCase();let r=e.filter(s=>(s.name.toLowerCase().includes(l)||s.description.toLowerCase().includes(l))&&s.status===(c||s.status)).reverse();const h=Math.ceil(r.length/o)?Math.ceil(r.length/o):1,d=r.length;if(o){const s=(i-1)*o,g=o*i;r=r.slice(s,g)}return{items:r,totalPage:h,totalItems:d}}deleteItem(t){const e={method:"delete",url:this.url,headers:{Authorization:"Bearer "+a.getUserData().accessToken},data:t};return n(e)}insertItem(t){const e={method:"post",url:this.url,headers:{Authorization:"Bearer "+a.getUserData().accessToken,"Content-Type":"multipart/form-data"},data:t};return n(e)}updateItem(t){const e={method:"put",url:this.url,headers:{Authorization:"Bearer "+a.getUserData().accessToken,"Content-Type":"multipart/form-data"},data:t};return n(e)}}export{C as L};
