const { Vendor } = require('../models');

exports.createVendor = async (req, res) => {
  try {
    const { name, contactName, phone, email, address } = req.body;
    const v = await Vendor.create({ name, contactName, phone, email, address });
    res.json(v);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.listVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    res.json(vendors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
