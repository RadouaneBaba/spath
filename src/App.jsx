import { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network/standalone';
import CustomModal from './components/CustomModal';
import AlgorithmPanel from './components/AlgorithmPanel';
import InputModal from './components/InputModal';
import designOptions from './options';

function App() {
  const graphRef = useRef(null);
  const networkRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [dest, setDest] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [distDisplay, setDistDisplay] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [time, setTime] = useState(0);
  const [graphText, setGraphText] = useState("");
  const [toggleOpt, setToggleOpt] = useState(false);
  const [data, setData] = useState({
    nodes: [],
    edges: [],
  });

  const srcOptions = data ? data.nodes.map(op => ({ value: op.id, label: op.label })) : [];

  const highlightEdge = (edgeId, color) => {
    if (networkRef.current) {
      const edge = networkRef.current.body.edges[edgeId];
      if (edge) {
        networkRef.current.body.data.edges.update({ id: edgeId, color: { color } });
      }
    }
  };

  const handleText = () => {
    setToggleOpt(false);
    if (graphText == "") return;
    const edgesin = [];
    const v = [];
    const edgesStr = graphText.split('\n');
    for (let edge of edgesStr) {
      const line = edge.split(':');
      if (!v.includes(line[0])) v.push(line[0]);
      if (!v.includes(line[1])) v.push(line[1]);
      edgesin.push(line);
    }
    const nodes = [];
    const edges = [];
    for (let i = 0; i < v.length; i++) {
      nodes.push({
        id: i,
        label: v[i],
      });
    }
    for (let edge of edgesin) {
      let a = v.indexOf(edge[0]);
      let b = v.indexOf(edge[1]);
      edges.push({
        from: a,
        to: b,
        id: a + "-" + b,
        label: edge[2],
        arrows: "to",
      });
    }
    setData({nodes:nodes, edges:edges});
  };

  const bellmanFord = async (V, edges, src) => {
    let dist = new Array(V).fill(1e8);
    let history = new Array(V);
    const saved_path = [];
    dist[src] = 0;

    for (let i = 0; i < V; i++) {
      for (let edge of edges) {
        const [u, v, wt] = edge;
        const edgeId = `${u}-${v}`;

        highlightEdge(edgeId, '#FFFF00');
        await new Promise(res => setTimeout(res, 1000 - speed * 10));
        if (saved_path.includes(edge)) highlightEdge(edgeId, '#00FF00');
        if (dist[u] !== 1e8 && dist[u] + wt < dist[v]) {
          if (i === V - 1) {
            console.log("cycle negatif detecté");
            return [-1, -1];
          }

          history[v] = history[u] ? [...history[u], v] : [u, v];
          dist[v] = dist[u] + wt;
          highlightEdge(edgeId, '#00FF00');
          saved_path.push(edge);
        }
        if (!saved_path.includes(edge)) highlightEdge(edgeId, '#3498db');

      }
    }
    return [dist, history];
  };

  const handleBellman = async () => {
    if (!src) return;
    updateGraphState();
    const edges = data.edges.map(e => [e.from, e.to, parseInt(e.label)]);
    let start = Date.now();
    const [dist, history] = await bellmanFord(data.nodes.length, edges, src.value);
    setTime(Date.now() - start);

    if (dist === -1 && history === -1) {
      setDistDisplay([<h2 className="p-4 text-red-500" key={0}>Erreur: cycle negatif</h2>]);
      return;
    }

    const joinVertices = (d, i) => (
      `( ${d.map(e => data.nodes[e].label).join(" -> ")} ) Distance ${dist[dest?.value === -1 ? i : dest.value]}`
    );

    const disHistory = (dest == null || dest.value == -1) ? history : history.filter(e => e[e.length - 1] === dest.value);
    const display = disHistory.map((d, i) => (
      <span key={i}>
        <span className="px-4 py-2 bg-indigo-500 rounded-lg shadow m-2 text-gray-50">
          {data.nodes[src.value].label + " to " + data.nodes[dest?.value === -1 ? i : dest.value].label}
        </span>
        {joinVertices(d, i)}
      </span>
    ));
    setDistDisplay(display);
  };

  useEffect(() => {
    const options = {
      ...designOptions,
      manipulation: {
        enabled: true,
        addNode: (nodeData, callback) => {
          const nodes = networkRef.current.body.data.nodes.get();
          nodeData.id = nodes.length > 0 ? nodes[nodes.length - 1].id + 1 : 0;
          setModalData({ mode: "addNode", nodeData, callback });
        },
        addEdge: (edgeData, callback) => {
          if (edgeData.from === edgeData.to) {
            setModalData({ mode: "errSame", callback });
          } else {
            setModalData({ mode: "addEdge", edgeData, callback });
          }
        },
      },
    };

    networkRef.current = new Network(graphRef.current, data, options);
  }, [data]);

  const updateGraphState = () => {
    if (networkRef.current) {
      const nodes = networkRef.current.body.data.nodes.get();
      const edges = networkRef.current.body.data.edges.get();
      setData({ nodes, edges });
    }
  };

  return (
    <>
      <div className=" bg-gray-100">
        <div className="border border-gray-300 rounded-lg shadow-md m-4 relative">
          <div ref={graphRef} style={{ height: 700 }} className="bg-white"/>
          <button onClick={() => setToggleOpt(true)} className="absolute top-0 right-0 m-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-100 font-bold">Importer</button>
        </div>
        {toggleOpt &&
          <InputModal 
            text={graphText}
            handleGraphText={(e) => setGraphText(e)}
            applyText={handleText}
            handleToggle={() => setToggleOpt(false)}
          />
        }
        <AlgorithmPanel
          src={src}
          srcOptions={srcOptions}
          handleSrc={s => setSrc(s)}
          handleDest={d => setDest(d)}
          handleBellman={handleBellman}
          handleSpeed={(s) => setSpeed(s)}
          speed={speed}
          display={distDisplay}
          time={time}
        />
      </div>
      
      {modalData && <CustomModal data={modalData} updateGraph={updateGraphState} hideModal={() => setModalData(null)} />}
    </>
  );
};

export default App;
