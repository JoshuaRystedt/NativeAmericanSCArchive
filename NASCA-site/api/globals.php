<?php
  $current_dir = str_replace('globals.php','',__FILE__);

  require_once($current_dir . 'configuration.php');
  //TODO make this into a function called
  //getGlobalsJson
  $arr['CDM_SERVER'] = CDM_SERVER;  
  $arr['CDM_PORT'] = CDM_PORT;
  $arr['CDM_QUERY_BASE'] = CDM_QUERY_BASE;
  $arr['CDM_COLLECTION'] = CDM_COLLECTION;
  $arr['CDM_BASE'] = CDM_BASE;
  $arr['REL_HOME'] = REL_HOME;
  $arr['SITE_ROOT'] = SITE_ROOT;
  echo json_encode($arr);
?>