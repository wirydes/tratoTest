import * as bcrypt from 'bcrypt';
const saltRounds = 10;
export default class {

    hashPassword = (password) => {

        return bcrypt.hashSync(password, saltRounds);
    };
}