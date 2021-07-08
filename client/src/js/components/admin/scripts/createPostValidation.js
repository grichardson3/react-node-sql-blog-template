import validator from 'validator';

const createPostValidation = (data) => {
    let statusArray = []

    if (
        !(
            validator.isLength(data.post_title, {min: 1})
            && validator.isLength(data.post_content, {min: 1})
        )
    ) {
        const status = "One or more required fields are empty.";
        statusArray.push(status);
    }

    if (
        !(
            validator.isLength(data.post_title, {max: 256})
        )
    ) {
        const status = "Your post title contains too many characters (Max: 256).";
        statusArray.push(status);
    }

    if (
        !(
            validator.isLength(data.post_featurephoto, {max: 16777215})
        )
    ) {
        const status = "Your photo file size is too large.";
        statusArray.push(status);
    }

    if (
        !(
            validator.isLength(data.post_tag, {max: 50})
        )
    ) {
        const status = "Your post tag contains too many characters (Max: 50).";
        statusArray.push(status);
    }

    if (
        !(
            validator.isLength(data.post_content, {max: 4096})
        )
    ) {
        const status = "Your post content contains too many characters (Max: 4096).";
        statusArray.push(status);
    }

    return statusArray;
}

export default createPostValidation;