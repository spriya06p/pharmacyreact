import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Inventory(){
  const [stocks, setStocks] = useState([]);
  const [form, setForm] = useState({ name: '', batchNo: '', dosage:'', quantity:0, unitPrice:0, expiryDate: '' });

  const load = async () => {
    try {
      // use pharmacyId 1 for demo
      const res = await api.get('/inventory/1/stocks');
      setStocks(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load stocks');
    }
  };

  useEffect(()=>{ load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/inventory/1/stocks', {
        ...form
      });
      setForm({ name:'', batchNo:'', dosage:'', quantity:0, unitPrice:0, expiryDate:'' });
      load();
    } catch (err) {
      console.error(err);
      alert('Failed to add stock. Make sure you are logged in as PHARMACY.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Inventory (Pharmacy 1)</h2>

      <form onSubmit={submit} style={{ marginBottom: 20 }}>
        <div><input placeholder="Medicine name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /></div>
        <div><input placeholder="Batch no" value={form.batchNo} onChange={e=>setForm({...form, batchNo:e.target.value})} /></div>
        <div><input placeholder="Dosage" value={form.dosage} onChange={e=>setForm({...form, dosage:e.target.value})} /></div>
        <div><input placeholder="Quantity" type="number" value={form.quantity} onChange={e=>setForm({...form, quantity:parseInt(e.target.value||0)})} /></div>
        <div><input placeholder="Unit price" type="number" value={form.unitPrice} onChange={e=>setForm({...form, unitPrice:parseFloat(e.target.value||0)})} /></div>
        <div><input placeholder="Expiry date (YYYY-MM-DD)" value={form.expiryDate} onChange={e=>setForm({...form, expiryDate:e.target.value})} /></div>
        <button type="submit">Add Stock</button>
      </form>

      <table border="1" cellPadding="6">
        <thead><tr><th>Medicine</th><th>Batch</th><th>Dosage</th><th>Qty</th><th>Price</th><th>Expiry</th></tr></thead>
        <tbody>
          {stocks.map(s => (
            <tr key={s.id}>
              <td>{s.Medicine?.name || '—'}</td>
              <td>{s.batchNo}</td>
              <td>{s.dosage}</td>
              <td>{s.quantity}</td>
              <td>{s.unitPrice}</td>
              <td>{s.expiryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
