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
        data: { label: 'dag_run' },
    },
    {
        id: 'node-2',
        // type: 'output',
        targetPosition: 'left',
        sourcePosition: 'right',

        position: { x: 0, y: 200 },
        data: { label: 'node 2' },
    },
    {
        id: 'node-3',
        type: 'output',
        // targetPosition: 'right',
        position: { x: 200, y: 200 },
        data: { label: 'tonghopdagrun' },
    },
];

const initialEdges = [
    { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
    { id: 'edge-2', source: 'node-2', target: 'node-3', sourceHandle: 'b' },
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

function DagGraph() {
    const location = useLocation()
    const formQuery = location.state?.formQuery

    console.log(formQuery)
    var initialNodes1 = [];
    var initialEdges1 = [];
    // initialNodes1 = formQuery.map((item, id) => {

    //     let list_source = item.listsourcetable.split(',')
    //     list_source = list_source.map(subItem => {
    //         return {
    //             id: id,
    //             type: 'input',
    //             targetPosition: 'right',
    //             data: { label: subItem },
    //         }
    //     })

    //     let middle_node = item.queryname
    // })

    initialEdges1 = formQuery.map(item => {
        // console.log('item',item)

        let list_source = item.listsourcetable.split(',')
        list_source =  list_source.map(subItem => {
            return {
                id: subItem,
                source: subItem,
                target: item?.queryname,
                sourceHandle: subItem
            }
        })

        let target = {
            id: item?.queryname,
            source: item?.queryname,
            target: item?.targettable,
            sourceHandle: item?.queryname
        }
        return [...list_source,target]
    })

    for (var i = 0; i < formQuery.length; i++) {
        let data = formQuery[i]

        console.log('data',data)
        
        let list_source = data.listsourcetable.split(',')
        for (var j = 0; j < list_source.length; j++) {
            initialNodes1.push({
                id: list_source[j],
                // type: 'input',
                sourcePosition: 'right',
                position: { x: (i)*200, y: (i+j)*100 },
                data: { label: list_source[j] },
            })
            
        }

        initialNodes1.push({
            id: data.queryname,
            
            // type: 'output',
            sourcePosition: 'right',
            targetPosition: 'left',
            position: { x: (i+1)*200, y: 100*i },
            data: { label: `task_${data.queryname}` },
            style:{
                color:'black',
                backgroundColor:'yellow',
                width: '200px'
            }
        })

        initialNodes1.push({
            id: data.targettable,
            // type: 'output',
            sourcePosition: 'right',
            targetPosition: 'left',
            position: { x: (i+1)*270, y: 100*i },
            data: { label: data.targettable },
        })


    }
    console.log('initialNodes1',initialNodes1.flat())
    console.log('initialEdges1',initialEdges1.flat())

    const [nodes, setNodes] = useState(initialNodes1.flat());
    const [edges, setEdges] = useState(initialEdges1.flat());

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