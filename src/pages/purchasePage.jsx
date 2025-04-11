import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/nav";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

const PurchasePage = () => {
  const { user } = useContext(UserContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + Number(item.price), 0);

  const handlePayment = () => {
    if (!user || !user.userId || cartItems.length === 0) {
      console.error("❌ Missing user/cart data:", { user, cartItems, totalPrice });
      setMessage("Cannot proceed with payment. Missing user or cart data.");
      return;
    }
  
    setLoading(true);
    setMessage("Processing payment...");
  
    // Simulate payment processing delay
    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:5000/purchases", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.userId,
            totalCost: totalPrice,
            cartItems,
          }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          console.error("❌ Error from backend:", data);
          setMessage(data.message || "Payment failed.");
        } else {
          console.log("✅ Payment successful:", data);
          setMessage("✅ Payment successful! Thank you for your purchase.");
          setCartItems([]);
          localStorage.removeItem("cart");
          setTimeout(() => navigate("/"), 2000);
        }
      } catch (error) {
        console.error("❌ Error during purchase:", error);
        setMessage("An error occurred while processing your payment.");
      } finally {
        setLoading(false);
      }
    }, 1500); // Simulated delay: 1.5 seconds
  };
  


  return (
    <>
      <Nav />
      <div style={{ padding: "20px", maxWidth: "100%", display: "flex", flexDirection:"column", alignItems: "center" }}>
        <h2 style={{ marginBottom: "20px" }}>Checkout</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item, index) => (
  <li key={index} style={{ marginBottom: "10px" }}>
    <strong>{item.name}</strong> - ${Number(item.price).toFixed(2)}
  </li>
))}

            </ul>

            <h3 style={{ marginTop: "20px" }}>Total: ${totalPrice.toFixed(2)}</h3>

            <button
              style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
              disabled={loading}
              onClick={handlePayment}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </>
        )}

        {message && (
          <p style={{ marginTop: "20px", color: "green", fontWeight: "bold" }}>
            {message}
          </p>
        )}
      </div>
    </>
  );
};

export default PurchasePage;
