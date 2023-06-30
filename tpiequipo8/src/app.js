import { useState, useEffect } from "react";
import  axios from "axios";


function App() {
  const [equipment, setEquipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/api/equipment')
      .then(response => setEquipment(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredEquipment = equipment.filter(e => {
    const name = e.name.toLowerCase();
    const description = e.description.toLowerCase();
    const category = e.category.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return name.includes(searchTermLower) ||
      description.includes(searchTermLower) ||
      category.includes(searchTermLower);
  });

  const handleAddEquipment = newEquipment => {
    axios.post('/api/equipment', newEquipment)
      .then(response => setEquipment([...equipment, response.data]))
      .catch(error => console.log(error));
  };

  const handleEditEquipment = updatedEquipment => {
    axios.put(`/api/equipment/${updatedEquipment.id}`, updatedEquipment)
      .then(response => {
        const index = equipment.findIndex(e => e.id === updatedEquipment.id);
        const newEquipment = [...equipment];
        newEquipment[index] = response.data;
        setEquipment(newEquipment);
      })
      .catch(error => console.log(error));
  };

  const handleDeleteEquipment = id => {
    axios.delete(`/api/equipment/${id}`)
      .then(() => {
        const newEquipment = equipment.filter(e => e.id !== id);
        setEquipment(newEquipment);
      })
      .catch(error => console.log(error));
  };

  return(
    <div>
      <h1>Medical Equipment Review App</h1>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <EquipmentList equipment={filteredEquipment} handleDeleteEquipment={handleDeleteEquipment} handleEditEquipment={handleEditEquipment} />
      <EquipmentForm handleAddEquipment={handleAddEquipment} />
    </div>
  );
}

function SearchBar({ searchTerm, handleSearch }) {
  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search equipment..." />
    </div>
  );
}

function EquipmentList({ equipment, handleDeleteEquipment, handleEditEquipment }) {
  return (
    <div>
      {equipment.map(e => (
        <Equipment key={e.id} equipment={e} handleDeleteEquipment={handleDeleteEquipment} handleEditEquipment={handleEditEquipment} />
      ))}
    </div>
  );
}

function Equipment({ equipment, handleDeleteEquipment, handleEditEquipment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(equipment.name);
  const [description, setDescription] = useState(equipment.description);
  const [category, setCategory] = useState(equipment.category);

  const handleSave = () => {
    handleEditEquipment({ id: equipment.id, name, description, category });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{equipment.name}</h2>
          <p>{equipment.description}</p>
          <p>{equipment.category}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDeleteEquipment(equipment.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

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
export default App;

//ReactDOM.render(<App />, document.getElementById('root')); 