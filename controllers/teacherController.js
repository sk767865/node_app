const mysql = require("mysql");
const con = require("../database/database");
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


const teacher_viewall_get = async (req, res) => {

  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/');
  }

  else {
    const secretKey = 'your_secret_key';

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.redirect('/');
      }

      con.query("SELECT * FROM student", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.render("teacher/viewall", { student: result })

      });


    });


  }


};

const teacher_edit_get = async (req, res) => {

  var token = req.cookies.token;
  if (!token) {
    return res.redirect('/');
  }

  else {

    var id = req.params.id;
    console.log(id)
    var sql = 'SELECT * FROM student WHERE _id = ?';
    con.query(sql, [id], function (err, result) {
      if (err) throw err;
      console.log(result);
      res.render("teacher/edit", { user: result, submissionCount: 2 })
    });


  }



};

const teacher_edit_post = async (req, res) => {

  var token = req.cookies.token;
  if (!token) {
    return res.redirect('/');
  }

  else {

    const _id = req.params.id;
    const { name, roll, dob, score } = req.body;


    const updateQuery = "UPDATE student SET name = ?, roll = ?, dob = ?, score = ? WHERE _id = ?";
    const values = [name, roll, dob, score, _id];

    con.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("Error updating student:", err);
        res.status(500).send("An error occurred.");
      } else {
        console.log("Student updated:", result);
        res.redirect("/teacher/viewall");
      }
    });


  }


};

const teacher_delete_get = async (req, res) => {


  var token = req.cookies.token;
  if (!token) {
    return res.redirect('/');
  }

  else {
    const _id = req.params.id;

    const deleteQuery = "DELETE FROM student WHERE _id = ?";


    con.query(deleteQuery, [_id], (err, result) => {
      if (err) {
        console.error("Error deleting student:", err);
        res.status(500).send("An error occurred.");
      } else {
        console.log("Student deleted:", result);
        res.redirect("/teacher/viewall");
      }
    });
  }


};

const teacher_add_get = (req, res) => {

  var token = req.cookies.token;
  if (!token) {
    return res.redirect('/');
  }

  else {

    // const flag=false;
    res.render("teacher/addstudent",{flag:3});

  }

};

const teacher_add_post = async (req, res) => {


  var token = req.cookies.token;
  if (!token) {
    return res.redirect('/');
  }

  else {

    const Sturoll = req.body.roll;
    const StuDob = req.body.dob;


    const checkDuplicateQuery = "SELECT * FROM student WHERE roll = ?";
    con.query(checkDuplicateQuery, [Sturoll], (err, results) => {
      if (err) {
        
        console.error("Error checking duplicate:", err);
        res.status(500).send("An error occurred.");
      } else {
        if (results.length > 0) {

          res.render("teacher/addstudent",{flag:false});
        } else {

          const insertStudentQuery = "INSERT INTO student (roll, name, dob, score) VALUES (?, ?, ?, ?)";
          con.query(insertStudentQuery, [Sturoll, req.body.name, StuDob, req.body.score], (insertErr) => {
            if (insertErr) {
              console.error("Error inserting student:", insertErr);
              res.status(500).send("An error occurred.");
            } else {

             

              res.render("teacher/addstudent",{flag:true});
              
            }
          });
        }
      }
    });

  }


};


module.exports = {

  teacher_viewall_get,
  teacher_edit_get,
  teacher_edit_post,
  teacher_delete_get,
  teacher_add_post,
  teacher_add_get,

}