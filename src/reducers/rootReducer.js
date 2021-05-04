import Cookies from 'js-cookie'

const initState  = {
    logged: "LOGGED_OFF",
    Email: "",
    Nom: "",
    Prenom: "",
    Matricule: "",
    Cin: "",
    Type: "",
    Hash : '',
    Groupe : "",
    STG : [] ,
    fullName: '' 
}
const reducer = (state = initState , action) =>{
    if(action.type === 'listStagiaires'){
        console.log("action.type === 'listStagiaires'");
        if(Cookies.get("stagiaires") === undefined )
        {
            console.log('Cookies.get("stagiaires") === undefined');
            return state
            
        }else{
                console.log('Cookies.get("stagiaires") !== "undefined' )
                let Stagiaires = Cookies.get("stagiaires");
                console.log("salut je suis dans reducer++++ "+Cookies.get("stagiaires"));
                let stagiairesObject = JSON.parse(Stagiaires.toString());

                console.log(stagiairesObject)
                return {
                    STG : stagiairesObject
                }
        }
        
    }
    
    if(action.type === 'readCookie'){
        let user = Cookies.get("user");
        if(user === undefined){
            return state;
        }
        else{
            const userObject = JSON.parse(user.toString());
            if(userObject.infos.Type === "Formateur"){
                return{
                    logged: "LOGGED_ON",
                    Email: userObject.infos.Email,
                    Nom: userObject.infos.Nom,
                    Prenom: userObject.infos.Prenom,
                    Matricule: userObject.infos.Matricule,
                    Cin: userObject.infos.Cin,
                    Type: userObject.infos.Type,
                    Hash: userObject.infos.Hash,
                    fullName: userObject.infos.Nom +" "+ userObject.infos.Prenom,
                }
            }
            else if(userObject.infos.Type === "Gestionnaire"){
                return{
                    logged: "LOGGED_ON",
                    Email: userObject.infos.Email,
                    Nom: userObject.infos.Nom,
                    Prenom: userObject.infos.Prenom,
                    Matricule: userObject.infos.Matricule,
                    Cin: userObject.infos.Cin,
                    Type: userObject.infos.Type,
                    Hash: userObject.infos.Hash,
                    fullName: userObject.infos.Nom +" "+ userObject.infos.Prenom,
                }    
            }   
        }
    }
    return state;
}
    

export default reducer; 