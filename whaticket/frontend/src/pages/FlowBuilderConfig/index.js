import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useCallback
} from "react";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import api from "../../services/api";

import MainHeader from "../../components/MainHeader";
import Title from "../../components/Title";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";
import MainContainer from "../../components/MainContainer";
import toastError from "../../errors/toastError";
import { AuthContext } from "../../context/Auth/AuthContext";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography
} from "@mui/material";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { CircularProgress } from "@material-ui/core";
import messageNode from "./nodes/messageNode.js";

import "reactflow/dist/style.css";
import "./styles.css";

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  onElementsRemove,
  useReactFlow
} from "react-flow-renderer";
import FlowBuilderAddTextModal from "../../components/FlowBuilderAddTextModal";
import FlowBuilderIntervalModal from "../../components/FlowBuilderIntervalModal";
import startNode from "./nodes/startNode";
import conditionNode from "./nodes/conditionNode";
import menuNode from "./nodes/menuNode";
import intervalNode from "./nodes/intervalNode";
import imgNode from "./nodes/imgNode";
import randomizerNode from "./nodes/randomizerNode";
import videoNode from "./nodes/videoNode";
import FlowBuilderConditionModal from "../../components/FlowBuilderConditionModal";
import FlowBuilderMenuModal from "../../components/FlowBuilderMenuModal";
import {
  AccessTime,
  CallSplit,
  DynamicFeed,
  Image,
  ImportExport,
  LibraryBooks,
  Message,
  MicNone,
  RocketLaunch,
  Videocam
} from "@mui/icons-material";
import RemoveEdge from "./nodes/removeEdge";
import FlowBuilderAddImgModal from "../../components/FlowBuilderAddImgModal";
import FlowBuilderTicketModal from "../../components/FlowBuilderAddTicketModal";
import FlowBuilderAddAudioModal from "../../components/FlowBuilderAddAudioModal";
import audioNode from "./nodes/audioNode";
import { useNodeStorage } from "../../stores/useNodeStorage";
import FlowBuilderRandomizerModal from "../../components/FlowBuilderRandomizerModal";
import FlowBuilderAddVideoModal from "../../components/FlowBuilderAddVideoModal";
import FlowBuilderSingleBlockModal from "../../components/FlowBuilderSingleBlockModal";
import singleBlockNode from "./nodes/singleBlockNode";
import { colorPrimary } from "../../styles/styles";
import ticketNode from "./nodes/ticketNode";
import { ConfirmationNumber } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  mainPaper: {
    flex: 1,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
    backgroundColor: "#f9fafc",
    overflow: "auto",
    height: "85vh",
    position: "relative",
    ...theme.scrollbarStyles,
  },
  flowTitle: {
    fontWeight: 600,
    color: "#333",
    fontSize: "1rem",
    marginBottom: theme.spacing(1),
  },
  speedDialContainer: {
    position: "absolute",
    left: theme.spacing(2),
    top: theme.spacing(12),
    zIndex: 9999,
  },
  saveButton: {
    textTransform: "none",
    fontWeight: 600,
    padding: theme.spacing(0.75, 2),
    borderRadius: 50,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    fontSize: "0.8rem",
  },
  flowContainer: {
    width: "100%",
    height: "80vh",
    position: "relative",
    borderRadius: theme.spacing(1),
    overflow: "hidden",
    boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.05)",
  },
  flowAlert: {
    position: "absolute",
    top: theme.spacing(2),
    left: "50%",
    transform: "translateX(-50%)",
    padding: theme.spacing(0.5, 2),
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(5px)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    fontSize: "0.75rem",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  toolbarMenu: {
    position: "absolute",
    left: theme.spacing(2),
    top: theme.spacing(8),
    zIndex: 1000,
    backgroundColor: "#fff",
    borderRadius: theme.spacing(1),
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    width: "110px",
  },
  toolbarTitle: {
    fontSize: "0.75rem",
    fontWeight: "bold",
    padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: "#f8f8f8",
    borderBottom: "1px solid #f0f0f0",
    color: "#555",
  },
  toolbarButton: {
    minWidth: "unset",
    width: "110px",
    height: "52px",
    borderRadius: 0,
    padding: theme.spacing(0.8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #f0f0f0",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    "&:last-child": {
      borderBottom: "none",
    }
  },
  toolbarIcon: {
    fontSize: "1.3rem",
    marginBottom: "2px",
  },
  toolbarLabel: {
    fontSize: "0.7rem",
    lineHeight: 1.1,
    whiteSpace: "normal",
    textAlign: "center",
    maxWidth: "100%",
    overflow: "hidden",
    padding: "0 2px"
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  fullscreenTip: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.75rem",
    color: "#666",
    backgroundColor: "#f0f0f0",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    }
  },
  keyboardKey: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "3px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    padding: "1px 4px",
    marginLeft: "4px",
    fontSize: "0.7rem",
    fontWeight: "bold",
  },
}));

