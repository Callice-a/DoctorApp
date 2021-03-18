import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import {Container} from 'semantic-ui-react'
import NavBar from './components/NavBar';
import About from './pages/About';
import { PRIMARY_COLOR } from './styles';
import ComponentDemo from './pages/ComponentDemo';
import Patients from './pages/Patients';
import PatientShow from './pages/PatientShow';

function App() {

  return (
    <>
    <NavBar />
    <h1 style={{paddingLeft: '20px', color: PRIMARY_COLOR }}>Doctor_App</h1>
    <Container>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/componentDemo' component={ComponentDemo} />
        <Route exact path='/patients' component={Patients} />
        <Route exact path='/patients/:id' component={PatientShow} />
        
      </Switch>
      </Container>
   </>
  );
}

export default App;
