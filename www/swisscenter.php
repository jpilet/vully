<?php

$nomDom = $_SERVER["SERVER_NAME"];

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Bienvenue sur <?=$nomDom?></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="http://www.swisscenter.com/welcome/flash_detect.js"></script>
<style type="text/css">
<!--
body {
    background-color: #FFFFFF;
    margin-left: 0px;
    margin-top: 10px;
    margin-right: 0px;
    margin-bottom: 0px;
}

.Style16 {
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: small;
    }
.Style22 {font-size: x-small;
    font-family: Verdana, Arial, Helvetica, sans-serif;}

.Style23 {font-size: 14px;
    font-family: Verdana, Arial, Helvetica, sans-serif;}

.Style24 {
    font-size: 36px;
    font-weight: bold;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    color: #CC3300;
}
-->
</style>
</head>

<body>


<p>  </p>
  <table width="100%"  border="0">
    <tr>
      <td align="center"><p class="Style23">
<?
        if (1) {
?>
        <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="670" height="200" hspace="0" vspace="0">
          <param name="movie" value="http://www.swisscenter.com/welcome/start.swf?start=<?=$nomDom?>">
          <param name="quality" value="high">
          <param name="wmode" value="transparent">
          <embed src="http://www.swisscenter.com/welcome/start.swf?start=<?=urlencode($nomDom)?>" width="670" height="200" hspace="0" vspace="0" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent"></embed>
        </object>
<?
        } else {
?>
       Bientôt sur vos &eacute;crans</p><p class="Style24"><?=$nomDom?></p>
<?
        }
?>
        <p>&nbsp;        </p>
        <table width="676"  border="0" align="center">
        <tr>
          <td><p align="center"><span class="Style16">Cette adresse Internet est g&eacute;r&eacute;e par un serveur haute disponibilit&eacute; de SwissCenter, <br>le centre de traitement informatique leader consacr&eacute; &agrave; l'h&eacute;bergement Internet. </span></p>
            <p align="center">
                  <span class="Style16">Pour plus d'informations, veuillez-vous rendre sur <a href="http://www.swisscenter.com" target="_blank">http://www.swisscenter.com</a></span></p>

          <p>&nbsp;</p>  <p align="center"><span class="Style22">Vous ne voyez pas la page d'accueil de votre site? Cliquez <A HREF="http://support.swisscenter.com/KB/a60/page-par-dfaut-le-navigateur-affiche-toujours-la-page.aspx?KBSearchID=1027" target="_blank">ici</a>.</span></p></td>
        </tr>
      </table>
</td>
    </tr>
  </table>

</body>
</html>