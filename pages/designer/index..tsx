import React, { ChangeEvent, FormEvent } from "react";
import "../../app/globals.css";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ELK from 'elkjs/lib/elk.bundled.js';

import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
} from 'reactflow';
 
import 'reactflow/dist/style.css';
const elk = new ELK();
 
const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2', label: 'e1-2'}];

interface ButtonData {
  text: string;
  checkpoint: string;
}

interface Checkpoint {
  name: string;
  text: string;
  buttons: ButtonData[];
}

interface State {
  checkpoints: { [key: string]: Checkpoint };
  possibleProgress: { [key: string]: string[] };
  checkpointsText: string;
  possibleProgressText: string;
  newCheckpointName: string;
  newCheckpointText: string;
  newButtons: ButtonData[];
  nds: Node[];
  eds: Edge[];
}

type QueueItem = {
  name: string;
  depth: number;
  text: string;
};

export default class DesignerPage extends React.Component {
  state: State = {
    checkpoints: {},
    possibleProgress: {},
    checkpointsText: "",
    possibleProgressText: "",
    newCheckpointName: "",
    newCheckpointText: "",
    newButtons: [{ text: "", checkpoint: "" }],
    nds: initialNodes,
    eds: initialEdges,
  };

  constructor(props: React.PropsWithChildren) {
    super(props);
    this.handleCheckpointsChange = this.handleCheckpointsChange.bind(this);
    this.handlePossibleProgressChange = this.handlePossibleProgressChange.bind(this);
    this.generateNodesAndEdges = this.generateNodesAndEdges.bind(this);
    this.onNodesChange = this.onNodesChange.bind(this);
    this.onEdgesChange = this.onEdgesChange.bind(this);
  }

  handleButtonChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newButtons = [...this.state.newButtons];
    const { name, value } = event.target;
    newButtons[index][name as keyof ButtonData] = value;
    this.setState({ newButtons });
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name as keyof State]: value });
  };
  
  handleAddButton = () => {
    this.setState((prevState: State) => ({
      newButtons: [...prevState.newButtons, { text: "", checkpoint: "" }],
    }));
  };

  handleRemoveButton = (index: number) => {
    const newButtons = [...this.state.newButtons];
    newButtons.splice(index, 1);
    this.setState({ newButtons });
  };

  handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { newCheckpointName, newCheckpointText, newButtons } = this.state;

    // Create a deep copy of newButtons
    const copiedButtons = newButtons.map(button => ({ ...button }));

    const newCheckpoint: Checkpoint = {
      text: newCheckpointText,
      buttons: copiedButtons,
      name: newCheckpointName,
    };

    const newPossibleProgress = copiedButtons.map(button => button.checkpoint);

    this.setState((prevState: State) => ({
      checkpoints: { ...prevState.checkpoints, [newCheckpointName]: newCheckpoint },
      possibleProgress: { ...prevState.possibleProgress, [newCheckpointName]: newPossibleProgress },
      // Reset form
      newCheckpointName: "",
      newCheckpointText: "",
      newButtons: [{ text: "", checkpoint: "" }],
    }));
  };

  handleCheckpointsChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newCheckpoints = JSON.parse(event.target.value);
    let newPossibleProgress = this.state.possibleProgress;

    if (Object.keys(newPossibleProgress).length === 0 && newCheckpoints) {
      newPossibleProgress = Object.keys(newCheckpoints).reduce((acc, checkpointName) => {
        const checkpoint = newCheckpoints[checkpointName];
        acc[checkpointName] = checkpoint.buttons.map((button: ButtonData) => button.checkpoint);
        return acc;
      }, {} as { [key: string]: string[] });
    }

    this.setState({
      checkpoints: newCheckpoints,
      checkpointsText: event.target.value,
      possibleProgress: newPossibleProgress,
    });
  }

  handlePossibleProgressChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      possibleProgress: JSON.parse(event.target.value),
      possibleProgressText: event.target.value,
    });
  }

  generateNodesAndEdges = (): { nodes: Node[]; edges: Edge[] } => {
    const { checkpoints } = this.state;
    let nodes: any[] = [];
    let edges: any[] = [];
    const visited = new Set<string>();
    const firstCheckpoint = Object.values(this.state.checkpoints)[0];
    const queue: QueueItem[] = [{
      name: firstCheckpoint ? firstCheckpoint.name : 'A',
      text: firstCheckpoint ? firstCheckpoint.text : 'Example text',
      depth: 0
    }];
    const depthCount: { [key: number]: number } = {};

    while (queue.length > 0) {
      const { name, text, depth } = queue.shift() as QueueItem;
      visited.add(name);

      if (!depthCount[depth]) {
        depthCount[depth] = 0;
      }

      nodes.push({
        id: name,
        position: { x: depthCount[depth] * 200, y: depth * 100 },
        data: { label: text },
      });

      depthCount[depth]++;

      if (checkpoints[name]) {
        checkpoints[name].buttons.forEach(button => {
          if (!visited.has(button.checkpoint)) {
            let text
            if (checkpoints[button.checkpoint]) {
              text = checkpoints[button.checkpoint].text;
            } else {
              text = "Placeholder text";
            }
            queue.push({ name: button.checkpoint, depth: depth + 1, text: text});
            edges.push({
              id: `e${name}-${button.checkpoint}`,
              source: name,
              target: button.checkpoint,
              label: button.text,
            });
          }
        });
      }
    }

    const defaultOptions = {
      'elk.algorithm': 'layered',
      'elk.layered.spacing.nodeNodeBetweenLayers': '100',
      'elk.spacing.nodeNode': '80',
    };

    const graph = {
      id: 'root',
      layoutOptions: {...defaultOptions, ...{ 'elk.algorithm': 'layered', 'elk.direction': 'DOWN' }},
      children: nodes,
      edges: edges,
    };

    elk.layout(graph).then(({ children }:any) => {
      // By mutating the children in-place we saves ourselves from creating a
      // needless copy of the nodes array.
      children.forEach((node:any) => {
        node.position = { x: node.x, y: node.y };
      });
      
      nodes = children;
    });

    return { nodes, edges };
  };

  onNodesChange = (changes: any) => {
    this.setState({ nodes: applyNodeChanges(changes, this.state.nds)});
  }
  onEdgesChange = (changes: any) => {
    this.setState({ eds: applyEdgeChanges(changes, this.state.eds)});
  }

  render(): React.ReactNode {
    const { nodes, edges } = this.generateNodesAndEdges();

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col items-center justify-center text-white">
            <div className="text-4xl font-bold">Designér příběhu</div>
            <br />
            <div style={{ width: '75vw', height: '50vh' }}>
            <ReactFlow
              nodes={nodes}
              onNodesChange={this.onNodesChange}
              edges={edges}
              onEdgesChange={this.onEdgesChange}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
            </div>
            <br />
            <form onSubmit={this.handleFormSubmit}>
              <div className="text-2xl font-bold">Nový checkpoint</div>
              <br />
              <div className="flex space-x-4">
                <Input name="newCheckpointName" value={this.state.newCheckpointName} onChange={this.handleInputChange} placeholder="Checkpoint Name" />
                <Input name="newCheckpointText" value={this.state.newCheckpointText} onChange={this.handleInputChange} placeholder="Checkpoint Text" />
              </div>
              {this.state.newButtons.map((button, index) => (
                <div key={index} className="flex space-x-4">
                  <Input name="text" value={button.text} onChange={(event) => this.handleButtonChange(event, index)} placeholder="Button Text" />
                  <Input name="checkpoint" value={button.checkpoint} onChange={(event) => this.handleButtonChange(event, index)} placeholder="Button Checkpoint" />
                  <Button type="button" onClick={() => this.handleRemoveButton(index)}>Remove Button</Button>
                </div>
              ))}
              <Button type="button" onClick={this.handleAddButton}>Add Button</Button>
              <Button type="submit">Add Checkpoint</Button>
            </form>
            <br />
            <div className="text-2xl font-bold">Checkpoints</div>
            <textarea className="text-black w-full h-32" value={JSON.stringify(this.state.checkpoints)} onChange={this.handleCheckpointsChange} />
            <div className="text-2xl font-bold">Možné pokroky</div>
            <textarea className="text-black w-full h-32" value={JSON.stringify(this.state.possibleProgress)} onChange={this.handlePossibleProgressChange} />
          </div>
        </motion.div>
      </div>
    );
  }
}