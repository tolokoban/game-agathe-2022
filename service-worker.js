if(!self.define){let e,i={};const s=(s,d)=>(s=new URL(s+".js",d).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(d,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let a={};const n=e=>s(e,t),c={module:{uri:t},exports:a,require:n};i[t]=Promise.all(d.map((e=>c[e]||n(e)))).then((e=>(r(...e),a)))}}define(["./workbox-873c5e43"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"../dist/agents/cat.d.ts",revision:"e8193aec859f47df132cafc26188e171"},{url:"../dist/agents/mouse.d.ts",revision:"f806cc2189c12fea650b0d74354ba935"},{url:"../dist/alpha.d.ts",revision:"4c49348fe876346e4a95d0353069567d"},{url:"../dist/assets/index.d.ts",revision:"4a6cf22bcd1e4aacadf19211f971e293"},{url:"../dist/constants.d.ts",revision:"11dde3b80e7686c534169dc38fbda837"},{url:"../dist/event.d.ts",revision:"3057e51c09317d8e551d44324c092460"},{url:"../dist/index.d.ts",revision:"0884b76b9b8bd3d2776e1840cd54d79b"},{url:"../dist/main.d.ts",revision:"c7f33f0429a9ab7d6ad96c17dd538db9"},{url:"../dist/painters/background/background-painter.d.ts",revision:"310a3b7ad564eb75e5bfb20ede2a0bda"},{url:"../dist/painters/background/base-background-painter.d.ts",revision:"ebaeac940974d377ef11823ff2cf57f4"},{url:"../dist/painters/background/index.d.ts",revision:"dfbfe68d5674e686e27bae542136e587"},{url:"../dist/painters/painter.d.ts",revision:"e7f3a20586b25d429bb6730f9960e296"},{url:"../dist/painters/particle/base-particle-painter.d.ts",revision:"10afaa162d7c62cf09a906f8f732c044"},{url:"../dist/painters/particle/index.d.ts",revision:"2f199f816062fe73d52a6f9c4ed38de8"},{url:"../dist/painters/particle/particle-painter.d.ts",revision:"e7b8d16dde377f8e0aed402c50cd71f0"},{url:"../dist/painters/sprite/base-sprite-painter.d.ts",revision:"cb81b188438fec273de62a2241368eab"},{url:"../dist/painters/sprite/index.d.ts",revision:"f085bac2703a019bd5d1a3f379547c54"},{url:"../dist/painters/sprite/sprite-painter.d.ts",revision:"1f004e74441c2f591bc22afeb3dd6e40"},{url:"../dist/painters/test/base-test-painter.d.ts",revision:"6fedc10b3a4330ef0c6a59c92bbb0d67"},{url:"../dist/painters/test/index.d.ts",revision:"ef3a6d57b27f0f48f87646d277dbe47f"},{url:"../dist/painters/test/test-painter.d.ts",revision:"7373c6099cec0b809108db49e189bebb"},{url:"../dist/painters/wall/base-wall-painter.d.ts",revision:"1c6bad51cdb88fd72f57214c07c2ba3d"},{url:"../dist/painters/wall/index.d.ts",revision:"a0b2d242213778a1e912713ad3f555b3"},{url:"../dist/painters/wall/wall-painter.d.ts",revision:"f66c01dd61c0d2c6998c857df254fa81"},{url:"../dist/runtime/index.d.ts",revision:"7fc0e13f9409c27bbd7db121840f1e23"},{url:"../dist/runtime/mission-factory.d.ts",revision:"ec4c7daa814441d19e2f390fd3233b81"},{url:"../dist/runtime/runtime.d.ts",revision:"25e52b00ed69ab8bd6aad20a4ecac2a6"},{url:"../dist/tools.d.ts",revision:"3c3c163db5e83fa8787c7e72d51ca8ea"},{url:"../dist/types.d.ts",revision:"0c6574ff689cb8e77decc9ae781b266f"},{url:"../dist/ui.d.ts",revision:"ae252a8457fa45ab1a26ac662c8ba7f2"},{url:"../dist/validator.d.ts",revision:"69178e125423ede0e4ad6760f88e7a90"},{url:"../dist/webgl/scene/index.d.ts",revision:"2be21875ffe22c3e7e348626febdc965"},{url:"../dist/webgl/scene/scene.d.ts",revision:"af448835455fc1503253985be1c73deb"},{url:"../dist/webgl/texture/index.d.ts",revision:"d58a6a72802df1786bd0ac1decc6b77c"},{url:"../dist/webgl/texture/texture.d.ts",revision:"00a6f2c6c572a6993cf48427bc933e64"},{url:"assets/img/floor.jpg",revision:"227b72c327ba70ca95929e9cbef6df3b"},{url:"assets/img/floor.jpg~",revision:"10039f21687505bb24bd1e47cf7036b4"},{url:"assets/img/sprites.png",revision:"6e3e9f4a74832c939975f74883be003b"},{url:"assets/img/sprites.png~",revision:"bc88b0ea7b986b5063a620ab67178d65"},{url:"assets/img/wall.jpg",revision:"db5e9ff61d00976a1920066eee34547f"},{url:"assets/img/wall.jpg~",revision:"ec0818d19feef2b9ca4c427fd7659f01"},{url:"favicon.ico",revision:"7a92d6a67d81716d2343b349053617f4"},{url:"index.html",revision:"fb3f8e26ee744c28369778ff7e167d0e"},{url:"logo192.png",revision:"dc8634198e7bc3ff23c28b8e605ecfd9"},{url:"logo512.png",revision:"4346c6021d31aca602634b8a765150f9"},{url:"manifest.json",revision:"1f21afa714380aaa235062ee743489f2"},{url:"robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"},{url:"scr/app.178d05734f04fd6c7860.js",revision:null},{url:"scr/runtime.3642297df9dcfe84b5aa.js",revision:null}],{})}));
//# sourceMappingURL=service-worker.js.map
