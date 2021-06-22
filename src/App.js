import 'react-tabs/style/react-tabs.css';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import CreateAd from './pages/createAd/CreateAd';
import PreviewAd from './pages/previewAd/PreviewAd.jsx';
import { GlobalContext, GlobalContextProvider } from './context/global.context.jsx'

function App() {
  return (
    <div className="container p-0">

      <GlobalContextProvider>
        <Router>
          <GlobalContext.Consumer>
            {globalContext => (
              <Switch>
                <Route exact path="/">
                  <CreateAd />
                </Route>
                <Route path="/previewAd">
                  <PreviewAd />
                </Route>
                <Route><CreateAd /></Route>
              </Switch>
            )}
          </GlobalContext.Consumer>
        </Router>
      </GlobalContextProvider>

    </div>

  );
}

export default App;
