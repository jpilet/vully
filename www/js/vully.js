/* Welcome to the source code of vully.ch.
 * Julien Pilet - julien.pilet@opticode.ch
 */

var initialMapPosition = {
  'home' : {x:0.5189310839225135,y:0.3516568495720967,scale:0.003060881448394781},
  'vignerons' : { x:0.5195680934607014,y:0.35197732928646386,scale:0.00040715245527878086 },
  'le_petit_chateau_motier' : { x: 0.519676192870007, y: 0.3519359842099106, scale: 0.00040715245527878086 },
  'cave_aux_hirondelles' : { x: 0.5197123506715267, y: 0.35191525728703676, scale: 0.00040715245527878086 },
  'cave_bel_air_praz' : { x: 0.5197148690625208, y: 0.35191969440217047, scale: 0.00040715245527878086 },
  'cave_de_la_tour' : { x: 0.5196848089179845, y: 0.35193275964934906, scale: 0.00040715245527878086 },
  'cave_du_chateau_montmagny' : { x: 0.5194718918578636, y: 0.3520282438172595, scale: 0.00040715245527878086 },
  'cave_guillod' : { x: 0.5197147619021749, y: 0.35191381235933317, scale: 0.00040715245527878086 },
  'javet_javet' : { x: 0.5196448198741267, y: 0.35193121953423756, scale: 0.00040715245527878086 },
  'cave_parisod' : { x: 0.5195101162062695, y: 0.3520335436208509, scale: 0.00040715245527878086 },
  'chateau_de_praz' : { x: 0.5197146928477696, y: 0.35191874057372086, scale: 0.00040715245527878086 },
  'cru_hopital' : { x: 0.5196516422897642, y: 0.35194757029012297, scale: 0.00040715245527878086 },
  'domaine_chervet_praz' : { x: 0.519716848825074, y: 0.3519161821681654, scale: 0.00040715245527878086 },
  'domaine_de_chambaz' : { x: 0.5196711814108116, y: 0.35193860455729653, scale: 0.00040715245527878086 },
  'domaine_de_villarose' : { x: 0.5196097527124997, y: 0.351951905803732, scale: 0.00040715245527878086 },
  'domaine_du_vieux_moulin' : { x: 0.5196820099759919, y: 0.3519335001650278, scale: 0.00040715245527878086 },
  'la_cote_aux_moines' : { x: 0.5193910216690427, y: 0.3520269976302169, scale: 0.00040715245527878086 },
  'madeleine_ruedin_vins' : { x: 0.5195090554619094, y: 0.35205433989162505, scale: 0.00040715245527878086 },
  'schmutz_vins_sa' : { x: 0.5197167718678604, y: 0.35191669548927124, scale: 0.00040715245527878086 },
  'cave_du_tonnelier' : { x: 0.5195544716723808, y: 0.35200176049082726, scale: 0.00040715245527878086 },
  'domaine_burnier' : { x: 0.5197399721368955, y: 0.35190293941147993, scale: 0.00040715245527878086 },
  'cave_du_vieux_praz' : { x: 0.5197150829913891, y: 0.3519172445688405, scale: 0.00040715245527878086 },
  'cave_des_marnes' : { x: 0.5194771328820853, y: 0.3520580321199838, scale: 0.00040715245527878086 },
  'les_2_belles_rives' : { x: 0.5195003480600834, y: 0.35202942984065083, scale: 0.00040715245527878086 },
  'paul_marti_fils' : { x: 0.5194899998813183, y: 0.3520656017303511, scale: 0.00040715245527878086 },
  'cave_du_chateau_de_mur' : { x: 0.5196182240255314, y: 0.35195419677673395, scale: 0.00040715245527878086 },
};

// Returns an array with: full location hash, section name, section subpath.
function parseLocationHash() {
  var hash = (location.hash && location.hash != "" ? location.hash: "#home");
  return hash.match(/#([a-zA-Z0-9_-]+)(\/.*)?/);
}

function currentSectionName() {
  return parseLocationHash()[1];
}

function currentSection() {
  return $('#' + currentSectionName());
}

function resizeBlog() {
  var iframe = $('#blog iframe')[0];
  try {
    if (iframe && iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.body) {
      iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
    }
  } catch (err) {
    // we ignore a potential access denied error
  }
}

jQuery( function($){
  var previousTranslation = null;
  function selectSection() {
    var section = currentSection();   
    var previousSection = $("section.selectedSection");
    var parsedLocation = parseLocationHash();
		
    if (previousTranslation && section[0] === previousSection[0]) {
      // nothing to do.
      return;
    }
    
    section.addClass("selectedSection");
    previousSection.removeClass("selectedSection");
    if (currentSectionName() in initialMapPosition) {
      if ($('.mapContainer canvas').length == 0) {
        // canvas not yet initialized.
        var l = initialMapPosition[currentSectionName()];
        $('.mapContainer').attr('data-map-initialLocation',
         '{x:' + l.x + ',y:' + l.y + ',scale:' + l.scale + '}');
      } else {
        $('.mapContainer canvas')[0].canvasTilesRenderer.setLocation(
          initialMapPosition[currentSectionName()]);
      }
    }

  }

  // Generate map icons.
  $('section[data-pos]').each(function(index, elem) {
    var id = this.id;
    var pos = $(this).attr('data-pos');
    $('.mapContainer').append(
      '<div id="' + id + 'Icon" class="mapIconDiv" '
      + 'data-map-pos="' + pos + '" data-map-anchor=".5,.5">'
      + '<a href="#' + id + '"><img src="img/icon-cave.png" class="mapIcon"/></a>'
      + '</div>');
  });

  window.onhashchange = function() {
    selectSection();
    //ga('send', 'pageview', window.location.pathname + window.location.search + window.location.hash);
  };
  selectSection();
});

