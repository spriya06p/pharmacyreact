const cron = require('node-cron');
const { MedicineStock, ReturnModel } = require('../models');
const { Op } = require('sequelize');

module.exports = function startExpiryJob() {
  // run daily at 08:00
  cron.schedule('0 8 * * *', async () => {
    try {
      const today = new Date();
      // find expired stocks with quantity > 0
      const expired = await MedicineStock.findAll({
        where: { expiryDate: { [Op.lt]: today }, quantity: { [Op.gt]: 0 } }
      });
      for (const s of expired) {
        // create a return (refund 50% of value)
        const refund = (parseFloat(s.unitPrice) * s.quantity) * 0.5;
        await ReturnModel.create({ medicineStockId: s.id, pharmacyId: s.pharmacyId, vendorId: s.vendorId, reason: 'EXPIRED', amountRefunded: refund });
        s.quantity = 0;
        await s.save();
        console.log(`Expired stock handled: stock id ${s.id}`);
      }
    } catch (err) {
      console.error('Expiry job error', err);
    }
  });
};
