import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';
import { useLocation } from 'react-router';

import TextUpdaterNode from './TextUpdaterNode.js';



const rfStyle = {
    backgroundColor: '#B8CEFF',
};

const initialNodes = [
    {
        id: 'node-1',
        type: 'input',
        sourcePosition: 'right',
        position: { x: 0, y: 100 },
        data: { label: 'node 1' },
    },
    {
        id: 'node-2',
        type: 'input',
        sourcePosition: 'right',
        position: { x: 0, y: 200 },
        data: { label: 'node 2' },
    },
    {
        id: 'node-3',
        type: 'output',
        targetPosition: 'left',
        position: { x: 200, y: 200 },
        data: { label: 'node 3' },
    },
];

const initialEdges = [
    { id: 'edge-1', source: 'node-1', target: 'node-3', sourceHandle: 'a' },
    { id: 'edge-2', source: 'node-2', target: 'node-3', sourceHandle: 'b' },
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

function DagGraph() {
    const location = useLocation()
    console.log(location.state)

    const initialNodes1 = location.state.listsourcetable.map(item => {
        let list_source = item.split(',')
        return list_source.map(subItem =>{
            return {
                id: subItem,
                type: 'input',
                sourcePosition: 'right',
                position: { x: 0, y: 100 },
                data: { label: 'node 1' }
            } 
        })
    })
    console.log(initialNodes1)

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            //   nodeTypes={nodeTypes}
            fitView
            style={rfStyle}
        />
    );
}

export default DagGraph;