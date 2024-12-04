/**
 * ===============================================================
 * Conor Steward
 * 11/04/2024
 * Speech To Text
 * 1conorsteward@gmail.com
 * Issues: No known issues.
 * 
 * File: App.jsx
 * Description: This file contains the React component for the 
 * Speech-to-Text Progressive Web Application (PWA). It manages 
 * user interactions, speech-to-text transcription, text saving, 
 * and the display of saved transcriptions.
 * ===============================================================
 */

import { useState } from 'react';
import './App.css';

function App() {
  // State to track whether the app is recording speech
  const [isRecording, setIsRecording] = useState(false);

  // State to store the current text content in the text box
  const [text, setText] = useState('');

  // State to store a list of saved text entries
  const [savedTexts, setSavedTexts] = useState([]);

  // State to store the SpeechRecognition instance for speech-to-text functionality
  const [recognition, setRecognition] = useState(null);

  /**
   * handleRecord: Starts or stops the speech recognition process.
   * - Initializes a new SpeechRecognition instance if not already created.
   * - Captures speech input and processes it into text.
   */
  const handleRecord = () => {
    if (!isRecording) {
      if (!recognition) {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
          alert('Speech recognition is not supported in this browser.');
          return;
        }

        const newRecognition = new SpeechRecognition();
        newRecognition.continuous = true; // Keeps recording continuously
        newRecognition.interimResults = false; // Finalize results only
        newRecognition.lang = 'en-US'; // Set language to US English

        // Handles the results of the speech recognition process
        newRecognition.onresult = (event) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += replaceSpokenPunctuation(transcript);
            }
          }
          // Appends the transcribed text to the existing text in the text box
          setText((prevText) => prevText + finalTranscript);
        };

        // Handles errors in the speech recognition process
        newRecognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          alert('An error occurred: ' + event.error);
        };

        // Store the SpeechRecognition instance
        setRecognition(newRecognition);
      }

      // Start speech recognition
      recognition.start();
      console.log('Recording started...');
    } else {
      // Stop speech recognition
      recognition.stop();
      console.log('Recording stopped.');
    }

    // Toggle the recording state
    setIsRecording(!isRecording);
  };

  /**
   * replaceSpokenPunctuation: Replaces spoken punctuation keywords 
   * (e.g., "comma", "period") with their respective symbols.
   * @param {string} transcript - The spoken text to process.
   * @returns {string} - The processed text with punctuation symbols.
   */
  const replaceSpokenPunctuation = (transcript) => {
    return transcript
      .trim()
      .replace(/\bcomma\b/g, ', ')
      .replace(/\bperiod\b/g, '. ')
      .replace(/\bquestion mark\b/g, '? ')
      .replace(/\bexclamation mark\b/g, '! ')
      .replace(/\s+([,?.!])/g, '$1 ')
      .replace(/\s+/g, ' ');
  };

  /**
   * handleSave: Saves the current text in the text box to the savedTexts array.
   * - Clears the text box after saving.
   */
  const handleSave = () => {
    if (text.trim() !== '') {
      // Add the current text to the saved texts list
      setSavedTexts((prevSavedTexts) => [...prevSavedTexts, text.trim()]);
      // Clear the text box
      setText('');
    }
  };

  /**
   * handleSavedTextClick: Handles the click on a saved text item.
   * - Repopulates the text box with the clicked text.
   * - Removes the clicked text from the savedTexts list to prevent duplicates.
   * @param {string} savedText - The saved text item clicked by the user.
   */
  const handleSavedTextClick = (savedText) => {
    setText(savedText); // Repopulate the text box with the saved text
    setSavedTexts((prevSavedTexts) =>
      prevSavedTexts.filter((item) => item !== savedText)
    ); // Remove the clicked item from the saved texts list
  };

  return (
    <div id="root">
      <h1>Speech to Text</h1>

      {/* Text Area */}
      <textarea
        placeholder="Type here or view transcription..."
        value={text} // Controlled input value
        onChange={(e) => setText(e.target.value)} // Update the text box state
      />

      {/* Button Container */}
      <div className="button-container">
        <button onClick={handleRecord}>
          {isRecording ? 'Stop Recording' : 'Record'}
        </button>
        <button onClick={handleSave}>Save</button>
      </div>

      {/* Scrollable Box for Saved Texts */}
      <div className="scrollable-box">
        {savedTexts.length === 0 ? (
          <p style={{ color: '#777' }}>No saved texts yet.</p>
        ) : (
          savedTexts.map((savedText, index) => (
            <p
              key={index} // Unique key for each saved item
              onClick={() => handleSavedTextClick(savedText)} // Handles click events
              className="saved-text-item"
            >
              {index + 1}. {savedText}
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
