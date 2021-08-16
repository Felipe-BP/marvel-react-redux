import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { Home } from './pages/Home';
import { CharacterDetail } from './pages/CharacterDetail';

import './styles/app.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="app-container">
      <Header>
        <a href="https://github.com/Felipe-BP/marvel-react-redux" target="_blank" rel="noreferrer">
          <GithubOutlined className="github-icon" />
        </a>
      </Header>

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
