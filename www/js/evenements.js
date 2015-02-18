
function parseDate(dateAsString) {
  var fields = dateAsString.split(".");
  var year = parseInt(fields[2]);
  if (year < 2000) year += 2000;

  var theDate = new Date(year,fields[1]-1,fields[0]);
  return theDate;
}

function getGroupLabel(date) {
  var fields = date.split(".");
  var months = [
    "JANVIER",
    "FEVRIER",
    "MARS",
    "AVRIL",
    "MAI",
    "JUIN",
    "JUILLET",
    "AOUT",
    "SEPTEMBRE",
    "OCTOBRE",
    "NOVEMBRE",
    "DECEMBRE"];
  if (fields.length != 3) {
    return date;
  }
  var n = parseInt(fields[1]);
  var year = parseInt(fields[2]);
  if (year <1900) year += 2000;
  if (n>= 1 && n <= 12) {
    return months[n-1] + " " + year;
  }
  return date;
}

function sortEntries(entries) {
  entries.sort(function(a,b) {
    return parseDate(a.date) - parseDate(b.date);
  });
}

function formatItem(entry, groupDiv) {
  groupDiv.append("<h2>" + entry.title + "</h2>");
  
  groupDiv.append(entry.text);
  if (entry.linkedFile) {
    groupDiv.append('<footer><a href="' + entry.linkedFile + '"><img class="iconSize2" src="img/icon-data-linked.png"/></a></footer>');
  } else {
    groupDiv.append('<hr/>');
  }
}

function formatEntries(selector, entries) {
  var container = $(selector);
  container.html("");
  
  var lastGroupLabel;
  var groupDiv;
  
  for (var i in entries) {
    var entry = entries[i];
    
    var groupLabel = getGroupLabel(entry.date);
    if (!lastGroupLabel || lastGroupLabel != groupLabel) {
      lastGroupLabel = groupLabel;
      if (groupDiv) {
        container.append(groupDiv);    
      }
      groupDiv = $("<div class=\"block\"><h1>" + groupLabel + "</h1></div>");
    }
    formatItem(entry, groupDiv);
  }
  if (groupDiv) {
    container.append(groupDiv);    
  }
}
