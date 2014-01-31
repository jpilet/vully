/* Welcome to the source code of vully.ch.
 * Julien Pilet - julien.pilet@opticode.ch
 */

// Returns an array with: full location hash, section name, section subpath.
function parseLocationHash() {
  var hash = (location.hash && location.hash != "" ? location.hash: "#bienvenue");
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
  }

  window.onhashchange = function() {
    selectSection();
    //ga('send', 'pageview', window.location.pathname + window.location.search + window.location.hash);
  };
  selectSection();
});

