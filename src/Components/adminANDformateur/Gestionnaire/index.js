import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Button , Container ,Table  , Dropdown , Label} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import Cookies from 'js-cookie'
import {    DateInput,    TimeInput,  } from 'semantic-ui-calendar-react';
import Toast from 'light-toast'
import moment from 'moment'
import foto9 from "../../Resources/foto9.jpg"
class Gestionnaire extends Component {
    constructor(props){
        super(props);
        this.state = {
            SELECTEDFORMATEURHash : "",
            SELECTEDFORMATEUREmail : "",
            SELECTEDGROUPE : '',
            date: '',
            time1: '',
            time2: '',
            FormateurOptions : [],
            GroupeOptions : [],
            STAGIAIRES : [],
            GROUPES : [],
            FORMATEURS : [],
            ABSENCES : [],
        }
        this.handleChangeDropDownFormateur = this.handleChangeDropDownFormateur.bind(this)
        this.handleChangeDropDownGroupe = this.handleChangeDropDownGroupe.bind(this)
        this.handleClickBtnRechercher = this.handleClickBtnRechercher.bind(this)
        this.handleChange = this.handleChange.bind(this)

        if(this.props.Type !== "Gestionnaire"){
            this.props.history.push('/login');
        }
        else{
            this.checkApiAbcenses()
            this.checkApiFormayeurs()
        }
    }
    checkApiAbcenses = () =>{
        fetch("http://localhost/backend/absences/?token="+this.props.Hash, {
            method: 'GET',
            redirect: 'follow'
            })
        .then(response => response.text())
        .then((result) => {
            let absences = JSON.parse(result);
            if(absences.status === "OK"){
                this.setState({
                    ABSENCES : absences.absences
                })
            }else{
                this.setState({
                    ABSENCES : []
                })
            }

        })
        .catch((error) => {
            this.setState({
                ABSENCES : []
            })
        });

    }
    checkApiFormayeurs = () => {
        fetch("http://localhost/backend/formateurs/?token="+ this.props.Hash , {
            method: 'GET',
            redirect: 'follow',
        })
        .then(response =>  response.text())
        .then(result => { 
            let formateurs = JSON.parse(result) 
            if(formateurs !== undefined || formateurs !== null)   
            {
                let Options = [];
                formateurs.formateurs.map((item) => {
                    return Options.push( {
                        key : item.Hash,
                        text : item.Nom +" "+ item.Prenom,
                        value : item.Hash
                    },)
                })
                this.setState({
                    FormateurOptions : Options,
                    SELECTEDFORMATEUREmail : "" , 
                    SELECTEDFORMATEURHash : "",
                    FORMATEURS : formateurs.formateurs,
                })
            }
        })
      .catch(error => console.log('error', error));
    }
    checkApiGroupes = (SELECTEDFORMATEURHash) => {
        fetch("http://localhost/backend/groupes/?token="+ SELECTEDFORMATEURHash, {
            method: 'GET',
            redirect: 'follow',
          })
      .then(response =>  response.text())
      .then(result => { 
        let groupes = JSON.parse(result) 
        if(groupes !== undefined || groupes !== null)   
        {
            let Options = [];
            groupes.groupes.map(item => {
                return Options.push( {
                    key : item.Code,
                    text : item.Code,
                    value : item.Code
                },)
            })
            this.setState({
                GroupeOptions : Options,
                selectedGroupe : ""
            })

        }

        })
      .catch(error => console.log('error', error));
    }
    checkApiStagiaires = (sg) =>{
        this.setState({STAGIAIRES:[]})
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          fetch("http://localhost/backend/stagiaires/?token="+this.state.SELECTEDFORMATEURHash+"&groupe="+sg, requestOptions)
            .then(response => response.text())
            .then(result => {
                Cookies.remove("stagiaires") 
                if((JSON.parse(result)).status === "OK"){
                    this.setState({
                        STAGIAIRES : (JSON.parse(result)).stagiaires
                    })
                }
            })
            .catch(error => console.log('error', error));
    }
    handleChangeDropDownFormateur(event , e ){
        if(this.state.FORMATEURS.length > 0){
            let i=0 ;
            while(i< this.state.FORMATEURS.length)
            {
                if(this.state.FORMATEURS[i].Hash === e.value){
                    this.setState ({
                        SELECTEDFORMATEUREmail : this.state.FORMATEURS[i].Email ,
                        SELECTEDFORMATEURHash : this.state.FORMATEURS[i].Hash,
                    })
                }
                i++
            }
        }
        this.checkApiGroupes(e.value)
    }
    handleChangeDropDownGroupe(event ,e ){
        this.setState({
            SELECTEDGROUPE : event.target.childNodes[0].innerText
        })
        this.checkApiStagiaires(event.target.childNodes[0].innerText);
    }
    
