import { TestEmployeeService } from '../../services/testEmployeeService';
import * as _ from 'underscore';
export class TestEmployeeController {
    employeeService = new TestEmployeeService();

    getEmployeeLit = async (req , res) => {
        const { employees, error } = await this.employeeService.getEmployeeList()
            .then(data => ({employees: data, error: undefined}))
            .catch(err => ({error: err, employees: undefined}));

        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).json(employees);
        }
    }

    getEmployeeById = async (req, res) => {
        const { id } = req.params;
        if (_.isEmpty(id)) {
            res.status(400).send({error: 'Missing parameters'});
        } else {
            const { employee, error } = await this.employeeService.getEmployeeById(id)
            .then(data => ({employee: data, error: undefined}))
            .catch(err => ({error: err, employee: undefined}));
            if (error) {
                res.status(500).json(error);
            } else {
                if (_.isEmpty(employee)) {
                    res.status(404).json({error: 'Employee not found'});
                } else {
                    res.status(200).json(employee);
                }

            }

        }
    }

    addEmployee = async (req, res) => {
        const { name, email, password } = req.body;

        if (_.isEmpty( req.body) || _.isEmpty(email) || _.isEmpty(password) || _.isEmpty(name)) {
            res.status(400).send({error: 'Missing parameters'});
        } else {
            const { created, error } = await this.employeeService.addEmployee(req.body)
            .then(data => ({created: data, error: undefined}))
            .catch(err => ({error: err, created: undefined}));
            if (error) {
                res.status(500).json(error);
            } else {
                if (created.error) {
                    res.status(500).json({error: created.error});
                } else {
                    res.status(200).json(created);
                }

            }

        }
    }

    updateEmployee = async (req, res) => {
        const { name, email, password, isActive } = req.body;
        const { id } = req.params;

        if (_.isEmpty(req.body) || _.isEmpty(email) ||
            _.isEmpty(password) ||  _.isEmpty(name) ||
            _.isEmpty(isActive) || _.isEmpty(id)) {
            res.status(400).send({error: 'Missing parameters'});
        } else {
            const { updated, error } = await this.employeeService.updateEmployee(req.body, Number(id))
            .then(data => ({updated: data, error: undefined}))
            .catch(err => ({error: err, updated: undefined}));
            if (error) {
                res.status(500).json(error);
            } else {
                if (updated.error) {
                    res.status(500).json({error: updated.error});
                } else {
                    res.status(200).json(updated);
                }

            }

        }
    }

    patchEmployee = async (req, res) => {
        const { id } = req.params;
        if (_.isEmpty(req.body) || _.isEmpty(id)) {
            res.status(400).send({error: 'Missing parameters'});
        }  else {
            const { updated, error } = await this.employeeService.patchEmployee(req.body, Number(id))
            .then(data => ({updated: data, error: undefined}))
            .catch(err => ({error: err, updated: undefined}));
            if (error) {
                res.status(500).json(error);
            } else {
                if (updated.error) {
                    res.status(500).json({error: updated.error});
                } else {
                    res.status(200).json(updated);
                }

            }

        }
    }

    deleteEmployee = async (req, res) => {
        const { id } = req.params;

        if (_.isEmpty(id)) {
            res.status(400).send({error: 'Missing parameters'});
        } else {
            const { deleted, error } = await this.employeeService.deleteEmployee(Number(id))
            .then(data => ({deleted: data, error: undefined}))
            .catch(err => ({error: err, deleted: undefined}));
            if (error) {
                res.status(500).json(error);
            } else {
                if (deleted.error) {
                    res.status(500).json({error: deleted.error});
                } else {
                    res.status(200).json(deleted);
                }

            }

        }
    }

}