import express from "express";
import { create, createemployee, createproduct, createsale, deletedata, deletesale, 
         getAll, getAllemployee, getAllproduct, getAllProduct, getAllsale, getAllSale,
         getallEmployee, update, updatesale,
         createReturn,getAllReturns,getAllReturnForChart,deleteReturn,updateReturn,} from "../controllers/record.controller.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.put( '/updatee/:EId', update);
route.delete( '/delete/:EEEId', deletedata);

route.post("/createproduct", createproduct);
route.get("/getallProduct", getAllproduct);//chart
route.get("/getallproduct", getAllProduct);//table

route.post("/createsale", createsale);
route.get("/getallsale", getAllsale);//table
route.get("/getallSale", getAllSale);//chart
route.put( '/upd/:sleId', updatesale);
route.delete( '/dele/:saleId', deletesale);

route.post("/createemployee", createemployee);
route.get("/getallemployee", getAllemployee);//table
route.get("/getAllemployee", getallEmployee);//chart

route.post("/createreturn", createReturn);
route.get("/getallreturns", getAllReturns); // For table
route.get("/getallReturn", getAllReturnForChart); // For chart
route.put("/updatereturn/:returnId", updateReturn);
route.delete("/deletereturn/:returnId", deleteReturn);

export default route;