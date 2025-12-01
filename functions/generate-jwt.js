const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Use POST' };
  }

  try {
    const { header, payload, key, algorithm } = JSON.parse(event.body || '{}');

    if (!payload || !key) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'payload and key are required' })
      };
    }

    const alg = algorithm || 'HS256';
    const customHeader = header || { alg, typ: 'JWT' };

    const token = jwt.sign(payload, key, {
      algorithm: alg,
      header: customHeader
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ token })
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err.message })
    };
  }
};
