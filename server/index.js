require('dotenv').config();
const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const DbConnection=require('./Utils/Db')
const AuthRoutes=require('./Routes/Auth')
const app=express();

DbConnection();

app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,
    optionsSuccessStatus:204
}));

app.use(cookieParser());
app.use('/api/auth',AuthRoutes);
app.listen(process.env.PORT,()=>{
    console.log('Listening on port',process.env.PORT)
})