import AppModule from './app';
const modul = new AppModule();
this.app = modul.getApp();
const port = process.env.PORT || 3000;
console.log('todo list RESTful API server started on: ' + port);

const server = this.app.listen(port);
export default server;