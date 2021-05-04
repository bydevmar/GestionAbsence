import React from 'react'
import { Navbar, Nav   } from 'react-bootstrap'
import {connect} from "react-redux"
import Cookies from "js-cookie"

function conDec(props){
    if(props.logged === "LOGGED_OFF"){
        return (
            <Nav.Link  eventKey={2} href="/login"  style={{fontSize : "20px" , color :"white"}}>Connexion</Nav.Link>
        )
    }else{
        return (
            <div>
            <Nav>
                <Nav.Link onClick={handleClickBtnDeconnection} style={{fontSize : "20px" , color :"white"}} href="/login"  >Déconnexion</Nav.Link>
                <Nav.Link  style={{fontSize : "20px" , color :"white"}} href="/gestionnaire"  >Absences</Nav.Link>
            </Nav>
            
            </div>
        )
    }
}
function loggedIn(props){
    if(props.logged !== "LOGGED_OFF"){
        return (
            <div >
            <Navbar >
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-center">
                    <Navbar.Text>
                        <h3>Bienvenue Mr/Mme: {props.fullName}</h3> 
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </div>
        )
    }
}


function handleClickBtnDeconnection(){
    console.log("salut salut")
    Cookies.remove('user')
}

function NavBar(props) {
    return (
        <div>
            <Navbar collapseOnSelect style={{ paddingTop: '10px' , paddingBottom : '5px' }} expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/" style={{fontSize : "30px" , color :"white" , fontFamily:'impact'}} >G-A</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/" style={{fontSize : "20px" , color :"white"}}>Acceuil</Nav.Link>
                        <Nav.Link href="/contact" style={{fontSize : "20px" , color :"white"}}>Contact</Nav.Link>
                    </Nav>
                        {
                            conDec(props)
                        }
                </Navbar.Collapse>
            </Navbar>
            {
                loggedIn(props)
            }
        </div>
    )
}

function mapStateToProps (state)  {
    return {
        logged : state.logged,
        fullName : state.fullName,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        readCookie : () => dispatch({type : 'readCookie'})
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(NavBar);
