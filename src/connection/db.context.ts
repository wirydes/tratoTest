import { DataConfig } from '../data.config';
import * as mysql from 'mysql';

export class DbContext {
    private pool: mysql.Pool;

    constructor() {
        this.pool = mysql.createPool(new DataConfig());
    }

    getPool(): mysql.Pool {
        return this.pool;
    }


}

/* if connected user doesn't work try to execute
  ALTER USER 'user'@'server' IDENTIFIED WITH mysql_native_password BY 'password'

*/