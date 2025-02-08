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

export default function AddAgendamento ({ handleReturn, dadosEdicao = [] }) {
  const api = useApi();
  const [listaServicos, setListaServicos] = useState([]);
  const [_dadosAgendamentos, set_dadosAgendamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Campos a serem validados
  const campos = [
    { nome: "nome", type: "text" },
    { nome: "telefone", type: "text" },
    { nome: "data", type: "text" },
    { nome: "hora", type: "text" },
    { nome: "servico", type: "text" },
  ];

  useEffect(() => {
    if (Object.keys(dadosEdicao).length > 0) {
      set_dadosAgendamentos({
        ..._dadosAgendamentos,
        id: dadosEdicao.id,
        nome: dadosEdicao.nome,
        telefone: dadosEdicao.telefone,
        data: dadosEdicao.dataFiltro,
        hora: dadosEdicao.hora,
        servico: dadosEdicao.servico,
        executado: dadosEdicao.executado,
        usuarioId: dadosEdicao.usuarioId
      })
    }
  }, []);

  const handleDadosAgendamentoChange = (event, campo) => {
    set_dadosAgendamentos({
      ..._dadosAgendamentos,
      [campo]: event.target.type != "checkbox" ? event.target.value : event.target.checked,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        api.get("/Servicos/getAll").then((result) => {
          const dadosOrdenados = result.data.sort((a, b) => a.identificacao.localeCompare(b.identificacao));
          setListaServicos(dadosOrdenados);
          setLoading(false);
        });

      } catch (error) {
        showMessage("Aviso", "Erro ao buscar dados: " + error, "error", null);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLimparCampos = () => {
    set_dadosAgendamentos({nome: "", telefone: "", data: "", hora: "", servico: "", executado: false});
  };

  const onSubmit = () => {
    const newErrors = ValidaCampos(campos, _dadosAgendamentos);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Atualiza o estado de erros
      return; // Interrompe a execução
    }

    const objDadosAgendamentos = {
      ..._dadosAgendamentos,
      data: `${_dadosAgendamentos.data}T${_dadosAgendamentos.hora}`,
    }
    setLoading(true);
    if (Object.keys(dadosEdicao).length == 0) {
      api.post("/Agendamentos/insert", objDadosAgendamentos).then((result) => {
        if (result.status !== 200) throw new Error(result?.response?.data?.message);
        showMessage( "Sucesso", "Agendamento cadastrado com sucesso!", "success", null);
        setLoading(false);
        handleLimparCampos();
      })
      .catch((err) => {showMessage( "Erro", err, "error", null); setLoading(false)})
    } else {
      console.log(objDadosAgendamentos);
      api.put("/Agendamentos/update", objDadosAgendamentos)
        .then((result) => {
          if (result.status !== 200)
            throw new Error(result?.response?.data?.message);
  
          showMessage( "Sucesso", "Agendamento editado com sucesso!", "success", () => {handleReturn()});
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
              <span className="text-danger">*</span> Cliente
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Cliente"
              value={_dadosAgendamentos?.nome}
              onChange={(e) => handleDadosAgendamentoChange(e, "nome")}
              isInvalid={!!errors.nome}
            />
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-1">
            <Form.Label>
              <span className="text-danger">*</span> Telefone
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Telefone"
              value={_dadosAgendamentos?.telefone}
              onChange={(e) => handleDadosAgendamentoChange(e, "telefone")}
              isInvalid={!!errors.telefone}
            />
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group controlId="date" bsSize="large">
            <Form.Label><span className="text-danger">*</span> Dia</Form.Label>
            <Form.Control
              type="date"
              style={{ width: "100%" }}
              value={_dadosAgendamentos?.data}
              onChange={(e) => handleDadosAgendamentoChange(e, "data")}
              isInvalid={!!errors.data}
            />
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group controlId="date" bsSize="large">
            <Form.Label><span className="text-danger">*</span> Hora</Form.Label>
            <Form.Control
              type="time"
              style={{ width: "100%" }}
              value={_dadosAgendamentos?.hora}
              onChange={(e) => handleDadosAgendamentoChange(e, "hora")}
              isInvalid={!!errors.hora}
            />
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-3">
            <Form.Label>
              <span className="text-danger">*</span> Serviço
            </Form.Label>
            <Form.Select
              aria-label="Serviço"
              value={_dadosAgendamentos?.servico}
              onChange={(e) => handleDadosAgendamentoChange(e, "servico")}
              isInvalid={!!errors.servico}
            >
              <option value={""}>Selecione</option>
              {listaServicos?.map((m, index) => (
                <option key={index} value={m.identificacao}>
                  {m.identificacao}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-1 mt-4" controlId="formBasicCheckbox">
            <Form.Check 
              type="checkbox" 
              label="Executado?" 
              checked={_dadosAgendamentos?.executado} 
              onChange={(e) => handleDadosAgendamentoChange(e, "executado")}
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
          {Object.keys(_dadosAgendamentos).length > 0 && (
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