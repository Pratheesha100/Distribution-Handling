import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function SaleUpdate() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { saled } = useParams();

  useEffect(() => {
    const fetchE = async () => {
      try {
        const res = await fetch(`/api/reco/getallreturns?upId=${saled}`);
        const data = await res.json();

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }

        const selectedE = data.equipment.find((Employe) => Employe._id === saled
        );
        if (selectedE) {
          if (selectedE.date) {
            selectedE.date = new Date(selectedE.date).toISOString().split("T")[0];
          }
          setFormData(selectedE);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchE();
  }, [saled]);

  const validateForm = () => {
    const errors = {};
    const idPattern = /^R\d{0,5}$/;

    if (!formData.id || !idPattern.test(formData.id)) {
      errors.id = "ID must start with 'R' and be up to 6 characters long";
    }
   // if (!formData.id) errors.id = "ID is required";
    if (!formData.quantity) {
      errors.quantity = "Quantity is required";
    } else if (isNaN(formData.quantity)) {
      errors.quantity = "Quantity must be a number";
    }
    if (!formData.price) {
      errors.price = "Price is required";
    } else if (isNaN(formData.price)) {
      errors.price = "Price must be a number";
    }
    if (!formData.prodName) {
      errors.prodName = "Product name is required";
    } else if (formData.prodName.length < 5) {
      errors.prodName = "Name should contain at least 5 characters";
    }
    if (!formData.shop) {
      errors.shop = "Shop Name is required";
    } else if (formData.shop.length < 5) {
      errors.shop = "Shop Name should contain at least 5 characters";
    }
    if (!formData.reason) errors.reason = "Reason is required";
    if (!formData.action) {
      errors.action = "Action is required";
    } else if (formData.action.length < 4) {
      errors.description = "Action should contain at least 4 characters";
    }
    if (!formData.date) errors.date = "Date is required";
    if (new Date(formData.date) > new Date()) {
      errors.date = "Date cannot be in the future";
    }
    if (!formData.agencyNo) errors.agencyNo = "Agency Number is required";


    return errors;
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "-" || Number(value) < 0) {
      return; // Freeze input
    }
    setFormData({ ...formData, quantity: value });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === "-" || Number(value) < 0) {
      return; // Freeze input
    }
    setFormData({ ...formData, price: value });
  };

  const handleIdChange = (e) => {
    const value = e.target.value;
    if (value.length > 6) {
      return; // Freeze input if more than 6 characters
    }
    setFormData({ ...formData, id: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({}); // Clear previous errors

    try {
      const res = await fetch(`/api/reco/updatereturn/${formData._id}`, {
        method: "PUT",
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
          title: "Update Failed",
          text: data.message,
        });
        return;
      }
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "The record has been successfully updated.",
        confirmButtonText: "Ok",
        confirmButtonColor: "#4F9473",
      }).then(() => {
        navigate("/dashboard/returns");
      });
    } catch (error) {
      setPublishError("Something went wrong");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong, please try again.",
        confirmButtonText: "Ok",
        confirmButtonColor: "#F87875",
      });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/returns");
  };

  return (
    <div className="h-[850px] shadow-sm shadow-gray-300 bg-white">
      <div className="flex justify-start items-center ml-28">
        <h1 className="text-3xl font-semibold font-family:'Arial', sans-serif text-black mt-[70px]">
          Update Returned Product Details
        </h1>
      </div>
      <div className="flex justify-center mt-4 items-center">
        <form className="flex flex-col mt-10 gap-4" onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-28">
            <div className="mt-[-90px]">
              <div className="mt-[70px]">
                <label className="block text-sm font-medium mb-3">
                  Product Id
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                  type="text"
                  placeholder="Sales No"
                  id="id"
                  onChange={handleIdChange}
                  value={formData.id}
                />
                {formErrors.id && (
                  <p className="text-[#f57371] absolute">{formErrors.id}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-3">
                  Product Name
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                  type="text"
                  placeholder="Name"
                  id="prodName"
                  onChange={(e) =>
                    setFormData({ ...formData, prodName: e.target.value })
                  }
                  value={formData.prodName}
                />
                {formErrors.prodName && (
                  <p className="text-[#f57371] absolute">{formErrors.prodName}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-3">
                  Product quantity
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                  type="text"
                  placeholder="Quantity"
                  id="quantity"
                  onChange={handleQuantityChange}
                  value={formData.quantity}
                />
                {formErrors.quantity && (
                  <p className="text-[#f57371] absolute">
                    {formErrors.quantity}
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
                  placeholder="Price"
                  id="price"
                  onChange={handlePriceChange }
                  value={formData.price}
                />
                {formErrors.price && (
                  <p className="text-[#f57371] absolute">{formErrors.price}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-3">Date</label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                  type="date"
                  placeholder="Date"
                  id="date"
                  max={new Date().toISOString().split("T")[0]} // Max date is today
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  value={formData.date}
                />
                {formErrors.date && (
                  <p className="text-[#f57371] absolute">{formErrors.date}</p>
                )}
              </div>
            </div>
            <div>
              <div className="mt-[0px]">
                <label className="block text-sm font-medium mb-3">
                  Name of the Shop
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                  type="text"
                  placeholder="Shop Name"
                  id="shop"
                  onChange={(e) =>
                    setFormData({ ...formData, shop: e.target.value })
                  }
                  value={formData.shop}
                />
                {formErrors.shop && (
                  <p className="text-[#f57371] absolute">
                    {formErrors.shop}
                  </p>
                )}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium mb-3">
                  Reason for return
                </label>
                <select
                  className="bg-slate-100 p-2 border-none rounded-lg w-[400px] h-[40px]"
                  type="text"
                  id="reason"
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  value={formData.reason}
                  >
                 <option value="">Select Reason</option>
                <option value="Expired products">Expired products</option>
                <option value="Damaged packaging">Damaged packaging</option>
                <option value="Quality issues">Quality issues</option>
                <option value="Overstocks">Overstocks</option>
                <option value="Incorrect deliveries">Incorrect deliveries</option>
                </select>
                {formErrors.reason && (
                  <p className="text-[#f57371] absolute">{formErrors.reason}</p>
                )}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium mb-3">
                  Action Taken
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                  type="text"
                  placeholder="Action"
                  id="action"
                  onChange={(e) =>
                    setFormData({ ...formData, action: e.target.value })
                  }
                  value={formData.action}
                />
                {formErrors.action && (
                  <p className="text-[#f57371] absolute">
                    {formErrors.action}
                  </p>
                )}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium mb-3">
                  Agency Number
                </label>
                <select
                  className="bg-slate-100 p-2 border-none rounded-lg w-[400px] h-[40px]"
                  placeholder="Agency NO"
                  id="agencyNo"
                  onChange={(e) =>
                    setFormData({ ...formData, agencyNo: e.target.value })
                  }
                  value={formData.agencyNo}
                >
                  <option value="">Select Agency Number</option>
                  <option value="001">Agency 1</option>
                  <option value="002">Agency 2</option>
                </select>
                {formErrors.agencyNo && (
                  <p className="text-[#f57371] absolute">
                    {formErrors.agencyNo}
                  </p>
                )}
              </div>
              <div className="mt-12">
                <button
                  className="bg-[#4F9473] uppercase hover:text-white font-serif text-white p-3 rounded-lg w-[150px] h-11 hover:opacity-90 ms-4"
                  type="submit"
                >
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
          {publishError && (
            <p className="text-[#f57371] absolute">{publishError}</p>
          )}
        </form>
      </div>
    </div>
  );
}
