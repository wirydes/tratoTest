import * as express from 'express';
import * as bodyParser from 'body-parser';
import Routes from './api/routes/routes';

export default class AppModule {

    private app: any;
    private routes: Routes;
    constructor() {
        this.app = express();
        this.routes = new Routes();
        this.init();
    }

    init = () =>  {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.routes.setRoutes(this.app);
    }

    getApp = () => {
        return this.app;
    }
}
