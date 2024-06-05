import React from 'react';
import File from './File';

class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse = () => {
    this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
  };

  render() {
    const { name, children, level } = this.props;
    const { collapsed } = this.state;

    return (
      <div className="folder">
        <div className="name" onClick={this.toggleCollapse}>
          {name}
        </div>

        {!collapsed &&
          children.map((child, index) => {
            if (child.type === 'FOLDER') {
              return <Folder key={index} name={child.name} children={child.children} level={level + 1} />;
            } else if (child.type === 'FILE') {
              return <File key={index} name={child.name} mimeType={child.mime} level={level + 1} />;
            }
            return null;
          })}
      </div>
    );
  }
}

export default Folder;
