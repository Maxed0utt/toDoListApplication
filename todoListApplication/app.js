var root = document.body
var toDoList = []
var task;

function addTask(taskName, index){
    //task div is where the tasks will show up once they are added
    return m("ul.taskList", [

        //display name of the task that we are adding
        m("li.task", [

        // up button
        m("span.buttons#up", {
            //move item up in the toDoList array by swapping the locations of the current item and the previous item
            onclick: function () {
                //the item will move up if it's not the first item in the array
                if (index != 0){
                    //the item will only move if it's not the only item in the array
                    if (toDoList.length !== 1){
                        let indexMinusOne = index - 1
                        let swapItem = toDoList[indexMinusOne]
                        toDoList[indexMinusOne] = toDoList[index]
                        toDoList[index] = swapItem
                    }
                }
            }
        },
        //inner html text indicating up arrow
        "^"),

        //down button
        m("span.buttons#down", {
            //move item down in the toDoList array by swapping the locations of the current item and next the item
            onclick: function () {
                //the item will move down if it's not the last element in the array
                if (index != toDoList.length - 1){
                    //the item will only move if it's not the only item in the array
                    if (toDoList.length !== 1){
                        let indexPlusOne = index + 1
                        let swapItem = toDoList[indexPlusOne]
                        toDoList[indexPlusOne] = toDoList[index]
                        toDoList[index] = swapItem
                    }
                }
            }
        },
        //inner html text indicating down arrow
        "∨"),

        // delete button
        m("span.buttons#delete", {
            onclick: function () {
                //remove item from the toDoList array
                toDoList.splice(index, 1)
            }
        },
        //inner html indicating delete button
        "-")
        ], taskName),
    ])
}

var Application = {
    view: function () {
        //input wrapper
        return m("div#container", [

            m("div#inputWrapper", [
                //title
                m("h1", "To-Do List"),

                //input text box
                m("input[type=text]", {
                    placeholder: "Enter a Task To Do: ",
                    id: "taskInput",
                    value: task,
                    oninput: function (){
                        task = this.value
                    }
                }),

                //add button for the text input adds what's in the input to toDoList array
                m("span#addButton", {
                    //adds what's in the input to the toDoList array and clears the input box
                    onclick: function () {
                        if (task) {
                            toDoList.push(task)
                            task = ""
                        }
                    },
                },
                //inner html text Add
                "+"),
            ]),

            //task wrapper div that holds an empty array that then maps the tasks as they are added using the addTask function
            m("div#taskWrapper", [].concat(toDoList.map((taskName ,index) => addTask(taskName, index))))
        ])
    }
}

m.mount(root, Application)
