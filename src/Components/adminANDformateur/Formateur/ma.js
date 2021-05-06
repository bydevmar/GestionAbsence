import React, { Component } from 'react'
import { Form, Table,Checkbox ,Button, Label} from 'semantic-ui-react'
import Toast from 'light-toast'
import foto9 from '../../Resources/foto9.jpg'
export default class MA extends Component {
     
    constructor(props){
        super(props)
        if(this.props.location.state === undefined){
            this.props.history.push('/gestionnaire')
        }
        else{
            this.state ={
                Email : this.props.location.state.Email ,
                Groupe : this.props.location.state.Groupe ,
                Date : this.props.location.state.Date,
                HeurD : this.props.location.state.HeurD,
                HeurF : this.props.location.state.HeurF,
                Stagiaires : this.props.location.state.Stagiaires,
                SELECTEDSTG : [],
             }
        }
         this.handleChangeSliderStagiaires = this.handleChangeSliderStagiaires.bind(this);
         this.handleClickBtnMarquer = this.handleClickBtnMarquer.bind(this);
                  
    }
    
    handleChangeSliderStagiaires(event,item){
        if(item.checked === true)
            this.setState({SELECTEDSTG : [...this.state.SELECTEDSTG , document.getElementById("NumInscription"+item.id).textContent ]})
        else if(item.checked === false) this.setState({SELECTEDSTG : this.state.SELECTEDSTG.filter(items => items !== document.getElementById("NumInscription"+item.id).textContent) })
    }
    handleClickBtnMarquer(){
        if(this.state.SELECTEDSTG.toString() !== ""){
            var myHeaders = new Headers();
            var formdata = new FormData();
            formdata.append("stagiaires", this.state.SELECTEDSTG.toString() );
            formdata.append("formateur",this.state.Email);
            formdata.append("dateAbsence", this.state.Date);
            formdata.append("heureDebut", this.state.HeurD);
            formdata.append("heureFin",this.state.HeurF);

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
            };
            fetch("http://localhost/backend/absences/", requestOptions)
            .then(response => response.text())
            .then(result => {
                if((JSON.parse(result)).status === "OK"){
                    Toast.success("Absence marqué avec succés", 1500, () => {
                        this.props.history.push("/formateur")
                    })
                }else {
                    Toast.fail("Erreur a l'heure du marquer l'absence ", 2000, () => {})
                }
            })
            .catch(error => console.log('error', error));
        }
    }

    checkinfos(){
        if(this.props.location.state !== undefined){
            return true;
        }
        else {
            return false;
        }
    }
    bodyFunc(){
        if(this.checkinfos() === true){
            if(this.state.Stagiaires === "undefined" || this.state.Stagiaires === undefined ||  this.state.Stagiaires === 0)
            {
                return (<Table.Row><Table.Cell></Table.Cell></Table.Row>)
            }
            else{
                return this.state.Stagiaires.map((item , i) => {
                    return (
                    <Table.Row key={i}>
                        <Table.Cell textAlign='center'  >
                            <Checkbox onChange={this.handleChangeSliderStagiaires} slider id={i+""}/>
                        </Table.Cell>
                        <Table.Cell textAlign='center'>{item.Nom}</Table.Cell>
                        <Table.Cell textAlign='center'>{item.Prenom}</Table.Cell>
                        <Table.Cell textAlign='center' id={"NumInscription"+i}>{item.NumInscription}</Table.Cell>
                    </Table.Row>     
                )
            })
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
            <Form className="container">
                <Table compact celled definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.Cell className="text-center " colSpan='5' >
                                <Label color='blue' horizontal size='big'>
                                    Veuillez marquer l'absence
                                </Label>
                            </Table.Cell>

                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        <Table.Row>
                            <Table.HeaderCell textAlign="center">Selectionner</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Nom</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Prenom</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Numero d'inscription</Table.HeaderCell>
                        </Table.Row>
                        {
                            this.bodyFunc()
                        }
                    </Table.Body>
                    <Table.Footer fullWidth>

                        <Table.Row>
                            <Table.HeaderCell colSpan='5' style={{paddingLeft: "100px",paddingRight: "100px"}}>
                                <Button fluid  className=" ui green button" onClick={this.handleClickBtnMarquer}>Marquer L'absence</Button>
                            </Table.HeaderCell>
                        </Table.Row>   

                    </Table.Footer>
                </Table>
            </Form>
            </div>
        )
    }
}
