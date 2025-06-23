# Comic Reader

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [Yarn](https://yarnpkg.com/) (recommended package manager)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/djhahe/comic-reader.git
   cd comic-reader
   ```

2. **Install dependencies using Yarn**

   ```bash
   yarn install
   ```

## 🏃‍♂️ Running the Project

### Development Mode

```bash
yarn dev
```

This will start the development server at `http://localhost:5173`

## 🧪 Running Tests

This project uses [Vitest](https://vitest.dev/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for unit testing.

### Run all tests

```bash
yarn test
```

## 📁 Project Structure

```
comic-reader/
├── src/
│   ├── components/
│   │   ├── button/          # Button component
│   │   ├── input/           # Input component
│   │   ├── header/          # Header (navigation/search)
│   │   ├── comic-image/     # Comic image display
│   ├── hooks/               # Custom hooks (e.g., useFetch)
│   ├── services/            # API services
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── vitest.config.ts         # Vitest configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```
