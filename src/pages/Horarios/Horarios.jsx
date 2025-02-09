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
import { showMessage, showQuestion } from "../../helpers/message";
import { FormatToDataHora, FormatToData, FormatToHM, FormatToFilter } from "../../helpers/data";
import { useApi } from "../../api/useApi";
import AddHorarios from "./AddHorarios";

export default function Horarios () {
  const api = useApi();
  const [dadosHorarios, setDadosHorarios] = useState([]);
  const [_dadosHorarios, set_DadosHorarios] = useState([]);
  const [filtro, setFiltro] = useState({});
  const [isFiltro, setIsFiltro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addHorarios, setAddHorarios] = useState(false);
  const [editarHorario, setEditarHorario] = useState(false);
  const [dadosHorarioEditar, setDadosHorarioEditar] = useState([]);
  const [atualizarTabela , setAtualizarTabela]  = useState(false);

  const headers = [
    { value: "Hora", objectValue: "horaFormatada" },
  ];

  const handleDelete = (item) => {
    showQuestion("Tem certeza?", "Tem certeza que deseja excluir esse horário? Esta ação é irreversível", "info",
      (confirmation) => {
        if (confirmation) {
          setLoading(true);
          api.delete("/Horarios/delete", item.id).then((result) => {
            if (result.status !== 200) throw new Error(result?.response?.data?.message);
              
            showMessage( "Sucesso", "Serviço excluído com sucesso!", "success", null);
            setLoading(false);
            setAtualizarTabela(true)
          })
          .catch((err) => {showMessage( "Erro", err, "error", null); setLoading(false)})
        }
      }
    );
  }

  const handleEditar = (item) => {
    setDadosHorarioEditar(item)
    setEditarHorario(true)
  }

  // Ações da tabela
  const actions = [
    { icon: "bi bi-x-circle-fill text-white", color: "danger", action: handleDelete},
  ];

  useEffect(() => {
    setAtualizarTabela(false)
    const fetchData = async () => {
      try {
        setLoading(true);
        api.get("/Horarios/getAll").then((result) => {
            result.data.map((m) => {
                m.horaFormatada = FormatToHM(m?.hora);
            });
          const dadosOrdenados = result.data.sort((a, b) => a.hora.localeCompare(b.hora));
          setDadosHorarios(dadosOrdenados);
          set_DadosHorarios(dadosOrdenados);
          setLoading(false);
        });
      } catch (error) {
        showMessage("Aviso", "Erro ao buscar dados: " + error, "error", null);
        setLoading(false);
      }
    };

    fetchData();
  }, [addHorarios, setAddHorarios, atualizarTabela]);

  
  // Filtros
  const camposFiltrados = [
    {campo: "hora", label: "Hora", tipo: "time"},
  ]

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
    setDadosHorarios(dadosHorarios);

    // Verificar se algum filtro foi preenchido
    if (Object.keys(filtro).length === 0) {
      showMessage("Aviso", "Informe ao menos um dos campos!", "error", null);
      return;
    }

    // Criar uma cópia dos dados originais para aplicar os filtros
    let dadosFiltrados = [...dadosHorarios];

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
    setDadosHorarios(dadosFiltrados);
  };

  const handleLimparFiltro = () => {
    setFiltro({});
    setDadosHorarios(_dadosHorarios);
    setIsFiltro(false);
  };

  const handleAddHorarios = () => {
    setAddHorarios(true);
  };

  const handleReturn = () => {
    setAddHorarios(false)
    setEditarHorario(false)
    setAtualizarTabela(true)
  }

  return (
    <Container>
      {loading && <Loading />}
      <Row className="justify-content-md-center">
        <Col className="d-flex justify-content-center">
          <h1 className="title-page">Horários</h1>
        </Col>
      </Row>
      {!addHorarios && !editarHorario && (
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
          {!addHorarios && !editarHorario && (
            <Row>
              <Col>
                <Button
                  className="m-3 mb-0 mt-2 text-white"
                  variant="info"
                  style={{ backgroundColor: "#0088cc", borderColor: "#0088cc" }}
                  onClick={handleAddHorarios}
                >
                  <i className="bi bi-plus"></i> Cadastrar
                </Button>{" "}
              </Col>
            </Row>
          )}
          <Form className="text-black mb-4 shadow p-3 mb-5 bg-white rounded">
            <Row className="justify-content-center">
              <Col>
                <TabelaListagem headers={headers} itens={dadosHorarios} actions={actions} />
              </Col>
            </Row>
          </Form>
        </>
      )}
      {addHorarios && (
        <Form className="text-black mb-4 shadow p-3 mb-5 bg-white rounded">
          <AddHorarios handleReturn={handleReturn} />
        </Form>
      )}
      {editarHorario && (
        <Form className="text-black mb-4 shadow p-3 mb-5 bg-white rounded">
          <AddHorarios handleReturn={handleReturn} dadosEdicao={dadosHorarioEditar} />
        </Form>
      )}
    </Container>
  );
}