var info = JSON.parse(localStorage.getItem("task-planner-data"));
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