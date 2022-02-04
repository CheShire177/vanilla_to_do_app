type ToDoListItem = {
    value: string;
    state: 'done' | 'in-progress' | 'new';
    key: string;
}

const createListItemState = (item: ToDoListItem, state: ToDoListItem['state']) => {
    return {
        ...item,
        state
    }
}

const appendTodos = (listElement: HTMLUListElement, todos: Array<ToDoListItem>) => {
    todos.forEach(({ value, state, key }) => {
        const li = document.createElement('li');
        li.innerText = value;
        li.className = state;
        // TODO find more unique key after adding possibilty
        li.setAttribute('data-key', key);
        listElement.appendChild(li);
    });
};

// Render Todo list
function render(appId: string, todos: ToDoListItem[]) {
    todos.sort((a, b) => {
        if (a.state === "in-progress") return -1
        if (b.state === "in-progress") return 1
        if (a.state === "done") return 1
        if (b.state === "done") return -1
        return 0
    })
    const rootElement = document.getElementById(appId) as HTMLDivElement;

    // clear rootElement before list rendering:
    rootElement.innerHTML = "";

    const input = document.createElement('input');

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const newTodo: ToDoListItem = { value: (e.target as HTMLInputElement).value, state: 'new', key: Date.now().toString() };
            const newTodos = [newTodo, ...todos];
            render(appId, newTodos);
            localStorage.setItem(appId + ' storage', JSON.stringify(newTodos))
        }
    })
    const toDoList = document.createElement('ul');
    toDoList.addEventListener('click', (e) => {
        const dataKey = (e.target as HTMLLIElement).getAttribute('data-key');
        const liClassName = (e.target as HTMLLIElement).className;
        const newTodos: ToDoListItem[] = todos.map((item) => {
            const { value, key } = item;
            if (dataKey === key) {
                if (liClassName === 'new') {
                    return createListItemState(item, 'in-progress')
                }
                if (liClassName === 'in-progress') {
                    return createListItemState(item, 'done')
                }
                if (liClassName === 'done')
                    return createListItemState(item, 'new')
            }
            return item;
        })
        render(appId, newTodos);
        localStorage.setItem(appId + ' storage', JSON.stringify(newTodos))
    })
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    appendTodos(toDoList, todos)
    rootElement.appendChild(input);
    input.focus();
    rootElement.appendChild(toDoList);
}

const restoreState = (key: string): ToDoListItem[] => {
    const storageState = localStorage.getItem(key);
    if (storageState) {
        return JSON.parse(storageState);
    }
    return []
}

const app = (appId: string) => {
    const state = restoreState(appId + ' storage');
    render(appId, state);
}

// Run the application
app('app');


console.log('before');
setTimeout(() => {
    console.log('in timeout')
    setTimeout(() => {
        console.log('in second timeout')
        setTimeout(() => {
            console.log('in third')
        }, 2000);
    }, 1000)
}, 1000);


console.log('after');

console.log(setInterval)

const promisefiedTimeOut = (fn: Function, timeout: number) =>
    new Promise((resolve) => {
        setTimeout(() => {
            fn()
            resolve(null)
        }, timeout);
    })

promisefiedTimeOut(() => {
    console.log('first')
}, 5000).then(() => promisefiedTimeOut(() => {
    console.log('second');
}, 5000)).then(() => promisefiedTimeOut(() => {
    console.log('third');
}, 5000)).then(() => promisefiedTimeOut(() => {
    console.log('four');
}, 5000))
