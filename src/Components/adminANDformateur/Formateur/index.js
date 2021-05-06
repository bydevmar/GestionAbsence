import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Button , Container ,Table  , Dropdown , Label} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import Cookies from 'js-cookie'
import {    DateInput,    TimeInput,  } from 'semantic-ui-calendar-react';
import Toast from 'light-toast'
import moment from 'moment'
import foto9 from "../../Resources/foto9.jpg"
class Formateur extends Component {
    constructor(props){
        super(props);
        this.state = {
            SELECTEDGROUPE : '',
            date: '',
            time1: '',
            time2: '',
            GroupeOptions : [],
            STAGIAIRES : [],
            GROUPES : [],
            ABSENCES : [],
        }
        this.handleChangeDropDownGroupe = this.handleChangeDropDownGroupe.bind(this)
        this.handleClickBtnRechercher = this.handleClickBtnRechercher.bind(this)
        this.handleChange = this.handleChange.bind(this)

        if(this.props.Type !== "Formateur"){
            this.props.history.push('/login');
        }
        else{
            this.checkApiGroupes()
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
    
    checkApiGroupes = () => {
        fetch("http://localhost/backend/groupes/?token="+ this.props.Hash, {
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
          fetch("http://localhost/backend/stagiaires/?token="+this.props.Hash+"&groupe="+sg, requestOptions)
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

        if(  this.state.SELECTEDGROUPE === "" ||
            this.state.date ==="" ||
            this.state.time1==="" || 
            this.state.time2===""){
                Toast.fail('veuillez remplir tous les champs', 1000, () => {});
        }

        else{

            if(
                !moment(sDate, "YYYY-MM-DD", true).isValid() ||
                !moment(this.state.time1, "HH:mm", true).isValid() || 
                !moment(this.state.time2, "HH:mm", true).isValid()
                ){
                    Toast.fail('Le format de date est incorrect', 1000, () => {});
            }

            else{
                if(time1  < 830  ||
                    time2 > 1830 ||
                    time1 > time2 ||
                    ([0,6].indexOf( moment(sDate).day()) !== -1) ||
                    moment(sDate).isBefore(moment(new Date()).format("YYYY-MM-DD") , "day")){
                        Toast.fail("l'emploi du temps est incompatible", 1000, () => {});
                    }else {
                    Toast.success("L'absence n'est pas marqué OU aucun n'est pas absent", 3000, () => {
                        this.props.history.push({
                            pathname:"/ma",
                            state:{
                                Email : this.props.Email ,
                                Groupe : this.state.SELECTEDGROUPE ,
                                Date : sDate,
                                HeurD : this.state.time1 + ":00",
                                HeurF : this.state.time2 +":00",
                                HashF : this.props.Hash,
                                Stagiaires : this.state.STAGIAIRES,
                            }
                        })
                    });
                    
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
                <Container >
                    <Table compact celled definition>
                        <Table.Header >
                          <Table.Row>
                                <Table.Cell className="text-center" colSpan='5'  >
                                    <Label className="mt-3 " size="huge" color='blue' horizontal>Gestion Absence</Label>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body >
                            <Table.Row >
                                <Table.Cell colSpan='4'  >
                                    <Dropdown
                                        className="mt-3 mb-3"
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
                                        className="mt-3 mb-3"
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
                                        className="mt-3 mb-3"
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
                                        className="mt-3 mb-3"
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
                                    <Button onClick={this.handleClickBtnRechercher}  className="fluid ui teal button mt-3 mb-3">Marquer l'Abscence</Button>
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
        Email : state.Email
    }
}
const mapDispatchToProps = (dispatch) =>{
      return {
          readCookie : () => dispatch({type : 'readCookie'}),
          listStagiaires : () => dispatch({type : 'listStagiaires'})
      }
  }
export default connect(mapStateToProps , mapDispatchToProps)(Formateur);