import { useEffect, useState } from "react";
import { getMedicines, createMedicine, updateMedicine, deleteMedicine } from "../api/inventoryApi";

export default function Inventory() {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({ name: "", brand_name: "", chemical_name: "", dosage: "", manufacture_date: "", expiry_date: "", description: "" });

  const fetchMedicines = async () => {
    const data = await getMedicines();
    setMedicines(data);
  };

  useEffect(() => { fetchMedicines(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    await createMedicine(form);
    setForm({ name: "", brand_name: "", chemical_name: "", dosage: "", manufacture_date: "", expiry_date: "", description: "" });
    fetchMedicines();
  };

  const handleDelete = async (id) => { await deleteMedicine(id); fetchMedicines(); };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>

      <form onSubmit={handleCreate} className="mb-6 grid gap-2 grid-cols-2">
        <input placeholder="Name" name="name" value={form.name} onChange={handleChange} className="border p-2 rounded"/>
        <input placeholder="Brand" name="brand_name" value={form.brand_name} onChange={handleChange} className="border p-2 rounded"/>
        <input placeholder="Chemical Name" name="chemical_name" value={form.chemical_name} onChange={handleChange} className="border p-2 rounded"/>
        <input placeholder="Dosage" name="dosage" value={form.dosage} onChange={handleChange} className="border p-2 rounded"/>
        <input type="date" placeholder="Manufacture Date" name="manufacture_date" value={form.manufacture_date} onChange={handleChange} className="border p-2 rounded"/>
        <input type="date" placeholder="Expiry Date" name="expiry_date" value={form.expiry_date} onChange={handleChange} className="border p-2 rounded"/>
        <input placeholder="Description" name="description" value={form.description} onChange={handleChange} className="border p-2 rounded col-span-2"/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded col-span-2">Add Medicine</button>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Dosage</th>
            <th className="border p-2">Expiry</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map(m => (
            <tr key={m.id}>
              <td className="border p-2">{m.name}</td>
              <td className="border p-2">{m.brand_name}</td>
              <td className="border p-2">{m.dosage}</td>
              <td className="border p-2">{new Date(m.expiry_date).toLocaleDateString()}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(m.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
