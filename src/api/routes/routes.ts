import { TestEmployeeController } from '../controllers/testEmployeeController';
export default class Routes {
    private employeeController = new TestEmployeeController();
    private readonly baseUrl = '/api/employee';

    setRoutes(app) {
        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });

        // list
        app.get(`${this.baseUrl}/`, (req, res) => {
            this.employeeController.getEmployeeLit(req, res);
        });

        // post
        app.post(`${this.baseUrl}/`, (req, res) => {
            this.employeeController.addEmployee(req, res);
        });

        // find by id
        app.get(`${this.baseUrl}/:id`, (req, res) => {
            this.employeeController.getEmployeeById(req, res);
        });

        // put
        app.put(`${this.baseUrl}/:id`, (req, res) => {
            this.employeeController.updateEmployee(req, res);
        });

        // patch
        app.patch(`${this.baseUrl}/:id`, (req, res) => {
            this.employeeController.patchEmployee(req, res);
        });

        // delete
        app.delete(`${this.baseUrl}/:id`, (req, res) => {
            this.employeeController.deleteEmployee(req, res);
        });

    }
}