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

app.use(cors({
    origin: "*"
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