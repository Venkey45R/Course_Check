const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersModel = require('./models/users');
const coursesModel = require('./models/courses');
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/course")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB:", err));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  usersModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("success");
        } else {
          res.json("password incorrect");
        }
      } else {
        res.json("user not found");
      }
    })
    .catch(err => res.json(err));
});

app.post('/register', (req, res) => {
  usersModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.get('/courses', (req, res) => {
  coursesModel.find()
    .then(course => res.json(course))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.post('/rate', (req, res)=>{
  const {id} = req.body;
  coursesModel.findOne({_id: id})
  .then(course => res.json(course))
  .catch(err =>{
    res.json(err);
  })
})

app.post('/getRatings', (req, res) => {
  const { id } = req.body;

  coursesModel.findById(id)
    .then(course => {
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course.ratings);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Error fetching ratings" });
    });
});

app.post('/update', (req, res) => {
  const { id, rating, comment, email } = req.body;

  coursesModel.findById(id)
    .then(course => {
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      course.comments.push({ email: email, text: comment });
      course.ratings.push({ rating: rating });
      const totalRatings = course.ratings.length;
      const sumRatings = course.ratings.reduce((sum, item) => sum + item.rating, 0);
      const averageRating = sumRatings / totalRatings;
      course.rating = averageRating;

      return course.save();
    })
    .then(updatedCourse => {
      res.json(updatedCourse);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Error updating course" });
    });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
