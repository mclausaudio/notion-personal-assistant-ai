import React, { Component } from 'react'

import Layout from '../layout/Layout';
import UserInputSection from '../components/inputs/UserInputSection'


const Homepage = () => {
  return (
    <Layout>
        <div className="container">
        <div className="row">
          <div className="col-md-6">
            <UserInputSection />
          </div>
          <div className="pt-5 pt-md-0 col-md-6">
            <h2>How it works</h2>
            <p>This tool integrates with an existing Notion database and utilizes OpenAI's LLM to summarize, categorize, prioritize and suggest a due date on a given text input, then write it to the database.  As you go through your day, type whatever comes to your mind (reminders, thoughts, ideas, tasks and todo items, etc.) and the LLM takes care of the rest.</p>
            <p>Here's a simple step-by-step guide to getting started.</p>
            <p className="small"><em>Note: You will need access to the GPT-4 API to use this.</em></p>
            <h5>Step 1: Create a Notion database.</h5>
            <p>You will first need to create a new Notion database with the following properties:</p>
            <ul>
              <li>Title (Text)</li>
              <li>Due Date (Date)</li>
              <li>Category (Select)</li>
              <li>Priority (Select)</li>
              <li>Sentiment (Select)</li>
            </ul>
            <p>You can read more about database properties <a href="https://www.notion.so/help/database-properties" target="_blank" rel="noopener noreferrer">here</a>.</p>
            <h5>Step 2: Create a Notion integration.</h5>
            <p>Now you will need to create a Notion integration to acquire API Keys and then give the share database access with the integration.  You can learn more about that <a href="https://developers.notion.com/docs/create-a-notion-integration" target="_blank" rel="noopener noreferrer">here</a>.</p>
            <h5>Step 3: Add your API Keys in the "Settings" tab.</h5>
            <p>Now you will need to add your API keys and database ID to the setting.  You can can learn how to get your database ID <a href="https://developers.notion.com/reference/retrieve-a-database" target="_blank" rel="noopener noreferrer">here</a>.</p>
            <p className="small"><em>Note: You can optionally save these keys in local storage so you don't have to reinput them every time you visit the page.  This is not the most secure method of storing keys, but works for this demo.  Be sure to clear your local storage after each working session.</em></p>
            <h5>Step 4: Start using the tool!</h5>
            <p>You're all set.  Simply input your thoughts, ideas, and todos into the input field and let OpenAI's LLM do the rest.  It will categorize and prioritize your input and suggest a due date.</p>
            <p>Learn more about this project here.</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Homepage;