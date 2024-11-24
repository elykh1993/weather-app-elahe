import React from 'react';
import Weather from './Weather';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Weather defaultCity="Tehran" />
      </ErrorBoundary>
    </div>
  );
}

export default App;
