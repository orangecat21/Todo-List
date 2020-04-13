// document.addEventListener('DOMContentLoaded', () => {
//     document.addEventListener('submit', (event) => {
//         event.preventDefault();
//         let elem = document.createElement('p');
//         elem.innerText=document.form.input.value;
//         document.body.appendChild(elem);
//     });
// });

$(function() {
    const store = new Store;
    addRemoveListener();
    $('.add-btn').click(function(e){
        createTodo(e);
        document.addTodoForm.title.value = "";
        document.addTodoForm.description.value = "";
        addRemoveListener();
    });
 });

class Store {
    constructor(){
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    }

    addTodo(todoTitle, todoDescr){
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length-1].id + 1: 1,
            title: todoTitle,
            description: todoDescr
        }
        this.todos.push(todo)
    }

    deleteTodo(id){
        this.todos = this.todos.filter(todo => todo.id !== id)
    }
};

const createTodo = (e) => {
    e.preventDefault();
    const title = document.addTodoForm.title.value;
    const description = document.addTodoForm.description.value;
    if(!title || !description) {
        return false
    }
    $('.empty-todo') && $('.empty-todo').remove();
    const todo = $('<article></article>');
    const model = '<div class="controll-wrapper clearfix"><h3>'+title+'</h3><button class="delet-btn"><span></span></button><button class="suspend-btn"></button></div><p>'+description+'</p>';
    todo.html(model);
    $(".todo-list-wrapper").append(todo);
};

const addRemoveListener = () => {
    $('.delet-btn').click(function(e){
        e.preventDefault();
        $(e.target).parents('article').remove();
        console.log($('article').length);
        if ($('article').length == 0 && $('.empty-todo').length == 0) {
            $(".todo-list-wrapper").append('<p class ="empty-todo">Список пуст...</p>');
        }    
    });
};
