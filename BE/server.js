const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./module_auth/routes');
const usersRoutes = require('./module_users/routes');
const { errorHandler } = require('./helpers/error');
const { corsMiddleware } = require('./helpers/cors');
const connectToDatabase = require('./config/db');

connectToDatabase();

app.use(express.json());
app.use(corsMiddleware);
app.use('/auth', authRoutes);
app.use('/user', usersRoutes);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
