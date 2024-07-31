const express = require('express');
const connection = require('./config/connection');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());
app.use(userRoutes);

connection();

const PORT = 3333 || 3330;

app.listen(PORT, () => {
  console.log(`🟢 Server running on http://localhost:${PORT}`);
});