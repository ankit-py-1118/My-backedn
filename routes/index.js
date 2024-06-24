const express   = require('express');
const indexRouter = express.Router();

const {
    UserRoutes
} = require('../routes/UserRoutes');
const {
    TaskRoutes
} = require('../routes/TaskRoutes');

indexRouter.use(
    `/user`,
    UserRoutes
);

indexRouter.use(
    `/task`,
    TaskRoutes
);

module.exports = {
    indexRouter
}
