import React, { Component } from 'react'
import { Form, Table,Checkbox , Label} from 'semantic-ui-react'
import foto9 from '../../Resources/foto9.jpg'


export default class AbsenceMarque extends Component {
     
    constructor(props){
        super(props)
        if(this.props.location.state === undefined){
            this.props.history.push('/gestionnaire')
        }
        else{
            this.state ={
                Email : this.props.location.state.Email ,
                    Groupe : this.props.location.state.Groupe,
                    Date : this.props.location.state.Date,
                    HeurD : this.props.location.state.HeurD,
                    HeurF : this.props.location.state.HeurF,
                    HashG : this.props.location.state.HashG,
                    HashF : this.props.location.state.HashF,
                    Stagiaires : this.props.location.state.Stagiaires,
                    Absence : []
            }
        }
        
    }
    componentDidMount=()=>{
        this.checkApiAbcenses()
    }
    checkinfos(){
        if(this.props.location.state !== undefined){
            return true;
        }
        else {
            return false;
        }
    }
    checkApiAbcenses = () =>{
        if(this.checkinfos()){
            fetch("http://localhost/backend/absences/?token="+this.state.HashG, {
            method: 'GET',
            redirect: 'follow'
            })
        .then(response => response.text())
        .then((result) => {
            let absences = JSON.parse(result);
            if(absences.status === "OK"){
                 absences.absences.map(item => {
                        if(item.Code === this.state.Groupe  &&
                        item.Formateur === this.state.Email &&
                        item.DateAbsence === this.state.Date &&
                        item.HeureDebut === this.state.HeurD &&
                        item.HeureFin === this.state.HeurF ){
                            this.setState({Absence : [...this.state.Absence , item ]})
                        }
                    }
                )
            }else{
                this.setState({ Absence : [] })
            }
        })
        .catch((error) => {
            console.log('error', error)
        });
        }

    }
    bodyFunc(){
        if(this.checkinfos() === true ){
            return this.state.Stagiaires.map((item , i)=> {
                let checked =  <Checkbox disabled slider /> 
                if(this.state.Absence.length > 0){
                     this.state.Absence.map(etem => {
                        if(item.NumInscription === etem.Stagiaire){
                            checked = <Checkbox  disabled checked  slider />    
                        }
                    })
                }
                return (
                    <Table.Row key={i}>
                        <Table.Cell  textAlign='center' collapsing >
                            {checked}
                        </Table.Cell>
                        <Table.Cell>{item.Nom}</Table.Cell>
                        <Table.Cell>{item.Prenom}</Table.Cell>
                        <Table.Cell >{item.NumInscription}</Table.Cell>
                    </Table.Row>
                )
            }) 
        }
    }
    render() {
        return (
            <div style={{backgroundImage : `url(${foto9})`,
                        backgroundSize: "cover" ,
                        backgroundRepeat: "no-repeat",
                        fontFamily: "'Numans', sans-serif",}} 
                        className="pt-5 pb-5" >
            <Form className="container">
                <Table compact celled definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.Cell className="text-center " colSpan='5' >
                                <Label color='green' horizontal size='big'>
                                    L'absence est marqué
                                </Label>
                            </Table.Cell>

                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        <Table.Row>
                            <Table.Cell style={{width:"100px"}}/>
                            <Table.HeaderCell textAlign="center">Nom</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Prenom</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Numero d'inscription</Table.HeaderCell>
                        </Table.Row>
                        {
                            this.bodyFunc()
                        } 

                    </Table.Body>
                </Table>
            </Form>
            </div>
        )
    }
}

