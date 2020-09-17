var info = JSON.parse(localStorage.getItem("task-planner-data"));
!info ? info = {} : console.log("Loaded info from storage.");
init();

function init() {
    generateTimeblocks();
    generateTasks();
}