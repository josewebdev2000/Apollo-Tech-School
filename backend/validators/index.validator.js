// Export Validators
const BasicStrValidator= require("./basicstrvalidator.validator");
const EmailValidator = require("./emailvalidator.validator");
const NameValidator = require("./namevalidator.validator");
const PasswordValidator = require("./passwordvalidator.validator");
const UrlValidator = require("./urlvalidator.validator");

module.exports = {
    BasicStrValidator,
    EmailValidator,
    NameValidator,
    PasswordValidator,
    UrlValidator
};