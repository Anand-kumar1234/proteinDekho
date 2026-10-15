# 🥗 ProteinDekho — Smart Nutrition & Food Database

**ProteinDekho** is a nutrition-focused web application that helps users explore food items and understand their nutritional values, including protein, calories, carbohydrates, fats, vitamins, and minerals.

The goal is to make nutrition information easier to discover through food search, nutrient-based exploration, and a simple, user-friendly interface.

<p align="center">
  <a href="https://protein-dekho-8rzq.vercel.app/"><strong>🌐 Live Demo</strong></a>
  &nbsp; | &nbsp;
  <a href="https://github.com/Anand-kumar1234/proteinDekho"><strong>📂 GitHub Repository</strong></a>
</p>

## ✨ Key Features

### 🔍 Smart Food Search
- Search for foods by name.
- Find foods using partial names and common spelling variations.
- Get autocomplete suggestions while searching.
- Explore foods using alternative names where available.

### 🥗 Nutritional Information
- Protein content
- Calories and energy
- Carbohydrates and fats
- Dietary fiber
- Vitamins, including vitamins A, B12, C, D and E
- Minerals, including calcium, iron, zinc, potassium and magnesium

### 🎯 Nutrition-Based Exploration
- Explore vegetarian and non-vegetarian food options.
- Find foods based on protein and calorie requirements.
- Support nutrition-focused food selection.
- Access structured nutritional information for individual foods.

### 🗄️ Food Database
- Store food information in MongoDB.
- Use Mongoose schemas to organize nutritional data.
- Seed the database with structured food records.
- Support food search through backend APIs.

### 🔐 Backend Capabilities
- REST API development with Express.js.
- Authentication support using JWT and bcrypt.
- Cross-origin request handling with CORS.
- Socket.IO integration for real-time communication where implemented.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development and build |
| Tailwind CSS | Styling and responsive layouts |
| Node.js | JavaScript runtime |
| Express.js | Backend API development |
| MongoDB | Nutrition database |
| Mongoose | Database schemas and queries |
| Axios | API communication |
| React Router | Frontend routing |
| JWT | Authentication |
| bcrypt | Password hashing |
| Socket.IO | Real-time communication |
| Lucide React | Icons |
| Vercel | Frontend deployment |

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- A MongoDB database, either local or hosted

### 1. Clone the Repository

```bash
git clone https://github.com/Anand-kumar1234/proteinDekho.git
cd proteinDekho
```

### 2. Set Up the Backend

Open a terminal and run:

```bash
cd backend
npm install
```

Configure the backend environment variables according to the project's environment configuration. For example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the exact variable names expected by your backend code. Keep database credentials and JWT secrets private.

Start the backend development server:

```bash
npm run dev
```

Alternatively, run the production server:

```bash
npm start
```

### 3. Set Up the Frontend

Open a second terminal from the project root:

```bash
cd fronted
npm install
```

Configure the frontend API URL if your application requires an environment variable for the backend endpoint.

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### 4. Build the Frontend

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```text
proteinDekho/
├── backend/
│   ├── data/
│   │   └── seedData.json
│   ├── models/
│   │   └── Food.js
│   ├── utils/
│   │   └── seeder.js
│   ├── package.json
│   └── index.js
│
├── fronted/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

*Note: This is a simplified overview of the project structure. Additional controllers, routes, components, configuration files, and other modules may exist in the repository.*

## 🧪 Example Use Cases

ProteinDekho is designed to help users answer everyday nutrition questions, such as:

- Which foods contain more than 20 grams of protein?
- Which vegetarian foods are high in protein?
- How many calories does a particular food contain?
- What nutrients are present in paneer, dal, eggs, or spinach?
- Which foods fit a particular calorie target?

Actual search filters and results depend on the available food records and implemented application features.

## 🎯 Project Goals

- Make nutritional information accessible and easy to understand.
- Help users explore foods according to their dietary preferences.
- Build a searchable database of food nutrients.
- Improve food discovery through autocomplete and typo-tolerant search.
- Develop a practical full-stack application using the MERN ecosystem.

## 👨‍💻 Developer

**Anand Kumar**

B.Tech Computer Science Engineering — Artificial Intelligence and Machine Learning.

Interested in full-stack development, AI-powered applications, nutrition technology, and building practical solutions to real-world problems.

- **GitHub:** [Anand-kumar1234](https://github.com/Anand-kumar1234)
- **Project Repository:** [ProteinDekho](https://github.com/Anand-kumar1234/proteinDekho)
- **Live Application:** [Try ProteinDekho](https://protein-dekho-8rzq.vercel.app/)

## 📄 License

No confirmed open-source license has been specified in this README. Add a `LICENSE` file if you intend to define how others can use, modify, and distribute the project.

---

**Built with ❤️ by Anand Kumar**
