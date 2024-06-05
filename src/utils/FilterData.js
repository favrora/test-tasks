import memoize from 'lodash.memoize';

// Helper function to filter items (folders and files) based on the search query
const filterItems = (items, query) => {
  const lowerCaseQuery = query.toLowerCase();

  return items.reduce((result, item) => {
    if (item.type === 'FOLDER') {
      const filteredChildren = filterItems(item.children, query);

      if (filteredChildren.length > 0 || item.name.toLowerCase().includes(lowerCaseQuery)) {
        result.push({ ...item, children: filteredChildren });
      }
    } else if (item.type === 'FILE' && item.name.toLowerCase().includes(lowerCaseQuery)) {
      result.push(item);
    }

    return result;
  }, []);
};

// Memoized version of the filterItems function to improve performance by caching results
const memoizedFilterItems = memoize((items, query) => {
  return filterItems(items, query);
}, (items, query) => `${JSON.stringify(items)}|${query.toLowerCase()}`);

export const filterData = (data, query) => {
  if (!query) return [];
  return memoizedFilterItems(data, query);
};
