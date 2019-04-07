function Agile() {
	this.backlog = [];
}

Agile.prototype.addTask = function(task){
	this.backlog.push(task);
	var item = document.createElement('div');
	item.classList.add('backlog__item');
	item.innerHTML = `<h3 class="backlog__item-title">${task.title}</h3><p class="backlog__item-difficulty">Сложность:</p><p class="backlog__item-points">${task.storyPoints}</p>`;
	backlogItemsWrapper.appendChild(item);
};

Agile.prototype.addUrgentTask = function(task){
	this.backlog.unshift(task);
};

Agile.prototype.getSprint = function(storyPoints){
	var sprint = [];
	var max = +storyPoints;
	var backlogTasks = backlogItemsWrapper.querySelectorAll('.backlog__item');
	this.backlog = this.backlog.reduce((acc,item,i) => {
		if(item.storyPoints <= max){
			sprint.push(item);
			max -= item.storyPoints;
			sprintItemsWrapper.appendChild(backlogTasks[i]);
		}
		else{
			acc.push(item);
		}
		return acc;
	}, []);
			
	return sprint;
}

function Task(title, storyPoints) {
	this.title = title;
	this.storyPoints = storyPoints;
}

var agile = new Agile;



var backlogItemsWrapper = document.querySelector('.backlog__items-wrapper');
var sprintItemsWrapper = document.querySelector('.sprint__items-wrapper');

if(agile.backlog.length = 0){
	backlogItemsWrapper.innerHTML = '';
}



var addTaskButton = document.querySelector('.addtask__button');
var taskTitleInput = document.querySelector('.addtask__input[name="task-name"]');
var taskStoryPoints = document.querySelector('.addtask__input[name="task-storypoints"]');

addTaskButton.addEventListener('click', event => {
	event.preventDefault();
	
	if(!taskTitleInput.value || !taskStoryPoints.value){
		return;
	}
	agile.addTask(new Task(taskTitleInput.value, taskStoryPoints.value));
	taskTitleInput.value = '';
	taskStoryPoints.value = '';
});


var getSprintButton = document.querySelector('.sprint__button');
var getSprintStoryPoints = document.querySelector('.addtask__input[name="sprint-storypoints"]');


getSprintButton.addEventListener('click', event => {
	event.preventDefault();
	if(!getSprintStoryPoints.value){
		return;
	}
	agile.getSprint(getSprintStoryPoints.value);
	getSprintStoryPoints.value = '';
});








