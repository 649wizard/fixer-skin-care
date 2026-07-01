import { google } from 'googleapis';

const sheets = google.sheets('v4');

async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.GOOGLE_CERT_URL,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return auth.getClient();
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

    const authClient = await getAuthClient();

    const response = await sheets.spreadsheets.values.append({
      auth: authClient,
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: 'Sheet1!A:G',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [
          [
            new Date(timestamp).toLocaleString('ar-EG'),
            name,
            phone,
            email,
            main_concern || '',
            Array.isArray(concerns) ? concerns.join(', ') : '',
            'new',
          ],
        ],
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      updatedRange: response.data.updates?.updatedRange,
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    return res.status(500).json({
      error: 'Failed to submit form',
      details: error.message,
    });
  }
}
