import React, { Component } from 'react';
import { Folder, Search } from './components';
import { filterData } from './utils/filterData';
import data from './data/Data.json';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      filteredData: data,
      expandedFolders: this.props.expandedFolders,
    };
  }

  handleSearchChange = (searchQuery) => {
    const filteredData = searchQuery ? filterData(data, searchQuery) : data;
    this.setState({ searchQuery, filteredData });
  };

  render() {
    const { searchQuery, filteredData, expandedFolders } = this.state;

    return (
      <div>
        <h1>File System</h1>

        <Search searchQuery={searchQuery} onSearch={this.handleSearchChange} />

        {filteredData.length === 0 ? (
          <p>No Results</p>
        ) : (
          filteredData.map((item, index) => (
            <Folder
              key={index}
              name={item.name}
              children={item.children}
              level={0}
              path={`/${item.name}`}
              expandedFolders={expandedFolders}
              searchQuery={searchQuery}
            />
          ))
        )}
      </div>
    );
  }
}

export default App;
