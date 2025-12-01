console.log('Starting app.js');   // add this line

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

app.post('/generate-jwt', (req, res) => {
  const { header, payload, key, algorithm } = req.body;

  if (!payload || !key) {
    return res.status(400).json({ error: 'payload and key are required' });
  }

  const alg = algorithm || 'HS256';
  const customHeader = header || { alg, typ: 'JWT' };

  try {
    const token = jwt.sign(payload, key, {
      algorithm: alg,
      header: customHeader
    });
    res.json({ token });
  } catch (err) {
    console.error('Sign error:', err);   // log error
    res.status(400).json({ error: err.message });
  }
});

app.listen(8080, () => {
  console.log('JWT API running at http://localhost:8080/generate-jwt');
});
