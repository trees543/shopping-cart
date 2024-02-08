import data from '../mockData/data.js';

import Shop from './Shop.js';

import useData from '../hooks/useData.js';

const App = () => {
  return (
    <div className="app">
      <main className="main">{<Shop />}</main>
    </div>
  );
};

export default App;
