const jwt = require('jsonwebtoken');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',  // Or your specific domain: 'https://pratik-jwt-test.netlify.app'
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

exports.handler = async (event) => {
  // Handle preflight OPTIONS request first
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: corsHeaders,
      body: 'Use POST' 
    };
  }

  try {
    const { header, payload, key, algorithm } = JSON.parse(event.body || '{}');

    if (!payload || !key) {
      return {
        statusCode: 400,
        headers: corsHeaders,
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
      headers: corsHeaders,
      body: JSON.stringify({ token })
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message })
    };
  }
};
