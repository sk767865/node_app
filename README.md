******************************{Steps to run this Application}*********************************

   *======>open mysql workbench 

   *======>creation of database 

   CREATE DATABASE resultdatabase;
   USE resultdatabase;
	
	
   *======>creation of table "teacher"
   
   CREATE TABLE resultdatabase.teacher (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    role VARCHAR(50)
    );

   
   *=======>creation of table "student"
   
   CREATE TABLE resultdatabase.student 
   ( _id INT AUTO_INCREMENT PRIMARY KEY, 
   roll INT, name VARCHAR(255), 
   dob VARCHAR(255), 
   score INT );


   
   *========>add some sample data to teacher table :-
   
   
    INSERT INTO resultdatabase.teacher (username, password, role)
    VALUES
    ('teacher1', 'password1', 'teacher'),
    ('student1', 'password2', 'student');
	
	  
   
   *========>add some sample data to student table :-
   
   INSERT INTO resultdatabase.student (roll, name, dob, score)
    VALUES
    (101, 'John Doe', '1998-05-10', 85),
    (102, 'Jane Smith', '1999-02-15', 92),
    (103, 'Alice Johnson', '2000-09-20', 78),
    (104, 'Bob Williams', '1997-11-30', 67),
    (105, 'Emily Brown', '2001-07-08', 95);

  
   
   *to download all packages :-

    npm install

    *to run application use :-
	
	nodemon app.js



**************************************************************************************
************************{About Result Managment Application}*************************

This application features a unified login page catering to both teachers and students.

Users, whether students or teachers, can access their respective accounts using their authorized credentials.

In the event of incorrect login credentials, an error message will promptly inform the user of the issue.

Upon successful login by a teacher, they gain access to a comprehensive Teacher Dashboard.

The Teacher Dashboard presents a summary of the total student count.
Additionally, a table is displayed, populated with essential student information retrieved from the database, where available.
The dashboard offers an 'Add' button, allowing teachers to seamlessly add, edit, and delete student records, all of which have been meticulously implemented and thoroughly tested.
Stringent validation mechanisms ensure that proper error messages are displayed for each field when editing or adding student information.
For students, their dashboard is tailored to their specific needs.

After a successful login, students can input their roll number and date of birth to access their academic results.
The system provides clear and informative error messages if students input incorrect data.
A pass criterion of 33 marks out of 100 is established; if a student scores less than this threshold, a message will inform them that they need to score above 33 to pass the exam.
The application employs JWT (JSON Web Token) for authorization purposes.

During the login process, a token is generated for both teachers and students, ensuring secure access to their respective accounts.
Logout functionality seamlessly deletes the token, rendering the site inaccessible to unauthorized users.

