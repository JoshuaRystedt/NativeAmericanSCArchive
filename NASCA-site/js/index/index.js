/* global SITE_ROOT, REL_HOME, CDM_BASE, CDM_COLLECTION, CDM_QUERY_BASE, CDM_PORT, CDM_SERVER */

//<!-- //for old browsers

var currentPage = 'home';

var interval = 100; //length for all setInterval functions in milliseconds
var interval_index = null;
var interval_home = null;
var interval_interviews = null;
var interval_images = null;
var interval_video = null;
var interval_map = null;
var interval_timeline = null;

//init stuff for index.html
function init_index() {
  //populate global variables with info from configuration file
  setGlobals();
  
  //set invisible EVERYTHING that will fade in
  var fadeIns = ['.header', '.content', '.copyright'];
  for(var i = 0; i < fadeIns.length; i++) {
    $(fadeIns[i]).css('display','none');
  }
  
  //set date of copyright
  var d = new Date();
  document.getElementById('copyright').innerHTML = "NASCA &copy; " + d.getFullYear();
  
  //get home page content
  $.ajax({
    type:'POST',
    url: SITE_ROOT + '/html/home.php',
    async: true,
    dataType: 'html',
    success: function(data) {
      $('.content').html(data).promise().done(function() {
        init_home();
      });
    }
  });
  
  //dynamic css function
  //handles content top padding when nav bar resizes
  var interval_index = setInterval(function(){
    var navHeight = $('.header').height();
    $('.body-container').css('padding-top', navHeight+'px');
    
  },interval);
  
  //fade in
  intervalFade(fadeIns,500);

};

function clearPageIntervals() {
  var pages = [interval_home, interval_interviews, interval_images, interval_video, interval_map, interval_timeline];
  for(var i = 0; i < pages.length; i++) {
    if(pages[i] !== null) {
      clearInterval(pages[i]);
    }
    pages[i] = null;
  }
}

function clearPageInterval(pageInterVar) {
  clearInterval(pageInterVar);
  pageInterVar = null;
}

function changePage(page) {
  //check if page is already up
  if(!(page === currentPage)) {
    //fade out content
    $('.content').fadeOut(750,function(){
      //callback when fadeOut complete
      //clear all interval actions
      clearPageIntervals();
      //set html content
      $.ajax({
        type:'POST',
        url: SITE_ROOT + '/html/' + page + '.php',
        async: true,
        dataType: 'html',
        success: function(data) {
          //callback when html retrieved
          $('.content').html(data).promise().done(function() {
            switch(page) {
              case 'home':
                init_home();
                break;
              case 'interviews-list':
                //launch_interview('Catawba_Earl-Robbins-May-1987-minified.json');
                break;
              case 'images':
                break;
              case 'video':
                break;
              case 'map':
                break;
              case 'timeline':
                break;
              default:
                //code
            }
          });
          $('.content').fadeIn(750);
        }
      });
    });
      
    currentPage = page;
  }
}

//for old browsers -->