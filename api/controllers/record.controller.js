import Agency from "../models/Agency.model.js";
import Employee from "../models/Employee.model.js";
import Record from "../models/Record.model.js";
import Sale from "../models/Sales.model.js";
import Returns from "../models/Returns.model.js";



//recordagency
export const create = async (req, res, next) => {
  const { AgencyName,
    AgencyNo,contactNumber,Staffamount,address,email,} = req.body;

  const newmark = new Agency({
    AgencyName,AgencyNo,contactNumber,Staffamount,address,email,
    
  });
  try {
    const savedeuip = await newmark.save();
    res.status(201).json(savedeuip);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const equipment = await Agency.find();

    if (equipment.length > 0) {
      res.json({
        message: "equipment detail retrieved successfully",
        equipment,
      });
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};

export const deletedata  = async (req, res, next) => {
  try {
    await Agency.findByIdAndDelete(req.params.EEEId);
    res.status(200).json("The equipment has been deleted");
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const updateequipment = await Agency.findByIdAndUpdate(
      req.params.EId,
      {
        $set: {
          AgencyName: req.body.AgencyName,
          AgencyNo: req.body.AgencyNo,
          contactNumber: req.body.contactNumber,
          Staffamount: req.body.Staffamount,
          address: req.body. address,
          email: req.body.email,
          
        },
      },
      { new: true }
    );
    res.status(200).json(updateequipment);
  } catch (error) {
    next(error);
  }
};



//product 
export const createproduct = async (req, res, next) => {
  const { id,
    productname,manufactureDate,expiredate,batchnumber,price,
    vehicleid,driveid,deliverid,agencyNo
  } = req.body;

  const newmark = new Record({
    id,
    productname,manufactureDate,expiredate,batchnumber,price,
    vehicleid,driveid,deliverid,agencyNo
    });
  try {
    const savedeuip = await newmark.save();
    res.status(201).json(savedeuip);
  } catch (error) {
    next(error);
  }
};

 export const getAllproduct = async (req, res, next) => {
  try {
    const equipment = await Record.find();

    if (equipment.length > 0) {
      res.json({
        message: "equipment detail retrieved successfully",
        equipment,
      });
    }
  } catch (error) {
     console.log(error.message);

     next(error);
  }
 };

export const getAllProduct = async (req, res, next) => {
  try {
    const { agencyNo } = req.query;
    let equipment;

    if (agencyNo) {
      equipment = await Returns.find({ agencyNo });
    } else {
      equipment = await Returns.find();
    }
    if (equipment.length > 0) {
      res.json({
        message: "Returns details retrieved successfully",
        equipment: equipment,
      });
    } else {
      res.json({
        message: "No return records found",
        equipment: [],
      });
      }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};


//Returned products

export const createReturn = async (req, res, next) => {
  const { id, prodName, quantity, date, reason, price, shop, action, agencyNo } = req.body;

  const newReturn = new Returns({
    id,
    prodName,
    quantity,
    date,
    reason,
    price,
    shop,
    action,
    agencyNo,
  });

  try {
    const savedReturn = await newReturn.save();
    res.status(201).json(savedReturn);
  } catch (error) {
    next(error);
  }
};

// GET (Read) specific Returns for chart
export const getAllReturns = async (req, res, next) => {
  try {
    const { agencyNo } = req.query;
    let returns;

    if (agencyNo) {
      returns = await Returns.find({ agencyNo });
    } else {
      returns = await Returns.find();
    }

    if (returns.length > 0) {
      res.json({
        message: "Returns details retrieved successfully",
        equipment: returns,
      });
    } else {
      res.json({
        message: "No return records found",
        equipment: [],
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// GET (Read) all Returns
export const getAllReturnForChart = async (req, res, next) => {
  try {
    const equipment = await Returns.find();

    if (equipment.length > 0) {
      res.json({
        message: "Return details retrieved successfully",
        equipment,
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// DELETE operation for Returns
export const deleteReturn = async (req, res, next) => {
  try {
    const result = await Returns.findByIdAndDelete(req.params.returnId);
    if (!result) {
      return res.status(404).json({ message: "Return not found" });
    }
    res.status(200).json("The return record has been deleted");
  } catch (error) {
    next(error);
  }
};

// UPDATE operation for Returns
export const updateReturn = async (req, res, next) => {
  try {
    const updateReturn = await Returns.findByIdAndUpdate(
      req.params.returnId,
      {
        $set: {
          id: req.body.id,
          prodName: req.body.prodName,
          quantity: req.body.quantity,
          date:req.body.date,
          reason: req.body.reason,
          price: req.body.price,
          shop: req.body.shop,
          action: req.body.action,
          agencyNo: req.body.agencyNo,
        },
      },
      { new: true }
    );
    res.status(200).json(updateReturn);
  } catch (error) {
    next(error);
  }
};


//sales
export const createsale = async (req, res, next) => {
  const { id,
    description,quantity,price,
    date,ShopName,RepId,agencyNo} = req.body;

  const newmark = new Sale({
    id,description,quantity,price,
    date,ShopName,RepId,agencyNo
  });
  try {
    const savedeuip = await newmark.save();
    res.status(201).json(savedeuip);
  } catch (error) {
    next(error);
  }
};

export const getAllsale = async (req, res, next) => {
  try {
    const { agencyNo } = req.query; 
    let sales;

    if (agencyNo) {
      sales = await Sale.find({ agencyNo });
    } else {
      sales = await Sale.find();
    }
if (sales.length > 0) {
      res.json({
        message: "Sales details retrieved successfully",
        equipment: sales,
      });
    } else {
      res.json({
        message: "No sales records found",
        equipment: [],
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getAllSale = async (req, res, next) => {
  try {
    const equipment = await Sale.find();

    if (equipment.length > 0) {
      res.json({
        message: "equipment detail retrieved successfully",
        equipment,
      });
    }
  } catch (error) {
     console.log(error.message);

     next(error);
  }
 };


export const deletesale  = async (req, res, next) => {
  try {
    const result = await Sale.findByIdAndDelete(req.params.saleId);
    if (!result) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json("The sale record has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updatesale = async (req, res, next) => {
  try {
    const updateequipment = await Sale.findByIdAndUpdate(
      req.params.sleId,
      {
        $set: {
          id: req.body.id,
          description: req.body.description,
          price: req.body.price,
          quantity: req.body.quantity,
          date: req.body.date,
          ShopName: req.body.ShopName,
          RepId: req.body.RepId,
          agencyNo: req.body.agencyNo,
          
        },
      },
      { new: true }
    );
    res.status(200).json(updateequipment);
  } catch (error) {
    next(error);
  }
};



//employee
export const createemployee = async (req, res, next) => {
  const { 
    id,name,agency,employmentdate,contact,
    targets,agencyNo,month
  } = req.body;

  const newmark = new Employee({
    id,name,agency,employmentdate,contact,
    targets,agencyNo,month
  });
  try {
    const savedeuip = await newmark.save();
    res.status(201).json(savedeuip);
  } catch (error) {
    next(error);
  }
};

export const getallEmployee = async ( res, next) => {
  try {
    const employees = await Employee.find();

    if (employees.length > 0) {
      res.json({
        message: "Employee detail retrieved successfully",
        employees,
      });
    }
    else {
      res.json({
        message: "No employee details found",
        employees: [],  // Sending an empty array to be consistent
      });
    }
  } catch (error) {
     console.log(error.message);
     next(error);
  }
 };

export const getAllemployee = async (req, res, next) => {
  try {
    const { agencyNo } = req.query;

    let filter = {};
    if (agencyNo) {
      filter = { agencyNo };
    }

    const employees = await Employee.find(filter);

    if (employees.length > 0) {
      res.json({
        message: "Employee details retrieved successfully",
        employees,
      });
    } else {
      res.json({
        message: "No employees found",
        employees: [],
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};




