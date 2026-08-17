(function(){"use strict";

document.querySelectorAll('.faq-question').forEach(function(btn){
  btn.addEventListener('click',function(){
    var open=btn.getAttribute('aria-expanded')==='true';
    btn.setAttribute('aria-expanded',String(!open));
    var p=document.getElementById(btn.getAttribute('aria-controls'));
    if(p)p.setAttribute('data-open',String(!open));
  });
});

/* Keep the direct-contact card visible throughout the content area. On desktop it is
   fixed while scrolling, then docks exactly above the footer instead of disappearing. */
var sideContact=document.querySelector('.side-contact');
var footer=document.querySelector('.site-footer');
var FIXED_TOP=150;
var FOOTER_GAP=22;

function positionSideContact(){
  if(!sideContact||!footer)return;
  if(window.innerWidth<=1100){
    sideContact.classList.remove('is-docked','is-footer-visible');
    sideContact.style.top='';
    return;
  }

  var scrollY=window.pageYOffset||document.documentElement.scrollTop||0;
  var footerTop=footer.getBoundingClientRect().top+scrollY;
  var cardHeight=sideContact.offsetHeight;
  var dockTop=footerTop-cardHeight-FOOTER_GAP;
  var fixedDocumentTop=scrollY+FIXED_TOP;

  sideContact.classList.remove('is-footer-visible');
  if(fixedDocumentTop>=dockTop){
    sideContact.classList.add('is-docked');
    sideContact.style.top=Math.max(0,dockTop)+'px';
  }else{
    sideContact.classList.remove('is-docked');
    sideContact.style.top=FIXED_TOP+'px';
  }
}

if(sideContact&&footer){
  window.addEventListener('scroll',positionSideContact,{passive:true});
  window.addEventListener('resize',positionSideContact);
  window.addEventListener('load',positionSideContact);
  positionSideContact();
}
})();
