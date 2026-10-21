/* Moonpiece Tales: P-Prece Studio (Facebook) button behind a parental gate + library level label fix. */
(function(){
 var FB_URL='https://www.facebook.com/61595377043261';
 function L(){try{return typeof gameLang==='string'?gameLang:'en'}catch(e){return 'en'}}
 function T(th,en){if(L()==='th')return th;try{return typeof TR==='function'?TR(en):en}catch(e){return en}}
 function openFb(){
  try{if(window.AndroidApp&&AndroidApp.openStudioPage){AndroidApp.openStudioPage();return;}}catch(e){}
  window.open(FB_URL,'_blank','noopener');
 }
 function gate(){
  var old=document.getElementById('parentGate');if(old)old.remove();
  var a=3+Math.floor(Math.random()*7),b=3+Math.floor(Math.random()*7);
  var d=document.createElement('dialog');d.id='parentGate';d.className='story-dialog parent-gate';
  d.innerHTML='<h2></h2><p class="pg-note"></p><p class="pg-q"></p><input id="pgAnswer" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" autocomplete="off"><p class="pg-err" hidden></p><div class="pg-row"><button class="pg-cancel"></button><button class="pg-ok"></button></div>';
  d.querySelector('h2').textContent=T('สำหรับผู้ปกครอง','For parents');
  d.querySelector('.pg-note').textContent=T('ปุ่มนี้จะเปิดเพจ Facebook ของ P-Prece Studio นอกเกม กรุณาให้ผู้ใหญ่ตอบคำถามนี้','This opens the P-Prece Studio Facebook page outside the game. Please ask a grown-up to answer.');
  d.querySelector('.pg-q').textContent=T('ผลคูณของ '+a+' × '+b+' เท่ากับเท่าไร?','What is '+a+' × '+b+'?');
  var inp=d.querySelector('input'),err=d.querySelector('.pg-err');
  inp.setAttribute('aria-label',d.querySelector('.pg-q').textContent);
  d.querySelector('.pg-cancel').textContent=T('ยกเลิก','Cancel');
  d.querySelector('.pg-ok').textContent=T('ยืนยัน','Continue');
  d.querySelector('.pg-cancel').onclick=function(){d.close()};
  d.querySelector('.pg-ok').onclick=function(){
   if(parseInt(inp.value,10)===a*b){d.close();openFb();}
   else{err.hidden=false;err.textContent=T('คำตอบไม่ถูกต้อง','That is not right.');setTimeout(function(){d.close()},900);}
  };
  inp.addEventListener('keydown',function(e){if(e.key==='Enter')d.querySelector('.pg-ok').click()});
  d.addEventListener('close',function(){d.remove()},{once:true});
  document.body.append(d);d.showModal();setTimeout(function(){inp.focus()},50);
 }
 var prevBack=window.androidBack;
 window.androidBack=function(){var g=document.getElementById('parentGate');if(g&&g.open){g.close();return true;}return prevBack?prevBack():false;};
 var css=document.createElement('style');
 css.textContent='#studioButton{display:flex;align-items:center;justify-content:center;gap:8px}#studioButton .fb{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#1877f2;color:#fff;font:700 15px/1 system-ui}'+
 '.parent-gate{max-width:min(92vw,360px)}.parent-gate .pg-q{font-size:22px;font-weight:700;text-align:center;margin:10px 0}.parent-gate input{display:block;width:100%;box-sizing:border-box;font-size:24px;text-align:center;padding:10px;border-radius:12px;border:2px solid #c3b171}.parent-gate .pg-row{display:flex;gap:8px;margin-top:12px}.parent-gate .pg-row button{flex:1;min-height:48px}.parent-gate .pg-err{color:#ffb4a0;text-align:center;margin:6px 0 0}';
 document.head.append(css);
 var btn=document.createElement('button');btn.className='story-collection';btn.id='studioButton';btn.type='button';
 btn.innerHTML='<span class="fb">f</span><span class="lbl">P-Prece Studio</span>';
 btn.setAttribute('aria-label','P-Prece Studio · Facebook');btn.onclick=gate;
 var hub=document.querySelector('.story-hub');
 var pager=hub&&hub.querySelector('#storyLibrary');
 (pager||hub).append(btn);
 /* Library cards: every story has 4 levels (Very easy → Hard), not only Easy/Medium/Hard. */
 function fixLevels(){
  document.querySelectorAll('#storyLibrary .story-book small').forEach(function(s){
   var t=s.textContent,i=t.indexOf(' · ');if(i<0)return;
   var want=t.slice(0,i)+' · '+T('ง่ายมาก – ยาก','Very easy – Hard');
   if(t!==want)s.textContent=want;
  });
 }
 fixLevels();
 new MutationObserver(function(){fixLevels()}).observe(document.getElementById('storyLibrary')||document.body,{subtree:true,childList:true,characterData:true});
})();
