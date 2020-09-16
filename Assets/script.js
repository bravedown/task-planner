$document.on("click", ".edit", editTask)
$document.on("click", ".tasklist-nav", changePage(".tasklist"))
$document.on("click", ".schedule-nav", changePage(".schedule"))
var edit = false;
var tasks=[{name: "Thing", time: "date variable", category: "category name", id= 0}];
var taskID;



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