import React from 'react';
import { Route  , Switch} from 'react-router-dom'
import Home from '../Components/SearchBarandFooter/SearchBar/Home'
import Login from '../Components/Login'
import Formateur from '../Components/adminANDformateur/Formateur'
import MA from '../Components/adminANDformateur/Formateur/ma.js'
import Gestionnaire from '../Components/adminANDformateur//Gestionnaire'
import MarquerAbsence from '../Components/adminANDformateur//Gestionnaire/marquerAbsence'
import absenceMarque from '../Components/adminANDformateur/Gestionnaire/absenceMarque'
import Contact from '../Components/SearchBarandFooter/SearchBar/Contact'



 function Routes() {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/formateur" exact component={Formateur} />
                <Route path="/gestionnaire" exact component={Gestionnaire} />
                <Route path="/mabsence" exact component={MarquerAbsence} />
                <Route path="/amarque" exact component={absenceMarque} />
                <Route path="/ma" exact component={MA} />
                <Route path="/contact" exact component={Contact} />
                
                <Route path="*" exact component={Home} />
            </Switch>
        </div>
    )
}
export default Routes