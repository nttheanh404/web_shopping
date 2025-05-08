const {
  getRevenueStats,
  getRevenueByCategoryStats,
} = require("../services/StatsService");

const getRevenue = async (req, res) => {
  try {
    const type = req.query.type || "day";
    const params = {
      date: req.query.date,
      week: req.query.week,
      month: req.query.month,
      year: req.query.year,
    };
    const stats = await getRevenueStats(type, params);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRevenueByCategoryFiltered = async (req, res) => {
  try {
    const type = req.query.type || "day";
    const params = {
      date: req.query.date,
      week: req.query.week,
      month: req.query.month,
      year: req.query.year,
    };
    const result = await getRevenueByCategoryStats(type, params);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRevenue, getRevenueByCategoryFiltered };
