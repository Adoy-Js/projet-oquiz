const CoreModel = require('./CoreModel');
const database = require('../database');

class User extends CoreModel {

  static tableName = 'user';

  _email;
  _password;
  _firstname;
  _lastname;

  constructor(obj) {
    super(obj)
    this.email = obj.email;
    this.password = obj.password;
    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
  }

  // Set / Get de email
  set email(email) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  // Set / Get de password
  set password(password) {
    this._password = password;
  }

  get password() {
    return this._password;
  }

  // Set / Get de firstname
  set firstname(firstname) {
    this._firstname = firstname;
  }

  get firstname() {
    return this._firstname;
  }

  // Set / Get de lastname
  set lastname(lastname) {
    this._lastname = lastname;
  }

  get lastname() {
    return this._lastname.toUpperCase();
  }

  get fullName() {
    return this.firstname + ' ' + this.lastname
  }

}

module.exports = User;