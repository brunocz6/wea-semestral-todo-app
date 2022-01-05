import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, authorization, x-refresh, crossdomain');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.listen(port, host, () => {
    log.info(`Server listening at http://${host}:${port}`);

    connect();
    routes(app);
});