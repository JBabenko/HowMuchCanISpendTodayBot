require('dotenv').config();

function getSheetsValues(sheets, range, valueRenderOption = 'FORMATTED_VALUE') {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREAD_SHEET_ID,
      range,
      valueRenderOption,
    }, (err, res) => {
      if (err) {
        console.log('The API returned an error: ' + err)
        reject();
      };
      if (!res) {
        console.log('[getSheetsValues]: No response data')
        reject();
      }
      resolve(res.data.values);
    })
  })
}

module.exports = { getSheetsValues }
