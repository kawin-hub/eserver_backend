const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const collection = "Users"

let userSchema = new  Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    sex: {
        type: Number,
        required: true
    },
    nickname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false,
    collection
})

module.exports = mongoose.model(collection,userSchema)