
let key = 'todos';
let key2 = 'completed';
let todoList = [];
let completeditem = [];



//initialize todo list
function initTodoList() {
    if (localStorage.getItem(key)) {
        todoList = JSON.parse(localStorage.getItem(key))
        todoList.forEach((data) => {
            let todoItem = `
            <li class="todoItem" id="${data.id}">
            
                ${data.todo}
                <span class="deleteBtn">
                    <i class="far fa-trash-alt"></i>
                </span>
            </li>
            `
            $('.list ul').append(todoItem);


        });
    }
    if (localStorage.getItem(key2)) {
        completeditem = JSON.parse(localStorage.getItem(key2))
        completeditem.forEach((data) => {
            let todoItem = `
            <li class="todoItem checked" id="${data.id}">
                ${data.todo}
                <span class="deleteBtn">
                    <i class="far fa-trash-alt"></i>
                </span>
            </li>
            `
            $('.list ul').append(todoItem);

        });

    };
};
initTodoList();


//add todo
$('#addBtn').on('click', function (e) {
    e.preventDefault();
    const todo = $('input').val()
    const data = {
        todo: todo,
        id: new Date().getTime()
    };
    if (todo !== '') {
        let todoItem = `
        <li class="todoItem" id="${data.id}">
        
            ${data.todo}
            <span class="deleteBtn">
                <i class="far fa-trash-alt"></i>
            </span>
        </li>
        `
        $('.list ul').append(todoItem);
        addTodoToLocalStorage(data);
        $('input').val('')
    }


})

// add todo to localstorage
function addTodoToLocalStorage(data) {
    todoList.push(data);
    let todos = JSON.stringify(todoList);
    window.localStorage.setItem(key, todos);
}


//delete todo
$('.list ul').on('click', '.deleteBtn', function (e) {
    // console.log(this)//'this' is <span>
    $(this).parent().fadeOut(300, function () {
        //console.log(this)//'this' is <li>
        $(this).remove();
        deleteTodoInLocalStorage(this)
    });
    e.stopPropagation();
})

// function update() {
//     window.localStorage.setItem(key, JSON.stringify(todoList));
//     window.localStorage.setItem(key2, JSON.stringify(completeditem));
// }

//delete todo in localStorage
function deleteTodoInLocalStorage(e) {
    let eid = $(e).attr('id')
    let todoIdx = todoList.findIndex(el => { return el.id === parseInt(eid) })
    let comIdx = completeditem.findIndex(el => { return el.id === parseInt(eid) })
    if (todoList.some(el => el.id === parseInt(eid))) {
        todoList.splice(todoIdx, 1);
        window.localStorage.setItem(key, JSON.stringify(todoList));

    } if (completeditem.some(el => el.id === parseInt(eid))) {
        completeditem.splice(comIdx, 1);
        window.localStorage.setItem(key2, JSON.stringify(completeditem));
    }



}



//todo is completed
$('.list ul').on('click', 'li', function () {
    let eid = $(this).attr('id')
    let todoIdx = todoList.findIndex(el => { return el.id === parseInt(eid) })
    let comIdx = completeditem.findIndex(el => { return el.id === parseInt(eid) })
    //completed -> todo 
    if ($(this).hasClass('checked')) {
        $(this).removeClass('checked');
        todoList.push(completeditem[comIdx])
        completeditem.splice(comIdx, 1);
        window.localStorage.setItem(key, JSON.stringify(todoList));
        window.localStorage.setItem(key2, JSON.stringify(completeditem));

    } else {
        //todo -> completed 
        $(this).addClass('checked');
        completeditem.push(todoList[todoIdx]);
        todoList.splice(todoIdx, 1);
        window.localStorage.setItem(key, JSON.stringify(todoList));
        window.localStorage.setItem(key2, JSON.stringify(completeditem));
    }

})



