const User = require("../model/User");
const { RegisterValidation } = require("../config/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    // Checking in the user is already in the database
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        return res.status(400).json({ message: "email already exists" });
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
            message: `Hello ${FirstName}!, Welcome to WANDERLUST`,
            savedUser,
        });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};
exports.login = async (req, res) => {
    let { email, password } = req.body;

    // Checking in the email exists
    const user = await User.findOne({ email });
    if (!user)
        return res.status(400).json({ message: "email or password is wrong" });

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
        return res.status(400).json({ message: "Invalid password" });

    // Create and assign a token

    const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
    });
    req.header("jwt", token);
    res.status(201).json({
        status: 200,
        token: token,
        id: user._id,
        message: `WELCOME ${user.FirstName} !`,
    });
    
};
