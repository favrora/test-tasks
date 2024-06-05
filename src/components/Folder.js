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

  filterChildren = (children, searchQuery) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return children.filter(child => {
      if (child.type === 'FILE' && child.name.toLowerCase().includes(lowerCaseQuery)) {
        return true;
      }
      if (child.type === 'FOLDER') {
        const filteredChildren = this.filterChildren(child.children, searchQuery);
        return filteredChildren.length > 0 || child.name.toLowerCase().includes(lowerCaseQuery);
      }
      return false;
    });
  };

  render() {
    const { name, children, level, path, expandedFolders, searchQuery } = this.props;
    const { collapsed } = this.state;
    const filteredChildren = this.filterChildren(children, searchQuery);
    const hasChildren = filteredChildren.length > 0;

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

        {!collapsed && filteredChildren.map((child, index) => (
          child.type === 'FOLDER' ? (
            <Folder
              key={index}
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
