
//Weather Icon
var position = navigator.geolocation.getCurrentPosition(weather);
function weather(position) {
 
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&exclude=minutely,hourly&units=imperial&appid=7e254ff99ca72e0b2e785026f47b52f0";
    $.ajax({
        url: queryURL,
        method: "GET",  
    }).then(function (WeatherData) {
        var today =new Date();
        console.log("here")
        var dayNum = today.getDay();
        for (var i = 0; i < 7; i++) {
            var j = i + dayNum;
            $("#day" + j + "Icon").parent().removeClass("is-hidden");
            $("#day" + j + "Icon").attr("src", "https://openweathermap.org/img/wn/" + WeatherData.daily[i].weather[0].icon + ".png");
            console.log("here")
        }
    });
}

//Quote of the day
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com",
		"x-rapidapi-key": "86f8075ee1msh6ecee30eacd4ae0p15d6f4jsncf63c4d54671"
	}
}

$.ajax(settings).done(function (response) {
    document.getElementById("quoteText").innerHTML = response.text+"\"";
    document.getElementById("quoteAuthor").innerHTML = "-" + response.author;
});

// Calendar
var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
  if (currentMonth === 11) {
    currentYear++;
    currentMonth = 0;
  } else {
    currentMonth++;
  }
  showCalendar(currentMonth, currentYear);
}

function previous() {
  if (currentMonth === 0) {
    currentYear--;
    currentMonth = 11;
  } else {
    currentMonth--;
  }
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

  let firstDay = (new Date(year, month)).getDay();

  tbl = document.getElementById("calendar-body"); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement("tr");

    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        cell = document.createElement("td");
        cellText = document.createTextNode(date);
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.classList.add("is-info");
        } // color today's date
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }


    }

    tbl.appendChild(row); // appending each row into calendar body.
  }

}


// check how many days in a month
function daysInMonth(month, year) {
  return 32 - new Date(year, month, 32).getDate();
}