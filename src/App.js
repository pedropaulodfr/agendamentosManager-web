import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoutes from './routes/PrivateRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'

// Pages
import Admin from './layouts/Admin'

import menus from './routes/MenusSidebar';
import { Login } from './pages/Login';
import RequireAuth from './contexts/Auth/RequireAuth';
import { getSessionCookie } from './helpers/cookies';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            {menus.map((menu, key) => {
              if(!menu.submenus) {
                if (!(!menu.modulo || menu?.modulo?.filter(f => f == getSessionCookie()?.perfil).length > 0))
                  return
                return (
                  <Route
                    key={key}
                    path={menu.path}
                    element={<RequireAuth><Admin component={menu.component} /></RequireAuth>}
                  />
                )
              } else {
                if (!(!menu.submenus.modulo || menu?.submenus?.modulo?.filter(f => f == getSessionCookie()?.perfil).length > 0))
                  return
                return menu.submenus.map((submenu, subKey) => (
                  <Route
                    key={subKey}
                    path={submenu.path}
                    element={<RequireAuth><Admin component={submenu.component} /></RequireAuth>}
                  />
                ));
              }
            })}
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;