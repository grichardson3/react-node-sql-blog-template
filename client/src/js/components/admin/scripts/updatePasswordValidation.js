import validator from 'validator';

const updatePasswordValidation = (data) => {
    let statusArray = [];

    if (
        validator.isEmpty(data.password)
        && validator.isEmpty(data.confirmPassword)
    ) {
        const status = "One or more required fields are empty.";
        statusArray.push(status);
    }

    if (
        !(validator.isStrongPassword(data.password))
    ) {
        const status = "The password you inputted isn't a strong enough password. Your password must contain at least a minimum of 8 characters, a minimum of one uppercase character, a minimum of one lowercase character, a minimum of one numeric character and a minimum of one special character.";
        statusArray.push(status);
    }

    return statusArray;
}

export default updatePasswordValidation;