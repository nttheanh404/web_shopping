import React, { useEffect, useState, useMemo } from "react";
import { getRevenueStats, getCategoryRevenueStats } from "../../services/stats";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Revenue.css";

const Revenue = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [type, setType] = useState("month");
  const [params, setParams] = useState({});
  const [submittedParams, setSubmittedParams] = useState({});
  const [categoryData, setCategoryData] = useState([]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA336A",
    "#AA558A",
    "#6A5ACD",
    "#4682B4",
  ];

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await getRevenueStats(type, submittedParams);
        setRevenueData(res.data || []);
      } catch (err) {
        console.error("Error getting revenue:", err);
      }
    };
    fetchRevenue();
  }, [type, submittedParams]);

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchCategoryRevenue = async () => {
      try {
        const res = await getCategoryRevenueStats(type, submittedParams);
        setCategoryData(res.data || []);
      } catch (err) {
        console.error("Error getting category revenue:", err);
      }
    };
    fetchCategoryRevenue();
  }, [type, submittedParams]);

  const renderInputs = () => {
    switch (type) {
      case "day":
        return (
          <input
            type="date"
            name="date"
            onChange={handleParamChange}
            required
          />
        );
      case "week":
        return (
          <>
            <input
              type="number"
              name="week"
              min={1}
              max={53}
              placeholder="Week"
              onChange={handleParamChange}
            />
            <input
              type="number"
              name="year"
              min={2000}
              max={2100}
              placeholder="Year"
              onChange={handleParamChange}
            />
          </>
        );
      case "month":
        return (
          <>
            <input
              type="number"
              name="month"
              min={1}
              max={12}
              placeholder="Month"
              onChange={handleParamChange}
            />
            <input
              type="number"
              name="year"
              min={2000}
              max={2100}
              placeholder="Year"
              onChange={handleParamChange}
            />
          </>
        );
      case "year":
        return (
          <input
            type="number"
            name="year"
            min={2000}
            max={2100}
            placeholder="Year"
            onChange={handleParamChange}
          />
        );
      default:
        return null;
    }
  };

  const formatCurrency = (value) => `$${value.toLocaleString()}`;
  const totalRevenue = useMemo(() => {
    return revenueData.reduce((sum, item) => sum + (item.total || 0), 0);
  }, [revenueData]);

  const formattedCategoryData = useMemo(() => {
    return categoryData.map((item) => ({
      ...item,
      name: item.category || `Category ${item.category || ""}`,
    }));
  }, [categoryData]);

  return (
    <div className="revenue-container">
      <h2 className="revenue-title">Revenue Statistics</h2>
      <div className="revenue-filter">
        <label>Select time:</label>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setParams({});
            setSubmittedParams({});
          }}
        >
          <option value="day">Date</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        {renderInputs()}
        <button onClick={() => setSubmittedParams(params)}>
          See statistics
        </button>
      </div>

      <div className="chart-wrapper">
        <div className="chart-box">
          <h3>Column chart</h3>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" interval={0} tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={formatCurrency} />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Line chart</h3>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                // interval={0}
                minTickGap={10}
                tick={{ fontSize: 11 }}
                interval="preserveEnd"
              />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={formatCurrency} />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#82ca9d"
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="chart-box-pie">
        <h3>Pie chart by category</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              dataKey="total"
              data={formattedCategoryData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, total, percent }) =>
                `${name} ($${total.toLocaleString()} - ${(
                  percent * 100
                ).toFixed(0)}%)`
              }
            >
              {formattedCategoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "18px",
          color: "#333",
        }}
      >
        Total revenue: {formatCurrency(totalRevenue)}
      </div>
    </div>
  );
};

export default Revenue;
