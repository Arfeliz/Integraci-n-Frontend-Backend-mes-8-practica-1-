import { useState } from 'react';

function AddItem({ onAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="add-item">
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Ej. Tomates"
      />
      <input type="button" value="Agregar" onClick={handleSubmit} />
    </div>
  );
}

export default AddItem;