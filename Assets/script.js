$(document).on("click", ".task", placeTask);
var tasks;
var placeTaskState;
function placeTask() {
    var taskData = $(this).attr("data-task");
    tasks = JSON.parse(localStorage.getItem("tasks"));
    changePage("timeblocks");
    placeTaskState = {
        state: true,
        task: tasks.taskData,
    };
}

