// ADD_AUTHOR
export const addAuthor = (
    {
    // Default Value
      users_id = 0,
      users_profilepic = '',
      users_username = '',
      users_firstname = '',
      users_lastname = '',
      users_bio = '',
      users_facebook = '',
      users_twitter = '',
      users_linkedin = '',
      users_postamount = 0
    } = {}
  ) => ({
    type: 'ADD_AUTHOR',
    author: {
        // Actual Value
        users_id,
        users_profilepic,
        users_username,
        users_firstname,
        users_lastname,
        users_bio,
        users_facebook,
        users_twitter,
        users_linkedin,
        users_postamount
    }
});