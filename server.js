const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(express.json({limit: '25mb'}));
app.use(cors({ origin: '*' }));
app.options('*', cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const connection = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'mern-blog'
});

// API Call Variables
const SELECT_ALL_USERS = 'SELECT * FROM tbl_users';
const SELECT_ALL_POSTS = 'SELECT * FROM tbl_posts ORDER BY post_date DESC'; // In Desc order for landing page posts
const SELECT_THEME = 'SELECT * FROM tbl_theme';
const SELECT_TAGS_FROM_POSTS = 'SELECT DISTINCT post_tag FROM tbl_posts';

app.get('/', (req, res) => {
 res.json("OK");
});

app.get('/users', (req, res) => {
  connection.query(SELECT_ALL_USERS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

app.get('/posts', (req, res) => {
  connection.query(SELECT_ALL_POSTS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

app.get('/theme', (req, res) => {
  connection.query(SELECT_THEME, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

app.get('/singleUser/:id', (req, res) => {
  const SELECT_USER_SESSIONKEY = `SELECT users_sessionKey, users_username FROM tbl_users WHERE users_email = "${req.params.id}" OR users_username = "${req.params.id}";`;
  connection.query(SELECT_USER_SESSIONKEY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      console.log(results);
      return res.json(results);
    }
  });
});

app.post('/setSessionKey', (req, res) => {
  const INSERT_SESSION_KEY = `UPDATE tbl_users SET users_sessionKey = "${req.body.sessionKey}" WHERE users_email = "${req.body.usernameOrEmail}" OR users_username = "${req.body.usernameOrEmail}";`;
  connection.query(INSERT_SESSION_KEY, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('added session key successfully');
    }
  });
});

app.post('/loadMorePosts', (req, res) => {
  const { postsLength } = req.body;
  const LOAD_MORE_POSTS = `SELECT * FROM tbl_posts LIMIT ${postsLength}, 3`
  connection.query(LOAD_MORE_POSTS, (err, results) => {
    return res.json(results);
  });
});

app.get('/tagsFromPosts', (req, res) => {
  connection.query(SELECT_TAGS_FROM_POSTS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

app.get('/totalPostAmount', (req, res) => {
  const SELECT_TOTAL_POST_AMOUNT = `SELECT theme_postAmount FROM tbl_theme WHERE theme_id = 0`;
  connection.query(SELECT_TOTAL_POST_AMOUNT, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  })
})

app.get('/totalUserAmount', (req, res) => {
  const SELECT_TOTAL_POST_AMOUNT = `SELECT theme_userAmount FROM tbl_theme WHERE theme_id = 0`;
  connection.query(SELECT_TOTAL_POST_AMOUNT, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  })
})

app.post('/checkUser', (req, res) => {
  const {user} = req.body;
  const CHECK_USER = `SELECT users_username, users_postamount FROM tbl_users WHERE users_username = '${user}'`;
  connection.query(CHECK_USER, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  })
})

app.put('/getTagPostAmount', (req, res) => {
  const { tag } = req.body;
  const GET_TAG_POST_AMOUNT = `SELECT COUNT(post_tag) FROM tbl_posts WHERE post_tag = '${tag}'`;
  connection.query(GET_TAG_POST_AMOUNT, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      Object.keys(results)[0];
      let key = Object.keys(results)[0];
      let returnStatement = JSON.stringify(results[key]).split("")[JSON.stringify(results[key]).split("").length - 2]
      return res.json(returnStatement);
    }
  })
})

// DashboardCreatePost.js
app.get('/incrementTotalPostAmount', (req, res) => {
  const DECREMENT_TOTAL_POST_AMOUNT = `UPDATE tbl_theme SET theme_postAmount = theme_postAmount + 1 WHERE theme_id = 0;`;
  connection.query(DECREMENT_TOTAL_POST_AMOUNT, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  })
})

// DashboardViewPosts.js
app.get('/decrementTotalPostAmount', (req, res) => {
  const DECREMENT_TOTAL_POST_AMOUNT = `UPDATE tbl_theme SET theme_postAmount = theme_postAmount - 1 WHERE theme_id = 0;`;
  connection.query(DECREMENT_TOTAL_POST_AMOUNT, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  })
})

// incrementUserPostAmount
app.put('/incrementUserPostAmount', (req, res) => {
  const DECREMENT_USER_POST_AMOUNT = `UPDATE tbl_users SET users_postamount = users_postamount + 1 WHERE users_email = '${req.body.id}';`;
  connection.query(DECREMENT_USER_POST_AMOUNT, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  })
})

app.put('/decrementUserPostAmount', (req, res) => {
  const DECREMENT_USER_POST_AMOUNT = `UPDATE tbl_users SET users_postamount = users_postamount - 1 WHERE users_username = '${req.body[0].post_author}';`;
  connection.query(DECREMENT_USER_POST_AMOUNT, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  })
})

// DashboardCreateProfile.js
app.get('/incrementTotalUserAmount', (req, res) => {
  const DECREMENT_TOTAL_POST_AMOUNT = `UPDATE tbl_theme SET theme_userAmount = theme_userAmount + 1 WHERE theme_id = 0;`;
  connection.query(DECREMENT_TOTAL_POST_AMOUNT, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  })
})

