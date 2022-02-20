require('dotenv').config();

function updateSheetsValues(sheets, range, values) {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.update({
      
      spreadsheetId: process.env.SPREAD_SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values,
      }
    }, (err, res) => {
      if (err) {
        console.log('The API returned an error: ' + err)
        reject();
      };
      resolve(res);
    })
  })
}

module.exports = { updateSheetsValues }
