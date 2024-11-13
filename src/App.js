import React from 'react';
import Weather from './Weather';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Weather defaultCity="Seattle" />
      </ErrorBoundary>
    </div>
  );
}

export default App;
