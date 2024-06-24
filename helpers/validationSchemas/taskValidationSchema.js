const joi = require("joi");

const addTask = joi.object({
	title: joi.string().min(1).required(),
	description: joi.string().min(1).required()
});

const updateTask = {
	body: joi.object({
		title: joi.string().min(1),
		description: joi.string().min(1)
	}),
	query: joi.object({
		taskId: joi.string().min(20).required(),
	})
};

const getTask = joi.object({
	taskId: joi.string().min(20).required(),
});

const deleteTask = joi.object({
	taskId: joi.string().min(20).required(),
});

module.exports = {
	addTask,
	updateTask,
	getTask,
	deleteTask
}
