import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import https from "https";
import { NextResponse } from "next/server";

const agent = new https.Agent({
  rejectUnauthorized: false
});
https.globalAgent = agent;

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SHEET_ID,
  serviceAccountAuth
);

export async function GET() {
  function fetchGoogleSheetData(rows) {
    let mainArray = [];
    let array = [];

    for (let i in rows) {
      let row_values = rows[i]._rawData;
      let headerValues = rows[i]._worksheet._headerValues;

      for (let j in row_values) {
        let key = headerValues[j];
        let obj = {
          [key]: row_values[j]
        };
        array.push(obj);
      }
      const data = Object.assign({}, ...array);
      mainArray.push(data);
    }
    return {
      sheetData: mainArray,
      headerData: rows[0]._worksheet._headerValues
    };
  }

  async function accessSpreadsheet() {
    try {
      await doc.loadInfo(); // loads document properties and worksheets

      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows();

      const data = fetchGoogleSheetData(rows);

      return { data: data };
    } catch (error) {
      return { data: error };
    }
  }

  // Call the function to access the spreadsheet
  const { data } = await accessSpreadsheet();

  return NextResponse.json({
    data: data
  });
}

export async function POST(response, request) {
  try {
    await doc.loadInfo(); // loads sheets
    const sheet = doc.sheetsByIndex[0]; // the first sheet

    const rows = await sheet.getRows();

    const key = rows.length + 1;
    const sheetl = key + 1;
    const apiData = await response.json();

    let sheetData = {
      ...apiData,
      key: key,
      ltp: `=GOOGLEFINANCE(C${sheetl}, "price")`,
      invested: `=D${sheetl}*E${sheetl}`
    };

    await sheet.addRow(sheetData);

    if (response) {
      return NextResponse.json({
        data: "The Sheet has been updated successfully"
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: error
    });
  }
}
