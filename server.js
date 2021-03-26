const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'mern_blog'
});

connection.connect(err => {
  if (err) {
    return err;
  }
});

app.use(express.json());

// API Calls
const SELECT_ALL_USERS = 'SELECT * FROM tbl_users';
const SELECT_ALL_POSTS = 'SELECT * FROM tbl_posts';
const SELECT_TAGS_FROM_POSTS = 'SELECT DISTINCT post_tag FROM tbl_posts';
const SELECT_TOP_TWO_LANDING_PAGE_POSTS = 'SELECT * FROM tbl_posts LIMIT 2';
const SELECT_MIDDLE_LANDING_PAGE_POSTS = 'SELECT * FROM tbl_posts LIMIT 2, 6';
const SELECT_END_LANDING_PAGE_POSTS = 'SELECT * FROM tbl_posts LIMIT 8, 6';
const SELECT_USER_PREVIEW = 'SELECT id, firstname, lastname, email, username, profilepic FROM tbl_users';

app.get('/users', (req, res) => {
  connection.query(SELECT_ALL_USERS, (err, results) => {
    if (err) {
      return res.send(err);
    }
    else {
      return res.json(results);
    }
  });
});

app.get('/posts', (req, res) => {
  connection.query(SELECT_ALL_POSTS, (err, results) => {
    if (err) {
      return res.send(err);
    }
    else {
      return res.json(results);
    }
  });
});

app.get('/usersPreview', (req, res) => {
  connection.query(SELECT_USER_PREVIEW, (err, results) => {
    if(err) {
      return res.send(err);
    }
    else {
      return res.json(results);
    }
  });
});

app.get('/userSingle', (req, res) => {
  // Sketchy way of getting info id from the URL
  const urlArray = res.req.headers.referer.split("/");
  const authorID = urlArray[urlArray.length - 1];

  const SELECT_SINGLE_USER = `SELECT * FROM tbl_users WHERE users_username = '${authorID}'`;
  connection.query(SELECT_SINGLE_USER, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

app.get('/userPosts', (req, res) => {
  // Sketchy way of getting info id from the URL
  const urlArray = res.req.headers.referer.split("/");
  const authorID = urlArray[urlArray.length - 1];

  // const SELECT_USER_POSTS = `SELECT * FROM tbl_posts INNER JOIN tbl_users ON tbl_posts.post_id = tbl_users.users_id WHERE tbl_users.users_username = '${authorID}'`;
  const SELECT_USER_POSTS = `SELECT * FROM tbl_posts WHERE post_author = '${authorID}'`;
  connection.query(SELECT_USER_POSTS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

app.get('/singlePost', (req, res) => {
  // Sketchy way of getting info id from the URL
  const urlArray = res.req.headers.referer.split("/");
  const postID = urlArray[urlArray.length - 1];

  const SELECT_SINGLE_POST = `SELECT * FROM tbl_posts WHERE post_id = '${postID}'`;
  connection.query(SELECT_SINGLE_POST, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

app.get('/allPosts1', (req, res) => {
  connection.query(SELECT_TOP_TWO_LANDING_PAGE_POSTS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

app.get('/allPosts2', (req, res) => {
  connection.query(SELECT_MIDDLE_LANDING_PAGE_POSTS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

app.get('/allPosts3', (req, res) => {
  connection.query(SELECT_END_LANDING_PAGE_POSTS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
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

app.get('/postsFromTag', (req, res) => {
  const urlArray = res.req.headers.referer.split("/");
  const tagID = urlArray[urlArray.length - 1];

  const SELECT_POSTS_FROM_TAGS = `SELECT * FROM tbl_posts WHERE post_tag = '${tagID}'`;
  connection.query(SELECT_POSTS_FROM_TAGS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

app.post('/addUser', (req,res)=>{
  const { firstname, lastname, email, username, password, profilepic, bio } = req.body;
  const INSERT_PERSON = `INSERT INTO tbl_users (firstname, lastname, email, username, password, profilepic, bio) VALUES ("${firstname}", "${lastname}", "${email}", "${username}", "${password}", "${profilepic}", "${bio}");`;
  connection.query(INSERT_PERSON, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('added persons successfully');
    }
  });
});

app.put('/saveUser', (req, res) => {
  console.log(req.body);
  const UPDATE_USER = `UPDATE tbl_users SET firstname = "${req.body.firstname}", lastname = "${req.body.lastname}", email = "${req.body.email}", username = "${req.body.username}", bio = "${req.body.bio}" WHERE id = "${req.body.id}";`;
  console.log(UPDATE_USER);
  connection.query(UPDATE_USER, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('updated persons');
    }
  });
});

app.delete('/deleteUser', (req,res) => {
  const DELETE_USER = `DELETE from tbl_users WHERE id = ${req.body.id}`;
  connection.query(DELETE_USER, (err) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json('deleted persons');
    }
  });
});

const appPort = 4000;
app.listen(appPort, () => {
  console.log(`Server listening on port ${appPort}`);
});
