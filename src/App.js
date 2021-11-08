import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Map from './pages/Map'
import CityList from './pages/CityList'
import './App.css'
function App() {
  return (
    <Router>
      <div className="App">
        {/* 配置路由规则 */}
        {/* 默认路由到/home */}
        <Route path='/' exact render={() => <Redirect to='/home' />}></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/map' component={Map}></Route>
        <Route path='/citylist' component={CityList}></Route>
      </div>
    </Router>

  );
}

export default App;
