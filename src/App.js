import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QuoteGenerator from './components/QuoteGenerator';
import Gallery from './components/Gallery';
import Clock from 'react-live-clock';
import { Grid, Paper, FormControl, Select, MenuItem, InputLabel, TextField, Button } from '@mui/material';

const AppContainer = styled.div`
  text-align: center;
  background: linear-gradient(135deg, #e0f7fa, #e1bee7);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Panel = styled(Paper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 512px;
  height: auto;
  max-height: 900px;
  overflow-y: auto;
`;

const QuoteDisplay = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 512px;
  height: 512px;
  background-color: ${(props) => props.bgColor || 'white'} !important;
  color: ${(props) => props.fontColor || '#000'} !important;
  font-family: ${(props) => props.fontFamily || 'Arial'} !important;
  font-weight: ${(props) => (props.effect === 'bold' ? 'bold' : 'normal')};
  font-style: ${(props) => (props.effect === 'italic' ? 'italic' : 'normal')};
  text-decoration: ${(props) => (props.effect === 'underline' ? 'underline' : 'none')};
  font-size: 2em;
`;

const PointsPanel = styled(Paper)`
  width: 512px;
  background-color: #2196f3 !important;
  color: white !important;
  padding: 10px;
  margin-top: 10px;
`;

const ClockPanel = styled(Paper)`
  width: 512px;
  padding: 10px;
  margin-top: 10px;
