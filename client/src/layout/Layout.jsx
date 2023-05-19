// Layout.js
import React from 'react';

const Layout = ({ children }) => (
  <div>
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <svg className="bi me-2" width="40" height="32"><use href="#bootstrap"></use></svg>
            <span className="fs-4">AI</span>
        </a>
        <ul className="nav nav">
            <li className="nav-item"><a href="/" className="nav-link active" aria-current="page">Home</a></li>
            <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
        </ul>
    </header>
    <div className="container">
    <div className="row mb-4">
                <div className="text-center">
                  <h1 className="display-5 fw-bold text-body-emphasis">Notion Personal Assistant AI</h1>
                    {/* <div className="col-lg-6 mx-auto">
                      <p className="lead mb-4">Streamline your thoughts and tasks for your Notion todo lists with our intelligent productivity tool. Prioritize and categorize your inputs, creating a clear roadmap for your personal, social, and professional life.</p>
                      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <a type="button" className="btn btn-primary btn-lg px-4 gap-3">Get started</a>
                        <a type="button" className="btn btn-outline-secondary btn-lg px-4" href="https://github.com/mclausaudio/notion-personal-assistant-ai" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                      </div>
                  </div> */}
                </div>
              </div>
              {/* End Hero */}
              <hr className="mt-0" />
    </div>
    <main style={{minHeight: "90vh"}}>
      {children}  {/* main content will be injected here */}
    </main>
    <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-12 text-center">
                <p className="mb-3 mb-md-0 text-body-secondary">Made by <a href="https://www.linkedin.com/in/mclausaudio/" target="_blank" rel="noopener noreferrer">Michael Claus</a> ✌🏼</p>
            </div>
        </footer>
    </div>
  </div>
);

export default Layout;