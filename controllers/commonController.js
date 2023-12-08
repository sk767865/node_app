const mysql = require("mysql");
const con = require("../database/database");
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const common_login_get = (req, res) => {
  const role = req.cookies.role;
  const error=false;
  res.render("commonLogin", { role,error });
};

const common_login_post = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.cookies.role;

  const query = `SELECT * FROM teacher WHERE username = ? AND password = ? AND role = ?`;

  con.query(query, [username, password, role], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.render("commonLogin", {
        error: "An error occurred while processing your request.",
        role
      });
      return;
    }

    const secretKey = 'your_secret_key';

    if (results.length > 0 && role === 'teacher') {
      const token = jwt.sign({ id: results[0].id }, secretKey, { expiresIn: '1h' });
      console.log("my token  ", token);
      res.cookie('token', token);
      res.redirect("/teacher/viewall");
    } else if (results.length > 0 && role === 'student') {
      const token = jwt.sign({ id: results[0].id }, secretKey, { expiresIn: '1h' });
      res.cookie('token', token);
      res.redirect("/student/login");
    } else {
      res.render("commonLogin", {
        error: "Please Enter Correct Username and Password !",
        role
      });
    }
  });
};


module.exports = {
  common_login_get,
  common_login_post,

}