// Инициализация хранилища, отрисовка сохраненных "задач", навешивание обработчиков создания и удаления
$(function() {
    const store = new Store;
    store.todos.forEach(todo => {
        createTodo('',todo.title, todo.description, todo.id);
    });
    addRemoveListener(store);
    $('.add-btn').click(function(e){
        const title = document.addTodoForm.title.value;
        const description = document.addTodoForm.description.value;
        if(!title || !description) {
            return false
        }
        createTodo(e, title, description);
        title && description && store.addTodo(title,description);
        document.addTodoForm.title.value = "";
        document.addTodoForm.description.value = "";
        addRemoveListener(store);
    });
});

// Функция для сборки "задачи" и размещеня на странице
const createTodo = (e, title, description, id) => {
    e && e.preventDefault();
    $('.empty-todo') && $('.empty-todo').remove();
    const todo = $('<article></article>');
    const model = '<div class="controll-wrapper clearfix"><h3>'+title+'</h3><button class="delet-btn"><span></span></button><button class="suspend-btn"></button></div><p>'+description+'</p>';
    todo.html(model);
    todo[0].id = id;
    $(".todo-list-wrapper").append(todo);
};

// Функция для навешивания слушателя удаления "задачи"
const addRemoveListener = (store) => {
    $('.delet-btn').click(function(e){
        e.preventDefault();
        const todoId = parseInt($(e.target).parents('article')[0].id);
        store.deleteTodo(todoId);
        $(e.target).parents('article').remove();
        if ($('article').length == 0 && $('.empty-todo').length == 0) {
            $(".todo-list-wrapper").append('<p class ="empty-todo">Список пуст...</p>');
        }    
    });
};

// Хранилище
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
        this.todos.push(todo);
        this._save(this.todos);
    }

    deleteTodo(id){
        this.todos = this.todos.filter(todo => todo.id !== id);
        this._save(this.todos);
    }

    _save(todos){
        localStorage.setItem('todos', JSON.stringify(todos));
    }
};