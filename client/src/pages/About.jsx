import Layout from '../layout/Layout';

const About = () => {
  return (
    <Layout>
        <div className="container">
         <div className="row">
          <div className="col-md-6 mx-auto">
            <h2 className="text-center">About</h2>
            <p>Hello!  My name is <a href="https://www.linkedin.com/in/mclausaudio/" target="_blank" rel="noopener noreferrer">Michael Claus</a>.  I'm a software engineer based in San Francisco, CA.  I'm a huge fan of <a href="https:/www.notion.so" target="_blank" rel="noopener noreferrer">Notion</a>, and I use it for everything from my personal to-do lists and journal, to managing my professional projects.  I thought it would be fun to create a tool that would help me streamline my Notion workflow by creating a "catch all" brain-dump layer for Notion.  I figured this would be a great opportunity to use <a href="https://openai.com/" target="_blank" rel="noopener noreferrer">OpenAI</a>'s LLMs and thus, this project was born!</p>
            <p className="text-center">
            <a role="button" className="btn btn-outline-secondary" href="https://github.com/mclausaudio/notion-personal-assistant-ai" target="_blank" rel="noopener noreferrer">View the code on GitHub</a>
            </p>
            <p>My goal for building this project was to gain experience building with LLMs.  The app employs <a href="https://js.langchain.com/docs/" target="_blank" rel="noopener noreferrer">LangChain</a> to create a prompt and make an API call to OpenAI's LLM.  LangChain makes developing with OpenAI's LLMs very easy.  I especially enjoyed working with some of the library's prompting tools, although I found writing the actual prompt itself to be tricky and require lots of tweaking.</p>
            <p>One challenge I faced was getting the model to provide a predictable output that I could consistently work with programmatically. I would have a prompt dialed in that was getting a predictable output, then the next day suddenly the LLM would return something new! Rather than trying to get the model to return JSON (it struggled with this), I decided to have it split up the data with pipes <code>|</code> and then split the string to create an array.  You can see my solution around <a href="https://github.com/mclausaudio/notion-personal-assistant-ai/blob/main/server/controllers/modelController.js#L24" target="_blank" rel="noopener noreferrer">this</a> line of code.  I also had to check and sanitize the output of the LLM with JavaScript.</p>
            <p>This app is a simple React + ExpressJS app and is deployed to AWS EC2, CloudFront, s3, Route53 and API Gateway.</p>
            <p>I learned a lot while building this project and I have lots of ideas of how I can extend it.  If you have any ideas or suggestions, please feel free to reach out to me on <a href="https://www.linkedin.com/in/mclausaudio/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
            <p>I hope you enjoy using this tool as much as I enjoyed building it!</p>
            <p className="small"><em>Note: I am not affiliated with Notion in any way.  I'm just an enthusiastic user who happens to enjoy programming</em> 🤓😁</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About;