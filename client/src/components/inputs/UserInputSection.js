import React, { Component } from 'react'
import fetch from 'node-fetch'

import api from '../../utils/api';

import UserInputField from './UserInputField'
import OutputArea from './OutputArea'

class UserInputSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      apiResponse: {
        code: 0,
        status: '',
        data: {
          message: '',
          category: '',
          sentiment: '',
          priority: '',
          title: ''
        }
      },
      openAIKey: '',
      notionKey: '',
      databaseId: ''
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearInputText = this.clearInputText.bind(this);
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

  clearInputText = () => {
    this.setState(() => ({ userInput: '' }));
  };

  handleSubmit = async () => {
    const { userInput, openAIKey, notionKey, databaseId } = this.state;
    const payload = { userInput, openAIKey, notionKey, databaseId };
    try{
      let res = await api.processAndSubmitToNotion(payload);
      console.log('res', res);
      this.setState({ apiResponse: res, userInput: '' });
    } catch (error) {
      console.log(error);
      this.setState({ apiResponse: error, userInput: ''});
    }
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
    const { userInput, apiResponse, openAIKey, notionKey, databaseId } = this.state;

    return (
      <section className="row">
        <div className="col-md-8">
          <h2>Input</h2>
          <UserInputField type="textarea" value={userInput} handleChange={(e) => { this.handleTextChange(e, 'userInput') }} />
          <button type="button" className="btn btn-primary my-3" onClick={this.handleSubmit}>Run</button>
          <button type="button" className="btn btn-outline-secondary mx-3" onClick={this.clearInputText}>Clear</button>
          <p>Output:</p>
          <OutputArea response={apiResponse}/>
        </div>
        <div className="col-md-4">
          <h3>Settings:</h3>
          <div className="accordion" id="settingsAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  OpenAI
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#settingsAccordion">
                <div className="accordion-body">
                  <p>API Key</p>
                  <UserInputField type="password" value={openAIKey} handleChange={(e) => { this.handleTextChange(e, 'openAIKey') }} />
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Notion
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#settingsAccordion">
                <div className="accordion-body">
                  <p>API Key</p>
                  <UserInputField type="password" value={notionKey} handleChange={(e) => { this.handleTextChange(e, 'notionKey') }} />
                  <p>Database ID</p>
                  <UserInputField type="text" value={databaseId} handleChange={(e) => { this.handleTextChange(e, 'databaseId') }} />
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Local Storage
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#settingsAccordion">
                <div className="accordion-body">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => { this.saveToLocalStorage() }}>Save keys in local storage</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => { this.clearLocalStorage() }}>Clear local storage</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UserInputSection;



//  A Task is an actionable item or specific activity that a person intends to complete within a month timeframe, often with a specific objective or outcome in mind.Tasks can be assigned priorities, have deadlines, and may be part of a larger project or goal.
//     A Thought is an idea, reflection, or mental impression that arises spontaneously or as a result of contemplation or external stimuli.Thoughts can be abstract, subjective, or related to personal experiences, and may not necessarily require immediate action or have a specific goal attached.Thoughts can be ideas for future or current projects, goals, or tasks, or they can be reflections on past experiences or events.