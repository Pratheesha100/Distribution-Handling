import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Record() {
  const [Info, setInfo] = useState([]);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  const [selectedAgency, setSelectedAgency] = useState("");

   useEffect(() => {
     const fetchinfo = async () => {
      try {
        const res = await fetch(`/api/reco/getallproduct?agencyNo=${selectedAgency}`); // Pass selectedAgency as a query param
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
   }, [selectedAgency]);
 
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

  
 // Calculate the total price
 const totalPrice = filter.reduce((total, Employe) => {
  const price = Number(Employe.price); // Make sure it's a number
  return total + (isNaN(price) ? 0 : price); // Handle non-numeric values
}, 0);

  // Function to generate PDF
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
   let reportName = "Product Report - All Agencies"; // Default report name
   if (selectedAgency === "001") {
     reportName = "Product Report - Agency Rathnapura";
   } else if (selectedAgency === "002") {
     reportName = "Product Report - Agency Colombo";
   } else if (selectedAgency === "003") {
     reportName = "Product Report - Agency Galle"; // Add more agencies as needed
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

    doc.autoTable({
      startY: 57, 
      head: [['Id', 'Product Name', 'Manufacture Date', 'Expire Date', 'Batch Number', 'Price', 'Vehicle ID', 'Drive ID', 'Deliver ID', 'Agency No']],
      headStyles: {
        fillColor: [192, 192, 192], 
        textColor: [0, 0, 0], 
        lineColor: [169, 169, 169], // Light grey line color between rows
        lineWidth: 0.1, // Thin line width
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
        item.productname,
        item.manufactureDate,
        item.expiredate,
        item.batchnumber,
        item.price,
        item.vehicleid,
        item.driveid,
        item.deliverid,
        item.agencyNo
      ]),
    });

    let finalY = doc.autoTable.previous.finalY + 14; // Get Y position after the table and add some margin
    if (selectedAgency === "") {
      doc.addPage();  // Add a second page if selectedAgency is empty
      finalY = 20;
    }

    doc.setFontSize(13);
    doc.setFont("helvetica", "normal");
    doc.text("Product Summary Overview", 14, finalY);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Total Price: Rs.${totalPrice.toFixed(2)}`, 14, finalY + 11); 

    doc.text("Created By: Sales Executive Officer Ms Samadhi", 14, finalY + 30)
    doc.text("Approved By: .................................", 14, finalY + 36)

    doc.save(`${reportName.replace(/ /g, "_").toLowerCase()}.pdf`);
  };

  return (
    <div className="h-[1250px] relative">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex justify-start items-center">
          <div className="mb-3 mt-4 text-3xl font-bold font-family: 'Arial', sans-serif text-black ml-7">Product Records</div>
        </div>
        <div className="text-gray-400 text-md font-normal mb-3 ml-7">
          Keep track of your products details
        </div>
        <div className="flex justify-end items-end">
        <div className="mr-[90px] mt-[30px] text-2xl font-semibold font-family: 'Arial', sans-serif text-black">Agency Selection</div>
       </div>
       <div className="flex justify-end text-gray-400 text-md font-normal mb-3 mr-[155px] mt-[12px]">Select an Agency</div>
       <div className="flex justify-end">
       <select   className=" bg-slate-100 p-2 border-none rounded-lg w-[240px] h-[39px] mr-10"
                 id="agencyNo"
                 value={selectedAgency}
                 onChange={(e) => setSelectedAgency(e.target.value)} >
                  <option value="">All</option>
                  <option value="001">Agency 1</option>
                  <option value="002">Agency 2</option>
                  <option value="003">Agency 3</option>
                </select>
        </div>
        <div className="flex justify-start mb-8 ml-2 items-center">
            <div>
            <form>
                  <div className="opacity-50">
                    <input
                     className="w-[1195px] h-10 mt-16 rounded-lg shadow-sm bg-[#dfe9e3] border-[#d3f0de] mb-4"
                      type="text"
                      placeholder="Search by product id "
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </form>
            </div>
        </div>
        <div className="lg:w-[600px] xl:w-[1216px] lg:h-[400px] w-[450px] md:w-[700px] bg-[#F7FAFC] rounded-lg">
          <div className="">
            <div className="max-h-96 overflow-y-auto scrollbar-none rounded-lg">
              <table className="w-full divide-y divide-[#c3ddf8]  divide-opacity-0 ">
                <thead className="bg-none divide-x divide-[#c3ddf8] ">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e9f3fa] text-black text-opacity-80 uppercase">Id</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e9f3fa] text-black  text-opacity-80 uppercase">Productname</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e9f3fa] text-black text-opacity-80 uppercase">ManufactureDate</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e9f3fa] text-black text-opacity-80 uppercase">Expiredate</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e9f3fa] text-black text-opacity-80 uppercase">Batchnumber</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e9f3fa] text-black text-opacity-80 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e9f3fa] text-black text-opacity-80 uppercase">Vehicleid</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e9f3fa] text-black text-opacity-80 uppercase">Driveid</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e9f3fa] text-black text-opacity-80 uppercase">Deliverid</th>
                    <th className="px-6 py-3 text-left text-xs font-bold bg-[#e9f3fa] text-black text-opacity-80 uppercase">Agency No</th>
                  </tr>
                </thead>

                <tbody className="bg-none bg-opacity-40 divide-y divide-[#e9ecef] ">
                  {filter && filter.length > 0 ? (
                    <>
                      {filter.map((Employe) => (
                        <tr key={Employe._id} className="dark:border-gray-700 dark:bg-gray-800">
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.id}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.productname}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.manufactureDate}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.expiredate}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.batchnumber}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.price}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.vehicleid}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.driveid}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.deliverid}</td>
                          <td className="px-6 py-4 font-normal whitespace-nowrap">{Employe.agencyNo}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <p className="text-2xl font-serif absolute ml-[480px] opacity-60 mt-14">
                      You have no products
                    </p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
         {/* Total Price Display */}
        <div className="mt-14 ml-2 ">

                <div className="flex justify-start items-center">
                  <div>
                  <p className="font-normal text-black  text-xl">Total Price: Rs.{totalPrice.toFixed(2)}</p>
                  </div>
                </div>
             </div>

             <div className="flex justify-end mt-9 mr-4">
               <button
                onClick={generatePDF}
               className="bg-[#7FE2BD] text-white font-semibold px-4 py-2 rounded-md hover:opacity-80 hover:text-gray-50"
               >
               Generate PDF
               </button>
             </div>


             <div  className="flex justify-end items-center mt-20 mr-4">
              <div>
               <Link to={`/dashboard/Employee`}>
               <button
                
                className="whitespace-nowrap  mb-3 w-72 h-10 rounded-md border-2  text-white uppercase bg-[#4F9473] hover:opacity-80 hover:text-gray-50"
               >
                Navigate to Employee Records
               </button>
               </Link>
             </div>
            </div>
      </div>
    </div>
  );
}
