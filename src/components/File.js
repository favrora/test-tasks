import React from 'react';

class File extends React.Component {
  render() {
    const { name, mimeType } = this.props;
    return (
      <div className="file">
        <div className="name">
          {name} ({mimeType})
        </div>
      </div>
    );
  }
}

export default File;
