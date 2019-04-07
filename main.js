function Agile() {
	this.backlog = [];
}

Agile.prototype.addTask = function(task){
	this.backlog.push(task);
	var item = document.createElement('div');
	item.classList.add('task');
	item.classList.add('task__hidden');
	item.innerHTML = `<h3 class="task__title">${task.title}</h3><p class="task__difficulty">Сложность:</p><p class="task__storypoints">${task.storyPoints}</p>`;
	backlogItemsWrapper.appendChild(item);
	setTimeout(function(){item.classList.remove('task__hidden');}, 20);
};

Agile.prototype.addUrgentTask = function(task){
	this.backlog.unshift(task);
};

Agile.prototype.getSprint = function(storyPoints){
	var sprint = [];
	var max = +storyPoints;
	var backlogTasks = backlogItemsWrapper.querySelectorAll('.task');
	this.backlog = this.backlog.reduce((acc,item,i) => {
		if(item.storyPoints <= max){
			sprint.push(item);
			max -= item.storyPoints;
			console.log(backlogTasks);
			backlogTasks[i].classList.add('task__hidden');
			setTimeout(function(){sprintItemsWrapper.appendChild(backlogTasks[i])}, 400);
			setTimeout(function(){backlogTasks[i].classList.remove('task__hidden')}, 500);
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








