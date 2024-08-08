import React from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 20px;
`;

const NFTCard = styled.div`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => (props.effect === 'bold' ? 'bold' : 'normal')};
  font-style: ${(props) => (props.effect === 'italic' ? 'italic' : 'normal')};
  text-decoration: ${(props) => (props.effect === 'underline' ? 'underline' : 'none')};
  width: 128px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  padding: 8px;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
`;

const NFTFooter = styled.div`
  background-color: #000;
  color: #fff;
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
  padding: 2px;
`;

const Gallery = ({ nfts }) => {
  const calculateFontSize = (quote) => {
    const length = quote.length;
    if (length < 50) return '1em';
    if (length < 100) return '0.75em';
    return '0.5em';
  };

  return (
    <GalleryContainer>
      {nfts.map((nft, index) => (
        <div key={index}>
          <NFTCard
            bgColor={nft.bgColor}
            fontColor={nft.fontColor}
            fontFamily={nft.fontFamily}
            effect={nft.effect}
            fontSize={calculateFontSize(nft.quote)}
          >
            <p>{nft.quote}</p>
          </NFTCard>
          <NFTFooter>
            <div>{nft.date}</div>
            <div>+{nft.points} points</div>
          </NFTFooter>
        </div>
      ))}
    </GalleryContainer>
  );
};

export default Gallery;
