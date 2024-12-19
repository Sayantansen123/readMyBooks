import mongoose from "mongoose"

const bookSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Name of the book is required"]
    },
    pdf:{
        type:String,
    },
    rating:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
        stars:{
            type:Number,
            default: 0,
        }
    }],
    description:{
        type:String,
        default:"",
    },
    replies: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            userProfilePic: {
                type: String,
            },
            username: {
                type: String,
            },
        },
    ],
},{
    timestamps: true,
})

const Books = mongoose.model("Books", bookSchema);

export default Books;