import { useState, useEffect } from "react";

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

export default function AddServicos ({ handleReturn, dadosEdicao = [] }) {
  const api = useApi();
  const [_dadosServicos, set_dadosServicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Campos a serem validados
  const campos = [
    { nome: "identificacao", type: "text" },
    { nome: "tempoEstimado", type: "number" },
    { nome: "status", type: "text" },
  ];

  const listaStatus = ["Ativo", "Inativo"]

  useEffect(() => {
    if (Object.keys(dadosEdicao).length > 0) {
      set_dadosServicos({
        ..._dadosServicos,
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
    set_dadosServicos({
      ..._dadosServicos,
      [campo]: event.target.type != "checkbox" ? event.target.value : event.target.checked,
    });
  };

  const handleLimparCampos = () => {
    set_dadosServicos({identificacao: "", descricao: "", tempoEstimado: "", status: ""});
  };

  const onSubmit = () => {
    const newErrors = ValidaCampos(campos, _dadosServicos);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Atualiza o estado de erros
      return; // Interrompe a execução
    }

    setLoading(true);
    if (Object.keys(dadosEdicao).length == 0) {
      api.post("/Servicos/insert", _dadosServicos).then((result) => {
        if (result.status !== 200) throw new Error(result?.response?.data?.message);
        showMessage( "Sucesso", "Serviço cadastrado com sucesso!", "success", null);
        setLoading(false);
        handleLimparCampos();
      })
      .catch((err) => {showMessage( "Erro", err, "error", null); setLoading(false)})
    } else {
      api.put("/Servicos/update", _dadosServicos)
        .then((result) => {
          if (result.status !== 200)
            throw new Error(result?.response?.data?.message);
  
          showMessage( "Sucesso", "Serviço editado com sucesso!", "success", () => {handleReturn()});
          setLoading(false);
          handleLimparCampos();
        })
        .catch((err) => {
          showMessage("Erro", err, "error", null);
          setLoading(false);
        });
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
              <span className="text-danger">*</span> Identificação
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Identificação"
              value={_dadosServicos?.identificacao}
              onChange={(e) => handleDadosServicoChange(e, "identificacao")}
              isInvalid={!!errors.identificacao}
            />
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-1">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descrição"
              value={_dadosServicos?.descricao}
              onChange={(e) => handleDadosServicoChange(e, "descricao")}
              isInvalid={!!errors.descricao}
            />
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-1">
            <Form.Label><span className="text-danger">*</span> Tempo Estimado</Form.Label>
            <Form.Control
              type="number"
              placeholder="Tempo Estimado"
              value={_dadosServicos?.tempoEstimado}
              onChange={(e) => handleDadosServicoChange(e, "tempoEstimado")}
              isInvalid={!!errors.tempoEstimado}
            />
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-3">
            <Form.Label>
              <span className="text-danger">*</span> Status
            </Form.Label>
            <Form.Select
              aria-label="Status"
              value={_dadosServicos?.status}
              onChange={(e) => handleDadosServicoChange(e, "status")}
              isInvalid={!!errors.status}
            >
              <option value={""}>Selecione</option>
              {listaStatus?.map((m, index) => (
                <option key={index} value={m}>{m}</option>
              ))}
            </Form.Select>
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
          {Object.keys(_dadosServicos).length > 0 && (
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