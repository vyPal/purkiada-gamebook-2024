import React, { ChangeEvent, FormEvent } from "react";
import "../../app/globals.css";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ButtonData {
  text: string;
  checkpoint: string;
}

interface Checkpoint {
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
}

export default class DesignerPage extends React.Component {
  state: State = {
    checkpoints: {},
    possibleProgress: {},
    checkpointsText: "",
    possibleProgressText: "",
    newCheckpointName: "",
    newCheckpointText: "",
    newButtons: [{ text: "", checkpoint: "" }],
  };

  constructor(props: React.PropsWithChildren) {
    super(props);
    this.update = this.update.bind(this);
    this.handleCheckpointsChange = this.handleCheckpointsChange.bind(this);
    this.handlePossibleProgressChange = this.handlePossibleProgressChange.bind(this);
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

    const newCheckpoint: Checkpoint = {
      text: newCheckpointText,
      buttons: newButtons,
    };

    const newPossibleProgress = newButtons.map(button => button.checkpoint);

    this.setState((prevState: State) => ({
      checkpoints: { ...prevState.checkpoints, [newCheckpointName]: newCheckpoint },
      possibleProgress: { ...prevState.possibleProgress, [newCheckpointName]: newPossibleProgress },
    }), this.update);
  };

  update() {
    this.setState({
      checkpointsText: JSON.stringify(this.state.checkpoints),
      possibleProgressText: JSON.stringify(this.state.possibleProgress),
    });
  }

  handleCheckpointsChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      checkpoints: JSON.parse(event.target.value),
      checkpointsText: event.target.value,
    });
  }

  handlePossibleProgressChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      possibleProgress: JSON.parse(event.target.value),
      possibleProgressText: event.target.value,
    });
  }

  render(): React.ReactNode {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col items-center justify-center text-white">
            <div className="text-4xl font-bold">Designér příběhu</div>
            <br /><br />
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
            <textarea className="text-black w-full h-32" value={this.state.checkpointsText} onChange={this.handleCheckpointsChange} />
            <div className="text-2xl font-bold">Možné pokroky</div>
            <textarea className="text-black w-full h-32" value={this.state.possibleProgressText} onChange={this.handlePossibleProgressChange} />
          </div>
        </motion.div>
      </div>
    );
  }
}