const express = require('express');
const app = express();

// import middlewares
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require("cors");
// import routes
const userRoute = require('./routes/users');
const authRoute = require('./routes/auths');
const postRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversations');
const messagesRoute = require('./routes/messages');

// .env configuration
dotenv.config();

// connecting MongoDB by Auth key.
mongoose.connect(process.env.MONGO_AUTH, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    err ? console.log(err):console.log("Connected to MongoDB.")
});


// set public/images folder to be visible
app.use('/images',express.static(path.join(__dirname, 'public/images')));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());
// Save uploaded images to public folder in server
// for project purpose, not a good practice.
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({storage});
app.post('/api/upload', upload.single("file"), (req, res) => {
    try{
        return res.status(200).json("file uploaded Success.")
    }catch(err){
        console.log(err)
    }
})

app.use('/api/users', userRoute);
app.use('/api/auths', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messagesRoute);



app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});


const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}!`);
});