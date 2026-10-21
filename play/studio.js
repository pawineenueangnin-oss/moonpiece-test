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
/* Row-fit guard: switch the play header / action rows to icon-only buttons when their content would overflow. */
(function(){
 function over(row){if(!row||!row.offsetParent)return false;var r=row.getBoundingClientRect();if(row.scrollWidth>row.clientWidth+1)return true;
  for(var i=0;i<row.children.length;i++){var c=row.children[i];if(c.offsetParent&&(c.getBoundingClientRect().right>r.right+1||c.scrollWidth>c.clientWidth+2))return true;}return false;}
 var busy=false;
 function fit(){if(busy)return;busy=true;try{['#play .play-nav','#play .polish-actions'].forEach(function(s){var row=document.querySelector(s);if(!row)return;row.classList.remove('mp-compact');if(over(row))row.classList.add('mp-compact');});}finally{busy=false;}}
 window.mpFit=fit;
 var t=null;function soon(){clearTimeout(t);t=setTimeout(fit,30);}
 addEventListener('resize',soon);addEventListener('orientationchange',soon);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(soon);
 var play=document.getElementById('play');
 if(play)new MutationObserver(function(m){for(var i=0;i<m.length;i++){var x=m[i];if(x.type==='attributes'&&x.target.matches&&x.target.matches('.play-nav,.polish-actions'))continue;soon();return;}}).observe(play,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','hidden']});
 soon();
})();
/* Stage-list back button was always English ("Back"). */
(function(){
 function lab(){var b=document.getElementById('backMenu');if(!b)return;var l=document.documentElement.lang||'en';var t=l==='th'?'‹ กลับ':'‹ '+((typeof TR==='function'&&TR('Back'))||'Back');if(b.textContent!==t)b.textContent=t;}
 lab();new MutationObserver(lab).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
/* 1.0.2: opt-in rewarded "+1 star" on the result card (Android app only). Never automatic; a "No thanks" choice;
   reward only after the full ad (native calls grantHintReward only when the reward was earned). */
(function(){
 function T(th,en){var l=document.documentElement.lang||'en';if(l==='th')return th;try{return typeof TR==='function'?TR(en):en}catch(e){return en}}
 var win=document.getElementById('win');if(!win)return;
 var pending=null; // {level,stage,stars}
 var used={};      // one +1 star per stage per app session
 var baseGrant=window.grantHintReward,baseUnlock=window.unlockHintUi;
 window.grantHintReward=function(){if(pending){var p=pending;pending=null;giveStar(p);return;}return baseGrant&&baseGrant.apply(this,arguments);};
 window.unlockHintUi=function(){if(pending){pending=null;setBusy(false);toast(T('ยังไม่ได้รับดาว ลองใหม่ภายหลังได้','No star this time. You can try again later.'));return;}return baseUnlock&&baseUnlock.apply(this,arguments);};
 function toast(t){try{if(typeof storyToast==='function'){storyToast(t);return;}}catch(e){}}
 var btn=document.createElement('button');btn.id='rewardStar';btn.type='button';btn.className='btn win-btn reward-star';
 var css=document.createElement('style');css.textContent='#rewardStar{background:linear-gradient(#fff3cf,#f1d58f)!important;color:#4a3410!important;border:2px dashed #c79a3c!important;font-weight:700}#rewardStar small{display:block;font-weight:500;font-size:.78em;opacity:.8}#rewardStar[disabled]{opacity:.55}.reward-ask .pg-row button{flex:1;min-height:48px}.reward-ask .ad-label{display:inline-block;background:#c79a3c;color:#fff;border-radius:6px;padding:0 6px;font-size:12px;margin-left:4px}';document.head.append(css);
 function stars(){var t=(document.getElementById('stars')||{}).textContent||'';return (t.match(/★/g)||[]).length;}
 function setBusy(b){btn.disabled=b;}
 function canOffer(){try{return !!(window.AndroidAds&&AndroidAds.showRewarded)&&storyMode&&!customPlay&&stars()<3&&!used[STORY_DATA.id+'|'+level+'|'+stage];}catch(e){return false}}
 function refresh(){
  if(!win.classList.contains('show')){btn.remove();return;}
  if(!canOffer()){btn.remove();return;}
  btn.innerHTML='▶ '+T('ดูโฆษณา · รับ +1 ดาว','Watch an ad · Get +1 star')+'<small>'+T('ไม่บังคับ ไม่ดูก็เล่นต่อได้','Optional — you can keep playing without it')+'</small>';
  setBusy(false);
  var acts=win.querySelector('.win-actions');var next=document.getElementById('nextBtn');
  if(acts&&btn.parentNode!==acts)acts.insertBefore(btn,next&&next.nextSibling);
 }
 function giveStar(p){
  used[p.key]=true;
  var n=Math.min(3,p.stars+1);
  try{saveStoryStars(p.level,p.stage,n);}catch(e){}
  var s=document.getElementById('stars');if(s)s.textContent='★'.repeat(n)+'☆'.repeat(3-n);
  var lab=document.getElementById('starsLabel');if(lab)lab.textContent=T(n+' / 3 ดาว',n+' / 3 stars');
  try{if(typeof earnedBadge==='function'&&earnedBadge(p.level))writeProgress(storyStoragePrefix()+'-badge-'+p.level,'1');}catch(e){}
  try{if(typeof refreshStoryProgress==='function')refreshStoryProgress();}catch(e){}
  btn.remove();toast(T('ได้รับ +1 ดาวแล้ว ⭐','+1 star added ⭐'));
 }
 function ask(){
  var d=document.createElement('dialog');d.className='story-dialog parent-gate reward-ask';d.id='rewardAsk';
  d.innerHTML='<h2></h2><p></p><div class="pg-row"><button class="no"></button><button class="yes"></button></div>';
  d.querySelector('h2').innerHTML=T('รับ +1 ดาว','Get +1 star')+' <span class="ad-label">'+T('โฆษณา','Ad')+'</span>';
  d.querySelector('p').textContent=T('ดูโฆษณาสั้น ๆ จนจบเพื่อรับดาวเพิ่ม 1 ดวงในด่านนี้ ถ้าปิดก่อนจบจะไม่ได้รับดาว','Watch a short ad to the end to add 1 star to this stage. Closing it early gives no star.');
  d.querySelector('.no').textContent=T('ไม่เป็นไร','No thanks');
  d.querySelector('.yes').textContent='▶ '+T('ดูโฆษณา','Watch ad');
  d.querySelector('.no').onclick=function(){d.close()};
  d.querySelector('.yes').onclick=function(){d.close();
   pending={level:level,stage:stage,stars:stars(),key:STORY_DATA.id+'|'+level+'|'+stage};setBusy(true);
   try{if(typeof stopMusic==='function')stopMusic();}catch(e){}
   try{AndroidAds.showRewarded();}catch(e){window.unlockHintUi();}
   setTimeout(function(){if(pending){window.unlockHintUi();}},90000);};
  d.addEventListener('close',function(){d.remove()},{once:true});document.body.append(d);d.showModal();
 }
 btn.onclick=ask;
 new MutationObserver(refresh).observe(win,{attributes:true,attributeFilter:['class']});
 var pb=window.androidBack;window.androidBack=function(){var a=document.getElementById('rewardAsk');if(a&&a.open){a.close();return true;}return pb?pb():false;};
})();
