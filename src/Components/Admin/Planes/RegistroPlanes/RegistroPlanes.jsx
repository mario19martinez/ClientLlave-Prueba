import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

function RegistroPlanes() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get("/purchases");
        setPurchases(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchases.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Registros de compra</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">RefPayco</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Currency</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Email</th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Bank Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Customer Lastname</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Transaction Date</th>
              {/* <th className="py-3 px-4 border-b">Created At</th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((purchase) => (
              <tr
                key={purchase.id}
                //className="transition-transform transform hover:scale-105 hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{purchase.refPayco}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{purchase.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{purchase.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{purchase.currency}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.customerEmail}</td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{purchase.bankName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{purchase.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{purchase.customerLastname}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      purchase.status === "completed"
                        ? "bg-green-500 text-white"
                        : purchase.status === "failed"
                        ? "bg-red-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {purchase.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {new Date(purchase.transactionDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center">
        <ReactPaginate
          previousLabel={"‹"}
          nextLabel={"›"}
          breakLabel={"..."}
          pageCount={Math.ceil(purchases.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex items-center space-x-2"}
          pageClassName={"px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100"}
          pageLinkClassName={"block"}
          previousClassName={"px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100"}
          previousLinkClassName={"block"}
          nextClassName={"px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100"}
          nextLinkClassName={"block"}
          breakClassName={"px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100"}
          breakLinkClassName={"block"}
          activeClassName={"bg-blue-500 text-white border-blue-500"}
        />
      </div>
    </div>
  );
}

export default RegistroPlanes;
