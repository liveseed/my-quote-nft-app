// src/components/QuoteCustomizer.js

import React from 'react';

const fonts = ['Arial', 'Courier', 'Georgia', 'Times New Roman', 'Verdana'];
const effects = ['none', 'bold', 'italic', 'underline'];

const QuoteCustomizer = ({ quote, onQuoteChange, onFontChange, onEffectChange }) => {
  return (
    <div>
      <textarea
        value={quote}
        onChange={(e) => onQuoteChange(e.target.value)}
        rows="4"
        cols="50"
        style={{ marginBottom: '10px' }}
      />
      <div>
        <label>Font: </label>
        <select onChange={(e) => onFontChange(e.target.value)}>
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Effect: </label>
        <select onChange={(e) => onEffectChange(e.target.value)}>
          {effects.map((effect) => (
            <option key={effect} value={effect}>
              {effect}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default QuoteCustomizer;
