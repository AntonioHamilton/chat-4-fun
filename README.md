# Chat 4 Fun 🎮

Welcome to "Chat 4 Fun", a collection of interactive games built with Next.js and React. This project serves as a playground for developing and showcasing fun, browser-based games.

## 🚀 Live Version

You can play the latest version of the game at [https://chat4fun.vercel.app/](https://chat4fun.vercel.app/)

## ✨ Features

This project is a web application that hosts different mini-games.

### 🏋️‍♂️ Gym Clicker

"Gym Clicker" is the first game available in the collection. It's a clicker game with a gym theme.

- **Click to Earn**: Click the "Click" button to earn "Pump Coins".
- **Hire Lifters**: Use your Pump Coins to hire lifters who will automatically generate coins for you.
- **Upgrade Lifters**: Upgrade your lifters to increase their coin generation rate. Each upgrade level features a new, fun GIF.
- **Automatic Progress**: Your game state is automatically saved in your browser's local storage, so you can pick up where you left off.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [React](https://reactjs.org/)
- **Styling**: [Styled Components](https://styled-components.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Linting/Formatting**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

## 📂 Project Structure

The project is organized as follows:

```
.
├── public/              # Static assets (images, GIFs)
└── src/
    ├── Components/      # Shared React components
    ├── GymClicker/      # Components and hooks for the Gym Clicker game
    ├── pages/           # Next.js pages (routes)
    │   ├── index.tsx    # The main landing page
    │   └── gym-clicker/ # The Gym Clicker game page
    └── styles/          # Styled-components definitions
```

## 🏃‍♂️ Running Locally

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd chat4fun
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🤝 How to Interact

- **Landing Page**: The main page at the root URL (`/`) will show a list of available games. Click on a game card to navigate to it.
- **Gym Clicker**:
    - Click the large "Click" button to manually add "Pump Coins".
    - As you accumulate coins, you can purchase or upgrade the three available "lifters".
    - The cost of the next upgrade is displayed on the button for each lifter.
    - Watch as your lifters evolve through different GIFs with each upgrade!

---

*This project was bootstrapped with a Next.js [https://github.com/AntonioHamilton/basic-next-template](template) made by Antonio Hamilton.*