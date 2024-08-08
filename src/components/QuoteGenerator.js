// src/components/QuoteGenerator.js

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const QuoteGenerator = ({ category, onQuoteGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [usedQuotes, setUsedQuotes] = useState([]);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      let response;
      if (category === 'LEGENDARY') {
        // Fetch quotes with author
        response = await axios.get('https://api.quotable.io/random');
        const quote = `${response.data.content} — ${response.data.author}`;

        // Ensure the quote is not a duplicate
        if (!usedQuotes.includes(quote)) {
          onQuoteGenerated(quote);
          setUsedQuotes([...usedQuotes, quote]);
        } else {
          fetchQuote();
        }
      } else {
        // Fetch quotes without author
        response = await axios.get('https://api.quotable.io/random');
        const quote = response.data.content;

        // Ensure the quote is not a duplicate
        if (!usedQuotes.includes(quote)) {
          onQuoteGenerated(quote);
          setUsedQuotes([...usedQuotes, quote]);
        } else {
          fetchQuote();
        }
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={fetchQuote}
      disabled={loading}
      style={{ margin: '10px 0' }}
    >
      {loading ? 'Loading...' : 'Generate Quote'}
    </Button>
  );
};

export default QuoteGenerator;
