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

## 🚀 Deployment (GitHub Pages)

1.  **Add Your Repo Name to `vite.config.ts` (Optional):**
    If your site is at `your-username.github.io/repo-name/`, the current `base: './'` in `vite.config.ts` should work.

2.  **Set up Gemini API Key on GitHub:**
    Since you shouldn't put your API key in the code:
    - Go to your GitHub Repo -> **Settings** -> **Secrets and variables** -> **Actions**.
    - Click **New repository secret**.
    - Name: `GEMINI_API_KEY`
    - Value: `YOUR_ACTUAL_KEY`

3.  **Update GitHub Actions:**
    If you are using a GitHub Action to deploy, make sure it passes the secret:
    ```yaml
    env:
      VITE_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
    ```

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
