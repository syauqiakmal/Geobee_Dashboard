// proxyServer.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
const PORT = 4000;

app.get('/elevation', async (req, res) => {
  const { lat, lng } = req.query;
  const response = await fetch(`https://api.opentopodata.org/v1/test-dataset?locations=${lat},${lng}`);
  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
