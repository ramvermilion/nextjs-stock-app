
# Stock Market App using google-sheet-api as a database in Next.js 

## 🛠 Installation & Set Up

1. Clone this repository

   ```sh
   git clone https://github.com/ramvermilion/nextjs-stock-app.git
   ```

2. Change directories

   ```sh
   cd nextjs-stock-app
   ```

3. Install dependencies

   ```sh
   npm install
   ```

4. Start the development server

   ```sh
   npm run dev
   ```

6. Create a .env and following the .env.example input some environment variables so that can run normally.

   ```txt
    GOOGLE_PRIVATE_KEY=""
    GOOGLE_SERVICE_ACCOUNT_EMAIL=""
    GOOGLE_SHEET_ID=""
   ```

## 🏗️ Building and Running for Production

1. Generate a full static production build

   ```sh
    npm run build
    ```

2. Preview the site as it will appear once deployed

   ```sh
   npm run start
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages.js`. The page auto-updates as you edit the file.

![image](https://github.com/ramvermilion/nextjs-stock-app/assets/82430197/4a58f62e-4c69-4a33-8640-b04a156b4c3c)

![image](https://github.com/ramvermilion/nextjs-stock-app/assets/82430197/9219fdde-057b-4df7-98b3-ba6e4c774a53)

![image](https://github.com/ramvermilion/nextjs-stock-app/assets/82430197/0c1adfb8-1479-4320-a56c-e51d48905b0a)

##  Google side Customization
To create a Google Sheets API, you'll need to follow these steps:

1. **Enable the Google Sheets API:**
   - Go to the Google API Console (https://console.developers.google.com/).
   - Create a new project or select an existing project.
   - In the sidebar, click on "Library" and search for "Google Sheets API".
   - Click on "Google Sheets API" in the search results.
   - Click the "Enable" button to enable the API for your project.

2. **Create Credentials:**
   - In the API Console, go to "Credentials" in the sidebar.
   - Click on "Create credentials" and select "Service account".
   - Enter a name for your service account, choose a role (e.g., Project > Editor), and click "Continue".
   - Click "Done" to create the service account.
   - Click on the service account you just created and navigate to the "Keys" tab.
   - Click on "Add key" and choose "JSON" to download the JSON key file. This file contains your credentials.

3. **Share Google Sheets with Service Account:**
   - Open the Google Sheets file you want to access with the API.
   - Share the file with the email address associated with the service account (found in the JSON key file).

4. **Install Google APIs Client Library:**
   - Install the Google APIs Client Library for your programming language (e.g., Node.js, Python, Java). You can find installation instructions and documentation on the Google Developers website.

5. **Use the Google Sheets API in your Code:**
   - Initialize the Google Sheets API client with your credentials.
   - Use the client to interact with Google Sheets, such as reading, writing, or updating data in sheets.

Replace `'path/to/your/credentials.json'` with the path to your downloaded JSON key file, and `'your-spreadsheet-id'` with the ID of the Google Sheets document you want to access.

## 🚀 Deploy

**Vercel**  
The easiest way to deploy the template is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/timlrx/tailwind-nextjs-starter-blog)
