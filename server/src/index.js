const express = require('express');
const env = require('dotenv')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const userRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin/auth")
env.config();
mongoose.connect(process.env.MONGO_DB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => {
    console.log('database connected!!!');
}).catch((err) => {
    console.log('err--->',err);
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/admin',adminRoutes)
app.use('/api',userRoutes)
app.listen(process.env.PORT,() => {
    console.log(`Server running at ${process.env.PORT}`);
})