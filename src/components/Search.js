import React from 'react';

class Search extends React.Component {
  handleChange = (event) => {
    const searchQuery = event.target.value;
    const filteredData = this.filterData(this.props.data, searchQuery);
    this.props.onSearch(searchQuery, filteredData);
  };

  filterData = (data, searchQuery) => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    const filterItems = (items) => {
      let result = [];

      for (let item of items) {
        if (item.type === 'FOLDER') {
          const filteredChildren = filterItems(item.children);
          if (filteredChildren.length > 0 || item.name.toLowerCase().includes(lowerCaseQuery)) {
            result.push({ ...item, children: filteredChildren });
          }
        } else if (item.type === 'FILE' && item.name.toLowerCase().includes(lowerCaseQuery)) {
          result.push(item);
        }
      }

      return result;
    };

    return filterItems(data);
  };

  render() {
    return (
      <input
        type="text"
        placeholder="Search folders or files..."
        value={this.props.searchQuery}
        onChange={this.handleChange}
      />
    );
  }
}

export default Search;
