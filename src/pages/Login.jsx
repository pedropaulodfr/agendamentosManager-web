import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showMessage } from "../helpers/message";
import Loading from "../components/Loading/Loading";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useAuth } from "../contexts/Auth/AuthContext"
import Modals from "../components/Modals/Modals";
import { useApi } from "../api/useApi";
import Logotipo from "../assets/AgendamentoManager-logo-multicolor.png";

export const Login = () => {
  const auth = useAuth();
  const api = useApi();
  const navigate = useNavigate();

  const [cpfCnpj, setCpfCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecuperarSenha, setIsRecuperarSenha] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleCpfCnpjInput = (event) => {
    setCpfCnpj(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (cpfCnpj && password) {
      setLoading(true);
      await auth.login(cpfCnpj, password).then((result) => {
        if (result.statusCode !== 200) {
          setLoading(false);
          showMessage("Aviso", "Usuário ou senha inválidos. Tente novamente!", "error", null);
        } else {
          setLoading(false);
          navigate("/home");
        }
      });
    }
  };

  const handleRecuperacaoSenha = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const email = form.elements.emailRecuperacao.value;
      setLoading(true);
      api.post("/Usuarios/esqueceuSenha", { email: email })
        .then((result) => {
          if (result.status !== 200)
            throw new Error(result?.response?.data?.message);

          showMessage("Aviso", "A senha foi enviada para o seu e-mail!", "success", null);
          setIsRecuperarSenha(false);
          setLoading(false);
        })
        .catch((err) => {
          showMessage("Erro", err, "error", null);
          setLoading(false);
        });
    }

    setValidated(true);
  };

  return (
    <div
      className="login d-flex justify-content-center align-items-center gradiente"
      style={{ minHeight: "100vh" }}
    >
      {loading && <Loading />}
      {isRecuperarSenha &&
        <Modals close={() => setIsRecuperarSenha(false)} title={"Recuperar Senha"} >
          <Form noValidate onSubmit={handleRecuperacaoSenha} validated={validated}>
            <Form.Group as={Col} className="mb-3" controlId="emailRecuperacao">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Digite seu e-mail" required />
              <Form.Control.Feedback type="invalid" />
            </Form.Group>
            <Button type="submit" variant="primary">Recuperar Senha</Button>
          </Form>
        </Modals>
      }
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={5}>
            <Form
              className=""
              style={{ borderRadius: "15px", padding: "20px", backgroundColor: "#cce7ff", color: "#0088cc" }}
            >
              <img src={Logotipo} width={240} />
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  CPF/CNPJ
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    type="text"
                    placeholder="Digite seu CPF/CNPJ"
                    value={cpfCnpj}
                    onChange={handleCpfCnpjInput}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Senha
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={handlePasswordInput}
                  />
                </Col>
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <Form.Label column sm="4" style={{ cursor: "pointer" }} onClick={setIsRecuperarSenha}>Esqueci a senha</Form.Label>
              </Form.Group> */}
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Button
                    onClick={handleLogin}
                    style={{
                      backgroundColor: "#0088cc",  // Azul Telegram
                      borderColor: "#cce7ff",      // Fundo claro correspondente
                      color: "#ffffff",            // Texto branco para contraste
                      margin: "15px",
                    }}
                    size="lg"
                  >
                    Entrar
                  </Button>

                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};