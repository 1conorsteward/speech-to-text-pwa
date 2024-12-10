Speech-To-Text Progressive Web App (PWA)
Author: Conor Steward
Email: 1conorsteward@gmail.com
Date: 12/09/2024

Overview
The Speech-to-Text PWA is a dynamic and user-friendly web application that transcribes speech into text in real-time using the Web Speech API. Users can save, manage, and interact with their transcriptions, as well as download them in various file formats. Designed to be responsive and accessible, this PWA is optimized for modern browsers and devices.

Features
Speech-to-Text Conversion
Real-time speech recognition using the Web Speech API.
Handles spoken punctuation (e.g., "comma," "period") and converts them to symbols.
Text Saving and Management
Save transcriptions for future reference.
View saved texts in a scrollable, interactive container.
Click saved texts to repopulate them in the main text box and remove them from the list automatically.
File Download Options
Download saved texts as Word (.docx), Text (.txt), PDF (.pdf), or CSV (.csv) files.
Seamlessly handles file generation with error handling for robustness.
Responsive Design
Fully responsive layout for all screen sizes (desktop, tablet, mobile).
Modern, clean UI with support for light and dark themes.
Accessibility
Keyboard-friendly navigation and focus states for usability.
Contrast-friendly design for readability in both light and dark themes.
Progressive Web App (PWA)
Installable on supported devices via browser prompts.
Provides offline functionality for managing saved transcriptions.

Technologies Used
Frontend
React: Component-based JavaScript library for building user interfaces.
Web Speech API: Enables real-time speech recognition.
DOMPurify: Ensures input sanitization for security.
HTML5: Semantic markup for accessibility.
CSS3: Provides responsive layouts, hover effects, and modern styling.
Build Tools
Vite: Fast development and build environment.
ESModules: Supports modern JavaScript features.
Getting Started
Prerequisites
Node.js: Version 16 or higher.
npm: Comes bundled with Node.js.

Installation
Clone the repository:
git clone https://github.com/1conorsteward/speech-to-text-pwa.git
cd speech-to-text-pwa
Install dependencies:
npm install
Start the development server:
npm run dev
Open your browser and navigate to:
http://localhost:5173

How to Use
Recording Speech
Click the Record button to start transcribing speech.
Speak clearly into your device’s microphone.
Click Stop Recording to pause the transcription process.
Adding Punctuation
Say "comma," "period," "question mark," or "exclamation mark" to include punctuation in your transcription.
Saving Transcriptions
After transcription, click the Save button.
The text will appear in the scrollable list below the main text box.

Interacting with Saved Texts
Repopulate: Click any saved text to repopulate it into the text box.
Remove: The clicked item will be automatically removed from the list.
Downloading Saved Texts
Select a file type from the dropdown menu (.docx, .txt, .pdf, .csv).
Click the Download button to save your transcriptions locally.

Folder Structure
speech-to-text-pwa/
├── public/
│   ├── favicon.ico        # App icon
│   ├── index.html         # Base HTML file
├── src/
│   ├── App.jsx            # Main React component
│   ├── App.css            # Component-specific styles
│   ├── index.css          # Global CSS styles
│   ├── index.js           # Entry point for React
├── package.json           # Project metadata and dependencies
└── README.md              # Documentation


Available Scripts
npm run dev: Starts the development server.
npm run build: Builds the app for production.
npm run preview: Previews the production build locally.

Features in Detail
Dark and Light Mode
Adapts to the user’s system preferences via the prefers-color-scheme media query.
Scrollable Saved Text List
Displays all saved transcriptions in a scrollable, interactive box.
Items include hover effects and can be clicked for re-editing.
Real-Time Speech Recognition
Captures audio from the microphone and transcribes it into text in real time.

File Downloads
Users can export saved texts in multiple formats: Word, Text, PDF, and CSV.
Dynamic Text Box
Users can type, edit, or paste text alongside their transcriptions.

Known Issues
Browser Compatibility
The Web Speech API works best in Google Chrome.
Limited support in Safari and Firefox.
Speech Recognition Limitations
May struggle with strong accents or noisy environments.
Future Enhancements
Language Support:
Add support for multiple languages in speech recognition.
Enhanced Offline Mode:
Allow offline access for saving and managing texts.
Additional Export Options:
Enable downloads in additional file formats, such as .xlsx.
Contributing
We welcome contributions to improve the Speech-to-Text PWA!

Steps to Contribute
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
React Documentation
Web Speech API Reference
Vite Documentation
Contact
For questions or feedback, please reach out:

Email: 1conorsteward@gmail.com
GitHub: https://github.com/1conorsteward
