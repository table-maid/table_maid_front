import { useState, useEffect, useRef } from 'react';

const getRandomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 25) + 60;
  const lightness = Math.floor(Math.random() * 25) + 70;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const getRandomUniquePastelColor = (existingColors) => { // 중복되는 색상 없게
  let color;
  do {
    color = getRandomPastelColor();
  } while (existingColors.has(color));
  return color;
};

export const useTableColors = (tables) => {
  const [tableColors, setTableColors] = useState({});
  const usedColors = useRef(new Set());
  const initialized = useRef(false); // 색상 초기화 여부

  useEffect(() => {
    if (!initialized.current) { 
      const savedColors = localStorage.getItem('tableColors');
      if (savedColors) { // 초기 색상
        const parsedColors = JSON.parse(savedColors);
        setTableColors(parsedColors);
        usedColors.current = new Set(Object.values(parsedColors));
      } else {
        const initialColors = {};
        for (let i = 0; i < tables.length; i++) {
          const color = getRandomUniquePastelColor(usedColors.current);
          initialColors[i] = color;
          usedColors.current.add(color);
        }
        setTableColors(initialColors);
        localStorage.setItem('tableColors', JSON.stringify(initialColors));
      }
      initialized.current = true;
    }
  }, [tables.length]);

  const updateTableColor = (index, color) => {
    const newTableColors = { ...tableColors, [index]: color };
    setTableColors(newTableColors);
    localStorage.setItem('tableColors', JSON.stringify(newTableColors));
  };

  return { tableColors, updateTableColor, getRandomUniquePastelColor, usedColors };
};
