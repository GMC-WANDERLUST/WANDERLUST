// Validation
const Joi = require("joi");

// Register Validation
const RegisterValidation = (data) => {
    const schema = Joi.object({
        FirstName: Joi.string().required().messages({
            "string.empty": "First Name cannot be an empty field",
            "string.base": "First Name should be a type of text",
            "any.required": "First Name is a required field",
        }),
        LastName: Joi.string().required().messages({
            "string.empty": "Last Name cannot be an empty field",
            "string.base": "Last Name should be a type of text",
            "any.required": "Last Name is a required field",
        }),
        DayOfBirth: Joi.string().required(),
        MonthOfBirth: Joi.string().required(),
        YearOfBirth: Joi.string().required().messages({
            "string.empty": "Year cannot be an empty field",
            "any.required": "Year is a required field",
        }),
        email: Joi.string().min(6).required().email().messages({
            "string.empty": "email cannot be an empty field",
            "string.email": "email must be a valid email",
            "any.required": "email is a required field",
        }),
        password: Joi.string()
            .min(8)
            .required()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        repeat_password: Joi.any()
            .equal(Joi.ref("password"))
            .required()
            .label("Confirm password")
            .options({
                messages: { "any.only": "Confirm password does not match" },
            }),
    });
    const result = schema.validate(data);
    // console.log("result", result);
    return result;
};
// const LoginValidation = (data) => {
//     const schema = Joi.object({
//         email: Joi.string().min(6).required().email(),
//         password: Joi.string()
//             .min(8)
//             .required()
//             .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
//     });
//     return  schema.validate(data);
// };

module.exports.RegisterValidation = RegisterValidation;
// module.exports.LoginValidation = LoginValidation;
