require('dotenv').config();

function getSheetsValues(sheets, range) {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREAD_SHEET_ID,
      range,
    }, (err, res) => {
      if (err) {
        console.log('The API returned an error: ' + err)
        reject();
      };
      resolve(res.data.values);
    })
  })
}

module.exports = { getSheetsValues }
