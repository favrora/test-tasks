import React from 'react';
import '../styles/App.css';

class File extends React.Component {
  render() {
    const { name, mimeType, level } = this.props;

    return (
      <div className="file" style={{ marginLeft: `${level * 20}px` }}>
        <div className="name">
          📄 {name} ({mimeType})
        </div>
      </div>
    );
  }
}

export default File;
