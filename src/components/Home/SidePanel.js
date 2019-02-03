import React from 'react';
import Leaderboard from './Leaderboard';
import UserStats from './UserStats';

export const SidePanel = () => {
  return (
    <div id="sidebar">
      <UserStats />
      <Leaderboard />
    </div>
  );
};
