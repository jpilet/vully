<?php

// load the existing agenda.
$events = json_decode(file_get_contents("agenda.json"));

// make the hash prefix string
$hashPrefix = "";
foreach($events as $entry) {
  $hashPrefix .= ":" . $entry->{'date'} . ":" . $entry->{'title'} . ":" . $entry->{'text'};
}

$key = md5($hashPrefix . "password:VullySuperSecret");

if ($key != $_POST["key"]) {
  echo "Erreur: mauvais mot de passe";
} else {
  if (file_put_contents("agenda.json", json_encode($_POST["entries"]))) {
    echo "OK";
  } else {
    echo "Error writing to file.";
  }
}
?>