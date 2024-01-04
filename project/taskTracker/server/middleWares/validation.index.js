import { body, validationResult } from 'express-validator';


function loginValidation() {
    return [
        body('Email').notEmpty(),
        body('password').notEmpty()
    ]
}

function loginValidationError(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next()
    }

    res.send({ errors: result.array() });
}

export {
    loginValidation,
    loginValidationError
}

