import React from "react";
import { Link } from "react-router-dom";

function CancelPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>❌ Payment Cancelled</h1>
      <p>Your payment was cancelled. You can try again anytime.</p>
      <Link to="/cart">Return to Cart</Link>
    </div>
  );
}

export default CancelPage;
