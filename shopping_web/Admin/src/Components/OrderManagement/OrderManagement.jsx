import React, { useEffect, useState } from "react";
import "./OrderManagement.css";
import { FiSearch, FiFilter } from "react-icons/fi";
import { getAllOrders, updateOrderStatus } from "../../services/order";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortByTotal, setSortByTotal] = useState(""); // asc | desc

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error("Lỗi khi lấy đơn hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const translatePaymentMethod = (method) => {
    switch (method) {
      case "cash_on_delivery":
        return "Cash on Delivery";
      case "VNPay_bank_transfer":
        return "VNPay";
      default:
        return "Method not selected";
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, order_status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", err);
    }
  };

  const filteredOrders = orders
    .filter((order) => {
      const matchSearch =
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.shipping_address?.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter
        ? order.order_status === statusFilter
        : true;

      const matchPayment = paymentFilter
        ? order.payment_method === paymentFilter
        : true;

      const createdAt = new Date(order.createdAt);
      const matchStartDate = startDate
        ? createdAt >= new Date(startDate)
        : true;
      const matchEndDate = endDate ? createdAt <= new Date(endDate) : true;

      return (
        matchSearch &&
        matchStatus &&
        matchPayment &&
        matchStartDate &&
        matchEndDate
      );
    })
    .sort((a, b) => {
      if (!sortByTotal) return 0;
      const totalA = a.order_total;
      const totalB = b.order_total;
      return sortByTotal === "asc" ? totalA - totalB : totalB - totalA;
    });

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="manage-orders">
      <h2>Order management</h2>

      <div className="order-filters">
        <div className="filter-group">
          <FiSearch className="icon" />
          <input
            type="text"
            placeholder="Find order code, recipient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <FiFilter className="icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All status</option>
            <option value="pending">Pending</option>
            <option value="shipping">Shipping</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="filter-group">
          <label>From date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>To date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Payment</label>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="cash_on_delivery">Cash on Delivery</option>
            <option value="VNPay_bank_transfer">VNPay</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort</label>
          <select
            value={sortByTotal}
            onChange={(e) => setSortByTotal(e.target.value)}
          >
            <option value="">-- Total amount --</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <p>No matching order found.</p>
      ) : (
        <div className="order-table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Delivery address</th>
                <th>Payment method</th>
                <th>Product</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <select
                      value={order.order_status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="shipping">Shipping</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>${Number(order.order_total).toLocaleString()}</td>
                  <td>
                    {order.shipping_address ? (
                      <>
                        Receiver: {order.shipping_address.name}
                        <br />
                        Address: {order.shipping_address.address},{" "}
                        {order.shipping_address.ward},{" "}
                        {order.shipping_address.district},{" "}
                        {order.shipping_address.city} <br />
                        Phone: {order.shipping_address.phone}
                      </>
                    ) : (
                      <p>No address available</p>
                    )}
                  </td>
                  <td>{translatePaymentMethod(order.payment_method)}</td>
                  <td>
                    {order.order_items && order.order_items.length > 0 ? (
                      <ul>
                        {order.order_items.map((item, index) => (
                          <li key={index} className="product-item">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="product-image"
                            />
                            <strong>{item.name}</strong> Size: {item.size} -
                            Quantity: {item.quantity} - Price:{" "}
                            {item.new_price && !isNaN(Number(item.new_price))
                              ? Number(item.new_price).toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 1,
                                  maximumFractionDigits: 1,
                                })
                              : "Price is not valid"}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>There are no products in this order.</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
