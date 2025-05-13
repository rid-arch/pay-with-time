const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
