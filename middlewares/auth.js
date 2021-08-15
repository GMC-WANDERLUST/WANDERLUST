const User = require("../model/User");
const { RegisterValidation } = require("../config/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserInfos = require("../model/UserInfos");

exports.register = async (req, res) => {
    let {
        FirstName,
        LastName,
        DayOfBirth,
        MonthOfBirth,
        YearOfBirth,
        email,
        password,
    } = req.body;
    // Validate the data defore making the user

    const { error } = RegisterValidation(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });

    // Checking if the user is already in the database
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        return res
            .status(400)
            .json({ message: "Email already exists! Please check again" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
        FirstName,
        LastName,
        DayOfBirth,
        MonthOfBirth,
        YearOfBirth,
        email,
        password: hashedPassword,
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json({
            message: `Hello ${FirstName} ${LastName}!, Welcome to WANDERLUST`,
            savedUser,
        });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};
exports.login = async (req, res) => {
    // let TOKEN_SECRET = aefbkjufekigveieivgeniveikonvefnoi;
    let { email, password } = req.body;

    // Checking if the email exists
    const user = await User.findOne({ email });
    if (!user)
        return res.status(400).json({
            message: "Email is wrong! Please check again",
        });

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
        return res
            .status(400)
            .json({ message: "Invalid password, please check again" });

    // Create and assign a token
    // let secretTOKEN = "aefbkjufekigveieivgeniveikonvefnoi";
    // const TOKEN_SECRET=
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            password: user.password,
            isReported: user.isReported,
        },
        "aefbkjufekigveieivgeniveikonvefnoi",
        {
            expiresIn: "1d",
        }
    );
    let id = user._id;
    let registeredUser = await UserInfos.findOne({ user: id });
    let check;
    {
        registeredUser ? (check = registeredUser._id) : (check = null);
    }
    req.header("jwt", token);
    res.status(201).json({
        status: 200,
        token: token,
        id,
        isHost: user.isHost,
        check,
        isAdmin: user.isAdmin,
        msg: `WELCOME ${user.FirstName}! HAVE A NICE TIME `,
        message: `HI ${user.FirstName}! GOOD TO SEE YOU AGAIN`,
    });
};
