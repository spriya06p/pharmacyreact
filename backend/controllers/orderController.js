const { Order, OrderItem, MedicineStock } = require('../models');
const { sequelize } = require('../models');

exports.createOrder = async (req, res) => {
  // Basic order creation without payment integration for now
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const { pharmacyId, items } = req.body;
    // items = [{ medicineStockId, quantity }]
    let total = 0;
    for (const it of items) {
      const stock = await MedicineStock.findByPk(it.medicineStockId);
      if (!stock || stock.quantity < it.quantity) {
        await t.rollback();
        return res.status(400).json({ error: 'Insufficient stock for one or more items' });
      }
      total += parseFloat(stock.unitPrice) * it.quantity;
    }
    const order = await Order.create({ userId, pharmacyId, totalAmount: total, paymentStatus: 'PENDING' }, { transaction: t });
    for (const it of items) {
      const stock = await MedicineStock.findByPk(it.medicineStockId, { transaction: t });
      await OrderItem.create({ orderId: order.id, medicineStockId: it.medicineStockId, quantity: it.quantity, price: stock.unitPrice }, { transaction: t });
      // reduce stock
      stock.quantity = stock.quantity - it.quantity;
      await stock.save({ transaction: t });
    }
    await t.commit();
    res.json({ orderId: order.id, total });
  } catch (err) {
    console.error(err);
    await t.rollback();
    res.status(500).json({ error: 'Server error' });
  }
};
