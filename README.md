Conor Steward
11/04/2024
Speech To Text
1conorsteward@gmail.com


-Overview
The Speech-to-Text PWA is a modern web application that transcribes speech into text in real time using the Web Speech API. The application also allows users to save their transcriptions, view them in a scrollable list, and interact with saved items dynamically. Designed for both light and dark modes, this app is responsive, accessible, and easy to use across various devices.

-Features
Speech-to-Text Conversion:
Converts spoken words into written text in real time using the Web Speech API.
Handles spoken punctuation (e.g., "comma," "period") and replaces them with symbols.

-Text Saving and Management:
Allows users to save transcriptions for future reference.
Displays saved texts in a scrollable container with hover effects for interactivity.
Enables users to click saved texts to repopulate the main text area, automatically removing them from the saved list to prevent duplicates.

-Responsive Design:
Fully responsive layout for desktop, tablet, and mobile devices.
Uses a clean and modern UI with support for both light and dark themes.

-Accessibility:
Keyboard-friendly navigation.
Focus and hover effects on interactive elements for usability.

-Progressive Web App (PWA):
Installable on supported devices via browser prompts.
Works offline for viewing saved transcriptions.

-Technologies Used:
-Frontend:
React: Component-based JavaScript library for building user interfaces.
Web Speech API: Provides speech recognition capabilities.
HTML5: Semantic and accessible markup.
CSS3: Styling for light and dark themes, responsive layouts, and hover effects.

-Build Tools:
Vite: Fast development environment for modern web projects.
ESModules: Enables modern JavaScript features in the browser.
Getting Started
Prerequisites
Node.js: Version 16 or higher.
npm: Comes bundled with Node.js.


-Installation:

Clone the repository:
git clone https://github.com/your-username/speech-to-text-pwa.git
cd speech-to-text-pwa

Install dependencies:
npm install

Start the development server:
npm run dev

Open your browser and navigate to:
http://localhost:5173


How to Use:

Recording Speech:
Click the Record button to start transcribing speech.
Speak clearly into your device's microphone.
Click Stop Recording to pause the transcription process.

Adding Punctuation:
Say "comma", "period", "question mark", or "exclamation mark" during speech to include punctuation in your transcription.

Saving Transcriptions:
After transcription, click the Save button.
The text will appear in the scrollable list below the main text box.
Interacting with Saved Texts
Click any item in the scrollable list to repopulate it into the text box.
The clicked item will be automatically removed from the saved list.


-Folder Structure:
speech-to-text-pwa/
├── public/
│   ├── favicon.ico        # Favicon for the app
│   ├── index.html         # Base HTML file
├── src/
│   ├── App.jsx            # Main React component
│   ├── index.css          # Global CSS styles
│   ├── index.js           # Entry point for React
│   └── App.css            # Component-specific styles
├── package.json           # Project metadata and dependencies
└── README.md              # Documentation


-Available Scripts:
npm run dev: Starts the development server.
npm run build: Builds the application for production.
npm run preview: Previews the production build.


-Features in Detail:
Dark and Light Mode:
The app adapts to the user's system preferences using the prefers-color-scheme media query.

Scrollable Saved Text List
Displays all saved transcriptions in a scrollable, interactive box.
Items are styled with hover effects and are clickable for re-editing.

Real-Time Speech Recognition
Captures audio from the microphone and transcribes it into text in real time.

Dynamic Text Box
Allows users to type, edit, or paste text alongside transcriptions.

Accessibility Features
Keyboard Navigation: Focus states ensure accessibility for keyboard users.

Contrast-Friendly Design: Colors ensure readability across light and dark themes.
Focus Management: Ensures users can navigate forms and buttons easily.


-Known Issues:

Browser Compatibility:

The Web Speech API works best in modern browsers like Google Chrome.
Limited support in Safari and Firefox.

Speech Recognition Limitations:

May not handle accents or noisy environments well.


-Future Enhancements:
Language Support:
Add options for multiple languages in speech recognition.
Offline Mode:
Enhance offline functionality for viewing and managing saved texts.
Export Options:
Allow users to download saved transcriptions as text files.
Contributing
We welcome contributions to improve the Speech-to-Text PWA! Please follow these steps:

Fork the repository.
Create a feature branch:
git checkout -b feature-name
Commit your changes:
git commit -m "Add feature"
Push the branch:
git push origin feature-name
Open a pull request.


License
This project is licensed under the MIT License.

Credits
React Documentation: https://reactjs.org
Web Speech API Reference: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
Vite Documentation: https://vitejs.dev
Contact
For questions or feedback, please reach out at:

Email: 1conorsteward@gmail.com
GitHub: https://github.com/1conorsteward