export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, main_concern, concerns, timestamp } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const values = [
      [
        new Date(timestamp).toLocaleString('ar-EG'),
        name,
        phone,
        email,
        main_concern || '',
        Array.isArray(concerns) ? concerns.join(', ') : '',
        new Date().toISOString(),
      ],
    ];

    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    // Create JWT
    const header = {
      alg: 'RS256',
      typ: 'JWT',
    };

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: process.env.GOOGLE_CLIENT_EMAIL,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
      sub: process.env.GOOGLE_CLIENT_EMAIL,
    };

    // Simple JWT creation
    const headerEncoded = Buffer.from(JSON.stringify(header)).toString('base64url');
    const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signatureInput = `${headerEncoded}.${payloadEncoded}`;

    // Sign with private key
    const crypto = await import('crypto');
    const sign = crypto.createSign('RSA-SHA256');
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    sign.update(signatureInput);
    const signatureEncoded = sign.sign(privateKey, 'base64url');

    const jwtToken = `${signatureInput}.${signatureEncoded}`;

    // Get access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwtToken,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      throw new Error(`Failed to get access token: ${JSON.stringify(tokenData)}`);
    }

    const accessToken = tokenData.access_token;

    // Append to Google Sheet
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        range: 'Sheet1!A:G',
        values,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({
        success: true,
        message: 'Form submitted successfully',
        range: result.updates?.updatedRange,
      });
    } else {
      throw new Error(JSON.stringify(result));
    }
  } catch (error) {
    console.error('Error submitting form:', error.message);
    return res.status(500).json({
      error: 'Failed to submit form',
      details: error.message,
    });
  }
}
