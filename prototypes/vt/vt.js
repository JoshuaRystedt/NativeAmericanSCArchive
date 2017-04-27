(function() {

  'use strict';

  var items = document.querySelectorAll(".timeline li");

  
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

function iframeChange() {
    var buttons = document.querySelector(".loadiframe"),
        iframe = document.getElementById('frame');

    buttons.addEventListener("click", function (e) {
        iframe.src = e.target.dataset.src;
    });
}
window.onload = iframeChange;

$('#collapseOne').on('show.bs.collapse', function () {    
    $('.panel-heading').animate({
        backgroundColor: "#515151"
    }, 500);   
})

$('#collapseOne').on('hide.bs.collapse', function () {    
    $('.panel-heading').animate({
        backgroundColor: "#00B4FF"
    }, 500);   
})

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();
