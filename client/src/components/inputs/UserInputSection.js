import React, { Component } from 'react'
import fetch from 'node-fetch'

import api from '../../utils/api';

import UserInputField from './UserInputField'

class UserInputSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      modelOutput: {},
      openAIKey: '',
      notionKey: '',
      databaseId: ''
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let apiKeys = localStorage.getItem('apiKeys');
    apiKeys = JSON.parse(apiKeys);
  
    if (apiKeys) {
      this.setState(() => ({
        openAIKey: apiKeys.openAIKey,
        notionKey: apiKeys.notionKey,
        databaseId: apiKeys.databaseId
      }), () => {
        console.log("state", this.state);
      });
    }
  }

  handleTextChange = (event, stateObjectKey) => {
    event.preventDefault();
    const newState = event.target.value;
    this.setState({ [stateObjectKey]: newState }, () => {
      console.log("state", this.state);
    });
  };

  handleSubmit = async () => {
    const { userInput, openAIKey, notionKey, databaseId } = this.state;
    const payload = { userInput, openAIKey, notionKey, databaseId };
    const res = await api.processAndSubmitToNotion(payload);
    this.setState({ modelOutput: res });
    console.log("state", this.state);
    return res;
  };

  saveToLocalStorage = () => {
    const apiKeysJSON = JSON.stringify({
      openAIKey: this.state.openAIKey,
      notionKey: this.state.notionKey,
      databaseId: this.state.databaseId
    })
    localStorage.setItem('apiKeys', apiKeysJSON);
  }

  clearLocalStorage = () => {
    localStorage.clear();
    this.setState(()=> {
      return {
        openAIKey: '',
        notionKey: '',
        databaseId: ''
      }
    })
  }

  render() {
    const { userInput, modelOutput, openAIKey, notionKey, databaseId } = this.state;
    const jsonOutput = JSON.stringify(modelOutput);
    console.log('that state in render', this.state);
    
    return (
      <div>
        <p>OpenAI API Key</p>
        <UserInputField type="text" value={openAIKey} handleChange={(e) => { this.handleTextChange(e, 'openAIKey') }} />
        <p>Notion API Key</p>
        <UserInputField type="text" value={notionKey} handleChange={(e) => { this.handleTextChange(e, 'notionKey') }} />
        <p>Notion Database ID</p>
        <UserInputField type="text" value={databaseId} handleChange={(e) => { this.handleTextChange(e, 'databaseId') }} />

        <button onClick={() => { this.saveToLocalStorage() }}>Save keys in local storage</button>
        <button onClick={() => { this.clearLocalStorage() }}>Clear local storage</button>


        <p>Input:</p>
        <UserInputField type="text" value={userInput} handleChange={(e) => { this.handleTextChange(e, 'userInput') }}/>
        <button onClick={this.handleSubmit}>Run</button>
        <p>Output:</p>
        <p>{jsonOutput}</p>
      </div>
    )
  }
}

export default UserInputSection;



//  A Task is an actionable item or specific activity that a person intends to complete within a month timeframe, often with a specific objective or outcome in mind.Tasks can be assigned priorities, have deadlines, and may be part of a larger project or goal.
//     A Thought is an idea, reflection, or mental impression that arises spontaneously or as a result of contemplation or external stimuli.Thoughts can be abstract, subjective, or related to personal experiences, and may not necessarily require immediate action or have a specific goal attached.Thoughts can be ideas for future or current projects, goals, or tasks, or they can be reflections on past experiences or events.