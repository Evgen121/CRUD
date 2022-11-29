import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import Upload from "./models/uploadModel.js";


const port = 5000;
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connect to DB");
}).catch((err) => {
    console.log(err.message)
})
const app = express();
app.use(express.json())

// get all
app.get('/all', async (req, res) => {
    try {

        const imaages = await Upload.find({}).sort({ _id: -1 });
        res.status(200).json(imaages)
    } catch (error) {
        res.status(404).json({ message: "Fetch data error" })
    }
})
//post data
app.post('/', async (req, res) => {
    try {

        const { title, desc, image } = req.body;
        const createImages = {
            title,
            desc,
            image
        }
        if (createImages) {
            const newImages = await Upload.create(createImages)
            res.status(200).json(newImages)
        }


    } catch (error) {
        res.status(404).json({ message: "Post data Eror" })
    }
})

app.use(express.static(path.join("client/build")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => {
    console.log(`server work in port ${port}`)
})
