
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

function formatEntries(selector, entries) {
  var container = $(selector);
  container.html("");
  
  var groups = {};
  for (var i in entries) {
    var entry = entries[i];
    
    var key = getGroupLabel(entry.date);
    if (!(key in groups)) {
      groups[key] = [];
    }
    groups[key].push(entry);
  }
  
  for (var groupName in groups) {
    var group = groups[groupName];
    
    var groupDiv = $("<div class=\"block\"><h1>" + groupName + "</h1></div>");
    for (var i in group) {
      var entry = group[i];
      groupDiv.append("<h2>" + entry.title + "</h2>");
      groupDiv.append(entry.text);
      if (entry.linkedFile) {
        groupDiv.append('<footer><a href="' + entry.linkedFile + '"><img class="iconSize2" src="img/icon-data-linked.png"/></a></footer>');
      } else {
        groupDiv.append('<hr/>');
      }
    }
    container.append(groupDiv);
  }
}
