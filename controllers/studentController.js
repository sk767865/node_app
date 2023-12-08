const mysql = require("mysql");
const con = require("../database/database");
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const student_login_get = (req, res) => {


  var token = req.cookies.token;
  if (!token) {
    return res.redirect('/');
  }

  const error = false;
  res.render("student/login", { error });

};

const student_login_post = async (req, res) => {


  var token = req.cookies.token;
  if (!token) {
    return res.redirect('/');
  }

  const Sturoll = req.body.roll;
  const StuName = req.body.dob;



  const findStudentQuery = "SELECT * FROM student WHERE roll = ? AND dob = ?";
  con.query(findStudentQuery, [Sturoll, StuName], (err, results) => {
    if (err) {
      console.error("Error finding student:", err);
      res.status(500).send("An error occurred.");
    } else {
      const individualStudent = results[0];
      if (!individualStudent) {
        res.render("student/login", {
          error: "Login with correct roll number and dob"
        });
      } else {
        res.render("student/view", { one: individualStudent });
      }
    }
  });
};

module.exports = {
  student_login_get,
  student_login_post
}