
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

1. Create a Google Sheet
    - Create a Google Sheet and add the data you want to display on the site. The first row of the sheet should contain the column names. The column names should match the keys in the `index.js` file.
2. Share the Google Sheet
    - After creating the Google Sheet, you will need to share it with the service account that you will be using to access the data (next step).
3. Create a Service Account
    - create a service account in the Google Cloud Console. This service account will be used to access the data in the Google Sheet. Make sure to grant the service account access to the Google Sheets API.
4. Obtain credentials for your service account
    - Create a service account key in the Google Cloud console and download the JSON file. This contains the credentials that will be used for above step 6.
5. Add the credentials to your project
    - Add the credentials JSON file to your project and add the path to the file as an environment variable. The name of the environment variable should be `GOOGLE_APPLICATION_CREDENTIALS`.
6. Obtain the Google Sheet ID
    - The Google Sheet ID can be obtained from the URL of the Google Sheet. The ID is the string between `/d/` and `/edi
7. Add the Google Sheet ID to your project
    - Add the Google Sheet ID as an environment variable. The name of the environment variable should be `GOOGLE_SHEET_ID`.

## 🚀 Deploy

**Vercel**  
The easiest way to deploy the template is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/timlrx/tailwind-nextjs-starter-blog)
