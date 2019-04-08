var backlogItemsWrapper = document.querySelector('.backlog__items-wrapper');
var sprintItemsWrapper = document.querySelector('.sprint__items-wrapper');
var addTaskButton = document.querySelector('.addtask__button');
var taskTitleInput = document.querySelector('.addtask__input[name="task-name"]');
var taskStoryPoints = document.querySelector('.addtask__input[name="task-storypoints"]');
var getSprintButton = document.querySelector('.sprint__button');
var getSprintStoryPoints = document.querySelector('.addtask__input[name="sprint-storypoints"]');

function Agile() {
	this.backlog = [];
	this.sprint = [];
}

Agile.prototype.addTask = function(task){
	this.backlog.push(task);
	displayTask(task, backlogItemsWrapper);
	saveToLocalStorage(this.backlog, 'backlogLocal');	
};

Agile.prototype.addUrgentTask = function(task){
	this.backlog.unshift(task);
};

Agile.prototype.getSprint = function(storyPoints){
	this.sprint = [];
	var max = +storyPoints;
	sprintItemsWrapper.childNodes.forEach(item => item.classList.add('task__hidden'));
	setTimeout(function(){
		sprintItemsWrapper.innerHTML = '';
	}, 400);
	this.backlog = this.backlog.reduce((acc,item,i) => {
		if(item.storyPoints <= max){
			this.sprint.push(item);
			max -= item.storyPoints;
			taskToSprint(i);
		}
		else{
			acc.push(item);
		}
		return acc;
	}, []);
	saveToLocalStorage(this.backlog, 'backlogLocal');
	saveToLocalStorage(this.sprint, 'sprintLocal');
	return this.sprint;
}

function Task(title, storyPoints) {
	this.title = title;
	this.storyPoints = storyPoints;
}

var agile = new Agile;
agile.backlog = JSON.parse(localStorage.getItem('backlogLocal')) || [];
if(agile.backlog.length > 0){
	agile.backlog.forEach(item => displayTask(item, backlogItemsWrapper));
}
agile.sprint = JSON.parse(localStorage.getItem('sprintLocal')) || [];
if(agile.sprint.length > 0){
	agile.sprint.forEach(item => displayTask(item, sprintItemsWrapper));
}

function displayTask(task, destination){
	var item = document.createElement('div');
	item.classList.add('task');
	item.classList.add('task__hidden');
	item.innerHTML = `<h3 class="task__title">${task.title}</h3><p class="task__difficulty">Сложность:</p><p class="task__storypoints">${task.storyPoints}</p><button class="task__remove"></button>`;
	destination.appendChild(item);
	setTimeout(function(){
		item.classList.remove('task__hidden');
	}, 20);
}

function taskToSprint(i){
	var backlogTasks = backlogItemsWrapper.querySelectorAll('.task');
	backlogTasks[i].classList.add('task__hidden');
	setTimeout(function(){
		sprintItemsWrapper.appendChild(backlogTasks[i]);
	}, 400);
	setTimeout(function(){
		backlogTasks[i].classList.remove('task__hidden');
	}, 500);
}

function saveToLocalStorage(item, name){
	var itemJson = JSON.stringify(item);
	localStorage.setItem(name, itemJson);
}

addTaskButton.addEventListener('click', event => {
	event.preventDefault();
	
	if(!taskTitleInput.value || !taskStoryPoints.value){
		return;
	}
	agile.addTask(new Task(taskTitleInput.value, taskStoryPoints.value));
	taskTitleInput.value = '';
	taskStoryPoints.value = '';
});

getSprintButton.addEventListener('click', event => {
	event.preventDefault();
	if(!getSprintStoryPoints.value){
		return;
	}
	agile.getSprint(getSprintStoryPoints.value);
	getSprintStoryPoints.value = '';
});

backlogItemsWrapper.addEventListener('click', event => {
	if(!event.target.classList.contains('task__remove')){
		return;
	}
	var backlogTasks = backlogItemsWrapper.querySelectorAll('.task');
	agile.backlog.splice(Array.prototype.indexOf.call(backlogTasks, event.target.parentNode), 1);
	event.target.parentNode.classList.add('task__hidden');
	setTimeout(function(){
		backlogItemsWrapper.removeChild(event.target.parentNode);
	}, 400);
	saveToLocalStorage(agile.backlog, 'backlogLocal');
});

sprintItemsWrapper.addEventListener('click', event => {
	if(!event.target.classList.contains('task__remove')){
		return;
	}
	var sprintTasks = sprintItemsWrapper.querySelectorAll('.task');
	agile.sprint.splice(Array.prototype.indexOf.call(sprintTasks, event.target.parentNode), 1);
	event.target.parentNode.classList.add('task__hidden');
	setTimeout(function(){
		sprintItemsWrapper.removeChild(event.target.parentNode);
	}, 400);
	saveToLocalStorage(agile.sprint, 'sprintLocal');
});


