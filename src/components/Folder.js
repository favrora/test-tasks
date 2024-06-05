import React from 'react';
import File from './File';

class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: !props.expandedFolders.some(folder => folder.startsWith(props.path)),
    };
  }

  toggleCollapse = () => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  };

  render() {
    const { name, children, level, path, expandedFolders, searchQuery } = this.props;
    const { collapsed } = this.state;
    const hasChildren = children && children.length > 0;

    if (!hasChildren && searchQuery && !name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return null;
    }

    return (
      <div className="folder">
        <div
          className="name"
          onClick={hasChildren ? this.toggleCollapse : undefined}
          style={{ marginLeft: `${level * 20}px`, cursor: hasChildren ? 'pointer' : 'default', display: 'flex', alignItems: 'center' }}
        >
          <span style={{ visibility: hasChildren ? 'visible' : 'hidden', width: '1em' }}>
            {collapsed ? '▶' : '▼'}
          </span>
          <span>📁 {name}</span>
        </div>

        {!collapsed && children.map((child, index) => (
          child.type === 'FOLDER' ? (
            <Folder
              key={`${child.name}-${searchQuery}-${index}`}
              name={child.name}
              children={child.children}
              level={level + 1}
              path={`${path}/${child.name}`}
              expandedFolders={expandedFolders}
              searchQuery={searchQuery}
            />
          ) : (
            <File key={index} name={child.name} mimeType={child.mime} level={level + 1} />
          )
        ))}
      </div>
    );
  }
}

export default Folder;
