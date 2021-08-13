import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import { Home } from './pages/Home';

const { Header, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header>Header</Header>

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>

      <Footer style={{ textAlign: 'center' }}>Made with 💗 by Felipe Bueno!</Footer>
    </Layout>
  );
}

export default App;
