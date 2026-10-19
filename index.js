const input=document.getElementById("input-task")
const taskDetails = document.getElementById("task-details");
const clearCompletedTaskBtn=document.getElementById("clear-completed-task")
const filterButtons = document.querySelectorAll("#task-details button");

let currentTasks=[]
let toggleAllCompleteTasks=false

const updateFooterVisibility = () => {
    taskDetails.style.display = currentTasks.length === 0 ? 'none' : 'flex'
}


const setActiveButton=(clicked) =>{
  filterButtons.forEach((b) => b.classList.remove("selected"));
  clicked.classList.add("selected");
}

const countIncompleteItems=()=>{
    let total=0
    currentTasks.forEach((task)=>{
        if(!task.completed){
            total++
        }
    })
    const id=document.getElementById("items-left")
    id.textContent=`${total} items left`
    clearCompletedTaskBtn.hidden=!(currentTasks.length-total)>0
}

const onSubmit=()=>{
    const input=document.getElementById("input-task")
    const inputValue=input.value
    if(inputValue=='' || inputValue.trim().length===0){
        alert("enter valid input")
        return
    }
    const taskObj={id:crypto.randomUUID(), task:inputValue, completed:false}
    currentTasks.push(taskObj)
    input.value=''
    renderAll(currentTasks)
    countIncompleteItems()
    updateFooterVisibility()
}

const renderAll=(tasks)=>{
    const taskList=document.getElementById('task-list')
    taskList.innerHTML=""
    tasks.forEach((todo)=>{
        const li=document.createElement('li')
        const checkbox=document.createElement("input")
        const deletebtn=document.createElement("button")
        deletebtn.textContent='Delete'
        deletebtn.id="delete-btn"
        deletebtn.type='button'
        checkbox.type='checkbox'
        deletebtn.addEventListener('click',(e)=>{
            deleteTask(todo.id)
        })
        checkbox.addEventListener('change',()=>{
            todo.completed=!todo.completed
            countIncompleteItems()
            li.classList.toggle("completed", todo.completed)
        })
        checkbox.checked=todo.completed
        const label=document.createElement("span")
        label.textContent=todo.task
        
        li.appendChild(checkbox)
        li.appendChild(label)
        li.appendChild(deletebtn)

        taskList.appendChild(li)
    })
    
}

const showAllActiveTasks=()=>{
    const activeTasks=currentTasks.filter((task)=>!task.completed)
    renderAll(activeTasks)
}
const showAllCompletedTasks=()=>{
    const completedTasks=currentTasks.filter((task)=>task.completed)
    renderAll(completedTasks)
}

const showAll=()=>{
    renderAll(currentTasks)
}


const completeAll=()=>{
    const markAllCompleted=currentTasks.map((task)=>{
        if(!toggleAllCompleteTasks)
            task.completed=true
        else{
            task.completed=false
        }
        return task
    })
    toggleAllCompleteTasks=!toggleAllCompleteTasks
    renderAll(markAllCompleted)
    countIncompleteItems()
}

const removeCompletedTasks=()=>{
    currentTasks=currentTasks.filter((task)=>!task.completed)
    renderAll(currentTasks)
    countIncompleteItems()
    updateFooterVisibility()
}

const deleteTask=(id)=>{
    currentTasks=currentTasks.filter((task)=>task.id!=id)
    console.log(currentTasks)
    countIncompleteItems()
    renderAll(currentTasks)   
    updateFooterVisibility()
}


function init() {
    document.getElementById("task-details").addEventListener("click", (e) => {
        if (e.target.id === 'clear-completed-task') return
        if (e.target.tagName === "BUTTON") setActiveButton(e.target);
    });
    input.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            onSubmit()
        }
    })

    //add the input while user clicks outside
    document.addEventListener("click", (e) => {
        if (e.target === input) return
        if (input.value.trim().length > 0) {
            onSubmit()
        }
    })

}
updateFooterVisibility()
init()