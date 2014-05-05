/* Welcome to the source code of vully.ch.
 * Julien Pilet - julien.pilet@opticode.ch
 */

var initialMapPosition = {
  'home' : {x:0.5189310839225135,y:0.3516568495720967,scale:0.003060881448394781,vx:.5},
  'vignerons' : { x:0.5195680934607014,y:0.35197732928646386,scale:0.00040715245527878086, vx:.5 },
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

    // Find out where we should scroll the map.
    var l = initialMapPosition[currentSectionName()];
    var pos = section.attr('data-pos');
    if (pos) {
      eval('var parsedPos = [' + pos + ']');
      l = {
        x: parsedPos[0],
        y: parsedPos[1],
        scale: 0.00008962143587454,
        // Place the icon at 66% on the right, to leave
        // space for text on the left.
        vx: .66
      };
    }

    // Actually scroll the map.
    if ($('.mapContainer canvas').length == 0) {
      // canvas not yet initialized.
      $('.mapContainer').attr('data-map-initialLocation',
       '{x:' + l.x + ',y:' + l.y + ',scale:' + l.scale
       + ',vx:' + l.vx + '}');
    } else {
      $('.mapContainer canvas')[0].canvasTilesRenderer.setLocation(l);
    }

    // Un-highlight and highlight proper cave icons, if necessary.
    $('.highlightIcon').removeClass('highlightIcon');
    $('.unselectedIcon').removeClass('unselectedIcon');
    var caveIsSelected =
      $('.selectedSection.cave')
      .each(function() {
          $('#' + this.id + 'Icon img').addClass('highlightIcon');
        })
      .length > 0;
    if (caveIsSelected) {
      $('img.mapIcon').addClass('unselectedIcon');
      $('.highlightIcon').removeClass('unselectedIcon');
    }
  }

  // Generate map icons.
  $('section[data-pos]').each(function(index, elem) {
    var id = this.id;
    var pos = $(this).attr('data-pos');
    var textAnchor = $(this).attr('data-text-anchor') || "-.1,.5";
    $('.mapContainer').append(
      '<div id="' + id + 'Icon" class="mapIconDiv" '
      + 'data-map-pos="' + pos + '" data-map-anchor=".5,.5">'
      + '<a href="#' + id + '"><img src="img/icon-cave.png" class="mapIcon"/></a>'
      + '</div>'
      + '<div id="' + id + 'Label" class="mapLabelDiv" '
      + 'data-map-pos="' + pos + '" data-map-anchor="' + textAnchor + '">'
      + '<a href="#' + id + '">' + $('#' + id + ' header').html() + '</a>'
      + '</div>'
      );
  });

  window.onhashchange = function() {
    selectSection();
    //ga('send', 'pageview', window.location.pathname + window.location.search + window.location.hash);
  };
  selectSection();
});

