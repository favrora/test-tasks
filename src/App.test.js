import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import data from './data/Data.json';

test('renders the file system title', () => {
  render(<App />);
  const titleElement = screen.getByText(/File System/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders folders and files correctly', () => {
  render(<App />);
  data.forEach((item) => {
    if (item.type === 'FOLDER') {
      const folderElement = screen.getByText(item.name);
      expect(folderElement).toBeInTheDocument();
    } else if (item.type === 'FILE') {
      const fileElement = screen.getByText(new RegExp(`${item.name} \\(${item.mime}\\)`, 'i'));
      expect(fileElement).toBeInTheDocument();
    }
  });
});

test('toggles folder collapse correctly', () => {
  render(<App />);
  const folderName = data[0].name;
  const folderElement = screen.getByText(folderName);
  expect(folderElement).toBeInTheDocument();

  if (data[0].children) {
    // Click to expand
    fireEvent.click(folderElement);
    data[0].children.forEach((child) => {
      const childElement = screen.getByText(child.name);
      expect(childElement).toBeInTheDocument();
    });

    // Click to collapse
    fireEvent.click(folderElement);
    data[0].children.forEach((child) => {
      const childElement = screen.queryByText(child.name);
      expect(childElement).not.toBeInTheDocument();
    });
  }
});
