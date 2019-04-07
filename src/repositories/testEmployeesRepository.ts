import { DbContext } from '../connection/db.context';
import * as mysql from 'mysql';
import * as _ from 'underscore';
import Employee from '../shared/models/testEmployee';
const tableName = 'TestUser';
const idField = 'id';
const nameField = 'name';
const emailField = 'email';
export class TestEmployeeRepository {

    private context: DbContext;
    constructor() {
        this.context = new DbContext();
    }

    getEmployeeList = (): Promise<Employee[]> => {
        const pool = this.context.getPool();
        let sql = `SELECT ${idField}, ${nameField}, ${emailField} FROM ${tableName}`;

        let promise = new Promise<Employee[]>((resolve, rejects) => {
            let data: Employee[] = [];
            pool.getConnection((error, conn) => {
                if (error) {
                    rejects(error);
                }
                conn.query(sql, (er, rows: any[]) => {
                    conn.release();
                    if (er) {
                        rejects(er);
                    }

                    rows.map(item => {
                        if (!_.isEmpty(item)) {
                            let model = new Employee();
                            model.id = item.id;
                            model.name = item[nameField];
                            model.email = item[emailField];
                            data.push(model);
                        }

                    });
                    resolve(data);

                });
            });
        });

        return promise;
    }

    getEmployeeById = (id): Promise<Employee> => {
        const pool = this.context.getPool();
        let sql = `SELECT ${idField}, ${nameField}, ${emailField} FROM ${tableName} WHERE id = ${id}`;

        let promise = new Promise<Employee>((resolve, rejects) => {
            let data = new Employee();
            pool.getConnection((error, conn) => {
                if (error) {
                    rejects(error);
                }
                conn.query(sql, (er, rows: any[]) => {
                    conn.release();
                    if (er) {
                        rejects(er);
                    }

                    rows.map(item => {
                        if (!_.isEmpty(item)) {
                            let model = new Employee();
                            data.id = item.id;
                            data.name = item[nameField];
                            data.email = item[emailField];
                        }

                    });
                    resolve(data);

                });
            });
        });

        return promise;
    }

    addEmployee = (employee: Employee): Promise<Employee> => {
        const pool = this.context.getPool();
        let sql = `SELECT ${idField}, ${nameField}, ${emailField} FROM ${tableName} WHERE id = ${id}`;

        let promise = new Promise<Employee>((resolve, rejects) => {
            let data = new Employee();
            pool.getConnection((error, conn) => {
                if (error) {
                    rejects(error);
                }
                conn.query(sql, (er, rows: any[]) => {
                    conn.release();
                    if (er) {
                        rejects(er);
                    }

                    rows.map(item => {
                        if (!_.isEmpty(item)) {
                            let model = new Employee();
                            data.id = item.id;
                            data.name = item[nameField];
                            data.email = item[emailField];
                        }

                    });
                    resolve(data);

                });
            });
        });

        return promise;
    }

}