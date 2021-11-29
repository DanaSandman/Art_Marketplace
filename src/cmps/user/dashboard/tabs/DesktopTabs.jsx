import React from 'react';

export function DesktopTabs({ tabs, currTab, setCurrTab }) {
  return (
    <ul className='desktop-view'>
      {tabs.map((tab, idx) => (
        <li
          key={`t${idx}`}
          onClick={() => setCurrTab(tab)}
          className={currTab === tab ? 'active' : ''}
        >
          {tab === 'logout' ? 'Logout' : `User ${tab}`}
        </li>
      ))}
    </ul>
  );
}
