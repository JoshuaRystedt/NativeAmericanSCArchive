/* global SITE_ROOT, REL_HOME, CDM_BASE, CDM_COLLECTION, CDM_QUERY_BASE, CDM_PORT, CDM_SERVER */

//<!-- //for old browsers

var currentPage = 'home';

//init stuff for index.html
function init_index() {
  //populate global variables with info from configuration file
  setGlobals();
  
  //set invisible EVERYTHING that will fade in
  var fadeIns = ['#header-positioner', '#page-container', '#footer-container'];
  for(var i = 0; i < fadeIns.length; i++) {
    $(fadeIns[i]).css('display','none');
  }
  
  //set onhover onclick stuff
  $('#logo').hover(function() {
    //enter
    $('#logo-verbose img').animate({opacity:1.0},'fast');
  }, function() {
    //exit
    $('#logo-verbose img').animate({opacity:0},'fast');
  });
  
  //set date of copyright
  var d = new Date();
  document.getElementById('copyright').innerHTML = "Native American South Carolina Archive (NASCA) &copy; " + d.getFullYear();
  
  //get home page content
  $.ajax({
    type:'POST',
    url: SITE_ROOT + '/html/home.php',
    async: true,
    dataType: 'html',
    success: function(data) {
      $('#page').html(data).promise().done(function() {
        init_home();
        dynamic_css();
      });
    }
  });
  
  //dynamic css function
  //handles content top padding when nav bar resizes
  //var interval_index = setInterval(function(){
  //  var navHeight = $('#header-positioner').height();
  //  $('#header-positioner-height-offset').css('height', navHeight+'px');
  //  
  //},interval);
  
  //fade in
  intervalFade(fadeIns,500);

  //let dynamic_css do it's thing
  dynamic_css();

};

function changePage(page) {
  //check if page is already up
  if(!(page === currentPage)) {
    //fade out content
    $('#page').fadeOut(650,function(){
      //callback when fadeOut complete
      //set html content
      $.ajax({
        type:'POST',
        url: SITE_ROOT + '/html/' + page + '.php',
        async: true,
        dataType: 'html',
        success: function(data) {
          //callback when html retrieved
          $('#page').html(data).promise().done(function() {
            switch(page) {
              case 'home':
                init_home();
                break;
              case 'interviews':
                //launch_interview('Catawba_Earl-Robbins-May-1987-minified.json');
                break;
              case 'images':
                break;
              case 'video':
                break;
              case 'map':
                break;
              case 'timeline':
                init_timeline();
                break;
              case 'letters':
                break;
              case 'tribes':
                init_tribes();
                break;
              default:
                //code
            }
            dynamic_css();
          });
          $('#page').fadeIn(650);
        }
      });
    });
      
    currentPage = page;
    dynamic_css();
  }
}

//for old browsers -->