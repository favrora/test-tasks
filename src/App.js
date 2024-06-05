import React from 'react';
import { Folder, File } from './components';
import data from './data/Data.json';
import './styles/App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>File System</h1>

        {data.map((item, index) => {
          if (item.type === 'FOLDER') {
            return <Folder key={index} name={item.name} children={item.children} level={0} />;
          } else if (item.type === 'FILE') {
            return <File key={index} name={item.name} mimeType={item.mime} level={0} />;
          }
          return null;
        })}
      </div>
    );
  }
}

export default App;
