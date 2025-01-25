const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const bodyParser = require("body-parser")
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const maintenanceRoutes = require("./routes/maintenance")
const reportRoutes = require("./routes/reports")
const transactionRoutes = require("./routes/transactions")
const profileRoutes = require('./routes/profileRoutes');
const bookRoutes = require('./routes/books')
const requestBookRoute = require("./routes/requestBook");

const app = express();

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err))

// middleware
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())


app.use(express.urlencoded({extended: false}))

// Routes
app.use('/', require('./routes/authRoutes'))
app.use("/api/maintenance", maintenanceRoutes)
app.use('/api/reports', reportRoutes);
app.use("/api/transactions", transactionRoutes);
app.use('/api/user', profileRoutes);
app.use(bookRoutes);
app.use("/api", requestBookRoute);


const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`))