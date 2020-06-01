document.addEventListener('DOMContentLoaded', () =>{
  changeBackColor();
  document.querySelectorAll('.new-button').forEach((item) => {
    item.onclick = () => newNote();
  });
  document.querySelectorAll('.delete-button').forEach((item) => {
    item.onclick = function(){
      deleteNote(this);
      assignName();
      changeBackColor();
    }
  });
});

const newNote = () => {
  const note =   document.createElement('div');
  note.setAttribute("class", "note");
  note.setAttribute("id", "note-template");
  const head =   document.createElement('div');
  head.setAttribute("class", "note-head");
  const newButton =   document.createElement('div');
  newButton.setAttribute("class", "new-button note-head-button");
  newButton.setAttribute("onclick", "newNote();");
  const deleteButton =   document.createElement('div');
  deleteButton.setAttribute("class", "delete-button note-head-button");
  deleteButton.setAttribute("onclick", "deleteNote(this); assignName(); changeBackColor();");
  const text = document.createElement('textarea');
  newButton.innerHTML = "+";
  deleteButton.innerHTML = "&times";
  head.innerHTML = newButton.outerHTML + deleteButton.outerHTML;
  note.innerHTML = head.outerHTML + text.outerHTML;
  document.querySelector('#note-space').append(note)
  assignName();
  changeBackColor();
}

const deleteNote = (e) => {
  return e.parentNode.parentNode.remove();
  assignName();
}

const assignName = () => {
    document.querySelectorAll('textarea').forEach((item, i) => {
      item.name = i + 1;
      document.getElementById('count').value = i + 1;
    });
}

const changeBackColor = () => {
  disableSubmit();
  var index = Math.floor(Math.random() * 4);
  const body = document.querySelector('body').className = ("view" + index);
}

const disableSubmit = () => {
  const check = document.querySelectorAll('textarea');
  if (check.length > 0)
      document.querySelector('#submit').disabled = false;
  else
      document.querySelector('#submit').disabled = true;
}
