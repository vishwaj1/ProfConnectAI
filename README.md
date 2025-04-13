
# 📚 AI Professor Summary Agent

This fullstack project scrapes professor data from their profile pages, summarizes it using the **Groq API**, and displays it on a React frontend. Users can also email professors directly via a button click.

---

## 📁 Project Structure

```
sendEmailsAIAgent/
├── backend/              # Express backend server
│   ├── server.js
│   ├── professors.csv
│   └── .env
├── frontend/             # React frontend app (Vite)
│   └── src/
│       └── App.jsx
├── README.md
```

---

## 🚀 Setup Instructions

### 1. **Clone the repository**
```bash
git clone https://github.com/yourusername/sendEmailsAIAgent.git
cd sendEmailsAIAgent
```

---

### 2. **Backend Setup**

```bash
cd backend
npm install
```

#### ✅ Required Packages
- `express`
- `axios`
- `cheerio`
- `csv-parser`
- `dotenv`
- `cors`

Install them:
```bash
npm install express axios cheerio csv-parser dotenv cors
```

#### 🔑 Add Groq API Key


```
GROQ_API_KEY=your_groq_api_key_here
```

#### ▶️ Run the backend

```bash
node server.js
```

Server runs at: [http://localhost:3001/api/professors](http://localhost:3001/api/professors)

---

### 3. **Frontend Setup**

```bash
cd ../frontend
npm install
```

If using **Vite**, make sure to install the dev server:

```bash
npm install -D vite
```




#### ▶️ Run the frontend

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🔍 Features

- Scrapes individual professor pages for:
  - ✅ Research Interests
  - ✅ Education
  - ✅ Biography
  - ✅ Recent Publications
- Summarizes using the **Groq API**
- Displays results in a responsive card layout
- Includes **"Email Professor"** button

---

## 🛠 Technologies

- Frontend: React (Vite)
- Backend: Express, Cheerio, Axios, CSV Parser
- AI: Groq API

---

## 📬 Questions or Help?

Feel free to reach out or open an issue if you face problems during setup.
