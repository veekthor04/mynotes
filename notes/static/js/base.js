document.addEventListener('DOMContentLoaded', () =>{

  if (localStorage.getItem('backColor')){
        const body = document.querySelector('body').className = localStorage.getItem('backColor');
  } else {
    changeBackColor();
  }

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

  colorFunc();

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
  if (!localStorage.getItem('backColor')){
    var index = Math.floor(Math.random() * 4);
    const body = document.querySelector('body').className = ("view" + index);
  }
}

const disableSubmit = () => {
  const check = document.querySelectorAll('textarea');
  if (check.length <= 0)
      document.querySelector('#submit').className = "hide";
  else {
document.querySelector('#submit').className = "";
  }
}

const colorFunc = () => {
  document.getElementById('color1').onclick = () => {
    localStorage.setItem('backColor', "view0");
    document.querySelector('body').className = "view0"
  }

  document.getElementById('color2').onclick = () => {
    localStorage.setItem('backColor', "view1");
    document.querySelector('body').className = "view1"
  }

  document.getElementById('color3').onclick = () => {
    localStorage.setItem('backColor', "view2");
    document.querySelector('body').className = "view2"
  }

  document.getElementById('color4').onclick = () => {
    localStorage.setItem('backColor', "view3");
    document.querySelector('body').className = "view3"
  }

  document.getElementById('color5').onclick = () => {
    changeBackColor();
    localStorage.removeItem("backColor");
  }
}

// Sub-menu
var submenus = document.querySelectorAll("ul.sub-menu");
if (submenus.length > 0)
	for (var i = 0; i < submenus.length; i++) {
		var span = document.createElement("span");
		span.classList.add("expand");
		span.innerHTML = "+";

		span.addEventListener("click", function () {
			this.classList.toggle("active");
			// this.nextElementSibling.classList.toggle('active');
			this.parentNode.classList.toggle("active");
		});

		submenus[i].previousElementSibling.appendChild(span);
		submenus[i].parentNode.insertBefore(span, submenus[i]);
	}

/*
	<a class="anyclass" href="#" data-toggle-class="active, someotherclass" data-toggle-target=".menu, self">Menu</a>

	data-toggle-class - classes to apply to targets
	data-toggle-target - target's selectors to apply classes to

	If there is no 'data-toggle-target' attribute (only 'data-toggle-class'), classes are applyed to trigger element.
	If classes are needed to be appled to targets including trigger element itself, use keywords 'this' or 'self'.
*/
(function () {
	function toggleClasses(classes, obj) {
		if (!classes) return;
		if (!obj) return;
		for (var n = 0; n < classes.length; n++)
			obj.classList.toggle(classes[n].trim());
	}

	function applyToTargets(targetslist, dototargets, obj, dotoself, dotonext) {
		if (!targetslist) return;
		if (!dototargets) return;

		targetslist = targetslist.split(",");

		for (var n = 0; n < targetslist.length; n++) {
			targetslist[n] = targetslist[n].trim();

			if (
				(targetslist[n] == "this" || targetslist[n] == "self") &&
				obj &&
				dotoself
			)
				dotoself(obj);
			if (targetslist[n] == "next" && obj && dotonext)
				dotonext(obj.nextElementSibling);
			else {
				var elems = document.querySelectorAll(targetslist[n]);
				if (elems.length > 0) {
					for (var m = 0; m < elems.length; m++) {
						dototargets(elems[m]);
					}
				}
			}
		}
	}

	var clickToggle = document.querySelectorAll("[data-toggle-class]");

	if (clickToggle.length > 0) {
		for (var i = 0; i < clickToggle.length; i++) {
			clickToggle[i].addEventListener("click", function (e) {
				e.preventDefault();

				var classes = this.getAttribute("data-toggle-class");
				if (!classes) return;

				classes = classes.split(",");
				for (var n = 0; n < classes.length; n++) classes[n] = classes[n].trim();

				var targets = this.getAttribute("data-toggle-target");

				if (!targets) toggleClasses(classes, this);
				//for(var n=0; n<classes.length; n++)  this.classList.toggle(classes[n]);
				else {
					applyToTargets(
						targets,
						function (elem) {
							toggleClasses(classes, elem);
						},
						this,
						function (elem) {
							toggleClasses(classes, elem);
						},
						function (elem) {
							toggleClasses(classes, elem);
						}
					);
				}
			});
		}
	}
})();
