import validator from 'validator';

const createProfileValidation = (data, props) => {
    let statusArray = []

    if (
        !(
            validator.isLength(data.users_firstname, {min: 1})
            && validator.isLength(data.users_lastname, {min: 1})
            && validator.isLength(data.users_email, {min: 1})
            && validator.isLength(data.users_username, {min: 1})
            && validator.isLength(data.users_password, {min: 1})
            && validator.isLength(data.users_confirmpassword, {min: 1})
        )
    ) {
        const status = "One or more required fields are empty.";
        statusArray.push(status);
    }

    if (
        !(
            validator.isLength(data.users_firstname, {max: 24})
        )
    ) {
        const status = "Your first name contains too many characters (Max: 24).";
        statusArray.push(status);
    }

    if (
        !(
            validator.isLength(data.users_lastname, {max: 24})
        )
    ) {
        const status = "Your last name contains too many characters (Max: 24).";
        statusArray.push(status);
    }

    if (
        !(
            validator.isLength(data.users_email, {max: 100})
        )
    ) {
        const status = "Your e-mail name contains too many characters (Max: 100).";
        statusArray.push(status);
    }

    if (
        !(
            validator.isLength(data.users_username, {min: 8, max: 24})
        )
    ) {
        const status = "Your username name contains too little or too many characters (Min: 8, Max: 24).";
        statusArray.push(status);
    }

    props.users.forEach((user) => {
        if (user.users_email.toLowerCase() === data.users_email.toLowerCase()) {
            const status = "The e-mail you inputted already exists in our database.";
            statusArray.push(status);
        }
    })
    
    if (!(validator.isEmail(data.users_email))) {
        const status = "The e-mail you inputted is not a valid e-mail.";
        statusArray.push(status);
    }

    props.users.forEach((user) => {
        if (user.users_username.toLowerCase() === data.users_username.toLowerCase()) {
            const status = "The username you inputted already exists in our database.";
            statusArray.push(status);
        }
    })
    
    if (
        !(validator.isLength(data.users_username, {min: 8, max: 24}))
    ) {
        const status = "The username you inputted must have a minimum amount of 8 characters and a maximum amount of 24 characters.";
        statusArray.push(status);
    }

    if (
        // eslint-disable-next-line
        /[\[\\\^\$\.\|\?\*\+\(\)\{\}]/.test(data.users_username) // Finds special characters in username input
    ) {
        const status = "The username you inputted must not contain special characters.";
        statusArray.push(status);
    }

    if (data.users_password !== data.users_confirmpassword) {
        const status = "The password confirmation does not match the original password you inputted.";
        statusArray.push(status);
    }

    if (
        !(validator.isStrongPassword(data.users_password))
    ) {
        const status = "The password you inputted isn't a strong enough password. Your password must contain at least a minimum of 8 characters, a minimum of one uppercase character, a minimum of one lowercase character, a minimum of one numeric character and a minimum of one special character.";
        statusArray.push(status);
    }

    // Facebook URL Validation
    if (!(validator.isEmpty(data.users_facebook))) {
        if (
            !(
                // eslint-disable-next-line
                /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/.test(data.users_facebook)
            )
        ) {
            const status = "The facebook profile URL you inputted is not a valid Facebook URL.";
            statusArray.push(status);
        }
    }

    if (!(validator.isEmpty(data.users_twitter))) {
        if (
            !(
                // eslint-disable-next-line
                /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/.test(data.users_twitter)
            )
        ) {
            const status = "The Twitter profile URL you inputted is not a valid Twitter URL.";
            statusArray.push(status);
        }
    }

    if (!(validator.isEmpty(data.users_linkedin))) {
        if (
            !(
                // eslint-disable-next-line
                /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/.test(data.users_linkedin)
            )
        ) {
            const status = "The LinkedIn profile URL you inputted is not a valid LinkedIn URL.";
            statusArray.push(status);
        }
    }

    if (!(validator.isEmpty(data.users_profilepic))) {
        if (
            !(
                /(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(data.user_profilepic)
            )
        ) {
            const status = "The image URL you inputted is not a valid image URL or image format. Supported image formats are .jpg, .jpeg and .png";
            statusArray.push(status);
        }
    }
    
    return statusArray;
}

export default createProfileValidation;