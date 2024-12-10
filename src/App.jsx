/**
 * App.jsx
 * A React application that allows users to record speech, convert it to text, save transcriptions, 
 * and download them in various file formats (Word, Text, PDF, CSV). The application includes input validation, 
 * error handling, and file-saving functionality for enhanced security and user experience.
 * 
 * Conor Steward
 * 12/09/2024
 * Speech To Text
 * 1conorsteward@gmail.com
 * Issues: No known issues.
 */

import { useState } from 'react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph } from 'docx';
import jsPDF from 'jspdf';
import './App.css';
import DOMPurify from 'dompurify';

function App() {
  // State declarations
  const [isRecording, setIsRecording] = useState(false); // Tracks whether recording is active
  const [text, setText] = useState(''); // Stores the current text in the text box
  const [savedTexts, setSavedTexts] = useState([]); // Stores saved text entries
  const [recognition, setRecognition] = useState(null); // Stores the SpeechRecognition instance
  const [fileType, setFileType] = useState('docx'); // Stores the selected file type for download

  /**
   * @function handleRecord
   * @description Starts or stops the speech recognition process and updates the `isRecording` state.
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
        newRecognition.continuous = true; // Enable continuous recognition
        newRecognition.interimResults = false; // Only finalize complete sentences
        newRecognition.lang = 'en-US'; // Set language to US English

        // Event handler for processing speech recognition results
        newRecognition.onresult = (event) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += replaceSpokenPunctuation(transcript);
            }
          }
          setText((prevText) => prevText + finalTranscript); // Append new text
        };

        // Event handler for speech recognition errors
        newRecognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          alert('An error occurred: ' + event.error);
        };

        setRecognition(newRecognition);
      }

      recognition.start();
      console.log('Recording started...');
    } else {
      recognition.stop();
      console.log('Recording stopped.');
    }

    setIsRecording(!isRecording);
  };

  /**
   * @function replaceSpokenPunctuation
   * @description Replaces spoken punctuation with actual punctuation symbols in the transcribed text.
   * @param {string} transcript - The text received from speech recognition.
   * @returns {string} - Processed text with punctuation replaced.
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
   * @function validateText
   * @description Validates user input to ensure it meets the app's requirements.
   * @param {string} text - The input text to validate.
   * @returns {boolean} - Whether the input text is valid.
   */
  const validateText = (text) => {
    if (text.length > 10000) return false; // Limit input length
    return /^[\w\s.,!?'"-]*$/.test(text); // Allow only safe characters
  };

  /**
   * @function sanitizeText
   * @description Sanitizes user input to prevent malicious code injection.
   * @param {string} text - The input text to sanitize.
   * @returns {string} - Sanitized text.
   */
  const sanitizeText = (text) => DOMPurify.sanitize(text);

  /**
   * @function handleSave
   * @description Saves the current text to the savedTexts array if valid.
   */
  const handleSave = () => {
    if (validateText(text)) {
      setSavedTexts((prevSavedTexts) => [...prevSavedTexts, sanitizeText(text)]);
      setText('');
    } else {
      alert('Invalid input detected.');
    }
  };

  /**
   * @function handleSavedTextClick
   * @description Handles user interaction with saved texts.
   * @param {string} savedText - The clicked saved text.
   */
  const handleSavedTextClick = (savedText) => {
    setText(savedText); // Repopulate the text box
    setSavedTexts((prevSavedTexts) =>
      prevSavedTexts.filter((item) => item !== savedText)
    ); // Remove the clicked item from saved texts
  };

  /**
   * @function handleDownload
   * @description Initiates the download process for the selected file type.
   */
  const handleDownload = () => {
    if (savedTexts.length === 0) {
      alert('No saved texts to download.');
      return;
    }

    switch (fileType) {
      case 'docx':
        downloadAsDocx();
        break;
      case 'txt':
        downloadAsTxt();
        break;
      case 'pdf':
        downloadAsPdf();
        break;
      case 'csv':
        downloadAsCsv();
        break;
      default:
        console.error('Unsupported file type');
    }
  };

  /**
   * @function downloadAsDocx
   * @description Generates and downloads a Word document containing the saved texts.
   */
  const downloadAsDocx = () => {
    try {
      const doc = new Document({
        sections: [
          {
            children: savedTexts.map((text) => new Paragraph(text)),
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'saved_texts.docx');
      });
    } catch (error) {
      alert('Failed to generate the Word file. Please try again.');
      console.error('Error generating Word file:', error);
    }
  };

  /**
   * @function downloadAsTxt
   * @description Generates and downloads a plain text file containing the saved texts.
   */
  const downloadAsTxt = () => {
    try {
      const blob = new Blob([savedTexts.join('\n')], { type: 'text/plain' });
      saveAs(blob, 'saved_texts.txt');
    } catch (error) {
      alert('Failed to generate the text file. Please try again.');
      console.error('Error generating text file:', error);
    }
  };

  /**
   * @function downloadAsPdf
   * @description Generates and downloads a PDF file containing the saved texts.
   */
  const downloadAsPdf = () => {
    try {
      const doc = new jsPDF();
      savedTexts.forEach((text, index) => {
        doc.text(text, 10, 10 + index * 10);
      });
      doc.save('saved_texts.pdf');
    } catch (error) {
      alert('Failed to generate the PDF file. Please try again.');
      console.error('Error generating PDF file:', error);
    }
  };

  /**
   * @function downloadAsCsv
   * @description Generates and downloads a CSV file containing the saved texts.
   */
  const downloadAsCsv = () => {
    try {
      const csvContent = 'data:text/csv;charset=utf-8,' + savedTexts.join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'saved_texts.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert('Failed to generate the CSV file. Please try again.');
      console.error('Error generating CSV file:', error);
    }
  };

  return (
    <div id="root">
      <h1>Speech to Text</h1>

      {/* Text Box */}
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

      {/* Dropdown and Download Button */}
      <div className="download-container">
        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="file-type-dropdown"
        >
          <option value="docx">Word (.docx)</option>
          <option value="txt">Text (.txt)</option>
          <option value="pdf">PDF (.pdf)</option>
          <option value="csv">CSV (.csv)</option>
        </select>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}

export default App;
