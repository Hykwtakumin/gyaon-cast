import * as express from 'express';
import * as http from 'http';
import * as path from "path";
import {ErrorRequestHandler} from "express";
import {routes} from "./routes";
import * as bodyParser from "body-parser";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const {statusCode, message} = err;
    return res.status(statusCode).send({status: statusCode, message: message})
};

const app: express.Express = express();

app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(express.static('public'));
app.use("/", routes);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
