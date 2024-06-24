const mongoose = require('mongoose');
const {
    UserSchema
} = require('../../Models/User');
const {
    TaskSchema
} = require('../../Models/Task');

const dbConnection = mongoose.createConnection(process.env.MONGO_DB_URI, {
    dbName: process.env.MONGO_DB_DATABASE, 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

dbConnection.on(
    'connected',
    async () => {
        console.log(`Database connected`);
        global.models = {
            USER: dbConnection.model('users', UserSchema),
            TASK: dbConnection.model('tasks', TaskSchema),
            // PRODUCT: dbConnection.model('products', ProductSchema),
            // CART: dbConnection.model('carts', CartSchema),
            // ORDER: dbConnection.model('orders', OrderSchema),
            // CUSTOMER: dbConnection.model('customers', CustomerSchema),
            // ADMIN: dbConnection.model('admins', AdminSchema),
            // DELIVERY_PARTNER: dbConnection.model('deliveryPartners', DeliveryPartnerSchema),
            // ANALYTICS_USER_VIEWED_PRODUCT: dbConnection.model('analyticsUserViewedProduct', AnalyticsUserViewedProductSchema)
        }
    }
)

// mongoose.connection.on('error', (err) => console.error(err.message))

// mongoose.connection.on('disconnected',(err) => {
//     console.log('Mongoose connection disconnected')
// })

process.on('SIGINT',async() => {
    // await mongoose.connection.close()
    dbConnection.close();
    process.exit(0)
})