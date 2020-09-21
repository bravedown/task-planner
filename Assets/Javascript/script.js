var info = JSON.parse(localStorage.getItem("task-planner-data"));
var hours = [[12,"AM"],[1,"AM"],[2,"AM"],[3,"AM"],[4,"AM"],[5,"AM"],[6,"AM"],[7,"AM"],[8,"AM"],[9,"AM"],[10,"AM"],[11,"AM"],[12,"PM"],[1,"PM"],[2,"PM"],[3,"PM"],[4,"PM"],[5,"PM"],[6,"PM"],[7,"PM"],[8,"PM"],[9,"PM"],[10,"PM"],[11,"PM"]];
!info ? info = {
    placeTaskState: {
        state: false
    },
    getTaskState: {
        state: false
    },
    taskCats: {}
} 
: console.log("Loaded info from storage.");
init();

function init() {
    generateTimeblocks();
    generateTasks();
    $(document).on("click", ".timeblock", () => info.placeTaskState.state ? placeTask() : startGetTask() );
    $(document).on("click", ".task", () => info.getTaskState.state ? getTask() : startPlaceTask() );
    $("#new-cat").on("click", makeTaskCategory);
}

function startPlaceTask() {
    var taskData = $(this).attr("data-task");
    changePage("schedule");
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
function startGetTask() {
    info.getTaskState = {
        state: true,
        // taskArea is not fully formed yet, currently it's "#id"
        taskArea: `#${$(this).attr("id")}-task`
    };
    storeInfo();
    changePage("schedule");
}

// When you click a task to place it in a timeblock
function getTask() {
    $(info.getTaskState.taskArea).text($(this).attr("data-task"));
    info.getTaskState.state = false;
    storeInfo();
    changePage("schedule");
}

function generateTimeblocks(baseInterval = 60) {
    $("#timeblocks").empty();
    var timeblocks = [];
    // Make and store each timeblock element in the timeblocks array
    for (let i = 0; i < (24 * 60); i += baseInterval) timeblocks.push(makeTimeblock(i));
    // Put them all on the page
    timeblocks.forEach(e => $("#dayView").append(e));
}

function makeTimeblock(hour){
    // Creates a string in the format of: hour = 270, hourStr = "4:30 AM", hour = 780, hourStr = "1 PM"
    var hourArr = hours[Math.floor(hour / 60)];
    var hourStr = hourArr[0] + (hour % 60 !== 0 ? `:${hour % 60}` : "") + ` ${hourArr[1]}`;
    var newBlock = $(`<div id="${hour}" class="columns block timeblock">`);
    var timeCol = $(`<div class="column is-one-quarter">`);
    timeCol.append($(`<h3 class="title" style="font-family: monospace;">${hourStr}</h1>`));
    var taskCol = $(`<div class="column">`);
    taskCol.append(`<table id="hour0Tasks" class="table is-striped">`)
    newBlock.append(timeCol, taskCol);
    return newBlock;

    // <div class="columns block" style="border-bottom-style: groove;">
    //     <div class="column is-one-quarter">
    //         <h1 class="title">0:00</h1>
    //     </div>
    //     <div class="column">
    //         <table id="hour0Tasks" class="table is-striped">

    //         </table>
    //     </div>
    // </div>
}

function changePage(goTo){
    $("#tasklist").css("display", "none");
    $("#schedule").css("display", "none");
    $("#" + goTo).css("display", "block");
}

function generateTasks() {
    $("#task-cats").empty();
    $("#task-cat-select").empty();
    Object.keys(info.taskCats).forEach(e => {
        let newCat = $("<div class='styling here'>")
        newCat.text(e);
        $("#task-cats").append(newCat);
        $("#task-cat-select").append($(`<option>${e}</option>`))
    });
}

function makeTaskCategory() {
    info.taskCats[$("#cat-input").val()] = {};
    storeInfo();
    generateTasks();
    
}

function makeTask() {
    info.taskCats["cat-here"][$("#task-name").val()] = {
        //store stuff here
    };
    storeInfo();
    generateTasks();
}

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
//         writeTasklist();
//     }

// }