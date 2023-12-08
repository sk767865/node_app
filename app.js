const express = require("express");
const cookieParser = require('cookie-parser');
require('dotenv').config();

//express app
const app = express();

const port = process.env.PORT;

//to clear all cache files after logout sessions and to check that reponse is not cached
app.use(function (req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());

//express layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');


app.use(cookieParser());


//teacher and student routes
const teachRoutes = require("./routes/teacherRoutes")
const studRoutes = require("./routes/studentRoutes")
const common = require("./routes/common")
app.use("/teacher", teachRoutes);
app.use("/student", studRoutes);
app.use("/common", common);

//routes
app.get("/", (req, res) => {
  res.clearCookie('token');
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

// page Not Found
app.use((req, res) => {

  res.status(404).render('pageNotFound', { title: 'This page does not Exist, Please Try again' });

});