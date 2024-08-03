const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./lib/mongodb');
const app = express();
const authuser = require('./routes/userRoutes');
const { authenticatiionCheck } = require('./middleware/authenticationCheck');
const cookieParser = require('cookie-parser');
const router = require('./routes/userRoutes');
const worktask = require('./routes/taskroute');
const cors = require('cors');

dotenv.config();
connectDB();
app.use(cookieParser());
app.use(cors({ origin: "https://task-hive-rfg2.vercel.app", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', router);
app.use(authenticatiionCheck());
app.use('/taskhive', worktask);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