`;

const backgroundColors = [
  '#FFFFFF', '#000000', '#FFEBEE', '#FCE4EC', '#F3E5F5', '#E8EAF6',
  '#E3F2FD', '#E0F7FA', '#E0F2F1', '#E8F5E9', '#F1F8E9', '#FFFDE7',
  '#FFF3E0', '#FBE9E7', '#EFEBE9', '#FAFAFA', '#B0BEC5', '#FFCDD2',
  '#F8BBD0', '#E1BEE7', '#C5CAE9', '#BBDEFB', '#B2EBF2', '#B2DFDB',
  '#C8E6C9', '#DCEDC8', '#F0F4C3', '#FFF9C4', '#FFECB3', '#FFE0B2',
  '#D7CCC8', '#CFD8DC'
];

const fontColors = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
  '#FF4500', '#32CD32', '#1E90FF', '#FF1493', '#FFD700', '#ADFF2F',
  '#FF69B4', '#FF6347', '#20B2AA', '#9370DB', '#8B0000', '#8B008B',
  '#40E0D0', '#B22222', '#228B22', '#4682B4', '#FF00FF', '#FFDAB9'
];

const fonts = [
  'Arial',
  'Courier',
  'Georgia',
  'Times New Roman',
  'Verdana',
  'Roboto',
  'Indie Flower',
  'Permanent Marker',
  'Great Vibes',
  'Courier Prime'
];

const effects = ['none', 'bold', 'italic', 'underline'];

const App = () => {
  const [quote, setQuote] = useState('');
  const [bgColor, setBgColor] = useState(backgroundColors[0]);
  const [fontColor, setFontColor] = useState(fontColors[0]);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [effect, setEffect] = useState('none');
  const [nfts, setNfts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('AI');
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedNfts = JSON.parse(localStorage.getItem('nfts') || '[]');
    const savedPoints = parseInt(localStorage.getItem('points') || '0');
    setNfts(savedNfts);
    setPoints(savedPoints);
  }, []);

  useEffect(() => {
    localStorage.setItem('nfts', JSON.stringify(nfts));
    localStorage.setItem('points', points.toString());
  }, [nfts, points]);

  const handleQuoteGenerated = (newQuote) => {
    setQuote(newQuote);
  };

  const handleBgColorChange = (event) => {
    setBgColor(event.target.value);
  };

  const handleFontColorChange = (event) => {
    setFontColor(event.target.value);
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const handleEffectChange = (event) => {
    setEffect(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleNFTMinted = () => {
    const newNFT = {
      title,
      quote,
      description,
      price: getCategoryPrice(category),
      bgColor,
      fontColor,
      fontFamily,
      effect,
      date: new Date().toLocaleString(),
      points: category === 'AI' ? 25 : 100,
    };
    setNfts([...nfts, newNFT]);
    setPoints(points + newNFT.points);
  };

  const getContrastingColor = (color) => {
    return parseInt(color.replace('#', ''), 16) > 0xffffff / 2 ? '#000000' : '#ffffff';
  };

  const getCategoryPrice = (category) => {
    return category === 'AI' ? 0.0001 : 0.001;
  };

  return (
    <AppContainer>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Panel elevation={3}>
            <h2>Daily Quotes</h2>

            <FormControl variant="filled" fullWidth style={{ margin: '10px 0' }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value="AI">AI (All Quotes) - {getCategoryPrice('AI')} ETH</MenuItem>
                <MenuItem value="LEGENDARY">LEGENDARY (Famous Quotes) - {getCategoryPrice('LEGENDARY')} ETH</MenuItem>
              </Select>
            </FormControl>

            <QuoteGenerator category={category} onQuoteGenerated={handleQuoteGenerated} />

            <FormControl variant="filled" fullWidth style={{ margin: '10px 0' }}>
              <InputLabel>Font</InputLabel>
              <Select
                value={fontFamily}
                onChange={handleFontFamilyChange}
                label="Font"
              >
                {fonts.map((font) => (
                  <MenuItem key={font} value={font}>
                    {font}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="filled" fullWidth style={{ margin: '10px 0' }}>
              <InputLabel>Effect</InputLabel>
              <Select
                value={effect}
                onChange={handleEffectChange}
                label="Effect"
              >
                {effects.map((eff) => (
                  <MenuItem key={eff} value={eff}>
                    {eff.charAt(0).toUpperCase() + eff.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="filled" fullWidth style={{ margin: '10px 0' }}>
              <InputLabel>Background Color</InputLabel>
              <Select
                value={bgColor}
                onChange={handleBgColorChange}
                label="Background Color"
                style={{ backgroundColor: bgColor }}
              >
                {backgroundColors.map((color) => (
                  <MenuItem key={color} value={color} style={{ backgroundColor: color, color: getContrastingColor(color) }}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="filled" fullWidth style={{ margin: '10px 0' }}>
              <InputLabel>Font Color</InputLabel>
              <Select
                value={fontColor}
                onChange={handleFontColorChange}
                label="Font Color"
                style={{ color: fontColor }}
              >
                {fontColors.map((color) => (
                  <MenuItem key={color} value={color} style={{ backgroundColor: '#E0E0E0', color: color }}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              variant="filled"
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ margin: '10px 0' }}
            />

            <TextField
              variant="filled"
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ margin: '10px 0' }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ margin: '10px 0' }}
              onClick={handleNFTMinted}
            >
              Mint NFT ({getCategoryPrice(category)} ETH)
            </Button>

          </Panel>
        </Grid>

        <Grid item xs={12} md={6}>
          <QuoteDisplay
            elevation={3}
            bgColor={bgColor}
            fontColor={fontColor}
            fontFamily={fontFamily}
            effect={effect}
          >
            <p>{quote}</p>
          </QuoteDisplay>
          <PointsPanel elevation={3}>
            <h3>Your Total Points: {points}</h3>
          </PointsPanel>
          <ClockPanel elevation={3}>
            <Clock format={'dddd, MMMM Do, YYYY, h:mm:ss A'} ticking={true} timezone={'US/Pacific'} />
          </ClockPanel>
        </Grid>
      </Grid>

      <div style={{ marginTop: '20px', width: '100%' }}>
        <h2>Your Daily Quotes Gallery</h2>
        <Gallery nfts={nfts} />
      </div>
    </AppContainer>
  );
};

export default App;
