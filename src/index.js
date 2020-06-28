import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';

const routes = Routes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);

