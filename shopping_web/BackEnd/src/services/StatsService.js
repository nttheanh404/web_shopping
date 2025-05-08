const Order = require("../models/order");

function getISOWeek(date) {
  const tmpDate = new Date(date.getTime());
  tmpDate.setHours(0, 0, 0, 0);
  tmpDate.setDate(tmpDate.getDate() + 4 - (tmpDate.getDay() || 7));
  const yearStart = new Date(tmpDate.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((tmpDate - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

const getRevenueStats = async (type, params = {}) => {
  let startDate,
    endDate = new Date();
  let groupFormat, unit, unitCount;

  switch (type) {
    case "day": {
      const date = params.date ? new Date(params.date) : new Date();
      startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      groupFormat = { $hour: "$createdAt" };
      unit = "hour";
      unitCount = 24;
      break;
    }
    case "week": {
      const week = parseInt(params.week);
      const year = parseInt(params.year);
      const jan1 = new Date(year, 0, 1);
      const daysOffset =
        (week - 1) * 7 + (jan1.getDay() <= 4 ? 1 : 8 - jan1.getDay());
      startDate = new Date(year, 0, 1 + daysOffset);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7);
      groupFormat = {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
      };
      unit = "day";
      unitCount = 7;
      break;
    }
    case "month": {
      const month = parseInt(params.month); // 1-based (1 = Jan)
      const year = parseInt(params.year);
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 1);
      groupFormat = { $isoWeek: "$createdAt" };
      unit = "week";
      unitCount = 4;
      break;
    }
    case "year": {
      const year = parseInt(params.year);
      startDate = new Date(Date.UTC(year, 0, 1));
      endDate = new Date(Date.UTC(year + 1, 0, 1));
      groupFormat = {
        $dateToString: {
          format: "%Y-%m",
          date: "$createdAt",
          timezone: "Asia/Ho_Chi_Minh",
        },
      };
      unit = "month";
      unitCount = 12;
      break;
    }

    default:
      throw new Error("Invalid type");
  }

  const pipeline = [
    {
      $match: {
        order_status: "completed",
        createdAt: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: groupFormat,
        total: { $sum: "$order_total" },
      },
    },
    { $sort: { _id: 1 } },
  ];

  const data = await Order.aggregate(pipeline);

  // Chuẩn hóa lại kết quả
  const resultMap = {};
  data.forEach((item) => {
    resultMap[item._id.toString()] = item.total;
  });

  const result = [];
  for (let i = 0; i < unitCount; i++) {
    let label, key;
    const date = new Date(startDate);

    switch (unit) {
      case "hour":
        label = `${i}h`;
        key = i;
        break;
      case "day":
        date.setDate(date.getDate() + i);
        key = date.toISOString().split("T")[0];
        label = key;
        break;
      case "week":
        date.setDate(date.getDate() + i * 7);
        key = `${getISOWeek(date)}`;
        label = `Week ${key}`;
        break;
      case "month":
        date.setMonth(date.getMonth() + i);
        key = date.toISOString().slice(0, 7);
        label = key;
        break;
    }

    result.push({
      label,
      total: resultMap[key] || 0,
    });
  }

  return result;
};

const getRevenueByCategoryStats = async (type, params = {}) => {
  let startDate,
    endDate = new Date();

  switch (type) {
    case "day": {
      const date = params.date ? new Date(params.date) : new Date();
      startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      break;
    }
    case "week": {
      const week = parseInt(params.week);
      const year = parseInt(params.year);
      const jan1 = new Date(year, 0, 1);
      const daysOffset =
        (week - 1) * 7 + (jan1.getDay() <= 4 ? 1 : 8 - jan1.getDay());
      startDate = new Date(year, 0, 1 + daysOffset);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7);
      break;
    }
    case "month": {
      const month = parseInt(params.month);
      const year = parseInt(params.year);
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 1);
      break;
    }
    case "year": {
      const year = parseInt(params.year);
      startDate = new Date(Date.UTC(year, 0, 1));
      endDate = new Date(Date.UTC(year + 1, 0, 1));
      break;
    }
    default:
      throw new Error("Invalid type");
  }

  const pipeline = [
    {
      $match: {
        order_status: "completed",
        createdAt: { $gte: startDate, $lt: endDate },
      },
    },
    { $unwind: "$order_items" },
    {
      $group: {
        _id: "$order_items.category",
        total: {
          $sum: {
            $multiply: [
              { $toDouble: "$order_items.new_price" },
              { $toInt: "$order_items.quantity" },
            ],
          },
        },
      },
    },
    {
      $project: {
        category: "$_id",
        total: 1,
        _id: 0,
      },
    },
    { $sort: { total: -1 } },
  ];

  return await Order.aggregate(pipeline);
};

module.exports = { getRevenueStats, getRevenueByCategoryStats };
