// localStorage.clear();
var info = JSON.parse(localStorage.getItem("task-planner-data"));
var hours = [["12","AM"],["1","AM"],["2","AM"],["3","AM"],["4","AM"],["5","AM"],["6","AM"],["7","AM"],["8","AM"],["9","AM"],["10","AM"],["11","AM"],["12","PM"],["1","PM"],["2","PM"],["3","PM"],["4","PM"],["5","PM"],["6","PM"],["7","PM"],["8","PM"],["9","PM"],["10","PM"],["11","PM"]];
var time = moment();
var currentDay = time.format("MMM D YYYY");
var category;

info = !info ? {
    placeTaskState: {
        state: false
    },
    getTaskState: {
        state: false
    },
    taskCats: {},
    page: "dayView",
    days: {}
} : info;
init();

function init() {
    generateTimeblocks();
    generateTasks();
    changePage(info.page);
    $(document).on("click", ".timeblock", timeClick);
    $(document).on("click", ".task", taskClick);
    $("#new-cat").on("click", makeTaskCategory);
    $(document).on("click", ".navLink", navClick);
    $(document).on("click", ".makeTask", makeTask);
    $(document).on("click", ".newTask", newTask);

}

function newTask() {
    $('.modal').addClass('is-active')
    category = $(this.parentElement.parentElement).attr("id");
    console.log(category);
}

function taskClick() {
    if(info.getTaskState.state) getTask(this);
}
function timeClick() {
    startGetTask(this) 
}

function navClick() {
    let nav = $(this).attr("id");
    let page = nav == "tasksNav" ? "taskView"
        :nav == "taskNav" ? "taskView"
        :nav == "calNav" ? "monthView"
        :nav == "monthNav" ? "monthView"
        :nav == "weekNav" ? "weekView"
        :"dayView";
    changePage(page);
}

function setDay(day = false) {
    $("#focusedDay").text(time.format("dddd[,] MMMM Do") )
    if(day) $("#focusedDay").text(day);
}

function startPlaceTask() {
    var taskData = $(this).attr("data-task");
    changePage("dayView");
    info.placeTaskState = {
        state: true,
        task: taskData
    };
    storeInfo();
}

function placeTask() {
    $(`#${$(this).attr("data-timeblock")}-task`).text(info.placeTaskState.task);
}

function storeInfo() {localStorage.setItem("task-planner-data", JSON.stringify(info) )}

// When you click on a timeblock to place a task in it
function startGetTask(event) {
    info.getTaskState = {
        state: true,
        // taskArea is not fully formed yet, currently it's "#id"
        taskArea: $(event).attr("id")
    };
    console.log(event)
    storeInfo();
    changePage("taskView");
}

// When you click a task to place it in a timeblock
function getTask(event) {
    // info.days[currentDay].tasks.push($(event))
    let task = event.firstElementChild.firstElementChild.firstElementChild.firstElementChild.textContent.trim();
    let hour = info.getTaskState.taskArea;
    info.days[currentDay][hour].tasks.push(task)
    console.log(info.days[currentDay][hour].tasks)
    info.getTaskState.state = false;
    storeInfo();
    generateTimeblocks(currentDay);
    changePage("dayView");
}

function generateTimeblocks(day = time.format("MMM D YYYY"), baseInterval = 60) {
    setDay(day);
    let timeblocks = []
    $("#timeblocks").empty();
    if(!info.days[day]){
        info.days[day] = {};
        // Make and store each timeblock element in the timeblocks array
        for (let i = 0; i < (24 * 60); i += baseInterval) {
            timeblocks.push(makeTimeblock(i));
            info.days[day][i] = {tasks: []};
        }
        // Put them all on the page
        timeblocks.forEach(e => $("#timeblocks").append(e));
        console.log(info.days[day])
    } else {
        Object.keys(info.days[day]).forEach(e => timeblocks.push(makeTimeblock(e, day)))
        timeblocks.forEach(e => $("#timeblocks").append(e));
    }
    storeInfo();
}

function makeTimeblock(hour, day = false){
    var hourArr = hours[Math.floor(hour / 60)];
    var newBlock = $(`<div id="${hour}" class="columns block timeblock">`);
    var timeCol = $(`<div class="column is-one-quarter">`);
    timeCol.append($(`<h3 class="title" style="font-family: monospace;">${hourArr[0] + (hour % 60 !== 0 ? `:${hour % 60}` : ":00")}<span>${(hourArr[0].length === 1 ? "_" : "" )}</span>${` ${hourArr[1]}`}</h3>`));
    var taskCol = $(`<div class="column">`);
    var table = $(`<table id="hour${hour}Tasks" class="table is-striped">`)
    
    if (day) {
        info.days[day][hour].tasks.forEach(e => {
            table.append(`<tr><td>${e}</td></tr>`);
            console.log(e);
        });
    }

    taskCol.append(table);
    newBlock.append(timeCol, taskCol);
    return newBlock;
}

