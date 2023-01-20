import React, {useState} from 'react';
import Search from './Search.jsx';

const SearchPage = ({ changeView, user }) => {
  return (
    <div>
      < Search user={user} changeView={changeView} />
    </div>
  )
};

export default SearchPage;