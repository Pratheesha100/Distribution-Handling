import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [validationn, setValidationn] = useState(null);
  const [query, setQuery] = useState(" ");
  const [agencyNoError, setAgencyNoError] = useState(null);
  const [valamout, setAmount] = useState(null);
  const [valagencyname, setValDescription] = useState(null);
  const [valaddress, setValShopName] = useState(null);

  

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`/api/reco/getall`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setInfo(data.equipment);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, []);

  const handleDeleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F9473",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/reco/delete/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (res.ok) {
            setInfo((prev) => prev.filter((Employe) => Employe._id !== id));
            Swal.fire("Deleted!", "The agency has been deleted.", "success");
          } else {
            Swal.fire("Error!", data.message, "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  //search
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Info]);
    } else {
      // If there's a query, filter the data
      const filteredData = Info.filter(
        (Employe) =>
          Employe.name &&
          Employe.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reco/create", {
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
          confirmButtonColor: "#F87875", // Change button color
          // iconColor: '#d33', // Change icon color
        });
        return;
      }

      if (res.ok) {
        setPublishError(null);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Agency created successfully!",
          confirmButtonColor: "#4F9473", // Change button color
          //iconColor: '#4F9473', // Change icon color
        }).then(() => {
          window.location.reload(); // Reload the page after success
        });
      }
    } catch (error) {
      setPublishError("Something went wrong");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again!",
      });
    }
  };

  const handleAgencyNoChange = (e) => {
    const agencyNo = e.target.value.trim();
    const agencyNoPattern = /^[0-9]{1,3}$/; // Pattern for positive numbers with max length 3
    // If the input contains a "-", prevent further typing
    if (e.target.value.includes("-")) {
      e.target.value = e.target.value.replace("-", ""); // Remove the "-" sign
      return;
    }
    if (agencyNo === "") {
      setAgencyNoError(null); // No error if the field is empty
    } else if (!agencyNoPattern.test(agencyNo)) {
      if (isNaN(agencyNo)) {
        setAgencyNoError("Agency No must be a number");
      } else if (agencyNo.length > 3) {
        setAgencyNoError("Agency No can only have up to 3 digits");
      } else {
        setAgencyNoError("Invalid input");
      }
    } else if (parseInt(agencyNo) <= 0) {
      setAgencyNoError("Agency No must be a positive number"); // No negative or zero allowed
    } else {
      setFormData({ ...formData, AgencyNo: agencyNo }); // Valid agency number
      setAgencyNoError(null); // Clear error
    }
  };

  const handleAmoutChange = (e) => {
    const Staffamount = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers
    // If the input contains a "-", prevent further typing
    if (e.target.value.includes("-")) {
      e.target.value = e.target.value.replace("-", ""); // Remove the "-" sign
      return;
    }
    if (Staffamount === "") {
      setAmount(null);
    } else if (!quantityPattern.test(Staffamount)) {
      if (isNaN(Staffamount)) {
        setAmount("must be a number");
      } else {
        setAmount("must be a positive integer");
      }
    } else {
      setFormData({ ...formData, Staffamount });
      setAmount(null);
    }
  };

  const handleContactChange = (e) => {
    const contactNumber = e.target.value.trim();

    // Pattern for a valid contact number (example: 10 digits)
    const contactPattern = /^\d{10}$/;

    if (contactNumber === "") {
      setValidationn(null);
    } else if (!contactPattern.test(contactNumber)) {
      if (isNaN(contactNumber)) {
        setValidationn("Contact number must be a number");
      } else {
        setValidationn("Contact number must be a valid 10-digit number");
      }
    } else {
      setFormData({ ...formData, contactNumber });
      setValidationn(null);
    }
  };

  const [emailValidation, setEmailValidation] = useState(null);

  const handleEmailChange = (e) => {
    const email = e.target.value.trim();

    // Simple email pattern (adjust as needed)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      setEmailValidation(null); // No error if field is empty
    } else if (!emailPattern.test(email)) {
      setEmailValidation("Please enter a valid email address"); // Invalid email
    } else {
      setFormData({ ...formData, email }); // Valid email
      setEmailValidation(null); // Clear error
    }
  };

  const handleAgencyNameChange = (e) => {
    const AgencyName = e.target.value.trim();

    if (AgencyName.length < 5) {
      setValDescription("Agency name should contain at least 5 characters.");
    } else {
      setFormData({ ...formData, AgencyName });
      setValDescription(null);
    }
  };

  const handleAddressChange = (e) => {
    const address = e.target.value.trim();

    if (address.length < 5) {
      setValShopName("Address should contain at least 5 characters.");
    } else {
      setFormData({ ...formData, address: address });
      setValShopName(null);
    }
  };

  return (
    <div className="relative h-[1200px]">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div>
          <div className="flex justify-start items-center">
            <div>
              <h1 className="text-3xl font-bold font-family:'Arial', sans-serif fontopacity-90 uppercase text-black ml-7">
                Record Agency Details
              </h1>
              <h2 className="text-lg font-medium mt-6 opacity-70 ml-14">
                Add New Agency
              </h2>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <div className="flex justify-center items-center mt-2">
              <form
                className="flex flex-col gap-4 mt-2"
                onSubmit={handleSubmit}
              >
                <div className="flex justify-center items-center gap-28">
                  {/* Left Column - Agency Name, Address, Contact Number */}
                  <div className="mt-1">
                    <div className="mt-[-50px]">
                      <label className="block text-sm font-medium mb-2">
                        Agency Name
                      </label>
                      <input
                        className="bg-[#F0F5F2] p-3 border-none rounded-lg w-[400px] h-10 text-balck"
                        type="text"
                        placeholder="Agency Name"
                        id="AgencyName"
                        onChange={handleAgencyNameChange}
                      />
                      {valagencyname && (
                        <p className="mt-0 text-red-400 text-sm h-0 rounded-lg text-center ">
                          {valagencyname}
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">
                        Agency No:
                      </label>
                      <input
                        className="bg-[#F0F5F2] p-3 border-none rounded-lg w-[400px] h-10 text-balck"
                        type="text"
                        placeholder="Agency Number"
                        id="AgencyNo"
                        onChange={handleAgencyNoChange}
                      />
                      {agencyNoError && (
                        <p className="text-[#F87875] text-sm">
                          {agencyNoError}
                        </p>
                      )}
                    </div>
                    <div className="mt-5">
                      <label className="block text-sm font-medium mb-2">
                        Address
                      </label>
                      <input
                        className="bg-[#F0F5F2] p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="Address"
                        id="address"
                        onChange={handleAddressChange}
                      />
                       {valaddress && (
                        <p className="mt-0 text-red-400 text-sm h-0 rounded-lg text-center ">
                          {valaddress}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Email, Staff Amount, Submit Button */}
                  <div>
                    <div className="mt-[46px]">
                      <label className="block text-sm font-medium mb-2">
                        Contact Number
                      </label>
                      <input
                        className="bg-[#F0F5F2] p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="Contact Number"
                        id="contactNumber"
                        maxLength={10}
                        onChange={handleContactChange}
                      />
                      {validationn && (
                        <p className="text-sm text-[#F87875] mt-0 text-center">
                          {validationn}
                        </p>
                      )}
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        className="bg-[#F0F5F2] p-3 border-none rounded-xl w-[400px] h-10"
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleEmailChange}
                      />
                      {emailValidation && (
                        <p className="text-sm text-[#F87875] mt-0 text-center">
                          {emailValidation}{" "}
                        </p>
                      )}
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-2">
                        Staff Amount
                      </label>
                      <input
                        className="bg-[#F0F5F2] p-3 border-none rounded-lg w-[400px] h-10"
                        type="text"
                        placeholder="Staff Amount"
                        id="Staffamount"
                        onChange={handleAmoutChange}
                      />
                      {valamout && (
                        <p className="text-smt text-[#F87875] mt-0 text-center">
                          {valamout}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-center mt-10">
                      <button
                        className="bg-[#4F9473] text-white uppercase font-semibold p-2 rounded-xl w-[200px] h-11 hover:opacity-90 "
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Table Section for Displaying Agencies */}
          <div className="bg-[#F7FAFC] w-full lg:w-[600px] xl:w-[1216px] md:w-[700px] h-auto mt-20 rounded-lg">
            <div className="max-h-96 overflow-y-auto rounded-lg">
              <table className="w-full divide-y divide-[#E9ECEF]">
                <thead className="bg-[#F7FAFC]  text-black text-opacity-80 ">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                      Agency Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                      Agency No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                      Contact Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                      Staff Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                      Edit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-none divide-y divide-[#E9ECEF]">
                  {filter && filter.length > 0 ? (
                    filter.map((Employe) => (
                      <tr key={Employe._id} className="dark:bg-gray-800">
                        <td className="px-6 py-4 font-normal">
                          {Employe.AgencyName}
                        </td>
                        <td className="px-6 py-4 font-normal">
                          {Employe.AgencyNo}
                        </td>
                        <td className="px-6 py-4 font-normal">
                          {Employe.contactNumber}
                        </td>
                        <td className="px-6 py-4 font-normal">
                          {Employe.Staffamount}
                        </td>
                        <td className="px-6 py-4 font-normal">
                          {Employe.address}
                        </td>
                        <td className="px-6 py-4 font-normal">
                          {Employe.email}
                        </td>

                        <td className="px-2 py-4 whitespace-nowrap">
                          <Link to={`/dashboard/manage/${Employe._id}`}>
                            <button className="bg-[#4F9473] text-white text-opacity-80 rounded-lg h-9 w-20 hover:opacity-80">
                            
                              Edit
                            </button>
                          </Link>
                        </td>

                        <td className="px-2 py-4 whitespace-nowrap">
                          <span>
                            <button
                              className="bg-[#F87875] text-white text-opacity-80 rounded-lg h-9 w-20 hover:opacity-80"
                              onClick={() => handleDeleteUser(Employe._id)}
                            >
                              Delete
                            </button>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-2xl font-serif absolute ml-[480px] opacity-60 mt-14"
                      >
                      You have no record
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