function changePage(goTo){
    console.log(goTo);
    $("#taskView").addClass("is-hidden");
    $("#dayView").addClass("is-hidden");
    $("#monthView").addClass("is-hidden");
    $("#weekView").addClass("is-hidden");
    $("#" + goTo).removeClass("is-hidden");
    $("#monthNav").removeClass("is-active");
    $("#dayNav").removeClass("is-active");
    $("#weekNav").removeClass("is-active");
    $("#taskNav").removeClass("is-active");
    var active = goTo == "taskView" ? "taskNav"
        :goTo == "dayView" ? "dayNav"
        :goTo == "monthView" ? "monthNav"
        :"weekNav";
    $("#" + active).addClass("is-active");
    info.page = goTo;
    storeInfo();
}



function generateTasks() {
    $("#task-cats").empty();
    $("#task-cat-select").empty();
    Object.keys(info.taskCats).forEach(e => {
        let newCat = $(`<article class="message is-info" id="${e}">
        <div class="message-header">
          <b>
            <p>${e}</p>
          </b>
        </div>
        <div class="message-body">
          <ul id="${e}tasks">
          </ul>
          <button class="newTask button">New Task</button>
          <button class="removeCat button is-danger">Remove Category</button>
        </div>
      </article>`);

        $("#task-cats").append(newCat);
        $("#task-cat-select").append($(`<option>${e}</option>`))
        info.taskCats[e].tasks.forEach(f => {
            console.log(`${e}tasks`)
            $(`#${e}tasks`).append(`<li id="${f}" class="task">
            <a class="level is-mobile round">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  <p class="subtitle has-text-weight-bold is-5" id="task0Cat1desc">
                    ${f}
                  </p>
                </div>
              </div>
              <!-- Right side -->
              <div class="level-right">

                <div class="level-item">
                  <button class="edit button" id="task0Cat1Edit">Edit</button>
                </div>
              </div>
            </a>
          </li>`)
        })
    });

    
}

document.getElementById("cancel").addEventListener("click", function(event){
    $('.modal').removeClass('is-active');
});


function makeTaskCategory() {
    info.taskCats[$("#cat-input").val()] = {tasks: []};
    storeInfo();
    generateTasks();
}

function makeTask() {
    
    info.taskCats[category].tasks.push($("#taskInput").val());
    storeInfo();
    $('.modal').removeClass('is-active')
    generateTasks();
}



$("#calendar-body").on("click", selectDay);

function selectDay(event) {
    let dayNumber = event.target.textContent
    if(/\d/.test(dayNumber) ){
        let monthYear = $("#monthAndYear").text();
        let monthDayYear = monthYear.slice(0,3) + " " + dayNumber + " " + monthYear.slice(4,8);
        currentDay = monthDayYear;
        generateTimeblocks(monthDayYear);
        changePage("dayView");
        

    }
}



//Weather Icon
var position = navigator.geolocation.getCurrentPosition(weather);
function weather(position) {
 
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&exclude=minutely,hourly&units=imperial&appid=7e254ff99ca72e0b2e785026f47b52f0";
    $.ajax({
        url: queryURL,
        method: "GET",  
    }).then(function (WeatherData) {
        var today =new Date();
        $("#quoteText").attr("OuterText","here");
        var dayNum = today.getDay();
        for (var i = 0; i < 7; i++) {
            var j = i + dayNum;
            $("#day" + j + "Icon").attr("src", "https://openweathermap.org/img/wn/" + WeatherData.daily[i].weather[0].icon + "@2x.png");
            $("#day" + j + "Icon").parent().removeClass("is-hidden");
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

// function editTask(event){
//     event.stopPropagation();
//     $("#form").css("display", "block");
//     $("#newTaskName").value = this.parentElement.getElementByClassName("taskName").textContent;
//     $("#newTaskTime").value = this.parentElement.getElementByClassName("taskTime").textContent;
//     $("#newTaskCat").value = this.parentElement.getElementByClassName("taskCat").textContent;
//     taskID = this.parentElement.getElementByClassName("taskID").textContent;
//     edit= true;

// }

// function newTask(){
//     $(".form").display = block;
//     edit = false;
// }


// function makeTask(event){
//     event.preventDefault();
//     if(edit){
//         tasks[taskID].name = $("#newTaskName").value;
//         tasks[taskID].time = $("#newTaskTime").value;
//         tasks[taskID].category = $("#newTaskCat").value;
//         writetaskView();
//     }

// }