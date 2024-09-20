import express from 'express';
import { connectDB, readProfessionals, writeProfessional } from './src/db.config'; // Corrija o caminho se necessário
import dotenv from 'dotenv';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get('/api/professionals', async (req, res) => {
  try {
    const professionals = await readProfessionals();
    res.json(professionals);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/professionals', async (req, res) => {
  try {
    await writeProfessional(req.body);
    res.status(201).json({ message: 'Profissional cadastrado com sucesso' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env['PORT'] || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
