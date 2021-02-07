const express = require('express');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_USERS = 'SELECT * FROM tbl_users';
const SELECT_USER_PREVIEW = 'SELECT id, firstname, lastname, email, username, profilepic FROM tbl_users';

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

app.get('/users', (req, res) => {
  connection.query(SELECT_ALL_USERS, (err, results) => {
    if(err) {
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

app.get('/singleUser', (req, res) => {
  const SELECT_SINGLE_USER = `SELECT * FROM tbl_users WHERE id = ${req.body.id}`;
  connection.query(SELECT_SINGLE_USER, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(req);
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
  console.log(INSERT_PERSON);
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

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
