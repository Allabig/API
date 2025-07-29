import React from 'react';
import PropTypes from 'prop-types';

const ListComponent = ({ items, renderItem }) => {
  if (!items || items.length === 0) {
    return <p>The list is empty.</p>;
  }

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {items.map((item, index) => (
        <li key={item.id || index} style={{ marginBottom: '1rem' }}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

ListComponent.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default ListComponent;
