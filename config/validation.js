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
    return result;
};
const NewPasswordValidation = (data) => {
    const schema = Joi.object({
        oldPassword: Joi.string()
            .min(8)
            .required()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        newpassword: Joi.string()
            .min(8)
            .required()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        repeat_newpassword: Joi.any()
            .equal(Joi.ref("newpassword"))
            .required()
            .label("Confirm password")
            .options({
                messages: { "any.only": "Confirm password does not match" },
            }),
    });
    const result = schema.validate(data);
    return result;
};
const NewFirstNameValidation = (data) => {
    const schema = Joi.object({
        FirstName: Joi.string().required().messages({
            "string.empty": "First Name cannot be an empty field",
            "string.base": "First Name should be a type of text",
            "any.required": "First Name is a required field",
        }),
    });
    const result = schema.validate(data);
    return result;
};
const NewEmailValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email().messages({
            "string.empty": "email cannot be an empty field",
            "string.email": "email must be a valid email",
            "any.required": "email is a required field",
        }),
    });
    const result = schema.validate(data);
    return result;
};
const InfosValidation = (data) => {
    console.log("validation/data", data)
    const schema = Joi.object({
        Country: Joi.string().required().messages({
            "string.empty": "Country cannot be an empty field",
            "any.required": "Country is a required field",
        }),
        PhoneNumber: Joi.string().min(6).required().messages({
            "string.empty": "PhoneNumber cannot be an empty field",
            "any.required": "PhoneNumber is a required field",
        }),
        Languages: Joi.string().required().messages({
            "string.empty": "Languages cannot be an empty field",
            "any.required": "Languages is a required field",
        }),
    });
    const result = schema.validate(data);
    return result;
};

module.exports.RegisterValidation = RegisterValidation;
module.exports.NewPasswordValidation = NewPasswordValidation;
module.exports.NewFirstNameValidation = NewFirstNameValidation;
module.exports.NewEmailValidation = NewEmailValidation;
module.exports.InfosValidation = InfosValidation;
