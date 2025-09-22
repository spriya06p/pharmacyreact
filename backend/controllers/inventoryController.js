const Medicine = require("../models/medicine");

// Create medicine
exports.createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all medicines
exports.getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.findAll();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update medicine
exports.updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findByPk(id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    await medicine.update(req.body);
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findByPk(id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    await medicine.destroy();
    res.json({ message: "Medicine deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
