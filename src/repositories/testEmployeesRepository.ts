import { DbContext } from '../connection/db.context';
import * as _ from 'underscore';
import Employee from '../shared/models/testEmployee';
import Created from '../shared/models/created';
import Updated from '../shared/models/updated';
import Deleted from '../shared/models/deleted';
const tableName = 'TestUser';
const idField = 'id';
const nameField = 'name';
const emailField = 'email';
const isActiveField = 'isActive';
export class TestEmployeeRepository {

    private context: DbContext;
    constructor() {
        this.context = new DbContext();
    }

    getEmployeeList = (): Promise<Employee[]> => {
        const pool = this.context.getPool();
        let sql = `SELECT ${idField}, ${nameField}, ${emailField}, ${isActiveField} FROM ${tableName}`;

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
                        const model = this.mapFromRaw(item);
                        if (!_.isEmpty(model)) {
                            data.push(model);
                        }

                    });
                    resolve(data);

                });
            });
        });

        return promise;
    };

    getEmployeeById = (id): Promise<Employee> => {
        const pool = this.context.getPool();
        let sql = `SELECT ${idField}, ${nameField}, ${emailField}, ${isActiveField} FROM ${tableName} WHERE id = ${id}`;

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
                        data = this.mapFromRaw(item);
                    });
                    resolve(data);

                });
            });
        });

        return promise;
    };

    addEmployee = (employee: Employee): Promise<Created> => {
        const pool = this.context.getPool();
        let sql = `INSERT INTO ${tableName} ( name, email, isActive, password)
        VALUES ('${employee.name}', '${employee.email}', ${employee.isActive}, '${employee.password}' )`;

        let promise = new Promise<Created>((resolve, rejects) => {
            let data = new Created();
            pool.getConnection((error, conn) => {
                if (error) {
                    rejects(error);
                }
                conn.query(sql, (er, rows: any) => {
                    conn.release();
                    if (er) {
                        rejects(er);
                    }

                    data.created = employee;
                    resolve(data);

                });
            });
        });

        return promise;
    };

    updateEmployee = (employee: Employee, id: number): Promise<Updated> => {
        const pool = this.context.getPool();
        let sql = `UPDATE ${tableName} SET name = '${employee.name}', email = '${employee.email}',
        password = '${employee.password}', isActive = ${employee.isActive} WHERE id = ${id};`;

        let promise = new Promise<Updated>((resolve, rejects) => {
            let data = new Updated();
            pool.getConnection((error, conn) => {
                if (error) {
                    rejects(error);
                }
                conn.query(sql, (er, rows: any) => {
                    conn.release();
                    if (er) {
                        rejects(er);
                    }

                    data.updated = employee;
                    resolve(data);

                });
            });
        });

        return promise;
    };

    patchEmployee = (employee: any, id: number): Promise<Updated> => {
        const pool = this.context.getPool();
        let sql = `UPDATE ${tableName} SET `;
        const condition =  `WHERE id = ${id};`;
        const properties: string[] = [];
        if (!_.isEmpty(employee.name)) {
            properties.push(`name = '${employee.name}'`);
        }
        if (!_.isEmpty(employee.email)) {
            properties.push(`email = '${employee.email}'`);
        }
        if (!_.isEmpty(employee.password)) {
            properties.push(`password = '${employee.password}'`);
        }
        if (!_.isEmpty(employee.isActive)) {
            properties.push(`isActive = ${employee.isActive}`);
        }

        let query = sql;

        properties.map((item, index) => {
            if (index === properties.length - 1) {
                query = query + `${item}`;
            } else {
                query = query + `${item},`;
            }

        });
        query = query + ' ' + condition;
        console.log(query);
        let promise = new Promise<Updated>((resolve, rejects) => {
            let data = new Updated();
            pool.getConnection((error, conn) => {
                if (error) {
                    rejects(error);
                }
                conn.query(query, (er, rows: any) => {
                    conn.release();
                    if (er) {
                        rejects(er);
                    }

                    data.updated = employee;
                    resolve(data);

                });
            });
        });

        return promise;
    };

    deleteEmployee = (id): Promise<Deleted> => {
        const pool = this.context.getPool();
        let sql = `DELETE FROM ${tableName} WHERE id=${id};`;

        let promise = new Promise<Deleted>((resolve, rejects) => {
            let data = new Deleted();
            pool.getConnection((error, conn) => {
                if (error) {
                    rejects(error);
                }
                conn.query(sql, (er, rows: any) => {
                    conn.release();
                    if (er) {
                        rejects(er);
                    }

                    data.id = id;
                    resolve(data);

                });
            });
        });

        return promise;
    }

    mapFromRaw = (item): Employee => {
        if (_.isEmpty(item)) {
            return undefined;
        }

        const model = new Employee();
        model.id = item.id;
        model.name = item[nameField];
        model.email = item[emailField];
        model.isActive = item[isActiveField];
        return model;
    };

}