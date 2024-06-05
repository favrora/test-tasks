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
    const { onSearch } = this.props;
    onSearch(searchQuery);
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
