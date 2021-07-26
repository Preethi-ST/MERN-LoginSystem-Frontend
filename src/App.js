import {BrowserRouter,Link,Switch,Route, Redirect} from 'react-router-dom'
import ForgotPasswordPage from './Components/ForgotPasswordPage';
import LoginPage from './Components/LoginPage';
import ProtectedPage from './Components/ProtectedPage';
import RegisterPage from './Components/RegisterPage';
import ResetPasswordPage from './Components/ResetPasswordPage';
import './App.css';

function App() {
  return (
    <div className='App'>
    <BrowserRouter basename = 'MERN-LoginSystem'>
      <Switch>
        <Route path='/Authorized' component= {ProtectedPage} />
        <Route path='/login' exact component = {LoginPage} />
        <Route path='/register' exact component = {RegisterPage} />
        <Route path='/forgotpassword' exact component = {ForgotPasswordPage} />
        <Route path='/resetpassword/:resetToken' exact component = {ResetPasswordPage} />
        <Route to= '/'>
          <Redirect to = '/login'/>
        </Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
