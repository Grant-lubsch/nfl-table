var csv_data;

function refreshData(year) {
  var constructedURL = "https://raw.githubusercontent.com/fantasydatapros/data/66e9b0027b637659966534a0f83d63e938d66775/yearly/" + year + ".csv";

  $.ajax({
    type: "GET",
    url: constructedURL,
    dataType: "text",
    success: function(response)
    {
      csv_data = $.csv.toArrays(response);
      generateHtmlTable(csv_data);
    }
  });
}

function removeOldData() {
  var table = document.getElementById('nfl-take2-table');
  if (table === null) {
    return;
  } else {
    table.remove();
  }
}

function generateHtmlTable(data) {
  var html = '';

    if(typeof(data[0]) === 'undefined') {
      return null;
    }
    else {
      html += '<table class="nfl-take2-table" id="nfl-take2-table">';
      html += "\n";

      // this is the header row - just needed once in the beginning
      html += '<thead>';//create table header
      html += "<tr>"; // create the first row for the header

      $.each(data, function( index, row ) {
        if(index == 0) {
          $.each(row, function( index, colData ) {
            html += '<th>';
            html += colData;
            html += '</th>';
          });

          html += "</tr></thead>\n<tbody>\n";
        }
        else
        {
          // now the body of the table - this is the actual data that goes in each row
          html += '<tr>'; // declare a new row

          $.each(row, function( index, colData ) {
            html += '<td>'; // declare a new column in the row
            html += colData; // add the data in this column
            html += '</td>'; // close the column
          });

          html += "</tr>\n"; // close the table row
        }

    });
    html += "\n</tbody>\n</table>"; //close the body and table

    // console.log(html);
    $('#csv-display').append(html);
  }
};

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("date-dropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function initOnChangeYear() {
  document.getElementById('date-dropdown').addEventListener('change', function(){
    var year = this.value;
    removeOldData();
    refreshData(year);
    // console.log('something changed: ' + );
  });
}

// document.getElementById('date-dropdown').onchange = function() {
//   console.log('in the change');
// }
