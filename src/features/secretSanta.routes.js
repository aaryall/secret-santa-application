import express from "express";
import {FileServiceController} from './secretSanta.controller.js'
import {upload} from '../middlewares/file-upload.middleware.js'
const routerCSVtoJSON = express.Router();



routerCSVtoJSON.get('/', (req,res)=>{
    res.send('Hello World');
})
routerCSVtoJSON.post('/upload',upload.single('EmployeeList'),(req,res)=>{
    FileServiceController.generateData(req , res);
})

export default routerCSVtoJSON;