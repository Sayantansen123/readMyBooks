import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name :{
        type: String,
        required : [true,"name is required"]
    },
    email:{
        type: String,
        required :[true,"email is required"]
    },
    username :{
        type: String,
        required : [true,"username is required"]
    },
    password:{
        type: String,
        required: [true,"password is required"],
        minlength:6,
    },
    profilepic:{
        type: String,
        default:""
    },
    books:[{
        quantity:{
            type: Number,
			default: 0,
        },
        bookname:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Books",
        }
    }],
},{
    timestamps: true,
})

const User = mongoose.model("User", userSchema);

export default User;

