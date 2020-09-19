var info = JSON.parse(localStorage.getItem("task-planner-data"));
!info ? info = {} : console.log("Loaded info from storage.");
init();

function init() {
    generateTimeblocks();
    generateTasks();
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