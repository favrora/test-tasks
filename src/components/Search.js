import React, { Component } from 'react';
import debounce from 'lodash.debounce';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.searchQuery,
    };
    this.debouncedFilter = debounce(this.filterData, 400);
  }

  handleChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ inputValue });
    this.debouncedFilter(inputValue);
  };

  filterData = (searchQuery) => {
    const filteredData = this.filterItems(this.props.data, searchQuery);
    this.props.onSearch(searchQuery, filteredData);
  };

  filterItems = (items, searchQuery) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return items.reduce((result, item) => {
      if (item.type === 'FOLDER') {
        const filteredChildren = this.filterItems(item.children, searchQuery);
        if (filteredChildren.length > 0 || item.name.toLowerCase().includes(lowerCaseQuery)) {
          result.push({ ...item, children: filteredChildren });
        }
      } else if (item.type === 'FILE' && item.name.toLowerCase().includes(lowerCaseQuery)) {
        result.push(item);
      }
      return result;
    }, []);
  };

  render() {
    return (
      <input
        type="text"
        placeholder="Search folders or files..."
        value={this.state.inputValue}
        onChange={this.handleChange}
      />
    );
  }
}

export default Search;
