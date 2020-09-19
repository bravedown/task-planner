var info = JSON.parse(localStorage.getItem("task-planner-data"));
var hours = [[12,"AM"],[1,"AM"],[2,"AM"],[3,"AM"],[4,"AM"],[5,"AM"],[6,"AM"],[7,"AM"],[8,"AM"],[9,"AM"],[10,"AM"],[11,"AM"],[12,"PM"],[1,"PM"],[2,"PM"],[3,"PM"],[4,"PM"],[5,"PM"],[6,"PM"],[7,"PM"],[8,"PM"],[9,"PM"],[10,"PM"],[11,"PM"]];
!info ? info = {} : console.log("Loaded info from storage.");
init();

function init() {
    generateTimeblocks();
    generateTasks();
    $(document).on("click", ".timeblock", () => placeTaskState.state ? placeTask() : startGetTask() );
    $(document).on("click", ".task", () => getTaskState.state ? getTask() : startPlaceTask() );
}

function startPlaceTask() {
    var taskData = $(this).attr("data-task");
    changePage("schedule");
    info.placeTaskState = {
        state: true,
        task: taskData,
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
    changePage("tasks");
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
    timeblocks.forEach(e => $("#timeblocks").append(e));
}

function makeTimeblock(hour){
    // Creates a string in the format of: hour = 270, hourStr = "4:30 AM", hour = 780, hourStr = "1 PM"
    var hourArr = hours[Math.floor(hour / 60)];
    var hourStr = hourArr[0] + (hour % 60 !== 0 ? `:${hour % 60}` : "") + ` ${hourArr[1]}`;
    var newBlock = $(`<div id=${hour}>`);
    var timeSpan = $(`<span class="hour">${hourStr}</span>`);
    var taskSpan = $(`<span class="task">`);
    newBlock.append(timeSpan, taskSpan);
    return newBlock;
}