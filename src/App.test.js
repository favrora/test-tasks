import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders the File System header', async () => {
    const expandedFolders = [];
    render(<App expandedFolders={expandedFolders} />);

    const headerElement = await screen.findByText(/File System/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the search input', async () => {
    const expandedFolders = [];
    render(<App expandedFolders={expandedFolders} />);

    const searchInput = await screen.findByPlaceholderText(/Search folders or files.../i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders No Results when search query does not match', async () => {
    const expandedFolders = [];
    render(<App expandedFolders={expandedFolders} />);

    const searchInput = screen.getByPlaceholderText(/Search folders or files.../i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    const noResultsMessage = await screen.findByText(/No Results/i);
    expect(noResultsMessage).toBeInTheDocument();
  });

  test('renders folders and files based on search query', async () => {
    const expandedFolders = ['/Common7/IDE'];
    render(<App expandedFolders={expandedFolders} />);

    const searchInput = screen.getByPlaceholderText(/Search folders or files.../i);
    fireEvent.change(searchInput, { target: { value: 'msdia140.dll' } });

    await waitFor(() => {
      const fileElement = screen.getByText((content) => {
        return content.includes('msdia140.dll');
      });
      expect(fileElement).toBeInTheDocument();
    });
  });
});
