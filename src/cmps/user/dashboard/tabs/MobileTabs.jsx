import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';

export function MobileTabs({ currTab, setCurrTab, tabs }) {
  const handleChange = ({ target }) => {
    const value = target.value;
    setCurrTab(value);
  };
  return (
    <div className='mobile-view'>
      <TextField
        value={currTab}
        name='currTab'
        select
        variant='outlined'
        onChange={handleChange}
      >
        {tabs.map((tab, idx) => (
          <MenuItem
            key={`t${idx}`}
            value={tab}
            className={currTab === tab ? 'active' : ''}
          >
            {tab === 'logout' ? 'Logout' : `User ${tab}`}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
