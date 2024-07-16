const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {GoogleAuth} = require('google-auth-library');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const CREDENTIALS = {
  "type": "service_account",
  "project_id": "financesheets-341519",
  "private_key_id": process.env.G_PRIVATE_KEY_ID,
  "private_key": process.env.G_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  "client_email": "financesheets@financesheets-341519.iam.gserviceaccount.com",
  "client_id": "101261184916591295180",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/financesheets%40financesheets-341519.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


async function checkAuth() {
  try {
    const auth = new GoogleAuth({
      scopes: SCOPES,
      credentials: CREDENTIALS
    });
    const client = await auth.getClient();
    // const content = await fs.readFile(CREDENTIALS_PATH);
    // const client = await authorize(CREDENTIALS);
    return client;
  } catch (err) {
    console.error('Error loading client secret file:', err);
    throw err;
  }
}

module.exports = { checkAuth }
