import { useState, useEffect } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import TabelaListagem from "../../components/TabelaListagem/TabelaListagem";
import Form from "react-bootstrap/Form";

// Utils e helpers
import Loading from "../../components/Loading/Loading";
import { showMessage } from "../../helpers/message";
import { FormatToDataHora, FormatToData, FormatToHM, FormatToFilter } from "../../helpers/data";
import { useApi } from "../../api/useApi";
import AddAgendamento from "./AddAgendamento";

export default function Agendamentos () {
  const api = useApi();
  const [dadosAgendamentos, setDadosAgendamentos] = useState([]);
  const [_dadosAgendamentos, set_DadosAgendamentos] = useState([]);
  const [listaServicos, setListaServicos] = useState([]);
  const [filtro, setFiltro] = useState({});
  const [isFiltro, setIsFiltro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addAgendamentos, setaddAgendamentos] = useState(false);
  const [editarAgendamento, setEditarAgendamento] = useState(false);
  const [dadosAgendamentoEditar, setDadosAgendamentoEditar] = useState([]);
  const [atualizarTabela , setAtualizarTabela]  = useState(false);

  const headers = [
    { value: "Cliente", objectValue: "nome" },
    { value: "Telefone", objectValue: "telefone" },
    { value: "Data/Hora Agendamento", objectValue: "dataHoraFormatada" },
    { value: "Serviço", objectValue: "servico" },
    { value: "Executado", objectValue: "executadoFormatado" },
  ];

  const handleEditar = (item) => {
    setDadosAgendamentoEditar(item)
    setEditarAgendamento(true)
  }

  // Ações da tabela
  const actions = [{ icon: "bi bi-pencil-square text-white", color: "warning", action: handleEditar},];

  useEffect(() => {
    setAtualizarTabela(false)
    const fetchData = async () => {
      try {
        setLoading(true);
        api.post("/Agendamentos/getAll", {}).then((result) => {
            result.data.map((m) => {
                m.executadoFormatado = `${m?.executado ? "Sim" : "Não"}`;
                m.dataHoraFormatada = FormatToDataHora(m?.data);
                m.hora = FormatToHM(m?.data);
                m.dataFormatada = FormatToData(m?.data);
                m.dataFiltro = FormatToFilter(m?.data);
            });
            const dadosOrdenados = result.data.sort((a, b) => a.nome.localeCompare(b.nome));
          setDadosAgendamentos(dadosOrdenados);
          set_DadosAgendamentos(dadosOrdenados);
          setLoading(false);
        });

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
  }, [addAgendamentos, setaddAgendamentos, atualizarTabela]);

  
  // Filtros
  const camposFiltrados = [
    {campo: "nome", label: "Cliente", tipo: "text"},
    {campo: "telefone", label: "Telefone", tipo: "text"},
    {campo: "dataFiltro", label: "Dia", tipo: "date"},
    {campo: "hora", label: "Hora", tipo: "time"},
  ]

  const staausFiltro = ["Pendente", "Executado"]

  const handleFiltroChange = (event, campo) => {
    let newValue;
    if (event.target.type == "checkbox") {
        newValue = event.target.checked;
    } else {
        newValue = event.target.value;
    }
    setFiltro({ ...filtro,[campo]: newValue, });
  };

  const handleFiltro = () => {
    // Resetar os dados para o estado original
    setDadosAgendamentos(dadosAgendamentos);

    // Verificar se algum filtro foi preenchido
    if (Object.keys(filtro).length === 0) {
      showMessage("Aviso", "Informe ao menos um dos campos!", "error", null);
      return;
    }

    // Criar uma cópia dos dados originais para aplicar os filtros
    let dadosFiltrados = [...dadosAgendamentos];

    // Aplicar os filtros dinamicamente com base na lista de filtros
    for (const campo in filtro) {
        if (filtro[campo] && filtro[campo]?.trim() !== "") {
            dadosFiltrados = dadosFiltrados.filter((item) =>
                item[campo] 
                ? item[campo].toString().toLowerCase().includes(filtro[campo]?.trim().toLowerCase())
                : false
            );
        }
    }

    setIsFiltro(true);
    setDadosAgendamentos(dadosFiltrados);
  };

  const handleLimparFiltro = () => {
    setFiltro({});
    setDadosAgendamentos(_dadosAgendamentos);
    setIsFiltro(false);
  };

  const handleaddAgendamentos = () => {
    setaddAgendamentos(true);
  };

  const handleReturn = () => {
    setaddAgendamentos(false)
    setEditarAgendamento(false)
    setAtualizarTabela(true)
  }

  return (
    <Container>
      {loading && <Loading />}
      <Row className="justify-content-md-center">
        <Col className="d-flex justify-content-center">
          <h1 className="title-page">Agendamentos</h1>
        </Col>
      </Row>
      {!addAgendamentos && !editarAgendamento && (
        <>
          <Row>
            <Col md>
              <h4>Filtros</h4>
            </Col>
          </Row>
          <Form className="text-black mb-4 shadow p-3 mb-5 bg-white rounded">
            <Row className="filtros">
                {camposFiltrados != null &&
                    camposFiltrados.map(m => {
                        return (
                            <Col md="3">
                                <Form.Group className="mb-3">
                                <Form.Label>{m.label}</Form.Label>
                                <Form.Control
                                    type={m.tipo}
                                    placeholder=""
                                    value={filtro[m.campo] || ""}
                                    onChange={(e) => handleFiltroChange(e, m.campo)}
                                />
                                </Form.Group>
                            </Col>
                        )
                    })
                }
                <Col md="3">
                    <Form.Group className="mb-3">
                        <Form.Label>Serviços</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            value={filtro.servico}
                            onChange={(e) => handleFiltroChange(e, "servico")}
                        >
                        <option value={""}>Selecione</option>
                        {listaServicos?.map((m, index) => (
                            <option key={index} value={m.identificacao}>{m.identificacao}</option>
                        ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md="3">
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            value={filtro.executadoFormatado}
                            onChange={(e) => handleFiltroChange(e, "executadoFormatado")}
                        >
                        <option value={""}>Selecione</option>
                        {staausFiltro?.map((m, index) => (
                            <option key={index} value={m == "Executado" ? "Sim" : "Não"}>{m}</option>
                        ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
              <Col className=" mt-4" xs={0}>
                <Button
                  className="mb-0 mt-2 text-white"
                  variant="info"
                  style={{ backgroundColor: "#0088cc", borderColor: "#0088cc" }}
                  onClick={handleFiltro}
                >
                  <i className="bi bi-funnel"></i> Filtrar
                </Button>{" "}
                {isFiltro && (
                  <>
                    <Button
                      className="m-3 mb-0 mt-2 text-white"
                      variant="info"
                      style={{ backgroundColor: "#66b3ff", borderColor: "#66b3ff" }}
                      onClick={handleLimparFiltro}
                    >
                      <i className="bi bi-eraser"></i> Limpar Filtros
                    </Button>{" "}
                  </>
                )}
              </Col>
            </Row>
            <Row>
            </Row>
          </Form>
          {!addAgendamentos && !editarAgendamento && (
            <Row>
              <Col>
                {/* <Button
                  className="m-3 mb-0 mt-2 text-white"
                  variant="info"
                  style={{ backgroundColor: "#0088cc", borderColor: "#0088cc" }}
                  onClick={handleaddAgendamentos}
                >
                  <i className="bi bi-plus"></i> Cadastrar
                </Button>{" "} */}
              </Col>
            </Row>
          )}
          <Form className="text-black mb-4 shadow p-3 mb-5 bg-white rounded">
            <Row className="justify-content-center">
              <Col>
                <TabelaListagem headers={headers} itens={dadosAgendamentos} actions={actions} />
              </Col>
            </Row>
          </Form>
        </>
      )}
      {addAgendamentos && (
        <Form className="text-black mb-4 shadow p-3 mb-5 bg-white rounded">
          <AddAgendamento handleReturn={handleReturn} />
        </Form>
      )}
      {editarAgendamento && (
        <Form className="text-black mb-4 shadow p-3 mb-5 bg-white rounded">
          <AddAgendamento handleReturn={handleReturn} dadosEdicao={dadosAgendamentoEditar} />
        </Form>
      )}
    </Container>
  );
}