/**
 * @file Declares User data type representing an user account in Tuiter
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User Represents an user account in Tuiter database
 * @property {string} username the username of the user account
 * @property {string} password the password of the user account
 * @property {string} firstName the first name of the user
 * @property {string} lastName the last name of the user
 * @property {string} email the email address of the user
 * @property {string} profilePhoto the profile photo of the user account
 * @property {string} headImage the head image of the user account
 * @property {string} biography the biography of the user account
 * @property {Date} dateOfBirth the date of birth of the user
 * @property {AccountType} accountType the account type of the user account, choose from personal, academic, and professional
 * @property {MaritalStatus} maritalStatus the marital status of the user, choose from married, single, and widowed
 * @property {Location} location the location of the user account
 * @property {number} salary the salary amount of the user
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    email: string,
    firstName?: string,
    lastName?: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};