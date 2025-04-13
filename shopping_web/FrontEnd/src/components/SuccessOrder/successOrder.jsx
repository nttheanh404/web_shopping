import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./successOrder.css";

const SuccessOrder = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); 
    }, 15000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <CheckCircle className="success-icon" />
      <h1 className="success-title">Order Successful!</h1>
      <p className="success-message">
        Thank you for your purchase. Your order is being processed.
      </p>
      <p className="success-subtext">
        You will be redirected to the homepage shortly...
      </p>
    </div>
  );
};

export default SuccessOrder;
