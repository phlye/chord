import React from 'react';
import styled from 'styled-components';


const octaves = 3;
const totalKeySlots = octaves * 14;
const whiteKeyWidth = 58;
const blackKeyWidth = whiteKeyWidth * 0.6;
const slotWidth = whiteKeyWidth / 2;
const keyboardWidth = totalKeySlots * slotWidth;
const whiteKeyHeight = whiteKeyWidth * 3.4;
const blackKeyHeight = whiteKeyHeight * 0.6;
const keyTemplate = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
const keyOffset = [0, 1.45, 2, 3.45, 4, 6, 7.45, 8, 9.45, 10, 11.45, 12];


const keyArray = [...Array(octaves).keys()].map(octave => {
  const keys = [...Array(12).keys()].map(noteIndex => {
    const absIndex = octave * 12 + noteIndex;
    const type = keyTemplate[noteIndex];
    const offset = octave * 14 + keyOffset[noteIndex]
    return { absIndex, noteIndex, octave, type, offset, active: false, hover: false }
  })
  return keys;
}).flat();

const Key = styled.div`
  position: absolute;
  box-sizing: border-box;
  background-color: ${({ type }) => type ? 'black' : 'ivory'};
  z-index: ${({ type }) => type + 1};
  width: ${({ type }) => type ? blackKeyWidth : whiteKeyWidth }px;
  height: ${({ type }) => type ? blackKeyHeight : whiteKeyHeight}px;
  left: ${({ offset}) => `${offset * slotWidth}px`};
  border-radius: 0 0 ${whiteKeyWidth/13}px ${whiteKeyWidth/13}px ;
  border: 1px solid black;
  :hover {
    background-color: violet;
  }
`;

const Keybed = styled.div`
  position: absolute;
  display: flex;
  flex-grow: 1;
  background-color: black;
  width: ${keyboardWidth}px;
  height: ${whiteKeyHeight}px; 
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  background-color: #282c34;

`;

const Keyboard = () => {
  const [keys, ] = React.useState(keyArray)
  const [target, setTarget ] = React.useState('n/a')
  return (
    <Wrapper>
      <h1>{target}</h1>
      <Keybed>
        {keys.map(({ type, offset, absIndex }) => <Key  key={absIndex} i={absIndex} type={type} offset={offset} onClick={() => {console.log(absIndex)}} onMouseOver={() => setTarget(absIndex)} onMouseOut={() => setTarget('n/a')} />)}
      </Keybed>
    </Wrapper>
  )
}

export default Keyboard