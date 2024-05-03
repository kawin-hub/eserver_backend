import{o as I,b as w,w as t,p as e,E as x,x as D,c as q,m as g,C as z,F as G,j as De,bd as ce,k as b,q as l,be as oe,bn as X,y as Z,D as V,Z as Ae,$ as Ce,a as fe,al as H}from"./index.35991f09.js";import{n as de}from"./no-image.bc16c952.js";import{a as M}from"./validators.9dda6c80.js";import{u as Pe}from"./modelListStore.3cabc70f.js";import{a as ke,u as Te}from"./categoryListStore.0ab0e140.js";import{V as O,c as j,e as we}from"./VCard.bb37f72e.js";import{V as je}from"./position.15b8fc3a.js";import{V as ye}from"./VDialog.61de6f6e.js";import{V as S}from"./VBtn.3e0f2bdf.js";import{a as y,V as W}from"./VRow.f9366793.js";import{V as h}from"./VAvatar.6ed53308.js";import{V as Me}from"./VDivider.0f44b1ce.js";import{V as Se}from"./VForm.9ba2d763.js";import{V as T}from"./VTextField.4609cb9e.js";import{V as Oe}from"./VTextarea.0a746d96.js";import{V as Q}from"./VSelect.1bdb2ecc.js";import{V as ee}from"./VChip.81c7dee3.js";import{V as se,a as ie}from"./VAlert.91ecfd84.js";import{V as re}from"./VCheckbox.bdf702c3.js";import{V as $e}from"./VSnackbar.34637b93.js";import{V as qe}from"./VCombobox.bd903a82.js";import{a as Le}from"./formatters.1ccc6423.js";import{V as Ee}from"./VImg.632117c3.js";import{V as Re}from"./VSpacer.80b37d7c.js";import{M as ne}from"./FileInputSelectionSlot.ae91cc9f.js";import{b as ue}from"./route-block.182765af.js";import{V as Be,a as Ne}from"./VTabs.6d0b43a6.js";import{V as me,a as pe}from"./VWindowItem.f35c6905.js";import"./index.0d4b9ec4.js";import"./index.a44853ab.js";import"./router.88351000.js";import"./scopeId.a8f1d836.js";import"./forwardRefs.c003b6b8.js";import"./VOverlay.a330b104.js";import"./lazy.7e795ed8.js";import"./easing.36b781ab.js";import"./dialog-transition.13a8c048.js";import"./form.e84299e4.js";/* empty css                   */import"./VField.93eb26cb.js";import"./index.a8f66a9c.js";import"./VInput.6bf7b46e.js";import"./VCounter.cb1a1153.js";import"./VList.8e9051e1.js";import"./VMenu.768d7784.js";import"./VCheckboxBtn.a302f7e6.js";import"./VSelectionControl.6ac8e090.js";import"./filter.f86a5c3d.js";import"./ConfirmationPopup.26c6d5ed.js";import"./DialogCloseBtn.9d70464b.js";/* empty css                                                                               */import"./VFileInput.c9eefa19.js";import"./VTable.0fe7de7a.js";import"./VSlideGroup.6d88d719.js";import"./ssrBoot.8b43ebe3.js";const ze={__name:"LoadingPopup",props:{isDialogVisible:{type:Boolean,required:!0},txtDisplay:{type:String,required:!0}},setup(F){const r=F;return(d,m)=>(I(),w(ye,{modelValue:r.isDialogVisible,"onUpdate:modelValue":m[0]||(m[0]=p=>r.isDialogVisible=p),width:"300"},{default:t(()=>[e(O,{color:"primary",width:"300"},{default:t(()=>[e(j,{class:"pt-3"},{default:t(()=>[x(D(r.txtDisplay)+" ",1),e(je,{indeterminate:"",color:"white",class:"mb-0"})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}},We={class:"text-lg font-weight-medium"},Ge={__name:"ConfirmDialog",props:{confirmationMsg:{type:String,required:!0},isDialogVisible:{type:Boolean,required:!0},doConfirmDelete:{type:Function},dialogType:{type:String,default:"warning"}},emits:["update:isDialogVisible"],setup(F,{emit:r}){const d=F,m={warning:{color:"warning",icon:"tabler-alert-circle"}},p=U=>{r("update:isDialogVisible",U)},v=()=>{r("update:isDialogVisible",!1)};return(U,c)=>(I(),q(G,null,[g("div",null,D(m[d.dialogType].icon),1),e(ye,{"max-width":"500","model-value":d.isDialogVisible,"onUpdate:modelValue":p},{default:t(()=>[e(O,{class:"text-center px-10 py-4"},{default:t(()=>[e(j,null,{default:t(()=>[e(z,{size:"100",start:"",icon:m[d.dialogType].icon,class:"mb-4",color:m[d.dialogType].color},null,8,["icon","color"]),g("h6",We,D(d.confirmationMsg),1)]),_:1}),e(we,{class:"align-center justify-center gap-2"},{default:t(()=>[e(S,{variant:"elevated",onClick:d.doConfirmDelete},{default:t(()=>[x(" Confirm ")]),_:1},8,["onClick"]),e(S,{color:"secondary",variant:"tonal",onClick:v},{default:t(()=>[x(" Cancel ")]),_:1})]),_:1})]),_:1})]),_:1},8,["model-value"])],64))}},Ke={class:"d-flex flex-column justify-center gap-4"},Je={class:"d-flex flex-wrap gap-2"},Ye=g("span",{class:"d-none d-sm-block"},"Upload new photo",-1),Ze=g("span",{class:"d-none d-sm-block"},"Reset",-1),He=g("p",{class:"text-body-1 mb-0"}," Allowed JPG, GIF or PNG. Max size of 800K ",-1),Qe=g("p",{class:"mb-0"}," Are we going to stock this model in our store? ",-1),Xe=g("p",{class:"mb-0"}," Once you delete this model, there is no going back. Please be certain. ",-1),he={__name:"main-detail",props:{models:{type:Object,default:[]},selectedItems:{type:Object,default:{}},relatedImageFiles:{type:Object,default:{}},relatedPDFFiles:{type:Object,default:{}},pageType:{type:Object,default:{}},relatedImageFilesAlreadyUploaded:{type:Object,default:[]},relatedPDFFilesAlreadyUploaded:{type:Object,default:[]},deletedFile:{type:Object}},emits:["update:models"],setup(F,{emit:r}){const d=F,m=De(),p=ce(),v=Pe,U=ke,c=Te,_=b([]),P=b([]),$=b([]),f={_id:null,modelCode:"",name:"",description:"",categories:[],brand_id:null,status:"",price:0,stock:!1,installationPrice:0,subcontractorInstallationPrice:0,avatar:de,avatarFile:"",images:[],relatedModels:[],minimum:0,maximum:0,defaultWarranty:{},documents:[],createdAt:"",updatedAt:""},K=b(),u=b(!1),n=b("Creating new model..."),A=b({text:"",color:"",visible:!1}),le=b(),L=b(!1),s=b(structuredClone(f)),E=b(!1),be=[i=>!!i||"Please confirm account deactivation"],ve=()=>{if(d.pageType.action=="update"){let i=null,o=[];for(let a of _==null?void 0:_.value)p.query.id==a._id&&(i=a),o[a._id]=a;f._id=i._id,f.modelCode=i.modelCode,f.name=i.name,f.description=i.description,f.categories=Object.values(i.category_ids),f.brand_id=i.brand_id,f.status=i.status,f.price=i.price,f.installationPrice=i.installationPrice,f.subcontractorInstallationPrice=i.subcontractorInstallationPrice!=null?i.subcontractorInstallationPrice:0,f.minimum=i.minimum,f.maximum=i.maximum,f.createdAt=i.createdAt,f.updatedAt=i.updatedAt,f.stock=i.stock,f.avatar=i.avatar!=""?X.api.url+i.avatar:de;for(let a of i.relatedModels)d.selectedItems[a]=o[a];for(let a of i.images)d.relatedImageFilesAlreadyUploaded[d.relatedImageFilesAlreadyUploaded.length]=a;for(let a of i.documents)d.relatedPDFFilesAlreadyUploaded[d.relatedPDFFilesAlreadyUploaded.length]=a;s.value=structuredClone(f)}},ge=()=>{s.value=structuredClone(f),Object.keys(d.selectedItems).forEach((i,o)=>{delete d.selectedItems[i]})},Ve=()=>{U.fetchData().then(i=>{P.value=i.data.productBrands})},Fe=()=>{c.fetchData().then(i=>{$.value=i.data.productCategories})},te=()=>{v.fetchData().then(i=>{_.value=i.data.data.documents,ve(),r("update:models",_.value)})};Ve(),Fe(),te();const Ue=i=>{const o=new FileReader,{files:a}=i.target;a&&a.length&&(o.readAsDataURL(a[0]),o.onload=()=>{typeof o.result=="string"&&(s.value.avatar=o.result,s.value.avatarFile=a[0])})},_e=()=>{s.value.avatar=f.avatar,s.value.avatarFile=""},J=b(),Ie=async()=>{var o;let i=null;for(let a of _.value)if(p.query.id==a._id){i=a;break}_.value.forEach(a=>{a.modelCode==s.value.modelCode&&(d.pageType.action=="update"&&i.modelCode!=s.value.modelCode&&(J.value.rules[1]="Model is already exist."),d.pageType.action=="new"&&(J.value.rules[1]="Model is already exist."))}),(o=K.value)==null||o.validate().then(async({valid:a})=>{if(a){s.value.relatedModels=[],Object.keys(d.selectedItems).forEach((k,N)=>{s.value.relatedModels[N]=k});let C=new FormData;for(const k in s.value)C.append(k,s.value[k]);C.delete("avatarFile"),C.delete("avatar"),C.append("avatar",s.value.avatarFile);for(var R of d.relatedImageFiles)C.append("images",R);for(var xe of d.relatedPDFFiles)C.append("documents",xe);let Y=null,B={status:"",text:""};d.pageType.action=="new"?(Y=v.insertItem(C),B={status:"inserted",text:`Insert new model "${s.value.modelCode} : ${s.value.name}" successfully`}):d.pageType.action=="update"&&(C.append("deletedImage",d.deletedFile.image),C.append("deletedPdf",d.deletedFile.pdf),Y=v.updateItem(C),B={status:"updated",text:`Update model "${s.value.modelCode} : ${s.value.name}" successfully`}),u.value=!0,Y.then(k=>{te(),m.push({name:"system-setting-product-tab",params:{tab:"models"},query:{status:B.status,text:B.text}})}).catch(k=>{u.value=!1;let N=k.message;k.response.data.message!==void 0&&(N=k.response.data.message),A.value.text=N,A.value.color="error",A.value.visible=!0})}else A.value.text="Incorrect input. Please recheck all fields.",A.value.color="error",A.value.visible=!0})},ae=async()=>{L.value=!1,v.deleteItem({_id:p.query.id}).then(i=>{let o={status:"Deleted",text:`Delete model "${i.data.result.modelCode} : ${i.data.result.name}" successfully`};m.push({name:"system-setting-product-tab",params:{tab:"models"},query:{status:o.status,text:o.text}})})};return(i,o)=>(I(),q(G,null,[e(W,null,{default:t(()=>[e(y,{cols:"12"},{default:t(()=>[e(O,{title:F.pageType.title},{default:t(()=>[e(j,{class:"d-flex"},{default:t(()=>[e(h,{rounded:"",size:"100",class:"me-6",image:l(s).avatar},null,8,["image"]),g("form",Ke,[g("div",Je,[e(S,{color:"primary",onClick:o[0]||(o[0]=a=>{var R;return(R=l(le))==null?void 0:R.click()})},{default:t(()=>[e(z,{icon:"tabler-cloud-upload",class:"d-sm-none"}),Ye]),_:1}),g("input",{ref_key:"refInputEl",ref:le,type:"file",name:"file",accept:".jpeg,.png,.jpg,GIF",hidden:"",onInput:Ue},null,544),e(S,{type:"reset",color:"secondary",variant:"tonal",onClick:_e},{default:t(()=>[Ze,e(z,{icon:"tabler-refresh",class:"d-sm-none"})]),_:1})]),He])]),_:1}),e(Me),e(j,{class:"pt-2"},{default:t(()=>[e(Se,{ref_key:"refForm",ref:K,class:"mt-6",onSubmit:oe(Ie,["prevent"])},{default:t(()=>[e(W,null,{default:t(()=>[e(y,{md:"6",cols:"12"},{default:t(()=>[e(T,{modelValue:l(s).modelCode,"onUpdate:modelValue":o[1]||(o[1]=a=>l(s).modelCode=a),rules:[l(M)],label:"Model number",ref_key:"modelCodeTxtBox",ref:J},null,8,["modelValue","rules"])]),_:1}),e(y,{md:"6",cols:"12"},{default:t(()=>[e(T,{modelValue:l(s).name,"onUpdate:modelValue":o[2]||(o[2]=a=>l(s).name=a),label:"Name",rules:[l(M)]},null,8,["modelValue","rules"])]),_:1}),e(y,{cols:"12"},{default:t(()=>[e(Oe,{modelValue:l(s).description,"onUpdate:modelValue":o[3]||(o[3]=a=>l(s).description=a),label:"Description",rules:[l(M)]},null,8,["modelValue","rules"])]),_:1}),e(y,{cols:"12",md:"6"},{default:t(()=>[e(Q,{modelValue:l(s).categories,"onUpdate:modelValue":o[4]||(o[4]=a=>l(s).categories=a),items:l($),"item-title":"name","item-value":"_id",label:"Select Categories",multiple:"","clear-icon":"tabler-x",rules:[l(M)]},{selection:t(({item:a})=>[e(ee,null,{default:t(()=>[g("span",null,D(a.title),1)]),_:2},1024)]),_:1},8,["modelValue","items","rules"])]),_:1}),e(y,{cols:"12",md:"6"},{default:t(()=>[e(Q,{modelValue:l(s).brand_id,"onUpdate:modelValue":o[5]||(o[5]=a=>l(s).brand_id=a),label:"Choose Brand",items:l(P),"item-title":"name","item-value":"_id",rules:[l(M)]},{selection:t(({item:a})=>[e(ee,null,{default:t(()=>[e(h,{start:"",image:l(X).api.url+a.raw.avatar},null,8,["image"]),g("span",null,D(a.title),1)]),_:2},1024)]),_:1},8,["modelValue","items","rules"])]),_:1}),e(y,{cols:"12",md:"6"},{default:t(()=>[e(Q,{modelValue:l(s).status,"onUpdate:modelValue":o[6]||(o[6]=a=>l(s).status=a),label:"Choose Status",items:[{title:"Inactive",value:"inactive"},{title:"Active",value:"active"}],"item-title":"title","item-value":"value",rules:[l(M)]},null,8,["modelValue","rules"])]),_:1}),e(y,{cols:"12",md:"6"},{default:t(()=>[e(T,{modelValue:l(s).price,"onUpdate:modelValue":o[7]||(o[7]=a=>l(s).price=a),label:"Price",prefix:"\u0E3F",type:"number",rules:[l(M)]},null,8,["modelValue","rules"])]),_:1}),e(y,{cols:"12",md:"6"},{default:t(()=>[e(T,{modelValue:l(s).installationPrice,"onUpdate:modelValue":o[8]||(o[8]=a=>l(s).installationPrice=a),label:"Installation Price",prefix:"\u0E3F",type:"number",rules:[l(M)]},null,8,["modelValue","rules"])]),_:1}),e(y,{cols:"12",md:"6"},{default:t(()=>[e(T,{modelValue:l(s).subcontractorInstallationPrice,"onUpdate:modelValue":o[9]||(o[9]=a=>l(s).subcontractorInstallationPrice=a),label:"Subcontractor Installation Price",prefix:"\u0E3F",type:"number"},null,8,["modelValue"])]),_:1}),e(y,{cols:"12",md:"6"},{default:t(()=>[e(T,{modelValue:l(s).minimum,"onUpdate:modelValue":o[10]||(o[10]=a=>l(s).minimum=a),label:"Minimum Stock",type:"number"},null,8,["modelValue"])]),_:1}),e(y,{cols:"12",md:"6"},{default:t(()=>[e(T,{modelValue:l(s).maximum,"onUpdate:modelValue":o[11]||(o[11]=a=>l(s).maximum=a),label:"Maximum Stock",type:"number"},null,8,["modelValue"])]),_:1}),F.pageType.action=="update"?(I(),w(y,{key:0,cols:"12",md:"6"},{default:t(()=>[e(T,{modelValue:l(s).createdAt,"onUpdate:modelValue":o[12]||(o[12]=a=>l(s).createdAt=a),label:"Created at",readonly:""},null,8,["modelValue"])]),_:1})):Z("",!0),F.pageType.action=="update"?(I(),w(y,{key:1,cols:"12",md:"6"},{default:t(()=>[e(T,{modelValue:l(s).updatedAt,"onUpdate:modelValue":o[13]||(o[13]=a=>l(s).updatedAt=a),label:"Updated at",readonly:""},null,8,["modelValue"])]),_:1})):Z("",!0),e(y,null,{default:t(()=>[e(se,{color:"info",variant:"tonal",class:"mb-4"},{default:t(()=>[e(ie,{class:"mb-1"},{default:t(()=>[x(" Shall we stock? ")]),_:1}),Qe]),_:1}),g("div",null,[e(re,{modelValue:l(s).stock,"onUpdate:modelValue":o[14]||(o[14]=a=>l(s).stock=a),label:"Yes, we're going to stock this model."},null,8,["modelValue"])])]),_:1}),e(y,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[e(S,{type:"submit"},{default:t(()=>[x("Save changes")]),_:1}),e(S,{color:"secondary",variant:"tonal",type:"reset",onClick:oe(ge,["prevent"])},{default:t(()=>[x(" Reset ")]),_:1},8,["onClick"])]),_:1}),e($e,{modelValue:l(A).visible,"onUpdate:modelValue":o[15]||(o[15]=a=>l(A).visible=a),location:"bottom end",variant:"flat",color:l(A).color},{default:t(()=>[x(D(l(A).text),1)]),_:1},8,["modelValue","color"])]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["title"])]),_:1}),F.pageType.action=="update"?(I(),w(y,{key:0,cols:"12"},{default:t(()=>[e(O,{title:"Delete this Model"},{default:t(()=>[e(j,null,{default:t(()=>[e(se,{color:"warning",variant:"tonal",class:"mb-4"},{default:t(()=>[e(ie,{class:"mb-1"},{default:t(()=>[x(" Are you sure you want to delete this model? ")]),_:1}),Xe]),_:1}),g("div",null,[e(re,{modelValue:l(E),"onUpdate:modelValue":o[16]||(o[16]=a=>V(E)?E.value=a:null),rules:be,label:"I confirm this model deactivation"},null,8,["modelValue"])]),e(S,{disabled:!l(E),color:"error",class:"mt-3",onClick:o[17]||(o[17]=a=>L.value=!0)},{default:t(()=>[x(" Deactivate This Model ")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1})):Z("",!0)]),_:1}),e(Ge,{isDialogVisible:l(L),"onUpdate:isDialogVisible":o[18]||(o[18]=a=>V(L)?L.value=a:null),"confirmation-msg":"Are you sure you want to deactivate this model?","do-confirm-delete":ae,"onUpdate:do-confirm-delete":o[19]||(o[19]=a=>ae=a),dialogType:"warning"},null,8,["isDialogVisible"]),e(ze,{isDialogVisible:l(u),txtDisplay:l(n)},null,8,["isDialogVisible","txtDisplay"])],64))}},el={__name:"TextAutocomplete",props:{items:{type:Object,default:[]},item_title:{type:String,default:"title"},item_value:{type:String,default:"_id"},selectedItems:{type:Object,default:{}}},setup(F){const r=F,d=b(null);return Ae(d,()=>{typeof d.value=="object"&&(r.selectedItems[d.value[r.item_value]]=d.value)}),(m,p)=>(I(),w(qe,{modelValue:l(d),"onUpdate:modelValue":p[0]||(p[0]=v=>V(d)?d.value=v:null),items:r.items,"item-title":r.item_title,"item-value":"_id",label:"Select Models"},null,8,["modelValue","items","item-title"]))}};const ll={class:"text-no-wrap"},tl={key:1},al={class:""},ol={class:"text-base pa-3"},dl={class:"text-body-1 pa-3"},sl={class:"d-flex flex-column text-sm-end gap-2"},il={class:"order-sm-0 order-1"},rl={__name:"ModelRelatedTable",props:{models:{type:Object,default:[]},selectedItems:{type:Object,default:{}}},setup(F){const r=F,d=b([]),m=()=>{d.value=r.models,d.value.forEach((v,U)=>{d.value[U].title=v.modelCode+" : "+v.name})};Ce(()=>{m()});const p=v=>{delete r.selectedItems[v]};return(v,U)=>(I(),w(j,{class:"d-flex flex-column gap-y-4"},{default:t(()=>[e(el,{items:l(d),"onUpdate:items":U[0]||(U[0]=c=>V(d)?d.value=c:null),selectedItems:r.selectedItems,"onUpdate:selectedItems":U[1]||(U[1]=c=>r.selectedItems=c),item_title:"title",item_value:"_id"},null,8,["items","selectedItems"]),(I(!0),q(G,null,fe(r.selectedItems,c=>(I(),w(O,{key:c._id,border:"",flat:""},{default:t(()=>[e(j,{class:"d-flex flex-sm-row flex-column pa-4"},{default:t(()=>[g("div",ll,[e(h,{variant:"tonal",class:"me-3",size:"75"},{default:t(()=>[c.avatar?(I(),w(Ee,{key:0,src:l(X).api.url+c.avatar,width:100},null,8,["src"])):(I(),q("span",tl,D(l(Le)(c.name)),1))]),_:2},1024)]),g("div",al,[g("h4",ol,[x(D(c.name)+" ",1),e(ee,{label:"",color:c.status=="active"?"success":"secondary",size:"small"},{default:t(()=>[x(D(c.status=="active"?"Active":"Inactive"),1)]),_:2},1032,["color"])]),g("span",dl," \u0E3F "+D(c.price),1)]),e(Re),g("div",sl,[g("div",il,[e(S,{variant:"tonal",onClick:_=>p(c._id)},{default:t(()=>[x(" Delete ")]),_:2},1032,["onClick"])])])]),_:2},1024)]),_:2},1024))),128))]),_:1}))}},nl={__name:"related",props:{models:{type:Object,default:[]},selectedItems:{type:Object,default:{}},relatedImageFiles:{type:Object,default:[]},relatedPDFFiles:{type:Object,default:[]},alreadyUploaded:{type:Object,default:[]},relatedImageFilesAlreadyUploaded:{type:Object,default:[]},relatedPDFFilesAlreadyUploaded:{type:Object,default:[]},deletedFile:{type:Object}},setup(F){const r=F;return b([]),b([]),(d,m)=>(I(),w(W,null,{default:t(()=>[e(y,{cols:"12",md:"12"},{default:t(()=>[e(O,{title:"Related Models"},{default:t(()=>[e(rl,{models:r.models,"onUpdate:models":m[0]||(m[0]=p=>r.models=p),selectedItems:r.selectedItems,"onUpdate:selectedItems":m[1]||(m[1]=p=>r.selectedItems=p)},null,8,["models","selectedItems"])]),_:1})]),_:1}),e(y,{cols:"12"},{default:t(()=>[e(O,{title:"Images"},{default:t(()=>[e(j,null,{default:t(()=>[e(ne,{acceptType:"image/*",label:"Choose Images",prependIcon:"tabler-camera",files:r.relatedImageFiles,filesAlreadyUploaded:r.relatedImageFilesAlreadyUploaded,"onUpdate:filesAlreadyUploaded":m[2]||(m[2]=p=>r.relatedImageFilesAlreadyUploaded=p),popUpTitle:"Delete related image.",popUpLabel:"Are you sure you want to delete",deletedFile:r.deletedFile.image,"onUpdate:deletedFile":m[3]||(m[3]=p=>r.deletedFile.image=p)},null,8,["files","filesAlreadyUploaded","deletedFile"])]),_:1})]),_:1})]),_:1}),e(y,{cols:"12"},{default:t(()=>[e(O,{title:"Documents (PDF)"},{default:t(()=>[e(j,null,{default:t(()=>[e(ne,{acceptType:"application/pdf",label:"Choose PDF",files:r.relatedPDFFiles,filesAlreadyUploaded:r.relatedPDFFilesAlreadyUploaded,"onUpdate:filesAlreadyUploaded":m[4]||(m[4]=p=>r.relatedPDFFilesAlreadyUploaded=p),popUpTitle:"Delete related PDF.",popUpLabel:"Are you sure you want to delete",deletedFile:r.deletedFile.pdf,"onUpdate:deletedFile":m[5]||(m[5]=p=>r.deletedFile.pdf=p)},null,8,["files","filesAlreadyUploaded","deletedFile"])]),_:1})]),_:1})]),_:1})]),_:1}))}},ul={__name:"[tab]",setup(F){const r=ce(),d=b(r.params.tab),m=b([]),p=H({action:"new",title:"CREATE NEW MODEL"}),v=H({}),U=b([]),c=b([]),_=b([]),P=H({image:[],pdf:[]}),$=b([]);r.query.id!==void 0&&(p.action="update",p.title="UPDATE MODEL");const f=[{title:"Basic info",icon:"tabler-box-model",tab:"main-detail",query:r.query},{title:"Related",icon:"tabler-link",tab:"related",query:r.query}];return(K,u)=>(I(),q("section",null,[e(W,null,{default:t(()=>[e(y,{cols:"12"},{default:t(()=>[e(Be,{modelValue:l(d),"onUpdate:modelValue":u[0]||(u[0]=n=>V(d)?d.value=n:null),class:"v-tabs-pill"},{default:t(()=>[(I(),q(G,null,fe(f,n=>e(Ne,{key:n.icon,value:n.tab,to:{name:"system-setting-product-model-tab",params:{tab:n.tab},query:l(r).query}},{default:t(()=>[e(z,{size:"20",start:"",icon:n.icon},null,8,["icon"]),x(" "+D(n.title),1)]),_:2},1032,["value","to"])),64))]),_:1},8,["modelValue"])]),_:1}),e(y,{cols:"12"},{default:t(()=>[e(me,{modelValue:l(d),"onUpdate:modelValue":u[6]||(u[6]=n=>V(d)?d.value=n:null),class:"disable-tab-transition",touch:!1},{default:t(()=>[e(pe,{value:"main-detail"},{default:t(()=>[e(he,{models:l(m),"onUpdate:models":u[1]||(u[1]=n=>V(m)?m.value=n:null),selectedItems:l(v),"onUpdate:selectedItems":u[2]||(u[2]=n=>V(v)?v.value=n:null),relatedImageFiles:l(U),relatedPDFFiles:l($),relatedImageFilesAlreadyUploaded:l(c),"onUpdate:relatedImageFilesAlreadyUploaded":u[3]||(u[3]=n=>V(c)?c.value=n:null),relatedPDFFilesAlreadyUploaded:l(_),"onUpdate:relatedPDFFilesAlreadyUploaded":u[4]||(u[4]=n=>V(_)?_.value=n:null),pageType:l(p),deletedFile:l(P),"onUpdate:deletedFile":u[5]||(u[5]=n=>V(P)?P.value=n:null)},null,8,["models","selectedItems","relatedImageFiles","relatedPDFFiles","relatedImageFilesAlreadyUploaded","relatedPDFFilesAlreadyUploaded","pageType","deletedFile"])]),_:1})]),_:1},8,["modelValue"]),e(me,{modelValue:l(d),"onUpdate:modelValue":u[14]||(u[14]=n=>V(d)?d.value=n:null),class:"disable-tab-transition",touch:!1},{default:t(()=>[e(pe,{value:"related"},{default:t(()=>[e(nl,{models:l(m),"onUpdate:models":u[7]||(u[7]=n=>V(m)?m.value=n:null),selectedItems:l(v),"onUpdate:selectedItems":u[8]||(u[8]=n=>V(v)?v.value=n:null),relatedImageFiles:l(U),"onUpdate:relatedImageFiles":u[9]||(u[9]=n=>V(U)?U.value=n:null),relatedImageFilesAlreadyUploaded:l(c),"onUpdate:relatedImageFilesAlreadyUploaded":u[10]||(u[10]=n=>V(c)?c.value=n:null),relatedPDFFilesAlreadyUploaded:l(_),"onUpdate:relatedPDFFilesAlreadyUploaded":u[11]||(u[11]=n=>V(_)?_.value=n:null),relatedPDFFiles:l($),"onUpdate:relatedPDFFiles":u[12]||(u[12]=n=>V($)?$.value=n:null),deletedFile:l(P),"onUpdate:deletedFile":u[13]||(u[13]=n=>V(P)?P.value=n:null)},null,8,["models","selectedItems","relatedImageFiles","relatedImageFilesAlreadyUploaded","relatedPDFFilesAlreadyUploaded","relatedPDFFiles","deletedFile"])]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]))}};typeof ue=="function"&&ue(ul);export{ul as default};
