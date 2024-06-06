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
          onKeyDown={hasChildren ? (e) => { if (e.key === 'Enter' || e.key === ' ') { this.toggleCollapse(); } } : undefined}
          role={hasChildren ? 'button' : undefined}
          tabIndex={hasChildren ? 0 : undefined}
          style={{ marginLeft: `${level * 20}px`, cursor: hasChildren ? 'pointer' : 'default' }}
        >
          <span style={{ visibility: hasChildren ? 'visible' : 'hidden' }}>
            {collapsed ? '▶' : '▼'}
          </span>
          <span>📁 {name}</span>
        </div>

        {/* Render children only if the folder is expanded */}
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
