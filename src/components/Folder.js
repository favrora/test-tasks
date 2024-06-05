import React from 'react';
import File from './File';

class Folder extends React.Component {
  constructor(props) {
    super(props);
    const { path, expandedFolders } = props;
    this.state = {
      collapsed: !expandedFolders.some(folder => folder.startsWith(path)),
    };
  }

  toggleCollapse = () => {
    this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
  };

  render() {
    const { name, children, level, path, expandedFolders, searchQuery } = this.props;
    const { collapsed } = this.state;

    const filteredChildren = children.filter(child => {
      if (child.type === 'FILE') {
        return child.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      if (child.type === 'FOLDER') {
        return this.filterChildren(child, searchQuery) || child.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });

    const hasChildren = filteredChildren.length > 0;

    return (
      <div className="folder">
        <div
          className="name"
          onClick={hasChildren ? this.toggleCollapse : undefined}
          style={{ cursor: hasChildren ? 'pointer' : 'default', marginLeft: `${level * 20}px` }}
        >
          {hasChildren && (collapsed ? '▶' : '▼')} 📁 {name}
        </div>

        {!collapsed && filteredChildren.map((child, index) => {
          if (child.type === 'FOLDER') {
            return (
              <Folder
                key={index}
                name={child.name}
                children={child.children}
                level={level + 1}
                path={`${path}/${child.name}`}
                expandedFolders={expandedFolders}
                searchQuery={searchQuery}
              />
            );
          } else if (child.type === 'FILE') {
            return <File key={index} name={child.name} mimeType={child.mime} level={level + 1} />;
          }
          return null;
        })}
      </div>
    );
  }

  filterChildren = (folder, searchQuery) => {
    return folder.children.some(child => {
      if (child.type === 'FILE') {
        return child.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      if (child.type === 'FOLDER') {
        return this.filterChildren(child, searchQuery) || child.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
  };
}

export default Folder;
