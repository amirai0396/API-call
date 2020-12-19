import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import PlayerProfile from './screens/PlayerProfile';
import NotFound from './screens/404';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import Header from './components/Header';
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Header />

        <Route path='/player/:id' component={PlayerProfile} />
        <Route path='/404' component={NotFound} />

        <Route path='/' component={HomePage} exact />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
