/** Validator for Basic Strings
 * Ensures they're not not and the length is at least 1
 */
class BasicStrValidator
{
    static validateStr(str)
    {
        if (str == null)
        {
            return false;
        }

        return str.trim().length > 0;
    }
}

module.exports = BasicStrValidator;