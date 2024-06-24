require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {
    indexRouter
} = require('./routes/index');
const {
    errorHandlingMiddleware
} = require('./helpers/error-handling/customErrorHandlingMiddleware')

const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
   app.use(cors({
        origin: 'https://thriving-haupia-752163.netlify.app',
        credentials: true,  // Enable credentials (cookies, authorization headers) cross-origin
      }));

app.use(express.json({ limit: '10MB' }));
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running at port ${process.env.PORT}`);
    app.use(
        `/api/v1`,
        indexRouter
    );

    app.use(
        errorHandlingMiddleware
    );
    // createDBConnection();
    require("./database/mongoDb/connection")
    // app.use(`/api/v1`, indexRouter);
});