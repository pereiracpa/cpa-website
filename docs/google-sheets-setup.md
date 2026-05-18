# Google Sheets Form Integration

Form submissions from the website are saved to a Google Sheet via Google Apps Script. This document explains how to set it up from scratch.

---

## How it works

When a visitor submits the consultation form, the browser sends the form data to a Google Apps Script web app URL. The script appends a new row to the spreadsheet. This happens silently in the background alongside the EmailJS notification — it does not affect what the user sees.

---

## Setup steps

### 1. Create the spreadsheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it `Pereira CPA Leads` (or anything you prefer)
4. Leave it empty — the script will add the header row automatically on the first submission

### 2. Add the Apps Script

1. In the spreadsheet, click **Extensions → Apps Script**
2. Delete all existing code in the editor
3. Paste the following:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Business Type', 'Services Needed', 'Message']);
  }

  sheet.appendRow([
    new Date(),
    data.firstName  || '',
    data.lastName   || '',
    data.email      || '',
    data.phone      || '',
    data.businessType   || '',
    data.servicesNeeded || '',
    data.message    || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Save** (give the project any name, e.g. `Pereira CPA Form`)

### 3. Deploy as a web app

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Type" and select **Web app**
3. Set the following:
   - **Description:** anything, e.g. `v1`
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Google will ask you to authorize — click through the permissions prompt
   - If you see "Google hasn't verified this app", click **Advanced → Go to [project name] (unsafe)** — this is safe because it is your own script
6. Copy the **Web app URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

### 4. Add the URL to the website code

In both `script.js` and `v2/script.js`, find this line and replace the URL:

```javascript
const SHEET_URL = 'https://script.google.com/macros/s/.../exec';
```

---

## Re-deploying after script changes

If you edit the Apps Script code, you must create a **new deployment** for changes to take effect — editing the script alone is not enough.

1. Click **Deploy → New deployment**
2. Follow the same steps as above
3. Copy the new URL and update `SHEET_URL` in both `script.js` files

---

## Current deployment

| Field | Value |
|---|---|
| Google account | robertopereiraosorio@gmail.com |
| Spreadsheet | Pereira CPA Leads |
| Script URL | `https://script.google.com/macros/s/AKfycbx2WAm01-72k10aXEDd3TP3EP4rMBD4EK9-hsSX6uQJl7vejhhXcoALhDMweXhCg0kISw/exec` |

---

## Columns in the spreadsheet

| Column | Source |
|---|---|
| Timestamp | Set automatically by the script |
| First Name | `firstName` field |
| Last Name | `lastName` field |
| Email | `email` field |
| Phone | `phone` field |
| Business Type | `businessType` select |
| Services Needed | `servicesNeeded` select |
| Message | `message` textarea |
