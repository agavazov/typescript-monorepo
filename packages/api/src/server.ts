import dotenv from 'dotenv';
import { app } from './app';

// Load env data
dotenv.config();

// Configs
const port = Number(process.env.PORT);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
