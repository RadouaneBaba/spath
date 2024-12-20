import { useState } from "react";

export default function CustomModal({ data, updateGraph, hideModal }) {
    const [nodeLabel, setNodeLabel] = useState('');
    const [edgeLabel, setEdgeLabel] = useState('1');
    const handleModal = () => {
        if (!data) return;
        if (data.mode == 'addNode') {
            data.nodeData.label = nodeLabel != '' ? nodeLabel : 'new node';
            data.callback(data.nodeData);
        } else if (data.mode == 'addEdge') {
            data.edgeData.id = data.edgeData.from + '-' + data.edgeData.to;
            data.edgeData.label = edgeLabel;
            data.edgeData.arrows = 'to';
            data.callback(data.edgeData);
        } else {
            data.callback(null);
        }
        hideModal();
        updateGraph();
    };
    return (
        <>
            <div>
                <div className="fixed inset-0 z-40 bg-slate-950 bg-opacity-80"
                    onClick={() => hideModal()}>
                </div>
            </div>
            <div id="customModal" className="overflow-y-auto overflow-x-hidden fixed top-24 left-1/2 transform -translate-x-1/2 z-50 flex justify-center items-center">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative shadow p-4 rounded-lg bg-white">
                        {data.mode == 'errSame' && (<div>
                            <h2 className="p-4 text-red-500">Erreur: un arc ne peut pas se connecter au meme noeud</h2>
                        </div>)}
                        {data.mode == 'addNode' && (<div>
                            <h1 className="font-bold text-xl mt-2">Ajouter un sommet</h1>
                            
                            <input className="p-2 w-80 my-6 border-2 border-gray-500 focus:outline-none focus:border-indigo-500 rounded-lg"
                            type="text" autoFocus placeholder="Nouveau sommet" value={nodeLabel} onChange={(e) => setNodeLabel(e.target.value)}/>
                        </div>)}
                        {data.mode == 'addEdge' && (<div>
                            <h1 className="font-bold text-xl mt-2">Ajouter un arc</h1>
                            <input className="p-2 w-80 my-6 border-2 border-gray-500 focus:outline-none focus:border-indigo-500 rounded-lg"
                            autoFocus type="number" placeholder="1" value={edgeLabel} onChange={(e) => setEdgeLabel(e.target.value)} />
                        </div>)}
                        
                        <div className="text-right">
                            <button onClick={handleModal} className="text-gray-50 bg-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-indigo-700">Confirmer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}