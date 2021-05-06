import React, { Component } from 'react'
import { Form, Table,Checkbox ,Button, Label} from 'semantic-ui-react'
import foto9 from '../../Resources/foto9.jpg'
 class MarquerAbsence extends Component {
     
    constructor(props){
        super(props)
        console.log("Constructor de marquer absence");
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
                HashG : this.props.location.state.HashG,
                HashF : this.props.location.state.HashF,
                SELECTEDSTG : [],
             }
            console.log(this.state.Email);
            console.log(this.state.Date);
            console.log(this.state.HeurD);
            console.log(this.state.HeurF);
        }
         this.handleChangeSliderStagiaires = this.handleChangeSliderStagiaires.bind(this);
         this.handleClickBtnMarquer = this.handleClickBtnMarquer.bind(this);
                  
    }
    componentDidMount(){
        console.log("salut c'est did mount de marquer absence");
        
        this.checkApiAbcenses();
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
        console.log("checkApiAbcenses");
        if(this.checkinfos() === true ){
            fetch("http://localhost/backend/absences/?token="+this.state.HashG, {
            method: 'GET',
            redirect: 'follow'
            })
            .then(response => response.text())
            .then((result) => {
                let absences = JSON.parse(result);

                if(absences.status === "OK"){
                    console.log('voila je vais tester');
                    
                    absences.absences.map((item)=>{ 
                        if( item.Formateur === this.state.Email &&
                            item.CodeGroupe === this.state.Groupe &&
                            item.DateAbsence === this.state.Date &&
                            item.HeureDebut === this.state.HeurD && 
                            item.HeureFin === this.state.HeurF){
                                console.log("sa marche voila voila");
                                console.log("sa marche voila voila");
                                this.props.history.push('/gestionnaire')
                        }
                })
                }else{
                    console.log('ca marche pas');
                }

            })
            .catch((error) => {
                console.log('error', error)
            });
        }
    }
    handleChangeSliderStagiaires(event,item){
        console.log("onhandle slider stagiaires ");
        if(item.checked === true)
            this.setState({SELECTEDSTG : [...this.state.SELECTEDSTG , document.getElementById("NumInscription"+item.id).textContent ]})
        else if(item.checked === false) this.setState({SELECTEDSTG : this.state.SELECTEDSTG.filter(items => items !== document.getElementById("NumInscription"+item.id).textContent) })
    }
    handleClickBtnMarquer(){
        console.log('handle btn rechercher');
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
                    this.props.history.push({
                        pathname:"/amarque",
                        state:{
                            Email : this.state.Email ,
                            Groupe : this.state.Groupe,
                            Date : this.state.Date,
                            HeurD : this.state.HeurD,
                            HeurF : this.state.HeurF,
                            HashG : this.state.HashG,
                            HashF : this.state.HashF,
                            Stagiaires : this.state.Stagiaires,
                            
                         }//te doit filtrer ces absence pour group et formateur
                       })
                }
            })
            .catch(error => console.log('error', error));
        }
    }

    bodyFunc(){
        console.log("body function");
        
        if(this.checkinfos() === true){
            if(this.state.Stagiaires === "undefined" || this.state.Stagiaires === undefined ||  this.state.Stagiaires === 0)
            {
                return (<Table.Row><Table.Cell></Table.Cell></Table.Row>)
            }
            else{
                return this.state.Stagiaires.map((item , i) => {
                    return (
                    <Table.Row key={i}>
                        <Table.Cell textAlign='center' >
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

export default MarquerAbsence;