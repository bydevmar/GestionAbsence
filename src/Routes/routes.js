import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Login";
import RechercheStagiairesFormateur from "../Components/Formateur";
import MarquerAbsenceByFormateur from "../Components/Formateur/MarquerAbsenceByFormateur";
/*import MA from "../Components/adminANDformateur/Formateur/ma.js";
import MarquerAbsence from "../Components/adminANDformateur//Gestionnaire/marquerAbsence";
import absenceMarque from "../Components/adminANDformateur/Gestionnaire/absenceMarque";
import Contact from "../Components/layouts/Contact";*/

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />

      <Route
        path="/formateur/recherchegroupe"
        exact
        component={RechercheStagiairesFormateur}
      />
      <Route
        path="/formateur/absences"
        exact
        component={MarquerAbsenceByFormateur}
      />

      {/*
      <Route path="/admin/find" exact component={RechercheStagiaires} />
      
      <Route path="/amarque" exact component={absenceMarque} />
      <Route path="/ma" exact component={MA} />

      <Route path="/contact" exact component={Contact} />
      */}
      <Route path="*" exact component={Home} />
    </Switch>
  );
}
export default Routes;
