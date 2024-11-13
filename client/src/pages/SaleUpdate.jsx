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
        const res = await fetch(`/api/reco/getallsale?upId=${saled}`);
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
    const idPattern = /^S\d{0,5}$/;

    if (!formData.id || !idPattern.test(formData.id)) {
      errors.id = "ID must start with 'S' and be up to 6 characters long";
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
    if (!formData.description) {
      errors.description = "Description is required";
    } else if (formData.description.length < 5) {
      errors.description = "Description should contain at least 5 characters";
    }
  
    if (!formData.ShopName) {
      errors.ShopName = "Shop Name is required";
    } else if (formData.ShopName.length < 5) {
      errors.ShopName = "Shop Name should contain at least 5 characters";
    }
    if (!formData.RepId) errors.RepId = "Rep ID is required";
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
      const res = await fetch(`/api/reco/upd/${formData._id}`, {
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
        title: "Sales Updated",
        text: "The sales record has been successfully updated.",
        confirmButtonText: "Ok",
        confirmButtonColor: "#4F9473",
      }).then(() => {
        navigate("/dashboard/Product");
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
    navigate("/dashboard/Product");
  };

  return (
    <div className="h-[850px] shadow-sm shadow-gray-300 bg-white">
      <div className="flex justify-start items-center ml-28">
        <h1 className="text-4xl font-semibold font-family:'Arial', sans-serif text-black mt-[70px]">
          Update Sales Details
        </h1>
      </div>
      <div className="flex justify-center mt-4 items-center">
        <form className="flex flex-col mt-10 gap-4" onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-28">
            <div className="mt-[-90px]">
              <div className="mt-4">
                <label className="block text-sm font-medium mb-3">
                  Sales No
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
                  Sales Description
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                  type="text"
                  placeholder="Description"
                  id="description"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  value={formData.description}
                />
                {formErrors.description && (
                  <p className="text-[#f57371] absolute">{formErrors.description}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-3">
                  Sales quantity
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
                  Sales Price
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
            </div>
            <div>
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
              <div className="mt-6">
                <label className="block text-sm font-medium mb-3">
                  Name of the Shop
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                  type="text"
                  placeholder="Shop Name"
                  id="ShopName"
                  onChange={(e) =>
                    setFormData({ ...formData, ShopName: e.target.value })
                  }
                  value={formData.ShopName}
                />
                {formErrors.ShopName && (
                  <p className="text-[#f57371] absolute">
                    {formErrors.ShopName}
                  </p>
                )}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium mb-3">
                  Representative Officer ID
                </label>
                <select
                  className="bg-slate-100 p-2 border-none rounded-lg w-[400px] h-[40px]"
                  type="text"
                  placeholder="Rep Id"
                  id="RepId"
                  onChange={(e) =>
                    setFormData({ ...formData, RepId: e.target.value })
                  }
                  value={formData.RepId}
                  >
                  <option value="">Select Rep ID</option>
                  <option value="E001">E001</option>
                  <option value="E002">E002</option>
                  <option value="E003">E003</option>
                  <option value="E004">E004</option>
                  <option value="E005">E005</option>
                  <option value="E006">E006</option>
                  <option value="E007">E007</option>
                  <option value="E008">E008</option>
                  <option value="E009">E009</option>
                  <option value="E010">E010</option>
                </select>
                {formErrors.RepId && (
                  <p className="text-[#f57371] absolute">{formErrors.RepId}</p>
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