function geraStringAleatoria(tamanho) {
  var stringAleatoria = "";
  var caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < tamanho; i++) {
    stringAleatoria += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  return stringAleatoria;
}

const nodeTypes = {
  message: messageNode,
  start: startNode,
  condition: conditionNode,
  menu: menuNode,
  interval: intervalNode,
  img: imgNode,
  audio: audioNode,
  randomizer: randomizerNode,
  video: videoNode,
  singleBlock: singleBlockNode,
  ticket: ticketNode
};

const edgeTypes = {
  buttonedge: RemoveEdge
};

const initialNodes = [
  {
    id: "1",
    position: { x: 250, y: 100 },
    data: { label: "Inicio do fluxo" },
    type: "start"
  }
];

const initialEdges = [];

export const FlowBuilderConfig = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const storageItems = useNodeStorage();

  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [dataNode, setDataNode] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [modalAddText, setModalAddText] = useState(null);
  const [modalAddInterval, setModalAddInterval] = useState(false);
  const [modalAddCondition, setModalAddCondition] = useState(null);
  const [modalAddMenu, setModalAddMenu] = useState(null);
  const [modalAddImg, setModalAddImg] = useState(null);
  const [modalAddAudio, setModalAddAudio] = useState(null);
  const [modalAddRandomizer, setModalAddRandomizer] = useState(null);
  const [modalAddVideo, setModalAddVideo] = useState(null);
  const [modalAddSingleBlock, setModalAddSingleBlock] = useState(null);
  const [modalAddTicket, setModalAddTicket] = useState(null)

  const connectionLineStyle = { stroke: "#2b2b2b", strokeWidth: "6px" };

  const addNode = (type, data) => {
    const posY = nodes[nodes.length - 1].position.y;
    const posX =
      nodes[nodes.length - 1].position.x + nodes[nodes.length - 1].width + 40;
    if (type === "start") {
      return setNodes(old => {
        return [
        //  ...old.filter(item => item.id !== "1"),
          {
            id: "1",
            position: { x: posX, y: posY },
            data: { label: "Inicio do fluxo" },
            type: "start"
          }
        ];
      });
    }
    if (type === "text") {
      return setNodes(old => {
        return [
          ...old,
          {
            id: geraStringAleatoria(30),
            position: { x: posX, y: posY },
            data: { label: data.text },
            type: "message"
          }
        ];
      });
    }
    if (type === "interval") {
      return setNodes(old => {
        return [
          ...old,
          {
            id: geraStringAleatoria(30),
            position: { x: posX, y: posY },
            data: { label: `Intervalo ${data.sec} seg.`, sec: data.sec },
            type: "interval"
          }
        ];
      });
    }
    if (type === "condition") {
      return setNodes(old => {
        return [
          ...old,
          {
            id: geraStringAleatoria(30),
            position: { x: posX, y: posY },
            data: {
              key: data.key,
              condition: data.condition,
              value: data.value
            },
            type: "condition"
          }
        ];
      });
    }
    if (type === "menu") {
      return setNodes(old => {
        return [
          ...old,
          {
            id: geraStringAleatoria(30),
            position: { x: posX, y: posY },
            data: {
              message: data.message,
              arrayOption: data.arrayOption
            },
            type: "menu"
          }
        ];
      });
    }
    if (type === "img") {
      return setNodes(old => {
        return [
          ...old,
          {
            id: geraStringAleatoria(30),
            position: { x: posX, y: posY },
            data: { url: data.url },
            type: "img"
          }
        ];
      });
    }
    if (type === "audio") {
      return setNodes(old => {
        return [
          ...old,
          {
            id: geraStringAleatoria(30),
            position: { x: posX, y: posY },
            data: { url: data.url, record: data.record },
            type: "audio"
          }
        ];
      });
    }
    if (type === "randomizer") {
      return setNodes(old => {
        return [
          ...old,
          {
            id: geraStringAleatoria(30),
            position: { x: posX, y: posY },
            data: { percent: data.percent },
            type: "randomizer"
          }
        ];
      });
    }
    if (type === "video") {
      return setNodes(old => {
        return [
          ...old,
          {
            id: geraStringAleatoria(30),
            position: { x: posX, y: posY },
            data: { url: data.url },
            type: "video"
          }
        ];
      });
    }
    if (type === "singleBlock") {
      return setNodes(old => {
        return [
          ...old,
          {
            id: geraStringAleatoria(30),
            position: { x: posX, y: posY },
            data: { ...data },
            type: "singleBlock"
          }
        ];
      });
    }

    if (type === "ticket") {
      return setNodes(old => {
        return [
          ...old,
          {
            id: geraStringAleatoria(30),
            position: { x: posX, y: posY },
            data: { ...data },
            type: "ticket"
          }
        ];
      });
    }


  };

  const textAdd = data => {
    addNode("text", data);
  };

  const intervalAdd = data => {
    addNode("interval", data);
  };

  const conditionAdd = data => {
    addNode("condition", data);
  };

  const menuAdd = data => {
    addNode("menu", data);
  };

  const imgAdd = data => {
    addNode("img", data);
  };

  const audioAdd = data => {
    addNode("audio", data);
  };

  const randomizerAdd = data => {
    addNode("randomizer", data);
  };

  const videoAdd = data => {
    addNode("video", data);
  };

  const singleBlockAdd = data => {
    addNode("singleBlock", data);
  };

  const ticketAdd = data => {
    addNode("ticket", data)
  }

  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      const fetchContacts = async () => {
        try {
          const { data } = await api.get(`/flowbuilder/flow/${id}`);
          if (data.flow.flow !== null) {
            setNodes(data.flow.flow.nodes);
            setEdges(data.flow.flow.connections);
          }
          setLoading(false);
        } catch (err) {
          toastError(err);
        }
      };
      fetchContacts();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [id]);

  useEffect(() => {
    if (storageItems.action === "delete") {
      setNodes(old => old.filter(item => item.id !== storageItems.node));
      setEdges(old => {
        const newData = old.filter(item => item.source !== storageItems.node);
        const newClearTarget = newData.filter(
          item => item.target !== storageItems.node
        );
        return newClearTarget;
      });
      storageItems.setNodesStorage("");
      storageItems.setAct("idle");
    }
    if (storageItems.action === "duplicate") {
      const nodeDuplicate = nodes.filter(
        item => item.id === storageItems.node
      )[0];
      const maioresX = nodes.map(node => node.position.x);
      const maiorX = Math.max(...maioresX);
      const finalY = nodes[nodes.length - 1].position.y;
      const nodeNew = {
        ...nodeDuplicate,
        id: geraStringAleatoria(30),
        position: {
          x: maiorX + 240,
          y: finalY
        },
        selected: false,
        style: { backgroundColor: "#555555", padding: 0, borderRadius: 8 }
      };
      setNodes(old => [...old, nodeNew]);
      storageItems.setNodesStorage("");
      storageItems.setAct("idle");
    }
  }, [storageItems.action]);

  const loadMore = () => {
    setPageNumber(prevState => prevState + 1);
  };

  const handleScroll = e => {
    if (!hasMore || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - (scrollTop + 100) < clientHeight) {
      loadMore();
    }
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    params => setEdges(eds => addEdge(params, eds)),
    [setEdges]
  );

  const saveFlow = async () => {
    await api
      .post("/flowbuilder/flow", {
        idFlow: id,
        nodes: nodes,
        connections: edges
      })
      .then(res => {
        toast.success("Fluxo salvo com sucesso");
      });
  };

  const doubleClick = (event, node) => {
    console.log("NODE", node);
    setDataNode(node);
    if (node.type === "message") {
      setModalAddText("edit");
    }
    if (node.type === "interval") {
      setModalAddInterval("edit");
    }
    if (node.type === "condition") {
      setModalAddCondition("edit");
    }
    if (node.type === "menu") {
      setModalAddMenu("edit");
    }
    if (node.type === "img") {
      setModalAddImg("edit");
    }
    if (node.type === "audio") {
      setModalAddAudio("edit");
    }
    if (node.type === "randomizer") {
      setModalAddRandomizer("edit");
    }
    if (node.type === "singleBlock") {
      setModalAddSingleBlock("edit");
    }
    if (node.type === "ticket") {
      setModalAddTicket("edit")
    }
  };

  const clickNode = (event, node) => {
    setNodes(old =>
      old.map(item => {
        if (item.id === node.id) {
          return {
            ...item,
            style: { backgroundColor: "#111416", padding: 1, borderRadius: 8 }
          };
        }
        return {
          ...item,
          style: { backgroundColor: "#13111C", padding: 0, borderRadius: 8 }
        };
      })
    );
  };
  const clickEdge = (event, node) => {
    setNodes(old =>
      old.map(item => {
        return {
          ...item,
          style: { backgroundColor: "#13111C", padding: 0, borderRadius: 8 }
        };
      })
    );
  };

  const updateNode = dataAlter => {
    console.log('DATA ALTER', dataAlter)
    setNodes(old =>
      old.map(itemNode => {
        if (itemNode.id === dataAlter.id) {
          return dataAlter;
        }
        return itemNode;
      })
    );
    setModalAddText(null);
    setModalAddInterval(null);
    setModalAddMenu(null);
  };

  const actions = [
    {
      icon: (
        <RocketLaunch
          sx={{
            color: "#3ABA38"
          }}
        />
      ),
      name: "Inicio",
      type: "start"
    },
    {
      icon: (
        <LibraryBooks
          sx={{
            color: "#EC5858"
          }}
        />
      ),
      name: "Conteúdo",
      type: "content"
    },
    {
      icon: (
        <DynamicFeed
          sx={{
            color: "#683AC8"
          }}
        />
      ),
      name: "Menu",
      type: "menu"
    },
    {
      icon: (
        <CallSplit
          sx={{
            color: "#1FBADC"
          }}
        />
      ),
      name: "Randomizador",
      type: "random"
    },
    {
      icon: (
        <AccessTime
          sx={{
            color: "#F7953B"
          }}
        />
      ),
      name: "Intervalo",
      type: "interval"
    },
    {
      icon: (
        <ConfirmationNumber
          sx={{
            color: "#F7953B"
          }}
        />
      ),
      name: "Ticket",
      type: "ticket"
    }
  ];

  const clickActions = type => {
    switch (type) {
      case "start":
        addNode("start");
        break;
      case "menu":
        setModalAddMenu("create");
        break;
      case "content":
        setModalAddSingleBlock("create");
        break;
      case "random":
        setModalAddRandomizer("create");
        break;
      case "interval":
        setModalAddInterval("create");
        break;
      case "ticket":
        setModalAddTicket("create")
      default:
    }
  };

  return (
    <Stack sx={{ height: "100vh" }}>
      <MainHeader>
        <div className={classes.titleContainer}>
          <Title>Desenhe seu fluxo</Title>
          <div 
            className={classes.fullscreenTip}
            onClick={() => {
              toast.info("Pressione F11 para alternar entre o modo tela cheia");
            }}
          >
            <span>Tela cheia</span>
            <span className={classes.keyboardKey}>F11</span>
          </div>
        </div>
      </MainHeader>

      {/* Modals */}
      <FlowBuilderAddTextModal
        open={modalAddText}
        onSave={textAdd}
        data={dataNode}
        onUpdate={updateNode}
        close={setModalAddText}
      />
      <FlowBuilderIntervalModal
        open={modalAddInterval}
        onSave={intervalAdd}
        data={dataNode}
        onUpdate={updateNode}
        close={setModalAddInterval}
      />
      <FlowBuilderConditionModal
        open={modalAddCondition}
        onSave={conditionAdd}
        data={dataNode}
        onUpdate={updateNode}
        close={setModalAddCondition}
      />
      <FlowBuilderMenuModal
        open={modalAddMenu}
        onSave={menuAdd}
        data={dataNode}
        onUpdate={updateNode}
        close={setModalAddMenu}
      />
      <FlowBuilderAddImgModal
        open={modalAddImg}
        onSave={imgAdd}
        data={dataNode}
        onUpdate={updateNode}
        close={setModalAddImg}
      />
      <FlowBuilderAddAudioModal
        open={modalAddAudio}
        onSave={audioAdd}
        data={dataNode}
        onUpdate={updateNode}
        close={setModalAddAudio}
      />
      <FlowBuilderRandomizerModal
        open={modalAddRandomizer}
        onSave={randomizerAdd}
        data={dataNode}
        onUpdate={updateNode}
        close={setModalAddRandomizer}
      />
      <FlowBuilderAddVideoModal
        open={modalAddVideo}
        onSave={videoAdd}
        data={dataNode}
        onUpdate={updateNode}
        close={setModalAddVideo}
      />
      <FlowBuilderSingleBlockModal
        open={modalAddSingleBlock}
        onSave={singleBlockAdd}
        data={dataNode}
        onUpdate={updateNode}
        close={setModalAddSingleBlock}
      />
      <FlowBuilderTicketModal
        open={modalAddTicket}
        onSave={ticketAdd}
        data={dataNode}
        onUpdate={updateNode}
        close={setModalAddTicket}
      />

      {!loading ? (
        <Paper
          className={classes.mainPaper}
          variant="outlined"
          onScroll={handleScroll}
        >
          {/* Header com título e botão de salvar */}
          <div className={classes.headerContainer}>
            <Typography variant="h5" className={classes.flowTitle}>
              Construa seu fluxo de conversa
            </Typography>
            
            <Button
              variant="contained"
              color="primary"
              className={classes.saveButton}
              onClick={saveFlow}
              startIcon={<i className="fas fa-save" />}
            >
              Salvar
            </Button>
          </div>

          {/* Alerta para salvar */}
          <div className={classes.flowAlert}>
            <i className="fas fa-info-circle" style={{ color: "#3f51b5" }} />
            <Typography variant="body2" style={{ fontWeight: 500 }}>
              Não se esqueça de salvar seu fluxo!
            </Typography>
          </div>

          {/* Canvas do React Flow */}
          <div className={classes.flowContainer}>
            {/* Menu de ferramentas lateral */}
            <div className={classes.toolbarMenu}>
              <div className={classes.toolbarTitle}>Ferramentas</div>
              {actions.map((action) => (
                <Button
                  key={action.name}
                  className={`${classes.toolbarButton} toolbarButton`}
                  onClick={() => clickActions(action.type)}
                  title={action.name}
                  style={{ 
                    color: action.icon.props.sx?.color || 'inherit' 
                  }}
                >
                  {React.cloneElement(action.icon, {
                    className: classes.toolbarIcon,
                    style: { 
                      color: action.icon.props.sx?.color || 'inherit',
                      fontSize: "1.3rem" 
                    }
                  })}
                  <span className={classes.toolbarLabel}>{action.name}</span>
                </Button>
              ))}
            </div>
            
            <ReactFlow
              nodes={nodes}
              edges={edges}
              deleteKeyCode={["Backspace", "Delete"]}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeDoubleClick={doubleClick}
              onNodeClick={clickNode}
              onEdgeClick={clickEdge}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              connectionLineStyle={{
                stroke: "#2b2b2b",
                strokeWidth: "2px", 
                strokeDasharray: "4,4", 
                animation: "flowAnimation 1s infinite linear"
              }}
              style={{
                backgroundColor: "#f9fafc",
                backgroundImage: "radial-gradient(#e0e0e0 0.5px, transparent 0.5px)",
                backgroundSize: "15px 15px"
              }}
              edgeTypes={edgeTypes}
              defaultEdgeOptions={{
                style: { stroke: "#555", strokeWidth: "2px" },
                animated: true
              }}
            >
              <Controls 
                style={{
                  borderRadius: "6px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  transform: "scale(0.8)",
                  transformOrigin: "bottom right"
                }}
              />
              <MiniMap 
                style={{
                  borderRadius: "6px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  width: 100,
                  height: 80
                }}
                nodeColor={(node) => {
                  switch (node.type) {
                    case 'start':
                      return '#4CAF50';
                    case 'condition':
                      return '#FFC107';
                    case 'randomizer':
                      return '#1FBADC';
                    case 'menu':
                      return '#683AC8';
                    default:
                      return '#E0E0E0';
                  }
                }}
              />
              <Background 
                variant="dots" 
                gap={10} 
                size={0.5} 
                color="#e0e0e0" 
              />
            </ReactFlow>
          </div>
        </Paper>
      ) : (
        <Stack justifyContent={"center"} alignItems={"center"} height={"70vh"}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="body1" style={{ marginTop: "16px" }}>
            Carregando seu fluxo...
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};