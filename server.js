const express = require("express"),
    bodyParser = require("body-parser");

const app = express();
const history = require('connect-history-api-fallback');
const ApiRoutesShipping = require("./app/api/shipping/shipping.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

ApiRoutesShipping(app)

const staticFileMiddleware = express.static(__dirname);

app.use(history({
    index: './views/index.html',
    disableDotRule: true,
    verbose: true
}));

app.use(staticFileMiddleware);

const PORT = process.env.APP_PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});