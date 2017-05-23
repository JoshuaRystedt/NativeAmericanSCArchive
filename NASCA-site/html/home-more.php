<?php
  $api_dir = preg_replace('/html.home-more\.php/','api/',__FILE__);// 'html\home.php','',__FILE__);
  include_once ($api_dir . 'configuration.php');
  include_once ($api_dir . 'cdm.php');
  //if there are http args called 'type' and 'id', then load a view more page
  //corresponding to that id and type. Usually this will be
  //type = images
  //id = some cdm image id
	if(isset($_GET['type']) && isset($_GET['cdmptr']) && isset($_GET['homeptr'])) {
    //be sure id is a number like it should be
    $id = $_GET['cdmptr'];
    $homeptr = $_GET['homeptr'];
    if(is_numeric($id)) {
      //if type isn't interview, images, video, then there's a problem as well 
      switch($_GET['type']) {
        case 'interviews':
          echo 'This is an interview';
          echo 'The id is ' . $id;
          break;
        case 'images':
          printImageDetails($id,$homeptr);
          break;
        case 'video':
          echo 'This is a video';
          echo 'The id is ' . $id;
          break;
        case 'letters':
          printLetterDetails($id,$homeptr);
          break;
        default:
          errorMessage();   
      }
    } else {
      errorMessage();
    }
    
	}
  //if there aren't any arguments, load a default page that goes in the view
  //more box
  else {
    //default page
    printDefault();
  }
  
  function errorMessage() {
    echo 'I\'m afraid you have encountered a bug.';
    echo '"What should I do about this?"';
    echo 'Please let the silly developers know that there\'s a problem in a file called \'home-more.php\'';
  }
  
  function printDefault() {
    echo '<h2><b>Welcome to the Native American South Carolina Archive!</b></h2>';
    echo '<hr class="red"/>';
    echo '<p>Click any of the cards on the left to get more information in this window about featured pictures, interviews, and videos in our archive.</p>';
    echo '<p><i>OR</i></p>';
    echo '<p>Click the tabs in the nav bar to see all the images, interviews, etcetera, in one place. You\'re also encouraged to visually learn about local Native American history under the Video, Map, and Timeline tabs!</p>';
  }
  
  function printImageDetails($cdmptr, $homeptr) {
    $homePointers = json_decode(file_get_contents(SITE_ROOT . '/db/data/home/data.json'));
    echo '<p><b><i>From Images...</i></b></p>';
    echo '<h2><b>' . $homePointers->data[$homeptr]->title . '</b></h2>';
    echo '<hr class="red"/>';
    echo '<p>Description from id ' . $cdmptr . '</p>';
    $fn = $homePointers->data[$homeptr]->filename;
    echo '<p>Filename is ' . $fn . '</p>';
    echo '<hr class="red"/>';
    echo '<p><b><i>Click \'View More\' to browse all of our archived images.</i></b></p>';
  }
  
  function printLetterDetails($cdmptr, $homeptr) {
    $homePointers = json_decode(file_get_contents(SITE_ROOT . '/db/data/home/data.json'));
    echo '<p><b><i>From Letters...</i></b></p>';
    echo '<h2><b>' . $homePointers->data[$homeptr]->title . '</b></h2>';
    echo '<hr class="red"/>';
    echo '<p>...</p>';
    echo '<hr class="red"/>';
    echo '<p><b><i>Click \'View More\' to browse all of our archived letters.</i></b></p>';
  }
  
?>