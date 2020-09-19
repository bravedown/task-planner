// $document.on("click", ".edit", editTask)
// $document.on("click", ".tasklist-nav", changePage(".tasklist"))
// $document.on("click", ".schedule-nav", changePage(".schedule"))
var edit = false;
var taskID;
var position = navigator.geolocation.getCurrentPosition(weather);
function weather(position) {
 
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&exclude=minutely,hourly&units=imperial&appid=7e254ff99ca72e0b2e785026f47b52f0";
    $.ajax({
        url: queryURL,
        method: "GET",  
    }).then(function (WeatherData) {
        var today =new Date();
        var dayNum = today.getDay();
        for (var i = 0; i < 7; i++) {
            var j = i + dayNum;
            $("#day" + j + "Icon").attr("src", "http://openweathermap.org/img/wn/" + WeatherData.daily[i].weather[0].icon + "@2x.png");

        }
    });
}


function editTask(event){
    event.stopPropogation();
    $(".form").display = block;
    $("#newTaskName").value = this.parentElement.getElementByClassName("taskName").textContent;
    $("#newTaskTime").value = this.parentElement.getElementByClassName("taskTime").textContent;
    $("#newTaskCat").value = this.parentElement.getElementByClassName("taskCat").textContent;
    taskID = this.parentElement.getElementByClassName("taskID").textContent;
    edit= true;

}

function newTask(){
    $(".form").display = block;
    edit = false;
}

function writeTasklist(){

}

function changePage(goTo){
    $(".tasklist").display = none;
    $(".schedule").display = none;
    $(goTo).display = block;
}

function makeTask(event){
    event.preventDefault();
    if(edit){
        tasks[taskID].name = $("#newTaskName").value;
        tasks[taskID].time = $("#newTaskTime").value;
        tasks[taskID].category = $("#newTaskCat").value;
        writeTasklist();
    }

}