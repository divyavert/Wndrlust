const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookiep = require('cookie-parser');
const fs = require('fs');
const imagedw = require('image-downloader');
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const multer = require('multer');
const userModle = require('./models/user');
app.use(express.json());
app.use(cookiep());
app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
  })
);
app.use('/uploads', express.static(__dirname + '/uploads'));

const bycrptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'jshkdijdncbxiujasknns8782';
mongoose.connect(process.env.CONNECT_STRING);
app.get('/test', (req, res) => {
  res.json('test oxk');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userModle.findOne({ email });

  if (user) {
    const passok = bcrypt.compareSync(password, user.password);
    if (passok) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            throw err;
          } else {
            console.log(token);
            res.cookie('token', token).json(user);
          }
        }
      );
    } else {
      throw new Error('not matched');
      res.json('password is wrong');
    }
  } else {
    res.json('no user found');
  }
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModle.create({
      name,
      email,
      password: bcrypt.hashSync(password, bycrptSalt),
    });

    res.json(user);
  } catch (e) {
    res.status(422).json(e);
  }
});
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, user) => {
      res.json(user);
    });
  } else {
    res.json(null);
  }
});
app.post('/logout', (req, res) => {
  res.cookie('token', ' ').json(true);
});
app.post('/uploadLink', async (req, res) => {
  const { link } = req.body;
  const name = 'photo' + Date.now() + '.jpg';
  await imagedw.image({
    url: link,
    dest: __dirname + '/uploads/' + name,
  });
  res.json(name);
});

const photoMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photoMiddleware.array('photos', 100), (req, res) => {
  const uploadedFile = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const part = originalname.split('.');
    const ext = part[part.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFile.push(newPath.replace('uploads\\', ''));
  }
  res.json(uploadedFile);
});
app.listen(4000);