    handleChange = (event, {name, value}) => {
        if(this.state.hasOwnProperty(name)) {
          this.setState({ [name] : value});
        }
      }
    handleClickBtnRechercher(){
        this.checkApiAbcenses();
        let time1 = moment(this.state.time1, "HH:mm").format("HHmm");
        let time2 = moment(this.state.time2, "HH:mm").format("HHmm");
        let sDate = this.state.date.split("-").reverse().join("-");

        let EstMarque = "No"
        if( this.state.SELECTEDFORMATEUREmail === "" || this.state.SELECTEDGROUPE === "" ||
            this.state.date ==="" ||
            this.state.time1==="" || 
            this.state.time2===""){
                Toast.fail('VEUILLEZ REMPLIR TOUS LES CHAMPS', 1000, () => {});
        }
        else{
            if(
                !moment(sDate, "YYYY-MM-DD", true).isValid() ||
                !moment(this.state.time1, "HH:mm", true).isValid() || 
                !moment(this.state.time2, "HH:mm", true).isValid()
                ){
                    Toast.fail('LE FORMAT DE LA DATE EST INCORRECTE', 1000, () => {});
            }
            else{
                if(time1  < 830  ||
                    time2 > 1830 ||
                    time1 > time2 ||
                    ([0,6].indexOf( moment(sDate).day()) !== -1) 
                    ){
                        Toast.fail("L'ESMPLOI DE TEMPS EST INCOMPATIBLE", 1000, () => {});      
                }else {
                    this.state.ABSENCES.map((item)=>{ 
                        if( item.Formateur === this.state.SELECTEDFORMATEUREmail &&
                            item.CodeGroupe === this.state.SELECTEDGROUPE &&
                            item.DateAbsence === sDate &&
                            item.HeureDebut === this.state.time1+":00"  && 
                            item.HeureFin === this.state.time2+":00" ){
                                EstMarque = "Oui"
                    }
                })
                if(EstMarque === 'No'){
                    console.log("je suis la ===no");
                    
                    if(!moment(sDate).isBefore(moment(new Date()).format("YYYY-MM-DD") , "day"))
                    {
                        Toast.success("L'ABSENCE N'EST PAS ENCORE MARUQUE OU AUCUN N'EST PAS ABSENTE", 3000, () => {
                            this.props.history.push({
                                pathname:"/mabsence",
                                state:{
                                    Email : this.state.SELECTEDFORMATEUREmail ,
                                    Groupe : this.state.SELECTEDGROUPE ,
                                    Date : sDate,
                                    HeurD : this.state.time1 + ":00",
                                    HeurF : this.state.time2 +":00",
                                    HashG : this.props.Hash,
                                    HashF : this.state.SELECTEDFORMATEURHash,
                                    Stagiaires : this.state.STAGIAIRES,
                                }
                            })
                        })
                    }else{
                        Toast.fail("AUCUN ABSENCE EST MARQUEE ET VOUS POUVEZ PAS MARQUE L'ABSENCE DANS CETTE EMPLOI", 3000, () => {})
                    }
                } 
                else{
                    console.log("je suis la == ");
                    Toast.success("L'ABSENCE EST DEJA MARQUEE", 3000, () => {
                        this.props.history.push({
                            pathname:"/amarque",
                            state:{
                                Email : this.state.SELECTEDFORMATEUREmail ,
                                Groupe : this.state.SELECTEDGROUPE ,
                                Date : sDate,
                                HeurD : this.state.time1 + ":00",
                                HeurF : this.state.time2 +":00",
                                HashG : this.props.Hash,
                                HashF : this.state.SELECTEDFORMATEURHash,
                                Stagiaires : this.state.STAGIAIRES,
                                Absence : this.state.ABSENCES
                    
                            }
                        })
                    });
                }
                }
            }
        }
    }
    render() {
        return (
            <div style={{backgroundImage : `url(${foto9})`,
                        backgroundSize: "cover" ,
                        backgroundRepeat: "no-repeat",
                        fontFamily: "'Numans', sans-serif",}} 
                        className="pt-5 pb-5 " >
                <Container style={{ margin: 20 }} >
                    <Table compact celled definition>
                        <Table.Header>
                          <Table.Row className="mt">
                                <Table.Cell className="text-center " colSpan='5' >
                                    <Label size="huge" color='blue' horizontal className="mt-3">Gestion Absence</Label>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            
                            <Table.Row>
                                <Table.Cell colSpan='4'>
                                    <Dropdown
                                        placeholder='Selectionner un Formateur'
                                        fluid
                                        selection
                                        options={this.state.FormateurOptions}
                                        onChange={this.handleChangeDropDownFormateur}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell colSpan='4'>
                                    <Dropdown
                                        placeholder='Selectionner un Groupe'
                                        fluid
                                        selection
                                        options={this.state.GroupeOptions}
                                        onChange={this.handleChangeDropDownGroupe}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell colSpan='4'>
                                    <DateInput
                                    localization="cn"
                                        name="date"
                                        fluid
                                        placeholder="Date d'Absence"
                                        value={this.state.date}
                                        iconPosition="left"
                                        onChange={this.handleChange}
                                        />
                                </Table.Cell> 
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell colSpan='4'>
                                    <TimeInput
                                        fluid
                                        name="time1"
                                        placeholder="Heur Debut"
                                        value={this.state.time1}
                                        iconPosition="left"
                                        onChange={this.handleChange}
                                        />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell colSpan='4'>
                                    <TimeInput
                                        fluid
                                        name="time2"
                                        placeholder="Heur Fin"
                                        value={this.state.time2}
                                        iconPosition="left"
                                        onChange={this.handleChange}
                                        />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell colSpan='4'>
                                    <Button onClick={this.handleClickBtnRechercher}  className="fluid ui teal button">Rechercher</Button>
                                </Table.Cell>
                            </Table.Row>
                        
                        </Table.Body>    


                    </Table>
                </Container>
            </div>
        )
    }
}

function mapStateToProps (state)  {
    return {
        Type : state.Type,
        Hash : state.Hash , 
        Stagiaires : state.STG,
    }
}
const mapDispatchToProps = (dispatch) =>{
      return {
          readCookie : () => dispatch({type : 'readCookie'}),
          listStagiaires : () => dispatch({type : 'listStagiaires'})
      }
  }
export default connect(mapStateToProps , mapDispatchToProps)(Gestionnaire);