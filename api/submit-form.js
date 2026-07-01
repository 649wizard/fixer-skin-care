import jwt from 'jsonwebtoken';

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: process.env.GOOGLE_CLIENT_EMAIL,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const token = jwt.sign(claim, privateKey, { algorithm: 'RS256' });

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, main_concern, concerns, timestamp } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const accessToken = await getAccessToken();

    const values = [
      [
        new Date(timestamp).toLocaleString('ar-EG'),
        name,
        phone,
        email,
        main_concern || '',
        Array.isArray(concerns) ? concerns.join(', ') : '',
        'new',
      ],
    ];

    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:append?valueInputOption=USER_ENTERED`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        range: 'Sheet1!A:G',
        values
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    const result = await response.json();

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      updatedRange: result.updates?.updatedRange,
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    return res.status(500).json({
      error: 'Failed to submit form',
      details: error.message,
    });
  }
}
