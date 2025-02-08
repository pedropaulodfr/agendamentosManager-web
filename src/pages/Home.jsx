import React from "react";
//import Logotipo from "../assets/medscan-logo-verde.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { getSessionCookie } from "../helpers/cookies";

export default function Home() {
  const handleCard = (route) => {
    window.location.href = `/${route}`;
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <div
            className="logo"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={null} width={250} />
          </div>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col xs={3}></Col>
        <Col>
          <span>
            <center>
              <h3>Bem-vindo ao Agendamento Manager!</h3>
            </center>
            <br />
            <i style={{ color: "gray" }}>
              No coração da nossa missão está o compromisso com a organização e a eficiência. 
              O Agendamentos Manager nasceu da necessidade de simplificar e aprimorar a gestão de agendamentos de serviços, 
              tornando-a mais acessível e eficiente para todos.
            </i>
          </span>
        </Col>
        <Col xs={3}></Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <h4 style={{ color: "#00C7E9" }}>O que deseja fazer?</h4>
        </Col>
      </Row>
      {getSessionCookie()?.perfil != "Admin" &&
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button variant="outline-success" className="m-2 mt-0.5" onClick={() => {handleCard("dashboard")}}>
              Dashboard
            </Button>
            <Button variant="outline-info" className="m-2 mt-0.5" onClick={() => {handleCard("card")}}>
              Verificar Cartão
            </Button>
          </Col>
        </Row>
      }
      {getSessionCookie()?.perfil == "Admin" &&
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button variant="outline-success" className="m-2 mt-0.5" onClick={() => {handleCard("agendamentos")}}>
              Agendamentos
            </Button>
            <Button variant="outline-info" className="m-2 mt-0.5" onClick={() => {handleCard("usuarios")}}>
              Usuários
            </Button>
          </Col>
        </Row>
      }
    </Container>
  );
}