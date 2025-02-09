import { useState, useEffect } from "react";
import moment from "moment";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Utils e helpers
import Loading from "../../components/Loading/Loading";
import { showMessage } from "../../helpers/message";
import { ValidaCampos } from "../../helpers/validacoes";
import { useApi } from "../../api/useApi";

export default function AddHorarios ({ handleReturn, dadosEdicao = [] }) {
  const api = useApi();
  const [_dadosHorarios, set_dadosHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Campos a serem validados
  const campos = [
    { nome: "hora", type: "text" },
  ];

  useEffect(() => {
    if (Object.keys(dadosEdicao).length > 0) {
      set_dadosHorarios({
        ..._dadosHorarios,
        id: dadosEdicao.id,
        identificacao: dadosEdicao.identificacao,
        descricao: dadosEdicao.descricao,
        tempoEstimado: dadosEdicao.tempoEstimado,
        status: dadosEdicao.status,
        ativo: dadosEdicao.ativo
      })
    }
  }, []);

  const handleDadosServicoChange = (event, campo) => {
    set_dadosHorarios({
      ..._dadosHorarios,
      [campo]: event.target.type != "checkbox" ? event.target.value : event.target.checked,
    });
  };

  const handleLimparCampos = () => {
    set_dadosHorarios({hora: "",});
  };

  const onSubmit = () => {
    const newErrors = ValidaCampos(campos, _dadosHorarios);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Atualiza o estado de erros
      return; // Interrompe a execução
    }

    
    const objDadosHorarios = {
        ..._dadosHorarios,
        hora: `${moment().format("YYYY-MM-DD")}T${_dadosHorarios.hora}`
    }
    
    setLoading(true);
    if (Object.keys(dadosEdicao).length == 0) {
      api.post("/Horarios/insert", objDadosHorarios).then((result) => {
        if (result.status !== 200) throw new Error(result?.response?.data?.message);
        showMessage( "Sucesso", "Horário cadastrado com sucesso!", "success", null);
        setLoading(false);
        handleLimparCampos();
      })
      .catch((err) => {showMessage( "Erro", err, "error", null); setLoading(false)})
    }
  };

  return (
    <Container>
      {loading && <Loading />}
      <Row >
        <Col>
          <Button
            className="mb-5 mt-2 text-white"
            variant="secondary"
            onClick={handleReturn}
          >
            <i className="bi bi-arrow-left"></i> Voltar
          </Button>{" "}
        </Col>
      </Row>
      <Row>
        <Col md>
          <h4>{Object.keys(dadosEdicao).length == 0 ? "Cadastrar" : "Editar"}</h4>
        </Col>
      </Row>

      <Row>
        <Col md="4">
          <Form.Group className="mb-1">
            <Form.Label>
              <span className="text-danger">*</span> Horario
            </Form.Label>
            <Form.Control
              type="time"
              placeholder="Horário"
              value={_dadosHorarios?.hora}
              onChange={(e) => handleDadosServicoChange(e, "hora")}
              isInvalid={!!errors.hora}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            className="m-3 mb-0 mt-2 text-white"
            variant="info"
            style={{ backgroundColor: "#0088cc", borderColor: "#0088cc" }}
            onClick={onSubmit}
          >
            <i className="bi bi-plus"></i> Salvar
          </Button>{" "}
          {Object.keys(_dadosHorarios).length > 0 && (
            <>
              <Button
                className="m-3 mb-0 mt-2 text-white"
                variant="info"
                style={{ backgroundColor: "#66b3ff", borderColor: "#66b3ff" }}
                onClick={handleLimparCampos}
              >
                <i className="bi bi-eraser"></i> Limpar Campos
              </Button>{" "}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}