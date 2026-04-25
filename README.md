# Remix: The Grand Scholar's University Portal 🏛️

![Remix University Portal](./logo.svg)

**Remix** is a premium, high-end interactive university platform designed specifically for **English Studies** students at **FLSHM (Faculté des Lettres et des Sciences Humaines de Mohammedia)**, focusing on Semester 2 (S2). 

Featuring immersive 3D-enhanced learning tools, an intelligent academic assistant, and comprehensive archives, Remix transforms the traditional learning experience into a modern, digital academy.

## ✨ Key Features

-   **Intelligent Academic Assistant:** Powered by Google Gemini 1.5 Flash, providing real-time tutoring for Grammar, Composition, and British Civilization.
-   **Immersive Learning Modules:**
    -   **🖋️ Advanced Grammar:** Morphology, syntax, and university-level mechanics.
    -   **📚 Literature & Language:** Poetics, prose, and EBSCO-sourced archives.
    -   **🏛️ British & US Civilization:** Historic foundations and cultural comparative studies.
    -   **🔬 History of Science:** Scientific revolutions and breakthroughs.
    -   **🌍 Topography & Geography:** USGS concepts and map reading.
    -   **🌐 Computing History:** The evolution of the digital age.
-   **Interactive Quizzes:** Challenge your knowledge with built-in assessments and instant feedback.
-   **Premium UI/UX:** Built with a "Scholar's Gothic" aesthetic featuring glassmorphism, 3D icon effects, and fluid animations.
-   **Ambient Background:** Interactive canvas particles representing mathematical and linguistic symbols.

## 🚀 Deployment & Troubleshooting (Blank Page Fix)

If you see a **blank page** after deploying to GitHub Pages, follow these steps:

1.  **Check the URL:** Ensure you are visiting `https://your-username.github.io/repo-name/`. (Note the trailing slash).
2.  **Verify Vite Base Path:** In `vite.config.ts`, `base: './'` is used to ensure relative paths.
3.  **GitHub Pages Source:**
    - Go to your Repo -> **Settings** -> **Pages**.
    - Under **Build and deployment**, ensure **Source** is set to **GitHub Actions**.
4.  **Inspect Console:** Right-click the blank page -> **Inspect** -> **Console**. Look for 404 errors. If assets are not loading, the path in `base` might need to match your repository name exactly (e.g., `/remix-university-portal/`).
5.  **Set up Gemini API Key:**
    - Go to Repo -> **Settings** -> **Secrets and variables** -> **Actions**.
    - Add `GEMINI_API_KEY` as a secret.

## 🛠️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/remix-university-portal.git
    cd remix-university-portal
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your Gemini API Key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 📖 Usage

-   **Login:** Access the portal via the premium login gateway.
-   **Modules:** Navigate through the sidebar to explore different academic disciplines.
-   **Tutor:** Use the chat interface to ask specific questions about your FLSHM S2 curriculum.
-   **Quizzes:** Complete quizzes at the end of each module to track your progress.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Built with ❤️ for the students of FLSHM.*
