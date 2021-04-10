import NavbarAdminFAQ from './Components/NavBarAdminFAQ/navbar';
import QA from './Components/QAForm/QA';
import SwitchRoutes from './Components/switchRoutesNav/switchRoutesNav';

import './App.css';
import {Switch, Route} from "react-router-dom";
import QuesAnalysis from "./Screens/QuestionAnalysis/QuesAnalysis";

function App() {
  return (

      <div>
        <NavbarAdminFAQ />
          <SwitchRoutes />
          <Switch>
              <Route
                path = "/"
                exact
                component = {QA}
              />

              <Route
                  path="/data-analysis"
                  exact
                  component = {QuesAnalysis}
                  />
          </Switch>
      </div>

  );
}

export default App;
