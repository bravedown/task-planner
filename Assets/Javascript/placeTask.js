
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
