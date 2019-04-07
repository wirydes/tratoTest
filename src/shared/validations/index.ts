export default class {
    isValidPassword = (password): boolean => {
        const passwordValidator = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

        return passwordValidator.test(password);
    };
}