<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>VULLY : Les Vignerons</title>
</head>
<body>

Choisir un événement:
<select id="entrySelect">
</select>
<div id="errorMessage"></div>
<hr/>

<p>Date: <input id="dateInput" type="text" size="40" name="dateInput"></p>
<p>Titre: <input id="titleInput" type="text" size="80" name="title"></p>
<p><textarea id="textInput" name="text" rows="10" cols="80"></textarea></p>

Mot de passe:
<input id="password" type="text" size="20"/>

<input id="validateButton" type="button" value=""/>

  <!-- load JQuery -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/jquery-1.10.2.min.js"><\/script>');</script>
  <script src="js/md5.js"></script>

  <script>
    var allEntries = [];
    var newEntry;
    var passwordHashPrefix="";
    
    function resetNewEntry() {
      newEntry = {
"date": "01.01.2016",
"title":"",
"text": "<p><em>Date<br/>description courte</em></p><p>Une description un peu plus longue</p>",
"linkedFile": ""
};
    }
    
    function hashableString(entries) {
      var str = "";
      for (var i in allEntries) {
        var entry = allEntries[i];
        str += ":"+ entry.date + ":" + entry.title + ":" + entry.text;
      }
      return str;
    }
    
    function fillForm() {
      $("#entrySelect option:selected").each(function() {
          $("#dateInput").val($(this).data("entry").date);
          $("#titleInput").val($(this).data("entry").title);
          $("#textInput").text($(this).data("entry").text);
          $("#validateButton").val($(this).val() == "new" ? "Ajouter événement" : "Enregistrer événement");          
      });
    }
    function readForm(entry) {
      entry.date = $("#dateInput").val();
      entry.title = $("#titleInput").val();
      entry.text = $("#textInput").text();
    }
    function populateEntries() {
          var select = $("#entrySelect");
          
          select.html("");
          var item = $("<option value=\"new\">Nouvel événement</option>")
          item.data("entry", newEntry);
          select.append(item);
          
          for (var i in allEntries) {
            var entry = allEntries[i];
            var item = $("<option value=\"" + i + "\">" + entry.date + " - " + entry.title + "</option>")
            item.data("entry", entry);
            select.append(item);
          }
          fillForm();
    }
    function loadEntries() {
      $.ajax({dataType:"json", url:"agenda.json"
      , success: function (entries) {
          allEntries = entries;
          passwordHashPrefix = hashableString(entries);
          populateEntries();          
        },
        error: function(jqXHR, textStatus, error) {
          $("#errorMessage").html("Error:" + textStatus + " - " + error);
        }
      }
      );
    }
      
      
      function validate() {
        $("#errorMessage").text("");
        var entry = $("#entrySelect option:selected").data("entry");
        readForm(entry);
        
        if ($("#password").val().length < 3) {
          $("#errorMessage").text("Erreur: Veuillez rentrer le mot de passe.");
          return;
        }
        
        if (entry.title.length < 3) {
          $("#errorMessage").text("Erreur: titre trop court.");
          return;
        }
        if ($("#entrySelect option:selected").val() == "new") {
          allEntries.push(newEntry);
          resetNewEntry();
        }
        populateEntries();
        
        var saveData = {
          key: $.md5(passwordHashPrefix + "password:" + $("#password").val()),
          entries: allEntries
        };
      }
      
      resetNewEntry();
      loadEntries();
      
      $("#entrySelect").change(fillForm);
      $("#validateButton").click(validate);
  </script>
</body>
</html>