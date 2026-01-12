function ListItem({ item, onDelete }) {
  return (
    <li className="item">
      {item.name} 
      <input 
        className="delete-button" 
        type="button" 
        value="Eliminar" 
        onClick={() => onDelete(item.id)}
      />
    </li>
  );
}

export default ListItem;