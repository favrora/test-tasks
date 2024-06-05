import React from 'react';
import { Folder, File, Search } from './components';
import data from './data/Data.json';
import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      filteredData: data,
      expandedFolders: props.expandedFolders || [],
    };
  }

  handleSearchChange = (searchQuery, filteredData) => {
    this.setState({ searchQuery, filteredData });
  };

  render() {
    const { searchQuery, filteredData, expandedFolders } = this.state;

    return (
      <div>
        <h1>File System</h1>

        <Search
          searchQuery={searchQuery}
          onSearch={this.handleSearchChange}
          data={data}
        />

        {filteredData.length === 0 ? (
          <p>No Results</p>
        ) : (
          filteredData.map((item, index) => {
            if (item.type === 'FOLDER') {
              return (
                <Folder
                  key={index}
                  name={item.name}
                  children={item.children}
                  level={0}
                  path={`/${item.name}`}
                  expandedFolders={expandedFolders}
                  searchQuery={searchQuery}
                />
              );
            } else if (item.type === 'FILE') {
              return <File key={index} name={item.name} mimeType={item.mime} level={0} />;
            }
            return null;
          })
        )}
      </div>
    );
  }
}

export default App;
