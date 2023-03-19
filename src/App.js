import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './page/Home/Home';
import Contact from './page/Contact/Contact';
import New from './page/New/New';
import Detail from './page/Detail/Detail';
import { CheckOutTemplate } from './templates/CheckOutTemplate/CheckOutTemplate';
import CheckOut from './page/CheckOut/CheckOut';
import Login from './page/Login/Login';
import Loading from './component/Loading/Loading';
import { AdminTempplate } from './templates/AdminTemplate/AdminTemplate';
import Dasboard from './page/Admin/Dasboard/Dasboard';
import Films from './page/Admin/Films/Films';
import AddNew from './page/Admin/Films/AddNew/AddNew';
import EditFilms from './page/Admin/Films/EditFilms/EditFilms';
import ShowTime from './page/Admin/ShowTime/ShowTime';
import Register from './page/Register/Register';
import NotFound from './page/NotFound';
import { ToastContainer, toast } from 'react-toastify';
import Profile from './page/Profile/Profile';
export const history = createBrowserHistory()
function App () {
  return (

    <Router history={history}>
      <ToastContainer />
      <Loading />
      <Switch>
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={New} />
        <HomeTemplate path="/profile" exact Component={Profile} />
        <Route path="/register" exact component={Register} />
        <HomeTemplate path="/home" exact Component={Home} />
        <Route path="/login" exact component={Login} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <CheckOutTemplate path="/checkout/:id" exact Component={CheckOut} />
        <AdminTempplate path='/admin' exact Component={Dasboard} />
        <AdminTempplate path='/admin/films' exact Component={Films} />
        <AdminTempplate path='/admin/films/addnew' exact Component={AddNew} />
        <AdminTempplate path='/admin/films/editfilms/:id' exact Component={EditFilms} />
        <AdminTempplate path='/admin/showtimes' exact Component={ShowTime} />
        <Route path="/" exact component={Login} />

        <Route path='*' exact component={NotFound} />

      </Switch>
    </Router>

  );
}

export default App;
