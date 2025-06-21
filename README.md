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

## 📁 Project Structure

```
comic-reader/
├── src/
│   ├── components/
│   │   ├── button/          # Button component with variants
│   │   ├── input/           # Input component with icon support
│   │   ├── tooltip/         # Tooltip component
│   │   └── image/           # Image component with loading states
│   ├── hooks/
│   │   └── useFetch.ts      # Custom hook for API calls
│   ├── services/            # API services
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```
