import{a as n,b as a,c as i}from"./index.0d4b9ec4.js";const c=r=>n(r)||a(r)||r===!1?"This field is required":!!String(r).trim().length||"This field is required",f=(r,t="")=>(t=t!=""?t:"\u0E0A\u0E48\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E1A\u0E31\u0E07\u0E04\u0E31\u0E1A\u0E01\u0E23\u0E2D\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",n(r)||a(r)||r===!1?t:!!String(r).trim().length||t),u=(r,t="\u0E0A\u0E48\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E01\u0E23\u0E2D\u0E01\u0E2D\u0E35\u0E40\u0E21\u0E25\u0E44\u0E14\u0E49\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")=>{if(i(r))return!0;const e=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return Array.isArray(r)?r.every(s=>e.test(String(s)))||t:e.test(String(r))||t},l=r=>{if(i(r))return!0;const t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return Array.isArray(r)?r.every(e=>t.test(String(e)))||"The Email field must be a valid email":t.test(String(r))||"The Email field must be a valid email"},g=r=>/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/.test(r)||"Field must contain at least one uppercase, lowercase, special character and digit with min 8 chars",m=(r,t)=>r===t||"The Confirm Password field confirmation does not match",h=(r,t,e)=>{const s=Number(r);return Number(t)<=s&&Number(e)>=s||`Enter number between ${t} and ${e}`},A=r=>i(r)?!0:Array.isArray(r)?r.every(t=>/^-?[0-9]+$/.test(String(t)))||"This field must be an integer":/^-?[0-9]+$/.test(String(r))||"This field must be an integer",y=(r,t="")=>(t=t!=""?t:"\u0E0A\u0E48\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E43\u0E2A\u0E48\u0E44\u0E14\u0E49\u0E41\u0E04\u0E48\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02",i(r)?!0:Array.isArray(r)?r.every(e=>/^-?[0-9]+$/.test(String(e)))||t:/^-?[0-9]+$/.test(String(r))||t),o=(r,t)=>{if(i(r))return!0;let e=t;return typeof e=="string"&&(e=new RegExp(e)),Array.isArray(r)?r.every(s=>o(s,e)):e.test(String(r))||"The Regex field format is invalid"},p=r=>i(r)?!0:/^[A-Z]*$/i.test(String(r))||"The Alpha field may only contain alphabetic characters",S=r=>i(r)?!0:/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(String(r))||"URL is invalid",b=(r,t)=>i(r)?!0:String(r).length===t||`The Min Character field must be at least ${t} characters`,V=r=>{if(i(r))return!0;const t=String(r);return/^[0-9A-Z_-]*$/i.test(t)||"All Character are not valid"};export{c as a,l as b,h as c,A as d,u as e,o as f,p as g,m as h,y as i,V as j,b as l,g as p,f as r,S as u};