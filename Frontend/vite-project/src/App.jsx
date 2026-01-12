import { useState,useEffect } from 'react'
import AddItem from './components/AddItem.jsx'
import ItemList from './components/ListItem.jsx'
import './App.css'

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  setLoading(true); // 1. Iniciamos el estado de carga

  // Simulamos un retraso de 3 segundos
  setTimeout(() => {
    fetch('http://localhost:3000/items')
      .then(response => {
        if (!response.ok) throw new Error('Error en la red');
        return response.json();
      })
      .then(data => {
        setItems(data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
        alert('Failed to fetch items.');
      })
      .finally(() => {
        setLoading(false); // 2. Finalizamos la carga DESPUÉS de recibir los datos o el error
      });
  }, 3000);
}, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const handleAddItem = () => {
    try {
      if (inputValue.trim() !== '') {
        fetch('http://localhost:3000/items', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: inputValue })
      })
        .then(response => response.json())
        .then(data => {
          setItems([...items, data]);
          setInputValue('');
        });
    }
    } catch (error) {
      console.error('Error adding item:', error);
    alert('Failed to add item. Please try again.');
    }
  };

  const handleDeleteItem = (id) => {
    fetch(`http://localhost:3000/items/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setItems(items.filter(item => item.id !== id));
    })
    .catch(error => {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    });
  };

  return (
    <>
      <h1 className='list-title'>Lista de cocina</h1>
      <AddItem onAdd={handleAddItem} />
      
      <ul className="item-list">
        {items.map(item => (
          <ItemList key={item.id} item={item} onDelete={handleDeleteItem} />
        ))} 
      </ul>
    </>
  )
}

export default App
