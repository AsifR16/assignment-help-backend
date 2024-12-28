const express = require('express')
const app = express()
const OrdersRouter = require('./routes/OrdersRoute');
const AdminRouter = require('./routes/AdminRoute');
const UserRouter = require('./routes/UserRoute');

const port = 3000 || process.env.port

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', OrdersRouter);
app.use("/admin/",AdminRouter)
app.use("/user/",UserRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})