import React from 'react';

import './App.css';

import UserInputSection from './components/inputs/UserInputSection';
// src/components/inputs/UserInputSection
function App() {

  const getCurrentDayOfWeek = () => {
    const dayOfWeek = new Date().getDay();
    switch (dayOfWeek) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday"
      case 3:
        return "Wednesday"
      case 4:
        return "Thursday"
      case 5:
        return "Friday"
      case 6:
        return "Saturday"
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <UserInputSection />
      </header>
    </div>
  );
}

export default App;
