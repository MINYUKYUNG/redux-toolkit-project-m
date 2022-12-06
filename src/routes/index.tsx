import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Home, NotFound } from '../pages';

function RouterView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={'*'} element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterView;
