import { body, validationResult } from "express-validator";

export const validateUser = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    (req, res, next) => { //this runs after all validations are checked above and returns an array of errors
        const errors = validationResult(req) //collects all validation errors by express-validator and stores them in a variable called errors

        if (!errors.isEmpty()) { //checks if no errors are found
            return res.status(400).json({ success: false, errors: errors.array() })
        } else {
            next()

        }
    }
]