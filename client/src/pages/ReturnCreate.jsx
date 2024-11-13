import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Create() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [validationn, setValidationn] = useState(null);
  const [valamout, setAmount] = useState(null);
  const [valprice, setprice] = useState(null);
  const [valSalesId, setValSalesId] = useState(null);
  const [valDate, setValDate] = useState(null);
  const [valprodName, setValprodName] = useState(null);
  const [valShopName, setValShopName] = useState(null);
  const [valAction, setValAction] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reco/createreturn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
          confirmButtonText: "Ok",
        });
        return;
      }

      if (res.ok) {
        setPublishError(null);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Record created successfully!",
          confirmButtonText: "Ok",
          confirmButtonColor: "#4F9473",
        }).then(() => {
          // Navigate after successful submission
          navigate("/dashboard/returns");
        });
      }
    } catch (error) {
      setPublishError("Something went wrong");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
        confirmButtonText: "Ok",
        confirmButtonColor: "#F87875",
      });
    }
  };

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleAmoutChange = (e) => {
    const quantity = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers

    if (quantity === "") {
      setAmount(null);
    } else if (!quantityPattern.test(quantity)) {
      if (isNaN(quantity)) {
        setAmount("must be a number");
      }
    } else {
      setFormData({ ...formData, quantity });
      setAmount(null);
    }
  };

  const handleDateChange1 = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date (without time)

    if (selectedDate > currentDate) {
      setValDate("Date cannot be in the future.");
    } else {
      setFormData({ ...formData, date: selectedDate });
      setValDate(null);
    }
  };
  const handleDateChange2 = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date

    if (selectedDate > currentDate) {
      setValDate("Date cannot be in the future.");
    } else {
      setValDate(null);
    }
  };

  const handlepriceChange = (e) => {
    const price = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers

    if (price === "") {
      setprice(null);
    } else if (!quantityPattern.test(price)) {
      if (isNaN(price)) {
        setprice("must be a number");
      } else {
        setprice("must be a positive integer");
      }
    } else {
      setFormData({ ...formData, price });
      setprice(null);
    }
  };

  const preventNegativeInput = (e) => {
    if (e.key === "-" || e.key === "+") {
      e.preventDefault(); // Prevent typing negative or positive signs
    }
  };
  const handleSalesIdChange = (e) => {
    const salesId = e.target.value.trim();
    const salesIdPattern = /^R\d{1,6}$/; // S followed by 1 to 6 digits

    if (salesId === "") {
      setValSalesId(null);
    } else if (!salesIdPattern.test(salesId)) {
      setValSalesId(
        "Product ID must start with 'R' followed by up to 6 digits."
      );
    } else {
      setFormData({ ...formData, id: salesId });
      setValSalesId(null);
    }
  };

  const handleNameChange = (e) => {
    const prodName = e.target.value.trim();

    if (prodName.length < 5) {
      setValprodName("Product name should contain at least 5 characters.");
    } else {
      setFormData({ ...formData, prodName });
      setValprodName(null);
    }
  };

  const handleShopNameChange = (e) => {
    const shop = e.target.value.trim();

    if (shop.length < 5) {
      setValShopName("Shop name should contain at least 5 characters.");
    } else {
      setFormData({ ...formData, shop: shop });
      setValShopName(null);
    }
  };
  
  const handleActionChange = (e) => {
    const action = e.target.value.trim();

    if (action.length < 5) {
      setValAction("Action should contain at least 5 characters.");
    } else {
      setFormData({ ...formData, action: action });
      setValAction(null);
    }
  };
  
  const handleCancel = () => {
    navigate("/dashboard/returns");
  };

  return (
    <div className="h-[850px] shadow-sm shadow-gray-300 bg-white">
      <div className="flex justify-start items-center ml-28">
        <h1 className="text-3xl font-semibold font-family:'Arial', sans-serif text-black mt-[68px] mb-6">
          Add Return Records Details
        </h1>
      </div>
      <div className="flex justify-center mt-4 items-center">
        <form className="flex flex-col mt-10 gap-4" onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-28">
            <div className="mt-[-90px]">
              <div className="mt-[72px]">
                <label className="block text-sm font-medium mb-3">
                  Product Id
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                  type="text"
                  placeholder="Enter Product No"
                  id="id"
                  onChange={handleSalesIdChange}
                />
                {valSalesId && (
                  <p className="mt-0 text-red-400 text-sm h-0 rounded-lg text-center ">
                    {valSalesId}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-3">
                  Product Name
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                  type="text"
                  placeholder="Enter description"
                  id="prodName"
                  onChange={handleNameChange}
                />
                {valprodName && (
                  <p className="mt-0 text-red-400 text-sm h-0 rounded-lg text-center ">
                    {valprodName}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-3">
                  Product quantity
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                  type="text"
                  placeholder="Enter quantity"
                  id="quantity"
                  onChange={handleAmoutChange}
                  onKeyDown={preventNegativeInput}
                />
                {valamout && (
                  <p className="mt-0 text-red-400 text-sm h-0 rounded-lg text-center ">
                    {valamout}
                  </p>
                )}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium mb-3">
                  Product Price
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                  type="text"
                  placeholder="Enter price"
                  id="price"
                  onChange={handlepriceChange}
                  onKeyDown={preventNegativeInput}
                />
                {valprice && (
                  <p className="mt-0 text-red-400 text-sm h-0 rounded-lg text-center ">
                    {valprice}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-3">
                  Return Date
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                  type="date"
                  placeholder="Enter Date"
                  id="date"
                  onChange={handleDateChange1}
                  max={new Date().toISOString().split("T")[0]} // Restrict future dates
                  onKeyUp={handleDateChange2} // Manually validate future dates
                />
                {valDate && (
                  <p className="mt-0 text-red-400 text-sm h-0 rounded-lg text-center ">
                    {valDate}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="mt-[0px]">
                <label className="block text-sm font-medium mb-3">
                  Name of the shop
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                  type="text"
                  placeholder="Enter ShopName"
                  id="shop"
                  onChange={handleShopNameChange}
                />
                {valShopName && (
                  <p className="mt-0 text-red-400 text-sm h-0 rounded-lg text-center ">
                    {valShopName}
                  </p>
                )}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium mb-3">
                  Reason for Return
                </label>
                <select
                  className="bg-slate-100 p-2 border-none rounded-lg w-[400px] h-[40px]"
                  id="reason"
                  onChange={handlchange}
                >
                  <option value="">Select Reason</option>
                  <option value="Expired products">Expired products</option>
                  <option value="Damaged packaging">Damaged packaging</option>
                  <option value="Quality issues">Quality issues</option>
                  <option value="Overstocks">Overstocks</option>
                  <option value="Incorrect deliveries">
                    Incorrect deliveries
                  </option>
                </select>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium mb-3">
                  Action Taken
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                  type="text"
                  placeholder="Enter Action"
                  id="action"
                  onChange={handleActionChange}
                />
                {valAction && (
                  <p className="mt-0 text-red-400 text-sm h-0 rounded-lg text-center ">
                    {valAction}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-3">
                  Agency Number
                </label>
                <select
                  className="bg-slate-100 p-2 border-none rounded-lg w-[400px] h-[40px]"
                  id="agencyNo"
                  onChange={handlchange}
                >
                  <option value="">Select Agency Number</option>{" "}
                  <option value="001">Agency 1</option>
                  <option value="002">Agency 2</option>
                </select>
              </div>
              <div className="mt-12">
                <button
                  className="bg-[#4F9473] uppercase hover:text-white font-serif text-white p-3 rounded-lg w-[150px] h-11 hover:opacity-90 ms-4"
                  type="submit"
                >
                  {" "}
                  Submit
                </button>
                <button
                  className="bg-[#F87875] uppercase hover:text-white font-serif text-white p-3 rounded-lg w-[150px] h-11 hover:opacity-90 ms-16"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
