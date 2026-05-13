const express =
    require("express");

const Task =
    require("../models/Task");

const authMiddleware =
    require("../middleware/authMiddleware");

const router =
    express.Router();

/* =========================
   CREATE TASK
========================= */

router.post(
    "/",
    authMiddleware,
    async(req, res) => {

        try {

            const task =
                new Task({

                    ...req.body,

                    userId: req.user.id
                });

            await task.save();

            res.json(task);

        } catch (err) {

            res.status(500)
                .json({

                    message: err.message
                });
        }
    });

/* =========================
   GET TASKS
========================= */

router.get(
    "/",
    authMiddleware,
    async(req, res) => {

        try {

            const tasks =
                await Task.find({

                    userId: req.user.id
                });

            res.json(tasks);

        } catch (err) {

            res.status(500)
                .json({

                    message: err.message
                });
        }
    });

/* =========================
   UPDATE TASK
========================= */

router.put(
    "/:id",
    authMiddleware,
    async(req, res) => {

        try {

            const updatedTask =
                await Task.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    { new: true }
                );

            res.json(updatedTask);

        } catch (err) {

            res.status(500)
                .json({

                    message: err.message
                });
        }
    });

/* =========================
   DELETE TASK
========================= */

router.delete(
    "/:id",
    authMiddleware,
    async(req, res) => {

        try {

            await Task.findByIdAndDelete(
                req.params.id
            );

            res.json({

                message: "Task deleted"
            });

        } catch (err) {

            res.status(500)
                .json({

                    message: err.message
                });
        }
    });

module.exports = router;