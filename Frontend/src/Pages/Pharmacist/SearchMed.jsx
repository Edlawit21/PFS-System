import { useState } from "react";
import Api from "../../api/axiosInstance";
import { Input } from "antd";

const MedicationSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [medications, setMedications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [totalPrices, setTotalPrices] = useState({});
  const [saleError, setSaleError] = useState({});
  const [saleSuccess, setSaleSuccess] = useState({});

  const searchMedication = async () => {
    if (!searchInput) {
      setError("Please enter a medication name");
      return;
    }
    setLoading(true);

    try {
      const response = await Api.get(
        `/product/getallProduct?query=${encodeURIComponent(searchInput)}`
      );
      const data = response.data;
      if (data.length > 0) {
        setMedications(data);
        setError("");
      } else {
        setMedications([]);
        setError("Medication not found");
      }
    } catch (err) {
      console.error("Error:", err);
      setMedications([]);
      setError(err.response?.data?.message || "Error fetching medication");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (medicineId, value, sellPrice) => {
    const quantity = value ? parseInt(value) : 0;

    // Update quantities
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [medicineId]: quantity,
    }));

    // Calculate total price and update totalPrices
    const totalPrice = sellPrice * quantity;
    setTotalPrices((prevTotalPrices) => ({
      ...prevTotalPrices,
      [medicineId]: totalPrice,
    }));
  };

  const makeSale = async (medicineId, remainQty) => {
    const quantity = quantities[medicineId];

    // Check if the requested quantity is valid and does not exceed remaining quantity
    if (!quantity || quantity <= 0) {
      setSaleError((prevSaleError) => ({
        ...prevSaleError,
        [medicineId]: "Please enter a valid quantity",
      }));
      return;
    }

    if (quantity > remainQty) {
      setSaleError((prevSaleError) => ({
        ...prevSaleError,
        [medicineId]: "Insufficient quantity available",
      }));
      return;
    }

    setLoading(true);
    try {
      const response = await Api.post("/sales/createSales", {
        medicineId,
        quantity,
      });
      setSaleSuccess((prevSaleSuccess) => ({
        ...prevSaleSuccess,
        [medicineId]: "Sale recorded successfully",
      }));
      setSaleError((prevSaleError) => ({
        ...prevSaleError,
        [medicineId]: "",
      }));

      // Update remaining quantity after successful sale
      setMedications((prevMedications) =>
        prevMedications.map((medication) =>
          medication._id === medicineId
            ? { ...medication, remainQty: remainQty - quantity }
            : medication
        )
      );
    } catch (err) {
      setSaleError((prevSaleError) => ({
        ...prevSaleError,
        [medicineId]:
          err.response?.data?.message || "Error processing the sale",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Medication</h1>

      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Enter medication name"
        style={{ padding: "8px", width: "300px" }}
      />

      <button
        onClick={searchMedication}
        style={{
          padding: "8px 16px",
          marginLeft: "10px",
          backgroundColor: "blue",
          color: "white",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {medications.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Medication Details</h3>
          {medications.map((medication) => (
            <div
              key={medication._id}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            >
              <p>
                <strong>Name:</strong> {medication.medname}
              </p>
              <p>
                <strong>Category:</strong> {medication.category.category}
              </p>
              <p>
                <strong>Subcategory:</strong> {medication.category.subcategory}
              </p>
              <p>
                <strong>Actual Price:</strong> ${medication.actualPrice}
              </p>
              <p>
                <strong>Selling Price:</strong> ${medication.sellPrice}
              </p>
              <p>
                <strong>Quantity Available:</strong> {medication.quantity}
              </p>
              <p>
                <strong>Quantity Remaining:</strong> {medication.remainQty}
              </p>
              <p>
                <strong>Expiration Date:</strong>{" "}
                {new Date(medication.expireDate).toLocaleDateString()}
              </p>

              <div style={{ marginTop: "10px" }}>
                <label>
                  Quantity:
                  <Input
                    type="number"
                    value={quantities[medication._id]}
                    onChange={(e) =>
                      handleQuantityChange(
                        medication._id,
                        e.target.value,
                        medication.sellPrice
                      )
                    }
                    min="1"
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      width: "80px",
                    }}
                  />
                </label>
                <button
                  onClick={() => makeSale(medication._id, medication.remainQty)}
                  style={{
                    padding: "8px 16px",
                    marginLeft: "10px",
                    backgroundColor: "green",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Make Sale
                </button>
              </div>

              {quantities[medication._id] > 0 && (
                <p>
                  <strong>Total Price:</strong> ${totalPrices[medication._id]}
                </p>
              )}

              {saleError[medication._id] && (
                <p style={{ color: "red" }}>{saleError[medication._id]}</p>
              )}
              {saleSuccess[medication._id] && (
                <p style={{ color: "green" }}>{saleSuccess[medication._id]}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicationSearch;
