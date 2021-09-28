const { profileEnd } = require('console');
const { ENOTSOCK } = require('constants');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let taskList = [];

function addTask(taskList, taskDescription) {
    taskList.push({done: false, description: taskDescription});
}

function prinTaskList(taskList){

    for (let i = 0; i < taskList.length; ++i){
        if (taskList[i].done){
            console.log(i +1 + '. [x]' + taskList[i].description);
        }else {
            console.log(i + 1 +'. [ ]' + taskList[i].description);
        }
    }
}

function mode1(taskList){
    rl.question('Introduce una nueva tarea (FIN si terminas)', function(taskDesc){
        switch (taskDesc){
            case 'FIN':
            case 'exit':
                console.log('No se introducen ya más tareas');
                mode2(taskList);
                break;
            default:
                addTask(taskList, taskDesc);
                console.log('La lista de tareas actual es: ');
                prinTaskList(taskList);
                mode1(taskList);
        }
        
    })
}


function markTaskAsDone(taskList, index) {
    if (index >= 0 && index < taskList.length){
        taskList[index].done = true;
    } else {
        console.log('Invalid task number');
    }
    
}


function checkAllDone(taskList) {
    for (let task of taskList){
        if (!task.done) return false;   
    }
    return true;
}


function mode2(taskList){
    prinTaskList(taskList);
    rl.question('Qué tarea has realizado? (1-N)', function(taskNumber){
        switch (taskNumber){
            case 'FIN':
            case 'exit':
                console.log('Bye Bye madafaka');
                rl.close();
                break;
            default:
                markTaskAsDone(taskList, taskNumber - 1 );
                if (checkAllDone(taskList)){
                    console.log('Muy bien!!!, ya has acabado.');
                    rl.close();
                }else {
                    mode2(taskList);
                }
                
        }
    });
    }

mode1(taskList);