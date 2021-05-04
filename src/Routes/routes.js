import React from 'react'
import { Route  , Switch} from 'react-router-dom'
import Home from '../components/SearchBarandFooter/SearchBar/Home'
import Login from '../components/Login'
import Formateur from '../components/GestionAbsence/Formateur'
import MA from '../components/GestionAbsence/Formateur/ma.js'
import Gestionnaire from '../components/GestionAbsence/Gestionnaire'
import MarquerAbsence from '../components/GestionAbsence/Gestionnaire/marquerAbsence'
import absenceMarque from '../components/GestionAbsence/Gestionnaire/absenceMarque'
import Contact from '../components/SearchBarandFooter/SearchBar/Contact'



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