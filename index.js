var createToDo = function (toDoText) {
    var li = document.createElement('li');
    li.innerText = toDoText;
    return li;
};
var CTD = function (toDoses) { return toDoses.map(createToDo); };
function render(rootElement, anyToDoses) {
    // clear rootElement before list rendering:
    rootElement.innerHTML = "";
    var toDoList = document.createElement('ul');
    CTD(anyToDoses).forEach(function (liItem) {
        toDoList.appendChild(liItem);
    });
    rootElement.appendChild(toDoList);
}
var appId = 'app';
var appRoot = document.getElementById(appId);
render(appRoot, JSON.parse(localStorage.getItem('appToDos')));
