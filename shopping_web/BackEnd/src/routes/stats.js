const express = require("express");
const router = express.Router();
const {
  getRevenue,
  getRevenueByCategoryFiltered,
} = require("../controllers/StatsController");

router.get("/revenue", getRevenue);
router.get("/revenue-by-category", getRevenueByCategoryFiltered);

module.exports = router;
