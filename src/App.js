import './App.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import CreateAd from './pages/createAd/CreateAd';
import PreviewAd from './pages/previewAd/PreviewAd.jsx';

function App() {
  return (
    <div className="container p-0">
      <Router>
        <Switch>
          <Route exact path="/" render={() => { return <Redirect to="/createAd" /> }} />
          <Route path="/createAd">
            <CreateAd />
          </Route>
          <Route path="/previewAd">
            <PreviewAd />
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
