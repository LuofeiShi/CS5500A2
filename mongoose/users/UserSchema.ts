/**
 * @file Implements mongoose schema for user
 */
import mongoose from "mongoose";
import User from "../../models/users/User";

/**
 * @typedef User Represents a valid user account in Tuiter
 * @property {String} username the username of the user account
 * @property {String} password the password of the user account
 * @property {String} firstName the first name of the user
 * @property {String} lastName the last name of the user
 * @property {String} email the email address of the user
 * @property {String} profilePhoto the profile photo of the user account
 * @property {String} headImage the head image of the user account
 * @property {String} biography the biography of the user account
 * @property {Date} dateOfBirth the date of birth of the user
 * @property {String} accountType the account type of the user account, choose from personal, academic, and professional
 * @property {String} maritalStatus the marital status of the user, choose from married, single, and widowed
 * @property {Number} latitude the latitude of the account location
 * @property {Number} longitude the longitude of the account location
 * @property {Number} salary the salary amount of the user
 */
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"]},
    maritalStatus: {type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"]},
    location: {
        latitude: Number,
        longitude: Number
    },
    salary: {type: Number, default: 50000}
}, {collection: "users"});

export default UserSchema;