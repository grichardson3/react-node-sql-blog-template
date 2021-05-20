// ADD_POST
export const addPost = (
    {
        // Default Value
        post_id = 0,
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
        post_author,
        post_featurephoto,
        post_title,
        post_date,
        post_views,
        post_content,
        post_tag
    }
});