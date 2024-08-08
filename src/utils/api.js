// src/utils/api.js

import axios from 'axios';

// Konfiguracja Axios dla Quotable API
const api = axios.create({
  baseURL: 'https://api.quotable.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funkcja do pobierania cytatu na podstawie tematyki
export const generateQuote = async (category) => {
  try {
    // Mapowanie kategorii na tagi używane w Quotable API
    const tagMap = {
      motivation: 'motivational',
      love: 'love',
      hope: 'hope',
    };

    const tag = tagMap[category] || 'motivational';

    const response = await api.get(`/random?tags=${tag}`);
    return response.data.content; // Zwraca sam tekst cytatu
  } catch (error) {
    console.error('Error generating quote:', error.response?.data || error.message);
    throw error;
  }
};
