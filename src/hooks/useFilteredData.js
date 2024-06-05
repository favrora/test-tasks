import { useMemo } from 'react';

// Filter nested folders and files
const useFilteredData = (data, searchQuery) => {
  return useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    const filterItems = (items) => {
      return items.reduce((result, item) => {
        if (item.type === 'FOLDER') {
          const filteredChildren = filterItems(item.children);
          if (filteredChildren.length > 0 || item.name.toLowerCase().includes(lowerCaseQuery)) {
            result.push({ ...item, children: filteredChildren });
          }
        } else if (item.type === 'FILE' && item.name.toLowerCase().includes(lowerCaseQuery)) {
          result.push(item);
        }
        return result;
      }, []);
    };
    return filterItems(data);
  }, [data, searchQuery]);
};

export default useFilteredData;
