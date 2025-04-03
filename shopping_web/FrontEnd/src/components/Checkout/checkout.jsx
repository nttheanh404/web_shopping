import React, { useState, useContext } from "react";
import "./checkout.css";
import { ShopContext } from "../../context/ShopContext";
// import { createPaymentRequest } from "../../services/payment";
import arrow_icon from "../assets/arrow.png";
import { FaAddressCard } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

const provinces = [
  {
    name: "Hà Nội",
    districts: [
      { name: "Ba Đình", wards: ["Phúc Xá", "Trúc Bạch", "Vĩnh Phúc"] },
      { name: "Hoàn Kiếm", wards: ["Chương Dương", "Cửa Đông", "Hàng Bạc"] },
    ],
  },
  {
    name: "TP Hồ Chí Minh",
    districts: [
      { name: "Quận 1", wards: ["Bến Nghé", "Bến Thành", "Cầu Ông Lãnh"] },
      { name: "Quận 3", wards: ["Phường 1", "Phường 2", "Phường 3"] },
    ],
  },
];

const Checkout = () => {
  const { getTotalCartAmount } = useContext(ShopContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full name cannot be left blank";
    if (!formData.phone) newErrors.phone = "Phone number cannot be left blank";
    if (!formData.city) {
      newErrors.city = "Please select Province/City";
    } else {
      if (!formData.district) {
        newErrors.district = "Please select District";
      } else {
        if (!formData.ward) newErrors.ward = "Please select Ward";
      }
    }
    if (!formData.address) newErrors.address = "Address cannot be left blank";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = async () => {
    if (step === 1 && !validateForm()) return;
    if (step === 2 && !paymentMethod) {
      setPaymentError("Please select a payment method before proceeding.");
      return;
    }
    if (step < 3) {
      setStep(step + 1);
      setPaymentError("");
      return;
    }
    if (paymentMethod === "Cash on Delivery") {
      alert(
        "Thank you for your order! You will pay when the products are delivered."
      );
      return;
    }

    if (paymentMethod === "VNPay Banking") {
      alert("You will be redirected to the VNPay payment gateway.");
      return;
    }
    // const url = await createPaymentRequest();
    // window.location.href = url?.data;
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectedProvince = provinces.find((p) => p.name === formData.city);
  const selectedDistrict = selectedProvince?.districts.find(
    (d) => d.name === formData.district
  );

  const icons = [FaAddressCard, MdOutlinePayment, GiConfirmed];

  return (
    <>
      <section className="section">
        <div className="checkout-container">
          <div className="checkout-title">
            {[
              "Address information",
              "Payment method",
              "Payment confirmation",
            ].map((label, index) => {
              const Icon = icons[index];
              return (
                <>
                  <div key={index} className="checkout-step">
                    <div
                      className={`checkout-icon-container ${
                        step > index ? "bg-active" : "bg-inactive"
                      }`}
                    >
                      <Icon className="icon-step" />
                    </div>
                    <span className="checkout-label">{label}</span>
                  </div>
                  <div
                    className={`${index < 2 ? "checkout-divider" : ""}`}
                  ></div>
                </>
              );
            })}
          </div>
          <p className="checkout-title-step">
            {step === 1 && "Address information"}
            {step === 2 && "Payment method"}
            {step === 3 && "Payment confirmation"}
          </p>
        </div>
      </section>

      <div className="checkout-content">
        <div className="checkout-content container">
          {step === 1 && (
            <>
              {/* Form nhập thông tin địa chỉ */}
              <div className="checkout-content">
                <div className="checkout-content container">
                  <div className="checkout-row">
                    <div className="checkout-input-group">
                      <p className="checkout-label-info">
                        Full Name <span>*</span>
                      </p>
                      <input
                        className="checkout-input"
                        type="text"
                        placeholder="Ex: Nguyễn Việt Anh"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <p className="checkout-error">{errors.name}</p>
                      )}
                    </div>
                    <div className="checkout-input-group">
                      <p className="checkout-label-info ">
                        Phone Number <span>*</span>
                      </p>
                      <input
                        className="checkout-input"
                        type="text"
                        placeholder="Ex: 0123456789"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && (
                        <p className="checkout-error">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="checkout-row">
                    <div className="checkout-select-group">
                      <p className="checkout-label-info">
                        Province/City <span>*</span>
                      </p>
                      <select
                        name="city"
                        className="checkout-input"
                        value={formData.city}
                        onChange={handleChange}
                      >
                        <option value="">Select Province/City</option>
                        {provinces.map((province, index) => (
                          <option key={index} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <p className="checkout-error">{errors.city}</p>
                      )}
                    </div>
                    <div className="checkout-select-group">
                      <p className="checkout-label-info">
                        District <span>*</span>
                      </p>
                      <select
                        name="district"
                        className="checkout-input"
                        value={formData.district}
                        onChange={handleChange}
                      >
                        <option value="">Select District</option>
                        {selectedProvince?.districts.map((district, index) => (
                          <option key={index} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                      {errors.district && (
                        <p className="checkout-error">{errors.district}</p>
                      )}
                    </div>
                    <div className="checkout-select-group">
                      <p className="checkout-label-info">
                        Ward <span>*</span>
                      </p>
                      <select
                        name="ward"
                        className="checkout-input"
                        value={formData.ward}
                        onChange={handleChange}
                      >
                        <option value="">Select Ward</option>
                        {selectedDistrict?.wards.map((ward, index) => (
                          <option key={index} value={ward}>
                            {ward}
                          </option>
                        ))}
                      </select>
                      {errors.ward && (
                        <p className="checkout-error">{errors.ward}</p>
                      )}
                    </div>
                  </div>
                  <div
                    className="checkout-input-group"
                    style={{ width: "100%" }}
                  >
                    <p className="checkout-label-info">
                      Address: <span>*</span>
                    </p>
                    <input
                      type="text"
                      placeholder="Ex: Xã Trường Yên, Huyện Chương Mỹ, Thành phố Hà Nội"
                      className="checkout-input"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <p className="checkout-error">{errors.address}</p>
                    )}
                  </div>
                  <div
                    className="checkout-input-group"
                    style={{ width: "100%" }}
                  >
                    <p className="checkout-label-info">Note:</p>
                    <input
                      type="text"
                      placeholder="Note here..."
                      className="checkout-input"
                      name="address"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="checkout-method-title">Select payment method</p>
              <div className="checkout-method-container">
                <label className="checkout-method-item">
                  <input
                    type="radio"
                    name="payment"
                    value="VNPay Banking"
                    checked={paymentMethod === "VNPay Banking"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>VNPay Banking</span>
                </label>

                <label className="checkout-method-item">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
              {paymentError && <p className="checkout-error">{paymentError}</p>}
            </>
          )}

          {step === 3 && (
            <div className="checkout-confirmed-container">
              <h2 className="checkout-confirmed-title">Order information</h2>

              <div style={{ marginBottom: "16px" }}>
                <p className="checkout-confirmed-items">Shipping address:</p>
                <p className="checkout-confirmed-detail">
                  {formData.name} - {formData.phone} <br />
                  {formData.address}, {formData.ward}, {formData.district},{" "}
                  {formData.city}
                </p>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <p className="checkout-confirmed-items">Payment method:</p>
                <p className="checkout-confirmed-detail">{paymentMethod}</p>
              </div>

              {paymentMethod === "VNPay Banking" && (
                <div className="checkout-vnpay">
                  <p className="checkout-confirmed-items">
                    VNPay Instructions:
                  </p>
                  <p className="checkout-confirmed-detail">
                    You will be redirected to the VNPay gateway to complete your
                    payment.
                  </p>
                </div>
              )}

              {paymentMethod === "Cash on Delivery" && (
                <div className="checkout-cod">
                  <p className="checkout-confirmed-items">
                    Cash on Delivery Details:
                  </p>
                  <p className="checkout-confirmed-detail">
                    Please prepare the exact amount for payment upon delivery.
                  </p>
                </div>
              )}

              <div className="checkout-confirmed-fee">
                <div className="checkout-confirmed-fee-items">
                  <span>Products fee:</span>
                  <span>${getTotalCartAmount()}</span>
                </div>
                <div className="checkout-confirmed-fee-items">
                  <span>Shipping fee:</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="checkout-confirmed-fee-items">
                  <span>Total:</span>
                  <span>${getTotalCartAmount()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="button-group">
            {step > 1 && (
              <button className="button-back" onClick={prevStep}>
                Back
              </button>
            )}
            {step < 3 ? (
              <button className="button-next" onClick={nextStep}>
                Next{" "}
                <img
                  src={arrow_icon}
                  alt="-->"
                  style={{ margin: "2px 0 0 16px" }}
                />
              </button>
            ) : (
              <button className="button-confirm" onClick={nextStep}>
                {paymentMethod === "Cash on Delivery"
                  ? "Confirm and Pay on Delivery"
                  : "Confirm and Pay Online"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
