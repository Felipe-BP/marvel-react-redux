import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import { Home } from './pages/Home';
import { CharacterDetail } from './pages/CharacterDetail';

import './styles/app.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="app-container">
      <Header>Header</Header>

      <BrowserRouter>
        <Switch>
          <Content className="content-container">
            <div className="layout-content">
              <Route exact path="/" component={Home} />
              <Route
                path="/character/:characterId/details"
                component={CharacterDetail}
              />
            </div>
          </Content>
        </Switch>
      </BrowserRouter>

      <Footer className="footer">Made with 💗 by Felipe Bueno!</Footer>
    </Layout>
  );
}

export default App;
