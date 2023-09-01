const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv').config();
const client = require('./services/discorBot')
const userRouter = require("./routes/userRouter");

const app = express();

app.use(cors())
app.use(express.json());
app.use('/api', userRouter);

app.listen(process.env.PORT, err => {
    if (err){
        console.log(err)
    }else{
        console.log("serveur actif")
    }
});


