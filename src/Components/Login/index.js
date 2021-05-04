import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import Toast from 'light-toast'
import foto9 from "../Resources/foto9.jpg"

class Login extends Component {
    constructor(props){
        super(props)
        this.props.readCookie()
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            Email: "",
            Nom: "",
            Prenom: "",
            Matricule: "",
            Cin: "",
            MDP : "",
            Type: "",
            Hash: ""
        }
        
    }
    componentDidMount = () => {
        if(this.props.Type ==='Formateur'){
            this.props.history.push("/formateur")
        }
        else if(this.props.Type === 'Gestionnaire'){
            this.props.history.push("/gestionnaire")
        }
    }
    handleSubmit = (event) => {
        if(this.state.Email === "" &&
        this.state.Matricule === "" &&
        this.state.Cin === ""&&
        this.state.MDP === ""){
            if(this.state.Email === ""){
                Toast.fail('veuillez saisir votre email!!'.toUpperCase(), 1000, () => {
                    return;
                  });
            }if(this.state.Matricule === ""){
                Toast.fail('veuillez saisir votre matricule!!'.toUpperCase(),1000, () => {
                    return;
                  });
            }if(this.state.Cin === ""){
                Toast.fail('veuillez saisir votre CIN!!'.toUpperCase(), 1000, () => {
                    return;
                  });
            }if(this.state.MDP === ""){
                Toast.fail('veuillez saisir votre mot de pass!!'.toUpperCase(), 1000, () => {
                    return;
                  });
            }
        }
        if(this.state.Email !== "" && this.state.Matricule !== "" && this.state.Cin !== "" && this.state.MDP !== "" ){
            let formdata = new FormData();
            formdata.append("email", this.state.Email);//omar.elhadiri@ofppt.ma
            formdata.append("matricule", this.state.Matricule);//"14211
            formdata.append("cin", this.state.Cin);//"HA136957
            formdata.append("motDePasse", this.state.MDP);//azerty
            let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };
            fetch("http://localhost:3001/backend/utilisateurs/", requestOptions)
            .then(response => response.text() )
            .then(result => {
                const jsonObject = JSON.parse(result);
                if(jsonObject.status === "OK" && jsonObject.infos.Type === "Formateur")
                {
                    Cookies.set("user",jsonObject)
                    this.props.readCookie();
                    Toast.success('Bienvenue Formateur!!'.toUpperCase(), 1000, () => {
                        this.props.history.push("/formateur")
                    });
                }
            else if (jsonObject.status === "OK" && jsonObject.infos.Type === "Gestionnaire")
            {
                Cookies.set("user",jsonObject)
                this.props.readCookie();
                this.props.history.push("/Gestionnaire")
                Toast.success('Bienvenue Gestionnaire!!'.toUpperCase(), 1000, () => {
                    this.props.history.push("/Gestionnaire")
                });
            }
            else {
                Toast.fail('Les informations insérée sont incorrectes'.toUpperCase(), 1000, () => {});
            }
        })
        .catch(error => {
            Toast.fail('les données saisies sont incorrectes!!'.toUpperCase(), 1000, () => {});
        });
    }
        event.preventDefault();
    }
    handleChange(event) {
        this.setState({
          [event.target.name] : event.target.value
        });
      }
    render() {
        return (
            <div style={{backgroundImage : `url(${foto9})`,
                        backgroundSize: "cover" ,
                        backgroundRepeat: "no-repeat",
                        fontFamily: "'Numans', sans-serif",}} 
                        className="pt-5 pb-5 " >
                <Container className="main pb-4" component="main" maxWidth="xs" style={{backgroundColor:"white", borderRadius :"5%"}} >
                    
                <CssBaseline />
                <div style={{display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingTop:'20px'}}  
                    >
                    <Avatar style={{backgroundColor: "gray"}}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Se Connecter
                    </Typography>
                    <form  onSubmit={this.handleSubmit}  >

                        <TextField 
                            variant="outlined"
                            margin="normal" 
                            
                            fullWidth 
                            label="Email" 
                            autoComplete="Email"
                            value={this.state.Email}
                            onChange={this.handleChange} 
                            name="Email"
                            id="Email"
                            />

                        <TextField 
                            variant="outlined" 
                            margin="normal" 
                            
                            fullWidth 
                            label="Matricule"
                            autoComplete="Matricule"
                            value={this.state.Matricule}
                            onChange={this.handleChange} 
                            name="Matricule"
                            id="Matricule"
                            />

                        <TextField 
                            variant="outlined" 
                            margin="normal" 
                            
                            fullWidth 
                            label="CIN" 
                            name="Cin" 
                            id="Cin" 
                            autoComplete="Cin"
                            value={this.state.Cin} 
                            onChange={this.handleChange} />

                        <TextField 
                            variant="outlined" 
                            margin="normal" 
                            
                            fullWidth 
                            label="Mot de passe" 
                            type="password"  
                            name="MDP"
                            id="MDP"
                            value={this.state.MDP} 
                            onChange={this.handleChange} />

                        <Button style={{margin: "20px 0px 10px 0px"}} type="submit" fullWidth variant="contained" color="primary">
                            CONNEXION
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/contact" variant="body2">
                                    mot de passe oublié?
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                </Container>
            </div>
        )
    }
   
}
function mapStateToProps (state)  {
    return {
        Type : state.Type,
        Hash : state.Hash,
        
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        readCookie : () => dispatch({type : 'readCookie'})
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(Login);
