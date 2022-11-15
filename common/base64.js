/*
 * [hi-base64]{@link https://github.com/emn178/hi-base64}
 *
 * @version 0.2.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";var r="object"==typeof window?window:{},t=!r.HI_BASE64_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;t&&(r=global);var e,o,n=!r.HI_BASE64_NO_COMMON_JS&&"object"==typeof module&&module.exports,a="function"==typeof define&&define.amd,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),h={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63,"-":62,_:63},f=function(r){for(var t=[],e=0;e<r.length;e++){var o=r.charCodeAt(e);128>o?t[t.length]=o:2048>o?(t[t.length]=192|o>>6,t[t.length]=128|63&o):55296>o||o>=57344?(t[t.length]=224|o>>12,t[t.length]=128|o>>6&63,t[t.length]=128|63&o):(o=65536+((1023&o)<<10|1023&r.charCodeAt(++e)),t[t.length]=240|o>>18,t[t.length]=128|o>>12&63,t[t.length]=128|o>>6&63,t[t.length]=128|63&o)}return t},c=function(r){var t,e,o,n,a=[],i=0,f=r.length;"="===r.charAt(f-2)?f-=2:"="===r.charAt(f-1)&&(f-=1);for(var c=0,C=f>>2<<2;C>c;)t=h[r.charAt(c++)],e=h[r.charAt(c++)],o=h[r.charAt(c++)],n=h[r.charAt(c++)],a[i++]=255&(t<<2|e>>>4),a[i++]=255&(e<<4|o>>>2),a[i++]=255&(o<<6|n);var g=f-C;return 2===g?(t=h[r.charAt(c++)],e=h[r.charAt(c++)],a[i++]=255&(t<<2|e>>>4)):3===g&&(t=h[r.charAt(c++)],e=h[r.charAt(c++)],o=h[r.charAt(c++)],a[i++]=255&(t<<2|e>>>4),a[i++]=255&(e<<4|o>>>2)),a},C=function(r){for(var t,e,o,n="",a=r.length,h=0,f=3*parseInt(a/3);f>h;)t=r[h++],e=r[h++],o=r[h++],n+=i[t>>>2]+i[63&(t<<4|e>>>4)]+i[63&(e<<2|o>>>6)]+i[63&o];var c=a-f;return 1===c?(t=r[h],n+=i[t>>>2]+i[t<<4&63]+"=="):2===c&&(t=r[h++],e=r[h],n+=i[t>>>2]+i[63&(t<<4|e>>>4)]+i[e<<2&63]+"="),n},g=r.btoa,d=r.atob;if(t){var s=require("buffer").Buffer;g=function(r){return new s(r,"ascii").toString("base64")},e=function(r){return new s(r).toString("base64")},C=e,d=function(r){return new s(r,"base64").toString("ascii")},o=function(r){return new s(r,"base64").toString()}}else g?(e=function(r){for(var t="",e=0;e<r.length;e++){var o=r.charCodeAt(e);128>o?t+=String.fromCharCode(o):2048>o?t+=String.fromCharCode(192|o>>6)+String.fromCharCode(128|63&o):55296>o||o>=57344?t+=String.fromCharCode(224|o>>12)+String.fromCharCode(128|o>>6&63)+String.fromCharCode(128|63&o):(o=65536+((1023&o)<<10|1023&r.charCodeAt(++e)),t+=String.fromCharCode(240|o>>18)+String.fromCharCode(128|o>>12&63)+String.fromCharCode(128|o>>6&63)+String.fromCharCode(128|63&o))}return g(t)},o=function(r){var t=d(r.trim("=").replace(/-/g,"+").replace(/_/g,"/"));if(!/[^\x00-\x7F]/.test(t))return t;for(var e,o,n="",a=0,i=t.length,h=0;i>a;)if(e=t.charCodeAt(a++),127>=e)n+=String.fromCharCode(e);else{if(e>191&&223>=e)o=31&e,h=1;else if(239>=e)o=15&e,h=2;else{if(!(247>=e))throw"not a UTF-8 string";o=7&e,h=3}for(var f=0;h>f;++f){if(e=t.charCodeAt(a++),128>e||e>191)throw"not a UTF-8 string";o<<=6,o+=63&e}if(o>=55296&&57343>=o)throw"not a UTF-8 string";if(o>1114111)throw"not a UTF-8 string";65535>=o?n+=String.fromCharCode(o):(o-=65536,n+=String.fromCharCode((o>>10)+55296),n+=String.fromCharCode((1023&o)+56320))}return n}):(g=function(r){for(var t,e,o,n="",a=r.length,h=0,f=3*parseInt(a/3);f>h;)t=r.charCodeAt(h++),e=r.charCodeAt(h++),o=r.charCodeAt(h++),n+=i[t>>>2]+i[63&(t<<4|e>>>4)]+i[63&(e<<2|o>>>6)]+i[63&o];var c=a-f;return 1===c?(t=r.charCodeAt(h),n+=i[t>>>2]+i[t<<4&63]+"=="):2===c&&(t=r.charCodeAt(h++),e=r.charCodeAt(h),n+=i[t>>>2]+i[63&(t<<4|e>>>4)]+i[e<<2&63]+"="),n},e=function(r){for(var t,e,o,n="",a=f(r),h=a.length,c=0,C=3*parseInt(h/3);C>c;)t=a[c++],e=a[c++],o=a[c++],n+=i[t>>>2]+i[63&(t<<4|e>>>4)]+i[63&(e<<2|o>>>6)]+i[63&o];var g=h-C;return 1===g?(t=a[c],n+=i[t>>>2]+i[t<<4&63]+"=="):2===g&&(t=a[c++],e=a[c],n+=i[t>>>2]+i[63&(t<<4|e>>>4)]+i[e<<2&63]+"="),n},d=function(r){var t,e,o,n,a="",i=r.length;"="===r.charAt(i-2)?i-=2:"="===r.charAt(i-1)&&(i-=1);for(var f=0,c=i>>2<<2;c>f;)t=h[r.charAt(f++)],e=h[r.charAt(f++)],o=h[r.charAt(f++)],n=h[r.charAt(f++)],a+=String.fromCharCode(255&(t<<2|e>>>4))+String.fromCharCode(255&(e<<4|o>>>2))+String.fromCharCode(255&(o<<6|n));var C=i-c;return 2===C?(t=h[r.charAt(f++)],e=h[r.charAt(f++)],a+=String.fromCharCode(255&(t<<2|e>>>4))):3===C&&(t=h[r.charAt(f++)],e=h[r.charAt(f++)],o=h[r.charAt(f++)],a+=String.fromCharCode(255&(t<<2|e>>>4))+String.fromCharCode(255&(e<<4|o>>>2))),a},o=function(r){for(var t,e,o="",n=c(r),a=n.length,i=0,h=0;a>i;)if(t=n[i++],127>=t)o+=String.fromCharCode(t);else{if(t>191&&223>=t)e=31&t,h=1;else if(239>=t)e=15&t,h=2;else{if(!(247>=t))throw"not a UTF-8 string";e=7&t,h=3}for(var f=0;h>f;++f){if(t=n[i++],128>t||t>191)throw"not a UTF-8 string";e<<=6,e+=63&t}if(e>=55296&&57343>=e)throw"not a UTF-8 string";if(e>1114111)throw"not a UTF-8 string";65535>=e?o+=String.fromCharCode(e):(e-=65536,o+=String.fromCharCode((e>>10)+55296),o+=String.fromCharCode((1023&e)+56320))}return o});var u=function(t,o){var n="string"!=typeof t;return n&&t.constructor===r.ArrayBuffer&&(t=new Uint8Array(t)),n?C(t):!o&&/[^\x00-\x7F]/.test(t)?e(t):g(t)},A=function(r,t){return t?d(r):o(r)},l={encode:u,decode:A,atob:d,btoa:g};A.bytes=c,A.string=A,n?module.exports=l:(r.base64=l,a&&define(function(){return l}))}();