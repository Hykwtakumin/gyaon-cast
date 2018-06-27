import * as express from 'express';
import * as http from 'http';
import * as path from "path";
import {getPageData} from "../scrapbox";
import {ErrorRequestHandler} from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const {statusCode, message} = err;
    return res.status(statusCode).send({status: statusCode, message: message})
};

const app: express.Express = express();

app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "pug");
app.use(express.static('public'));
app.use("/:tuplespace", async (req, res, next) => {
    res.render("index", {
        tupleSpace: JSON.stringify(req.params.tuplespace),
        pageData: JSON.stringify(await getPageData("hayakawa").catch(next))
    })
});
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
