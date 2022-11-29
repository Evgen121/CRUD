import mongoose from "mongoose";


const uploadShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
}
);
const Upload = mongoose.model("Upload", uploadShema)
export default Upload;
