import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from 'sweetalert2';

export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  const [selectedAgency, setSelectedAgency] = useState("");
  const [returnData, setReturnData] = useState([]); 
  const [totalReturnQuantity, setTotalReturnQuantity] = useState(0); 
  const [totalReturnPrice, setTotalReturnPrice] = useState(0);

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const agencyParam = selectedAgency ? `?agencyNo=${selectedAgency}` : ""; // Pass agencyNo if selected
        const res = await fetch(`/api/reco/getallsale${agencyParam}`); // Modify API call to include query param
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setInfo(data.equipment);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

const fetchReturns = async () => {
      try {
        const agencyParam = selectedAgency ? `?agencyNo=${selectedAgency}` : ""; // Pass agencyNo if selected
        const res = await fetch(`/api/reco/getallreturns${agencyParam}`); // Fetch returned products based on agency
        const data = await res.json();

        if (res.ok) {
          setReturnData(data.equipment);

          // Calculate total quantity and total price of returned products
          const totalQuantity = data.equipment.reduce((total, item) => total + Number(item.quantity), 0);
          const totalPrice = data.equipment.reduce((total, item) => total + Number(item.price), 0);
         

          setTotalReturnQuantity(totalQuantity);
          setTotalReturnPrice(totalPrice);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchReturns();
    fetchinfo();
  }, [selectedAgency]);

  const handleDeleteUser = async (saleId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4F9473',
        cancelButtonColor: '#F87875',
        confirmButtonText: 'Yes, delete it!'
      });
      if (result.isConfirmed) {
        const res = await fetch(`/api/reco/dele/${saleId}`, {
          method: 'DELETE',
        });

      const data = await res.json();
      if (res.ok) {
        setInfo((prev) => prev.filter((Employe) => Employe._id !== saleId));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The sale record has been deleted.',
          confirmButtonColor: '#4F9473',
        });
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: data.message,
          confirmButtonColor: '#F87875',
        });
      }
    }
  }catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Try Agein '+error.message,
      confirmButtonColor: '#F87875',
    });
    }
  };

  // Search
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Info]);
    } else {
      // If there's a query, filter the data
      const filteredData = Info.filter(
        (Employe) =>
          Employe.id &&
        Employe.id.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  const totalQuantity = filter.reduce((total, Employe) => total + Number(Employe.quantity), 0);
  const totalPrice = filter.reduce((total, Employe) => total + Number(Employe.price), 0);

  const generatePDF = () => {
    const doc = new jsPDF();

   // Add Company Logo
    const logoURL =
    "https://i.ibb.co/7vZc00g/Nelco-Logo.png";
   doc.addImage(logoURL, "PNG", 170, 10, 28, 21); 
  
   // Get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
   });
    const formattedTime = currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
   });
   let reportName = "Sales Report - All Agencies"; // Default report name
    if (selectedAgency === "001") {
      reportName = "Sales Report - Agency Rathnapura";
    } else if (selectedAgency === "002") {
      reportName = "Sales Report - Agency Colombo";
    } else if (selectedAgency === "003") {
      reportName = "Sales Report - Agency Galle"; // Add more agencies as needed
    }

    // Set font for the header
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(169, 169, 169); // Light grey color
  
    // company information
    doc.text("Nelco Food Production (pvt) LTD", 14, 14); 
    doc.text("123 Business St, Godakawela, Sri Lanka", 14, 19); 
    doc.text("Email: nelco@info.com", 14, 24); 
    doc.text("Contact: +9434567890", 14, 29); 
    doc.text(`Date: ${formattedDate}  Time: ${formattedTime}`, 14,34 );
    doc.setLineWidth(0.3);
    doc.line(14, 40, 196, 40); 
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(reportName,75, 53);

    // Create table with sales data
    doc.autoTable({
      startY: 57, 
      head: [['Id', 'Description','Quantity', 'Price', 'Date', 'Shop Name', 'Rep Id', 'Agency']],
      headStyles: {
        fillColor: [175, 225, 175], 
        textColor: [0, 0, 0],
        lineColor: [169, 169, 169],
        lineWidth: 0.1, 
        fontStyle: 'bold', 
        halign: 'center', 
      },
    
      // Define styles for the body
      bodyStyles: {
        textColor: [0, 0, 0], // Black text color for the body
        lineColor: [169, 169, 169], // Light grey line color between rows
        lineWidth: 0.1, // Thin line width
      },
    
      // Add dividing lines between rows
      styles: {
        cellPadding: 2, // Padding inside the table cells
        valign: 'middle', // Vertically align text to the middle
        halign: 'center', // Horizontally align text to the center
      },
      body: filter.map(item => [
        item.id,
        item.description,
        item.quantity,
        item.price,
        new Date(item.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }), 
        item.ShopName,
        item.RepId,
        item.agencyNo,
      ]),
    });

  let finalY = doc.autoTable.previous.finalY + 14; // Get Y position after the table and add some margin
    if (selectedAgency === "") {
      doc.addPage();  // Add a second page if selectedAgency is empty
      finalY = 20;
    }
  const totalQuantity = filter.reduce((total, Employe) => total + Number(Employe.quantity), 0);
  const totalPrice = filter.reduce((total, Employe) => total + Number(Employe.price), 0);
  const highestSellingProduct = filter.reduce((prev, current) => {
    return (Number(current.quantity) > Number(prev.quantity)) ? current : prev;
  });

  const leastSellingProduct = filter.reduce((prev, current) => {
    return (Number(current.quantity) < Number(prev.quantity)) ? current : prev;
  });
  const highestReturnProduct = returnData.reduce((prev, current) => {
    return (Number(current.quantity) > Number(prev.quantity)) ? current : prev;
  }, returnData[0] || {});

  const lowestReturnProduct = returnData.reduce((prev, current) => {
    return (Number(current.quantity) < Number(prev.quantity)) ? current : prev;
  }, returnData[0] || {});

 
  //sales summary
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.text("Sales Summary Overview", 14, finalY);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Total Units Sold: ${totalQuantity}`, 14, finalY + 6);
  doc.text(`Total Price: Rs.${totalPrice.toFixed(2)}`, 14, finalY + 11); 
  doc.text(`Highest Selling Product: ${highestSellingProduct.description} (${highestSellingProduct.quantity} units)`, 14, finalY + 17);
  doc.text(`Least Selling Product: ${leastSellingProduct.description} (${leastSellingProduct.quantity} units)`, 14, finalY + 22);
// Returned Products
  const finalYReturned = finalY + 35; 
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.text("Returned Products Overview", 14, finalYReturned);
  doc.setFontSize(11);
  doc.text(`Total Returned Units: ${totalReturnQuantity}`, 14, finalYReturned + 6);
  doc.text(`Total Returned Price: Rs.${totalReturnPrice.toFixed(2)}`, 14, finalYReturned + 11);
  doc.text(`Highest Returned Product: ${highestReturnProduct.prodName|| "N/A"} (${highestReturnProduct.quantity || 0} units)`, 14, finalYReturned + 17);
  doc.text(`Lowest Returned Product: ${lowestReturnProduct.prodName || "N/A"} (${lowestReturnProduct.quantity || 0} units)`, 14, finalYReturned + 22);
  //net sales
  const netSales = totalPrice - totalReturnPrice;
  const finalYNetSales = finalYReturned + 36;
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.text("Net Sales Overview", 14, finalYNetSales);
  doc.setFontSize(11);
  doc.text(`Net Sales Value: Rs.${netSales.toFixed(2)}`, 14, finalYNetSales + 6);
  //signoff
  doc.text("Created By: Sales Executive Officer Ms Samadhi", 14, finalYNetSales + 30)
  doc.text("Approved By: .................................", 14, finalYNetSales + 36)

  doc.save(`${reportName.replace(/ /g, "_").toLowerCase()}.pdf`);
  };
  
  
  return (
    <div className="h-[1300px] relative">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex justify-start items-center">
          <div className="mb-3 mt-4 text-3xl font-bold font-family: 'Arial', sans-serif text-black ml-7">Sales Details</div>
       </div>
       <div className="text-gray-400 text-md font-normal mb-3 ml-7">View and manage sales data for the distribution.</div>
       <div className="flex justify-end items-end">
       <div className="mr-[90px] mt-[30px] text-2xl font-semibold font-family: 'Arial', sans-serif text-black">Agency Selection</div>
       </div>
       <div className="flex justify-end text-gray-400 text-md font-normal mb-3 mr-[155px] mt-[12px]">Select an Agency</div>
       <div className="flex justify-end">
       <select   className=" bg-slate-100 p-2 border-none rounded-lg w-[240px] h-[38.5px] mr-10"
                 id="agencyNo"
                 value={selectedAgency}
                 onChange={(e) => setSelectedAgency(e.target.value)}>
                  <option value="">All</option>
                  <option value="001">Agency 1</option>
                  <option value="002">Agency 2</option>
                </select>
        </div>
       <div className="flex justify-start mt-8 ml-2 items-start">
            <div>
            <form>
                  <div className="opacity-50">
                    <input
                     className="w-[1195px] h-10 mt-11 rounded-lg shadow-sm bg-[#dfe9e3] border-[#d3f0de] mb-4"
                      type="text"
                      placeholder="Search by sales number... "
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </form>
            </div>
        </div>
      <div>
        </div>
        <div className="lg:w-[600px] mt-7 xl:w-[1216px] lg:h-[400px] w-[450px] md:w-[700px] bg-[#f4f9fd] rounded-lg">
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto scrollbar-none rounded-lg">
              <table className="min-w-full divide-y divide-[#c3ddf8]  divide-opacity-0">
                <thead className="bg-none divide-x divide-[#c3ddf8] ">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs bg-[#e8f1f8] text-black font-bold text-opacity-80 uppercase">Sale Id</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e8f1f8] text-black text-opacity-80 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs bg-[#e8f1f8] text-black font-bold text-opacity-80 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e8f1f8] text-black text-opacity-80 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e8f1f8] text-black text-opacity-80 uppercase">date</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e8f1f8] text-black text-opacity-80 uppercase">ShopName</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e8f1f8] text-black text-opacity-80 uppercase">RepId</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e8f1f8] text-black text-opacity-80 uppercase">AgencyNo</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e8f1f8] text-black text-opacity-80 uppercase">Edit</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e8f1f8] text-black text-opacity-80 uppercase">Delete</th>
                  </tr>
                </thead>

                <tbody className="bg-none bg-opacity-40 divide-y divide-[#c3ddf8] ">
                  {filter && filter.length > 0 ? (
                    <>
                      {filter.map((Employe) => (
                        <tr key={Employe._id} className="dark:border-gray-700 dark:bg-gray-800">
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.id}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.description}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.quantity}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.price}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">
                          {new Date(Employe.date).toLocaleDateString('en-US', {
                                 year: 'numeric',
                                 month: '2-digit',
                                 day: '2-digit',
            })}
            </td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.ShopName}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.RepId}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.agencyNo}</td>
                          <td className="whitespace-nowrap">
                            <Link to={`/dashboard/SaleUpdate/${Employe._id}`}>
                              <button className="w-20 bg-[#4F9473] hover:opacity-80 rounded-lg h-10 border-white border-opacity-45 text font-serif text-white text-opacity-80">
                                Edit
                              </button>
                            </Link>
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap">
                            <span
                              onClick={() => {
                                setformId(Employe._id);
                                handleDeleteUser(Employe._id);
                              }}
                            >
                              <button className="w-20 bg-[#F87875] hover:opacity-80 rounded-lg h-10 border-white border border-opacity-45 text font-serif text-white text-opacity-80">
                                Delete
                              </button>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <p className="text-2xl font-serif absolute ml-[480px] opacity-60 mt-14">
                      You have no sales records
                    </p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
       <div className="mt-6 ml-2 h-auto">
          <div className="flex justify-end items-center">
            <Link to={`/dashboard/create`}>
              <button className="w-32 mt-14  mr-4 uppercase bg-[#7FE2BD] hover:opacity-80 rounded-md h-10 border-none border-opacity-45 font-semibold text-white">
                Add Sales
              </button>
            </Link>
          </div>
                <div className="flex justify-start items-center">
                  <div>
                  <p className="font-bold text-black text-xl ml-6 mt-12">Sales Calculation</p>
                  </div>
                </div>
                <div className="flex justify-start items-center">
                  <div>
                  <p className="font-normal text-gray-500 text-base ml-9 mt-4">Total Quantity Sold:   {totalQuantity}</p>
                  </div>
                </div>
                 <div className="flex justify-start items-center">
                  <div>
                  <p className="font-normal text-gray-500 text-lg ml-9 mt-2">Total Price:  Rs.{totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
             <div className="flex justify-end mt-6 mr-4">
          <button
           onClick={ generatePDF}
            className="bg-[#7FE2BD] text-white font-semibold px-4 py-2 rounded-md hover:opacity-80 hover:text-gray-50"
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}
