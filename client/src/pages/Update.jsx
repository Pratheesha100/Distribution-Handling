import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Update() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const { idd } = useParams();

  useEffect(() => {
    const fetchE = async () => {
      try {
        const res = await fetch(`/api/reco/getall?upId=${idd}`);
        const data = await res.json();

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }

        const selectedE = data.equipment.find((Employe) => Employe._id === idd);
        if (selectedE) {
          setFormData(selectedE);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchE();
  }, [idd]);

  const validateForm = () => {
    const errors = {};

    if (!formData.AgencyName) {
      errors.AgencyName = "Agency Name is required";
    } else if (formData.AgencyName.length < 5) {
      errors.AgencyName = "Agency Name should contain at least 5 characters";
    }

    if (!formData.address) {
      errors.address = "Address is required";
    } else if (formData.address.length < 5) {
      errors.address = "Address should contain at least 5 characters";
    }

    if (!formData.contactNumber) {
      errors.contactNumber = "Contact Number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      errors.contactNumber = "Contact number must be a valid 10-digit number";
    }

    if (!formData.email) errors.email = "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Email must be in a valid format";
    }

    if (!formData.Staffamount) {
      errors.Staffamount = "Staff Amount is required";
    } else if (isNaN(formData.Staffamount)) {
      errors.Staffamount = "Staff Amount must be a number";
    }
    if (!formData.AgencyNo) {
      errors.AgencyNo = "Agency No is required";
    } else if (!/^\d{1,3}$/.test(formData.AgencyNo)) {
      errors.AgencyNo = "Agency No must be a valid number with up to 3 digits";
    }
    return errors;
  };

  const handleAgencyNoChange = (e) => {
    const value = e.target.value;
    
    // Allow only numbers and ensure max 3 digits
    if (/^\d{0,3}$/.test(value)) {
      setFormData({ ...formData, AgencyNo: value });
    }
  };

  const handleStaffAmountChange = (e) => {
    const value = e.target.value;
  
    // Allow only positive numbers (including 0)
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, Staffamount: value });
    }
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
      const res = await fetch(`/api/reco/updatee/${formData._id}`, {
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
          icon: 'error',
          title: 'Update Failed',
          text: data.message,
          confirmButtonText: 'OK',
          confirmButtonColor: '#F87875'
        });
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'The agency details have been updated.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4F9473', // Change button color
        //iconColor: '#4F9473', // Change icon color
      }).then(() => {
        // Navigate after success
        navigate("/dashboard/manageemp");
      });
    } catch (error) {
      setPublishError("Something went wrong");
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: 'Unable to update the agency details.',
        confirmButtonText: 'OK'
      });
    }
  };
  const handleCancel = () => {
    navigate("/dashboard/manageemp"); 
  };

  return (
    <div className="h-[550px] shadow-sm shadow-gray-300 bg-white">
      <div className="lex justify-start items-center ml-28 mt-2">
        <h1 className=" font-semibold font-family:'Arial', sans-serif text-3xl text-black mt-12">
          Agency Details Update
        </h1>
      </div>
      <div className="flex justify-center mt-4 items-center">
        <form className="flex flex-col mt-10 gap-4" onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-28">
            <div>
              <div className="mt-[-29px]">
                <label className="block text-sm font-medium mb-3">
                  Agency Name
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10 mb-2"
                  type="text"
                  placeholder="Agency Name"
                  id="AgencyName"
                  onChange={(e) =>
                    setFormData({ ...formData, AgencyName: e.target.value })
                  }
                  value={formData.AgencyName}
                />
                {formErrors.AgencyName && (
                  <p className="text-[#F87875] absolute">
                    {formErrors.AgencyName}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-3">
                  Address
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10 mb-2"
                  type="text"
                  placeholder="Address"
                  id="address"
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  value={formData.address}
                />
                {formErrors.address && (
                  <p className="text-[#F87875] absolute">
                    {formErrors.address}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-3">
                  Contact Number
                </label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10 mb-2"
                  type="text"
                  placeholder="Contact Number"
                  id="contactNumber"
                  maxLength={10}
                  onChange={(e) =>
                    setFormData({ ...formData, contactNumber: e.target.value })
                  }
                  value={formData.contactNumber}
                />
                {formErrors.coontactNumber && (
                  <p className="text-[#F87875] absolute">
                    {formErrors.contactNumber}
                  </p>
                )}
              </div>
            </div>

            <div>
            <div className="mt-[35px]">
                <label className="block text-sm font-medium mb-3">Agency No</label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10 mb-2"
                  type="text"
                  placeholder="Agency No"
                  id="AgencyNo"
                  onChange={handleAgencyNoChange}
                  value={formData.AgencyNo}
                />
                 {formErrors.AgencyNo && (
                  <p className="text-[#F87875] absolute">
                  {formErrors.AgencyNo}
                </p>
                )}
              </div>
              
              <div className="mt-1">
                <label className="block text-sm font-medium mb-3">Email</label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10 mb-2"
                  type="text"
                  placeholder="Email"
                  id="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                />
                {formErrors.email && (
                  <p className="text-[#F87875] absolute">{formErrors.email}</p>
                )}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium mb-3">Staff Amount</label>
                <input
                  className="bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10 mb-2"
                  type="text"
                  placeholder="Staff Amount"
                  id="Staffamount"
                  onChange={handleStaffAmountChange}
                  value={formData.Staffamount}
                />
                {formErrors.Staffamount && (
                  <p className="text-[#F87875] absolute">
                    {formErrors.Staffamount}
                  </p>
                )}
              </div>
              <div className="mt-6">
                <button
                  className="bg-[#4F9473] uppercase hover:text-white font-serif text-white p-3 rounded-lg w-[150px] h-11 hover:opacity-90 ms-4"
                  type="submit"
                >Submit
                </button>
                <button
                  className="bg-[#F87875]  uppercase hover:text-white font-serif text-white p-3 rounded-lg w-[150px] h-11 hover:opacity-90 ms-16"
                  type="button"
                  onClick={handleCancel}
                > Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
        {publishError && <p className="text-[#F87875]">{publishError}</p>}
      </div>
    </div>
  );
}
