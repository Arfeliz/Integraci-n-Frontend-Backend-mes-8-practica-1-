import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

let items = [];

app.get('/items', (req, res) => {
  res.json(items);
});
app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  items = items.filter(item => item.id !== itemId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
