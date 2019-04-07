
import * as _ from 'underscore';
import { TestEmployeeRepository } from '../repositories/testEmployeesRepository';
import Employee from '../shared/models/testEmployee';
import Created from '../shared/models/created';
import Validations from '../shared/validations';
import Security from '../shared/security/encryptPassword';
import Updated from '../shared/models/updated';
import Deleted from '../shared/models/deleted';
export class TestEmployeeService {
    private testEmployeeRepository = new TestEmployeeRepository();
    private validate = new Validations();
    private security = new Security();

    getEmployeeList = (): Promise<Employee[]> => {
        let promise = new Promise<Employee[]>((resolve, rejects) => {
            this.testEmployeeRepository.getEmployeeList().then(data => resolve(data)).catch(er => rejects(er));
        });

        return promise;
    };

    getEmployeeById = (id): Promise<Employee> => {
        let promise = new Promise<Employee>((resolve, rejects) => {
            this.testEmployeeRepository.getEmployeeById(id).then(data => resolve(data)).catch(er => rejects(er));
        });

        return promise;
    };

    addEmployee = (employee): Promise<Created> => {
        let promise = new Promise<Created>((resolve, rejects) => {
            if (!this.validate.isValidPassword(employee.password)) {
                const result = new Created();
                result.error = 'The password must contains at least one lowercase one uppercase one number one special charater must be of 8 charaters';
                return resolve(result);
            }

            const hash = this.security.hashPassword(employee.password);
            if (_.isEmpty(hash)) {
                const result = new Created();
                result.error = 'Error hashing password';
                return resolve(result);
            }

            const toAdd = new Employee();
            toAdd.password = hash;
            toAdd.name = employee.name;
            toAdd.email = employee.email;
            toAdd.isActive = true;
            this.testEmployeeRepository.addEmployee(toAdd).then(data => resolve(data)).catch(er => rejects(er));
        });

        return promise;

    };

    updateEmployee = (employee, id): Promise<Updated> => {
        let promise = new Promise<Updated>((resolve, rejects) => {
            if (!this.validate.isValidPassword(employee.password)) {
                const result = new Updated();
                result.error = 'The password must contains at least one lowercase one uppercase one number one special charater must be of 8 charaters';
                return resolve(result);
            }


            const hash = this.security.hashPassword(employee.password);
            if (_.isEmpty(hash)) {
                const result = new Updated();
                result.error = 'Error hashing password';
                return resolve(result);
            }

            const toUpdate = new Employee();
            toUpdate.password = hash;
            toUpdate.name = employee.name;
            toUpdate.email = employee.email;
            toUpdate.isActive = employee.isActive;
            toUpdate.id = employee.id;
            this.testEmployeeRepository.updateEmployee(toUpdate, id).then(data => resolve(data)).catch(er => rejects(er));
        });

        return promise;

    };

    patchEmployee = (employee, id): Promise<Updated> => {
        let promise = new Promise<Updated>((resolve, rejects) => {
            if (employee.password) {
                if (!this.validate.isValidPassword(employee.password)) {
                    const result = new Updated();
                    result.error = 'The password must contains at least one lowercase one uppercase one number one special charater must be of 8 charaters';
                    return resolve(result);
                }
                const hash = this.security.hashPassword(employee.password);
                if (_.isEmpty(hash)) {
                    const result = new Updated();
                    result.error = 'Error hashing password';
                    return resolve(result);
                }
                employee.password = hash;
            }


            this.testEmployeeRepository.patchEmployee(employee, id).then(data => resolve(data)).catch(er => rejects(er));
        });

        return promise;

    };

    deleteEmployee = (id: number): Promise<Deleted> => {
        let promise = new Promise<Deleted>((resolve, rejects) => {
            this.testEmployeeRepository.deleteEmployee(id).then(data => resolve(data)).catch(er => rejects(er));
        });

        return promise;

    };

}