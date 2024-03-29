import './App.css';
import NavBar from './modules/NavBar';
import React from 'react';
import Rotas from './modules/Rotas';
import EditRoutes from './modules/EditRoutes';

function App() {
  const [section, setSection] = React.useState(0);
  return (
    <div className="App">
      <NavBar section={section} setSection={setSection} />
      {section === 0 ? <Rotas /> : null}
      {section === 1 ? <EditRoutes /> : null}
    </div>
  );
}

export default App;
