import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter
      color="blue"
      style={{ backgroundColor: "#343A40" }}
      className="font-small pt-5 "
    >
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6" className="mt-3">
            <h3 className="title" style={{ color: "white" }}>
              à propos
            </h3>
            <p style={{ color: "white" }}>
              CE SITE EST CRÉÉ POUR LES FORMATEURS ET LA DIRECTION DE
              L'INSTITUTE SPECIALISE DE TECHNOLOGIE APPLIQUEE DE TINGHIR POUR LA
              GESTION D'ABSENCE DE SES STAGIAIRES
            </p>
          </MDBCol>
          <MDBCol md="6" style={{ color: "white" }} className="mt-3">
            <h3 className="title" style={{ color: "white" }}>
              Autres
            </h3>
            <p style={{ color: "white" }}>
              LE SITE EST JUSTE UNE DÉMO SUR LA GESTION D'ABSENCE ET AVEC LE
              TEMP IL VA RECEVOIRE DE MISE A JOUR .
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div
        className="footer-copyright text-center py-3"
        style={{ color: "white" }}
      >
        <MDBContainer fluid>
          <p>MERCI POUR VOTRE VISITE.</p>
        </MDBContainer>
      </div>
      <div
        className="footer-copyright text-center py-3"
        style={{ color: "white" }}
      >
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="/home"> OFPPT.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
