import 'react-tabs/style/react-tabs.css';
import './App.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import CreateAd from './pages/createAd/CreateAd';
import PreviewAd from './pages/previewAd/PreviewAd.jsx';
import { GlobalContext, GlobalContextProvider } from './context/global.context.jsx'

function App() {
  return (
    <div className="container p-0">
      <Router>
        <GlobalContextProvider>
          <GlobalContext.Consumer>
            {globalContext => (
              <Switch>
                <Route exact path="/" render={() => { return <Redirect to="/createAd" /> }} />
                <Route path="/createAd">
                  <CreateAd />
                </Route>
                <Route path="/previewAd">
                  <PreviewAd />
                </Route>
              </Switch>
            )}
          </GlobalContext.Consumer>
        </GlobalContextProvider>
      </Router>
    </div>

  );
}

export default App;
