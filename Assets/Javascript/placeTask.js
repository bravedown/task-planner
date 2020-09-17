// ------------ getTask start ------------

$(document).on("click", ".timeblock", () => placeTaskState.state ? placeTask() : startGetTask() );
$(document).on("click", ".task", () => getTaskState.state ? getTask() : startPlaceTask() );
var getTaskState;

// This code WILL have merge conflicts with placeTask

// When you click on a timeblock to place a task in it
function startGetTask() {
    getTaskState = {
        state: true,
        // taskArea is not fully formed yet, currently it's "#id"
        taskArea: `#${$(this).attr("id")}-task`
    };
    changePage("tasks");
}

// When you click a task to place it in a timeblock
function getTask() {
    
    $(getTaskState.taskArea).text($(this).attr("data-task"));
    getTaskState.state = false;
    changePage("schedule");
}

// ------------ getTask end ------------

function startPlaceTask() {
    var taskData = $(this).attr("data-task");
    tasks = JSON.parse(localStorage.getItem("tasks"));
    changePage("schedule");
    info.placeTaskState = {
        state: true,
        task: tasks[taskData],
    };
    
}

function placeTask() {

}
