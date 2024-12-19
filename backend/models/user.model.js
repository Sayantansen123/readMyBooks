import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name :{
        type: String,
        required : [true,]
    },
    email:{
        type: String,
        required :true,
    },
    username :{
        type: String,
        required : true,
    },
    password:{
        type: String,
        required: true,
        minlength:6,
    },
    profilepic:{
        type: String,
        required: true,
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

