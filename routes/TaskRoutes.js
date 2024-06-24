const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const { verifyAccessToken } = require("../helpers/jwtHelper");
const {
  addTask,
  updateTask,
  getTask,
  deleteTask,
} = require("../helpers/validationSchemas/taskValidationSchema");

router.post("/", verifyAccessToken, async (req, res, next) => {
  try {
    const user = req?.user;

    if (!user) {
      throw createError.NotFound("Please check the authentication token!");
    }

    await addTask.validateAsync(req.body);

    let newTaskInDB = await global?.models?.TASK?.create({
      ...req?.body,
      userId: new mongoose.Types.ObjectId(user?._id),
    });

    return res?.status(200)?.json({
      payload: {
        newTask: newTaskInDB,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.patch("/", verifyAccessToken, async (req, res, next) => {
  try {
    const user = req?.user;

    if (!user) {
      throw createError.NotFound("Please check the authentication token!");
    }

    await updateTask.query.validateAsync(req.query);
    await updateTask.body.validateAsync(req.body);

    const updatedTaskInDB = await global?.models?.TASK?.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(req?.query?.taskId),
        userId: new mongoose.Types.ObjectId(user?._id),
      },
      {
        ...req.body,
      },
      {
        new: true,
        runValidator: true,
      }
    );

    if (updatedTaskInDB === null) {
      throw createError.NotFound("No task was found to update!");
    } else {
      if (updatedTaskInDB?._id) {
        return res?.status(200).json({
          payload: {
            updatedTask: updatedTaskInDB?._doc,
          },
        });
      } else {
        throw createError.InternalServerError("Some error occured!");
      }
    }
  } catch (err) {
    next(err);
  }
});

router.get("/all", verifyAccessToken, async (req, res, next) => {
  try {
    const user = req?.user;

    if (!user) {
      throw createError.NotFound("Please check the authentication token!");
    }

    // await getTask.validateAsync(req.query);

    const fetchedTaskFromDB = await global?.models?.TASK?.find({
      userId: new mongoose.Types.ObjectId(user?._id),
    });

    return res?.status(200).json({
      payload: {
        tasks: fetchedTaskFromDB,
      },
    });
  } catch (err) {
    next(err);
  }
});
router.get("/", verifyAccessToken, async (req, res, next) => {
  try {
    const user = req?.user;

    if (!user) {
      throw createError.NotFound("Please check the authentication token!");
    }

    await getTask.validateAsync(req.query);

    const fetchedTaskFromDB = await global?.models?.TASK?.findOne({
      _id: new mongoose.Types.ObjectId(req?.query?.taskId),
      userId: new mongoose.Types.ObjectId(user?._id),
    });

    if (fetchedTaskFromDB === null) {
      throw createError.NotFound("No task was found!");
    } else {
      if (fetchedTaskFromDB?._id) {
        return res?.status(200).json({
          payload: {
            task: fetchedTaskFromDB?._doc,
          },
        });
      } else {
        throw createError.InternalServerError("Some error occured!");
      }
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/", verifyAccessToken, async (req, res, next) => {
  try {
    const user = req?.user;

    if (!user) {
      throw createError.NotFound("Please check the authentication token!");
    }

    await deleteTask.validateAsync(req.query);

    const deletedTaskFromDB = await global?.models?.TASK?.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(req?.query?.taskId),
      userId: new mongoose.Types.ObjectId(user?._id),
    });

    if (deletedTaskFromDB === null) {
      throw createError.NotFound("No task was found to delete!");
    } else {
      if (deletedTaskFromDB?._id) {
        return res?.status(200).json({
          message: "Task deleted!",
        });
      } else {
        throw createError.InternalServerError("Some error occured!");
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = {
  TaskRoutes: router,
};
