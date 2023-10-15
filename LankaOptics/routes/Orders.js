const express = require("express");
const router = express.Router();
const Order = require("../models/orders");

// Fetch all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch a single order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch all orders for a customer
router.get("/customer/:customerId", async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.params.customerId });
    res.json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

// Update an existing order by ID
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete an existing order by ID
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
