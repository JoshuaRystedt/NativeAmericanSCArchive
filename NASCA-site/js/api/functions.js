function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
 * 
 * Not working for some reason
 */
function recursiveFade(fadeIns) {
  var len = fadeIns.length;
  var id = fadeIns[0];
  if(len === 0) {
    return 0;
  } else if(len === 1) {
    $(id).fadeIn('slow');
  } else {
    var temp = fadeIns.slice(1,len);
    $(id).fadeIn('slow',recursiveFade(temp));
  }
}

function intervalFade(fadeIns,interval) {
  var i = 0;
  var intervalId = setInterval(function(){
    $(fadeIns[i]).fadeIn('slow');
    i++;
    dynamic_css();
    //if last one in list
    if(i === fadeIns.length) {
      clearInterval(intervalId);
      dynamic_css();
    }
  },interval);
  dynamic_css();
}