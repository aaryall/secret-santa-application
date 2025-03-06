A Node.js-based application that assigns Secret Santa pairs from an uploaded .xlsx file and exports the results to a new .xlsx file.

✅ Upload an .xlsx file with employee data
✅ Assign Secret Santa pairs randomly
✅ Export assignments to a formatted .xlsx file
✅ REST API built with Express.js
✅ File handling with multer

2️⃣ Install Dependencies
npm i multer
npm i express
npm i parse-csv
npm i xlsx

3️⃣ Run the Server
sh
Copy
Edit
npm start
Server runs on http://localhost:3000

🛠 API Endpoints
Method	Endpoint	Description
POST	/api/santagame/upload	Upload .xlsx file

📂 Project Structure
/src
  ├── features/
  │   ├── secretSanta.controller.js
  │   ├── secretSanta.services.js
  │   ├── secretSanta.routes.js
  ├── middlewares/
  │   ├── file-upload.middleware.js
  ├── utils/
  │   ├── shuffleArray.js
			

Technologies Used
Node.js + Express.js – Backend API
Multer – File Upload Handling
xlsx – Excel File Parsing & Writing
