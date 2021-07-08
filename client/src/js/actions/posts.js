// ADD_POST
export const addPost = (
    {
        // Default Value
        post_id = 0,
        post_dbid,
        post_author = '',
        post_featurephoto = '',
        post_title = '',
        post_date = 0,
        post_views = 0,
        post_content = '',
        post_tag = ''
    } = {}
  ) => ({
    type: 'ADD_POST',
    post: {
        // Actual Value
        post_id,
        post_dbid,
        post_author,
        post_featurephoto,
        post_title,
        post_date,
        post_views,
        post_content,
        post_tag
    }
});

// REMOVE_POST
export const removePost = ({ post_id } = {}) => ({
    type: 'REMOVE_POST',
    post_id
});

// EDIT_POST
export const editPost = (post_id, data) => ({
    type: 'EDIT_POST',
    post_id,
    data
})

// EDIT_POST
export const editPostUsername = (post_id, dataTwo) => ({
    type: 'EDIT_POST_USERNAME',
    post_id,
    dataTwo
})