// DashboardViewProfiles.js
app.get('/decrementTotalUserAmount', (req, res) => {
  const DECREMENT_TOTAL_POST_AMOUNT = `UPDATE tbl_theme SET theme_userAmount = theme_userAmount - 1 WHERE theme_id = 0;`;
  connection.query(DECREMENT_TOTAL_POST_AMOUNT, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  })
})

app.post('/addUser', (req, res)=>{
  const { users_firstname, users_lastname, users_email, users_username, users_password, users_facebook, users_twitter, users_linkedin, users_profilepic, users_bio } = req.body;
  const INSERT_PERSON = `INSERT INTO tbl_users (users_firstname, users_lastname, users_email, users_username, users_password, users_facebook, users_twitter, users_linkedin, users_profilepic, users_bio) VALUES ("${users_firstname}", "${users_lastname}", "${users_email}", "${users_username}", "${users_password}", "${users_facebook}", "${users_twitter}", "${users_linkedin}", "${users_profilepic}", "${users_bio}");`;
  connection.query(INSERT_PERSON, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('added persons successfully');
    }
  });
});

app.post('/addPost', (req, res)=>{
  const { post_author, post_date, post_featurephoto, post_title, post_content, post_tag } = req.body;
  const INSERT_POST = `INSERT INTO tbl_posts (post_author, post_date, post_featurephoto, post_title, post_content, post_tag) VALUES ("${post_author}", "${post_date}", "${post_featurephoto}", "${post_title}", "${post_content}", "${post_tag}");`;
  connection.query(INSERT_POST, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('added persons successfully');
    }
  });
});

app.put('/addPostView', (req, res) => {
  const ADD_POST_VIEW = `UPDATE tbl_posts SET post_views = "${req.body.postViews.post_views + 1}" WHERE post_id = "${req.body.postViews.post_dbid}";`;
  connection.query(ADD_POST_VIEW, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('updated post count');
    }
  });
});

app.put('/updatePassword', (req, res) => {
  console.log(req.body.id);
  const UPDATE_PASSWORD = `UPDATE tbl_users SET users_password = "${req.body.password}" WHERE users_id = "${req.body.id}";`;
  connection.query(UPDATE_PASSWORD, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('updated password');
    }
  });
});

app.put('/savePost', (req, res) => {
  const { post_id, post_featurephoto, post_title, post_content, post_tag } = req.body;
  const UPDATE_POST = `UPDATE tbl_posts SET post_featurephoto = "${post_featurephoto}", post_title = "${post_title}", post_content = "${post_content}", post_tag = "${post_tag}" WHERE post_id = "${post_id}";`;
  connection.query(UPDATE_POST, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('updated post');
    }
  });
});

app.put('/saveUser', (req, res) => {
  const { users_id, users_firstname, users_lastname, users_username, users_bio, users_facebook, users_twitter, users_linkedin } = req.body;
  const UPDATE_USER = `UPDATE tbl_users SET users_firstname = "${users_firstname}", users_lastname = "${users_lastname}", users_username = "${users_username}", users_bio = "${users_bio}", users_facebook = "${users_facebook}", users_twitter = "${users_twitter}", users_linkedin = "${users_linkedin}" WHERE users_id = "${users_id}";`;
  connection.query(UPDATE_USER, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('updated persons');
    }
  });
});

app.put('/saveTheme', (req, res) => {
  const { theme_title, theme_colorBody, theme_colorContainer, theme_colorNavigation, theme_colorGraph, theme_fontHeading, theme_fontParagraph, theme_fontDetails, theme_darkMode, theme_imageSlider } = req.body;
  const UPDATE_THEME = `UPDATE tbl_theme SET theme_title = "${theme_title}", theme_colorBody = "${theme_colorBody}", theme_colorContainer = "${theme_colorContainer}", theme_colorNavigation = "${theme_colorNavigation}", theme_colorGraph = "${theme_colorGraph}", theme_fontHeading = "${theme_fontHeading}", theme_fontParagraph = "${theme_fontParagraph}", theme_fontDetails = "${theme_fontDetails}", theme_darkMode = "${theme_darkMode}", theme_imageSlider = "${theme_imageSlider}" WHERE theme_id = 0;`;
  connection.query(UPDATE_THEME, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('updated theme');
    }
  });
});

app.put('/updateUsernameOnPosts', (req, res) => {
  const { originalUsername, newUsername } = req.body;
  console.log(req.body);
  const UPDATE_USERNAME_ON_POSTS = `UPDATE tbl_posts SET post_author = "${newUsername}" WHERE post_author = "${originalUsername}";`;
  connection.query(UPDATE_USERNAME_ON_POSTS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  })
});

app.get('/theme', (req, res) => {
  const ADD_POST_VIEW = `UPDATE tbl_posts SET post_views = "${req.body.postViews.post_views + 1}" WHERE post_id = "${req.body.postViews.post_dbid}";`;
  connection.query(ADD_POST_VIEW, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('updated persons');
    }
  });
});

app.delete('/deleteUser/:id', (req, res) => {
  const DELETE_USER = `DELETE from tbl_users WHERE users_id = ${req.body.userid}`;
  connection.query(DELETE_USER, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('deleted persons');
    }
  });
});

app.delete('/deletePost/:id', (req, res) => {
  const DELETE_POST = `DELETE from tbl_posts WHERE post_id = ${req.body.postid}`;
  connection.query(DELETE_POST, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('deleted post');
    }
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});