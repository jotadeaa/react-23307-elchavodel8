function EquipmentForm({ handleAddEquipment }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    handleAddEquipment({ name, description, category });
    setName('');
    setDescription('');
    setCategory('');
  };

  return (
    <div>
      <h2>Add Equipment</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
