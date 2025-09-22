const { Medicine, MedicineStock } = require('../models');

// Add stock (create medicine if needed)
exports.addStock = async (req, res) => {
  try {
    const pharmacyId = parseInt(req.params.pharmacyId, 10);
    const { name, chemicalName, brandName, description, batchNo, dosage, quantity, unitPrice, manufactureDate, expiryDate, vendorId } = req.body;
    let med = await Medicine.findOne({ where: { name }});
    if(!med) med = await Medicine.create({ name, chemicalName, brandName, description });
    const stock = await MedicineStock.create({
      pharmacyId, medicineId: med.id, batchNo, dosage, quantity, unitPrice, manufactureDate, expiryDate, vendorId
    });
    res.json(stock);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.listStocks = async (req, res) => {
  try {
    const pharmacyId = parseInt(req.params.pharmacyId, 10);
    const stocks = await MedicineStock.findAll({ where: { pharmacyId }, include: Medicine });
    res.json(stocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
