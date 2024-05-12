// const employees = require("./routes/api/employees.js")
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./src/routes/productRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');
const orderRoutes = require('./src/routes/orderRoutes.js');

const app = express();
app.use(express.json());
mongoose.connect('mongodb+srv://hossam:hossamserver@cluster0.siynfwj.mongodb.net/web').then(
	()=>{
		console.log("connected to db");
	}
).catch(err => console.log(err));

app.use('/product',productRoutes);
app.use('/user',userRoutes);
app.use('/order',orderRoutes);



// app.use('/employees', employees);
//app.use('/courses', courses);




const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Running on http://localhost:${PORT}`);
});
