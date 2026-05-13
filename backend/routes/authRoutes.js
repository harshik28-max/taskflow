const express =
    require("express");

const bcrypt =
    require("bcryptjs");

const jwt =
    require("jsonwebtoken");

const User =
    require("../models/User");

const authMiddleware =
    require("../middleware/authMiddleware");

const router =
    express.Router();

/* =========================
   REGISTER
========================= */

router.post(
    "/register",
    async(req, res) => {

        try {

            const existingUser =
                await User.findOne({

                    email: req.body.email
                });

            if (existingUser) {

                return res.status(400)
                    .json({

                        message: "User already exists"
                    });
            }

            const hashedPassword =
                await bcrypt.hash(

                    req.body.password,

                    10
                );

            const user =
                new User({

                    ...req.body,

                    password: hashedPassword
                });

            await user.save();

            const token =
                jwt.sign({

                    id: user._id

                }, process.env.JWT_SECRET);

            res.json({

                token,

                user
            });

        } catch (err) {

            res.status(500)
                .json({

                    message: err.message
                });
        }
    });

/* =========================
   LOGIN
========================= */

router.post(
    "/login",
    async(req, res) => {

        try {

            const user =
                await User.findOne({

                    email: req.body.email
                });

            if (!user) {

                return res.status(400)
                    .json({

                        message: "User not found"
                    });
            }

            const validPassword =
                await bcrypt.compare(

                    req.body.password,

                    user.password
                );

            if (!validPassword) {

                return res.status(400)
                    .json({

                        message: "Invalid password"
                    });
            }

            const token =
                jwt.sign({

                    id: user._id

                }, process.env.JWT_SECRET);

            res.json({

                token,

                user
            });

        } catch (err) {

            res.status(500)
                .json({

                    message: err.message
                });
        }
    });

/* =========================
   PROFILE
========================= */

router.get(
    "/profile",
    authMiddleware,
    async(req, res) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                );

            res.json(user);

        } catch (err) {

            res.status(500)
                .json({

                    message: err.message
                });
        }
    });

module.exports = router;