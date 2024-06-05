import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const data = [
  {
    type: 'FOLDER',
    name: 'Common7',
    children: [
      {
        type: 'FOLDER',
        name: 'IDE',
        children: [
          {
            type: 'FILE',
            name: 'msdia140.dll',
            mime: 'application/x-msdownload',
          },
        ],
      },
      {
        type: 'FOLDER',
        name: 'Tools',
        children: [
          {
            type: 'FILE',
            name: 'errlook.exe',
            mime: 'application/x-msdownload',
          },
        ],
      },
    ],
  },
  {
    type: 'FILE',
    name: 'Todo.txt',
    mime: 'text/plain',
  },
];

test('renders the file system title', () => {
  render(<App expandedFolders={[]} />);
  const titleElement = screen.getByText(/File System/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders folders and files correctly', () => {
  render(<App expandedFolders={[]} />);
  data.forEach((item) => {
    if (item.type === 'FOLDER') {
      expect(screen.getByText((content, element) => element.textContent === item.name)).toBeInTheDocument();
    } else if (item.type === 'FILE') {
      expect(screen.getByText((content, element) => element.textContent === `${item.name} (${item.mime})`)).toBeInTheDocument();
    }
  });
});

test('toggles folder collapse correctly', () => {
  render(<App expandedFolders={[]} />);
  const folderName = 'Common7';
  const folderElement = screen.getByText((content, element) => element.textContent === folderName);
  expect(folderElement).toBeInTheDocument();

  const childFolderName = 'IDE';

  // Initially, the child folder should not be visible
  expect(screen.queryByText((content, element) => element.textContent === childFolderName)).not.toBeInTheDocument();

  // Click to expand
  fireEvent.click(folderElement);
  expect(screen.getByText((content, element) => element.textContent === childFolderName)).toBeInTheDocument();

  // Click to collapse
  fireEvent.click(folderElement);
  expect(screen.queryByText((content, element) => element.textContent === childFolderName)).not.toBeInTheDocument();
});

test('search functionality works correctly', () => {
  render(<App expandedFolders={[]} />);
  const searchInput = screen.getByPlaceholderText('Search files...');

  // Search for a file
  fireEvent.change(searchInput, { target: { value: 'msdia140.dll' } });
  expect(screen.getByText((content, element) => element.textContent === 'msdia140.dll (application/x-msdownload)')).toBeInTheDocument();

  // Clear search
  fireEvent.change(searchInput, { target: { value: '' } });
  expect(screen.getByText((content, element) => element.textContent === 'Common7')).toBeInTheDocument();
  expect(screen.getByText((content, element) => element.textContent === 'Todo.txt (text/plain)')).toBeInTheDocument();
});
