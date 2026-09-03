import React, { useState } from 'react';
import './CodelabTabs.css';

const CodelabTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const colabNotebookUrl = "https://drive.google.com/file/d/1lSESLRKRQinlv5loS7IagFkmoc5pt6_j/view?usp=sharing";
    const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Error copying text: ', err);
      });
  };

  const renderCopyButton = (text) => (
    <button className="copy-button" onClick={() => handleCopy(text)}>
      Copy
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M3 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM2 7a1 1 0 011-1h7a1 1 0 110 2H3a1 1 0 01-1-1zM4 10a1 1 0 011-1h5a1 1 0 110 2H5a1 1 0 01-1-1zM3 13a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"/></svg>
      <span className="copy-tooltip">Copied!</span>
    </button>
  );
  
// Update the tabs array in your CodelabTabs component with this new content:

const tabs = [
  {
    title: "Foundations",
    subtitle: "Colab, Firebase & GCP",
    duration: "10 mins",
    content: (
      <div className="tab-content">
        <h3>🎯 Goal</h3>
        <p>Understand the tools we're using before writing code.</p>
        
        <div className="tool-section">
          <h3>🧩 Google Colab</h3>
          <h4>Google Colab is a free online coding environment (Google Docs, but for Python code) where you can:</h4>
          <ul>
            <li>Write Python code & Run it in the browser</li>
            <li>No local setup required</li>
            <li>Use powerful computers (CPU / GPU / TPU)</li>
            <li>Perfect for AI / ML / data science</li>
            <li>Easy to share links like Google Docs</li>
          </ul>
          <div className="image-placeholder" >
            <img src="/colab/step1_3.png" alt="Google Colab Interface" height="60%" width="60%"/>
            <img src="/colab/step1_4.png" alt="Google Colab Interface" height="60%" width="60%"/>
          </div>
        </div>
        
        <div className="tool-section">
          <h3>🧩 Firebase</h3>
          <h4>Firebase is a Backend-as-a-Service (BaaS) by Google. (Backend without backend coding)</h4>
          <ul>
            <li>It gives Managing serices like Database, Authentication, Hosting(frontend), Cloud Function, Storage(iamge,video)</li>
            <li>No server setup</li>
            <li>Works great with web & mobile apps</li>
            <li>Real-time data access</li>
          </ul>
          <div className="image-placeholder">
            <img src="/colab/step1_1.png" alt="Firebase Console" width="60%" height="60%" />
            <img src="/colab/step1_2.png" alt="Firebase Console" width="60%" height="60%" />
          </div>
        </div>
        
        <div className="tool-section">
          <h3>🧩 Google Cloud Platform</h3>
          <h4>GCP is a complete cloud platform for: Servers, AI models, Databases, Deployment, Security, Scaling</h4>
          <ul>
            <li>Industry standard & Scales automatically</li>
            <li>Used by startups & enterprises & Required for real deployments</li>
            <li>Cloud Run → deploy backend APIs & Cloud Storage → file storage</li>
            <li>Compute Engine → virtual machines</li>
          </ul>
           <div className="image-placeholder">
            <img src="/colab/step1_6.png" alt="Firebase Console" width="80%" height="80%" />
            <img src="/colab/step1_5.png" alt="Firebase Console" width="60%" height="60%" />
          </div>
        </div>
        
        <div className="mental-model">
          <h4>📌 Mental Model</h4>
          <p>Colab → builds & tests agents</p>
          <p>Firebase → stores data</p>
          <p>GCP → powers & deploys everything</p>
        </div>
        
        <div className="learning-outcomes">
          <h3>🎓 What You'll Learn</h3>
          <ul>
            <li>How to build AI agents that can understand images and plan trips</li>
            <li>Multi-agent orchestration patterns</li>
            <li>Integrating Gemini API with custom tools</li>
            <li>Deploying AI systems to Google Cloud</li>
            <li>Building real-world applications with agent-first thinking</li>
          </ul>
        </div>
<div className="codelab-intro">
  <h2>🚗 What We're Building</h2>
  <p>We're creating a Vehicle Trip Planner that uses multiple AI agents to analyze vehicle images and generate optimal travel plans. This system combines computer vision, route optimization, and capacity planning to deliver comprehensive trip recommendations. And to store data we connect it to Firebase</p>
  
  <h3>💡 Why It Matters</h3>
  <p>Traditional trip planning tools require manual input of vehicle specifications and limited route optimization. Our AI-powered system automates this process by understanding vehicles from images and generating intelligent recommendations based on multiple factors including distance, fuel efficiency, and passenger capacity.</p>
  
  <p>For individuals, this means easier trip planning with personalized vehicle recommendations. For travel agencies, this translates to more efficient operations with optimized vehicle allocation and routing.</p>
</div>
        
      </div>
    )
  },
  {
    title: "Google ADK",
    subtitle: "Agents & Frameworks",
    duration: "10 mins",
    content: (
      <div className="tab-content">
        <h3>🎯 Goal</h3>
        <p>Understand agents and the key development frameworks.</p>
        
        <div className="agent-definition">
          <h4>🤖 What is an AI Agent?</h4>
          <p>A system that takes input, reasons using an LLM, performs actions, and produces structured output. Unlike chatbots, agents execute workflows.</p>
        </div>
        
        <div className="frameworks-grid">
          <div className="framework-card">
            <h4>ADK (Agent Development Kit)</h4>
            <p>Framework for designing, structuring, and orchestrating agents in production environments.</p>
          </div>
          
          <div className="framework-card">
            <h4>SDK (Software Development Kit)</h4>
            <p>Tools and libraries for implementing agents, including APIs for specific platforms like Gemini.</p>
          </div>
          
          <div className="framework-card">
            <h4>CDK (Cloud Development Kit)</h4>
            <p>Infrastructure as code tools for deploying cloud resources that support agent systems.</p>
          </div>
        </div>
        
        <div className="agent-patterns">
          <h4>🔄 Agent Execution Patterns</h4>
          <div className="pattern-card">
            <h5>Sequential Agents</h5>
            <p>Execute tasks in order, where output of one agent becomes input for the next.</p>
          </div>
          
          <div className="pattern-card">
            <h5>Parallel Agents</h5>
            <p>Work simultaneously on different aspects of a problem, improving efficiency.</p>
          </div>
          
          <div className="pattern-card">
            <h5>Hierarchical Agents</h5>
            <p>Organized in a tree structure, with higher-level agents coordinating specialized ones.</p>
          </div>
        </div>
        
        <div className="comparison">
          <h4>📌 Why Google ADK over LangChain/n8n?</h4>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Google ADK</th>
                <th>LangChain</th>
                <th>n8n</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Production-ready</td>
                <td>✅</td>
                <td>⚠️</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Native Gemini support</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Agent orchestration</td>
                <td>✅</td>
                <td>⚠️</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Cloud deployment</td>
                <td>✅</td>
                <td>⚠️</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Enterprise-ready</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="adk-execution">
          <h4>🔄 How ADK Runs</h4>
          <p>ADK follows a structured execution model:</p>
          <div className="image-placeholder">
            <img src="/colab/step2_1.png" alt="ADK Execution Flow" width="60%" height="60%"/>
          </div>
          <p>The system processes inputs through a series of agents, each with specific responsibilities, creating a pipeline that transforms raw data into actionable insights.</p>
          <h3>5 Main Functions in ADK</h3>
          <div className='code-snippet'>
        
              <pre>
               {`import google.generativeai as genai
genai.configure(api_key="YOUR_API_KEY") # 1. API ke
model = genai.GenerativeModel("gemini-2.5-flash") # 2. Model select
img = genai.upload_file("car.jpg") # 3. Upload file
res = model.generate_content(["What vehicle is this?", img]) # 4. Generate
print(res.text) # 5. Parse output`}

              </pre>
          </div>
          <div className="image-placeholder">
            <img src="/colab/step2_2.png" alt="ADK Architecture" width="60%" height="60%"/>
          </div>
        </div>
        
        <div className="action-button">
          <a href="https://codelabs.developers.google.com/onramp/instructions#0" target="_blank" rel="noopener noreferrer">
            Original Crash Course of ADK →
          </a>
        </div>
      </div>
    )
  },
  {
    title: "Project Setup",
    subtitle: "Environment & APIs",
    duration: "15 mins",
    content: (
      <div className="tab-content">
        <h3>🎯 Goal</h3>
        <p>Prepare everything required to run the Vehicle Trip Planner.</p>
        
        <div className="setup-guide">
          <h2>Setup GCP & Gemini API Key</h2>
          <h5>Setting Up Your GCP Project & Gemini API Key</h5>
          <p>To power our AI agents, we need two things: a Google Cloud Project to provide the foundation and a Gemini API Key to access Google's powerful models.</p>
          
          <div className="setup-step">
            <h3>Step 1: Enable Billing Account</h3>
            <p>Claiming your <a href="https://trygcp.dev/claim/adk-crash-course-1" target="_blank" className='billing'>Billing Account</a> with 5 dollar credit, you will need it for your deployment. Make sure to use your Gmail account.</p>
            <p>No credit card or payment needed — you'll receive $5 free credits. It takes less than 2 minutes, just enter your name and accept the credits.</p>
            <div className="image-placeholder">
              <img src="/colab/step3_5.png" alt="Billing Account Setup" />
            </div>
          </div>
          
          <div className="setup-step">
            <h3>Step 2: Create A New GCP Project</h3>
            <p>Go to <a href="https://console.cloud.google.com/" className='billing'>Google Cloud Console</a> and create a new project.</p>
            <div className="image-placeholder">
              <img src="/colab/step3_1.png" alt="Creating GCP Project" />
            </div>
            <p>Open left panel, click Billing, check whether the billing account is linked to this GCP account.</p>
            <div className="image-placeholder">
              <img src="/colab/step3_4.png" alt="Billing Account Link" />
            </div>
            <p>If you see this page, check the manage billing account, choose the Google Cloud Trial One and linked to it.</p>
          </div>
          
          <div className="setup-step">
            <h3>Step 3: Generate Your Gemini API Key</h3>
            <p>Before you can secure the key, you need to have one.</p>
            <ol>
              <li>Navigate to the <a href="https://aistudio.google.com/api-keys" className='billing'>Google AI Studio.</a></li>
              <li>Sign in with your Gmail account.</li>
              <li>Click the "Get API key" button, usually found on the left-hand navigation pane or in the top-right corner.</li>
              <li>In the "API keys" dialog, click "Create API key in new project".</li>
            </ol>
            <div className="image-placeholder">
              <img src="/colab/step3_2.png" alt="AI Studio Get API Key" />
            </div>
            <p>Choose the new project you created that has billing account set up.</p>
            <div className="image-placeholder">
              <img src="/colab/step3_3.png" alt="Select Project for API Key" />
            </div>
            <p>A new API key will be generated for you. Copy this key immediately and store it somewhere safe temporarily (like a password manager or a secure note). This is the value you will use in the next steps.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "First Agent",
    subtitle: "Text Sentiment Analysis",
    duration: "15 mins",
    content: (
      <div className="tab-content">
        <h3>🎯 Goal</h3>
        <p>Build your first agent with text sentiment analysis.</p>
        
        <div className="first-agent">
          <h4>🤖 Building Your First Agent</h4>
          <p>Let's start with a simple text sentiment analysis agent to understand the basics of agent development.</p>
          
          <div className="code-snippet">
            
            <pre>
              {`def create_sentiment_agent():
  def analyze_sentiment(text):
    response = model.generate_content(
      f"Analyze the sentiment of this text: {text}. 
      Return JSON with 'sentiment' and 'confidence'."
    )
    return json.loads(response.text)
  
  return analyze_sentiment`}
            </pre>
            {renderCopyButton(`def create_sentiment_agent():
  def analyze_sentiment(text):
    response = model.generate_content(
      f"Analyze the sentiment of this text: {text}. 
      Return JSON with 'sentiment' and 'confidence'."
    )
    return json.loads(response.text)
  
  return analyze_sentiment`)}
          </div>
          
          <p>This simple agent demonstrates the core pattern: input → processing → structured output.</p>
          
          <div className="action-button">
            <a href="https://colab.research.google.com/drive/1iv22TYsiEN9EADcXNYiHh3L0tFadQEOm" target="_blank" rel="noopener noreferrer">
              Try it in Colab →
            </a>
          </div>
        </div>

         <div className="intro-section">
          <h4>🚀 Introduction to the Main Project</h4>
          <p>We're building a Vehicle Trip Planner that uses AI agents to analyze vehicle images and plan optimal trips. This system is valuable in two key scenarios:</p>
          
          <div className="scenarios">
            <div className="scenario-card">
              <h5>Personal Trip Planning</h5>
              <p>For individuals planning trips who need to determine the right vehicle and optimize routes based on their specific needs.</p>
            </div>
            
            <div className="scenario-card">
              <h5>Agency Trip Planning</h5>
              <p>For travel agencies that need to efficiently plan multiple trips, determining optimal vehicle allocation and routing for various clients.</p>
            </div>
          </div>
          
          <p>By simply providing a vehicle image, source/destination, and number of people, our system will generate comprehensive trip plans with vehicle recommendations, route details, and capacity planning.</p>
        </div>
        
        <div className="project-architecture">
          <h4>🏗️ Project Architecture</h4>
          <p>Our Vehicle Trip Planner consists of multiple specialized agents working together:</p>
          
          <div className="image-placeholder">
            <img src="/colab/step5_2.png" alt="System Architecture" />
          </div>
          
          <div className="agents-details">
            <h5>Agent Breakdown</h5>
            <div className="agent-detail-card">
              <h6>Vehicle Detection Agent</h6>
              <p>Functions: <code>detect_vehicle_type()</code>, <code>extract_vehicle_specs()</code></p>
              <p>Analyzes vehicle images to determine type, capacity, and specifications.</p>
            </div>
            
            <div className="agent-detail-card">
              <h6>Trip Planning Agent</h6>
              <p>Functions: <code>calculate_route()</code>, <code>estimate_time()</code>, <code>estimate_fuel()</code></p>
              <p>Computes optimal routes, travel times, and fuel consumption.</p>
            </div>
            
            <div className="agent-detail-card">
              <h6>Capacity Planning Agent</h6>
              <p>Functions: <code>calculate_vehicles_needed()</code>, <code>optimize_allocation()</code></p>
              <p>Determines the number of vehicles required for the trip.</p>
            </div>
            
            <div className="agent-detail-card">
              <h6>Data Recording Agent</h6>
              <p>Functions: <code>save_to_firestore()</code>, <code>generate_excel_report()</code></p>
              <p>Stores trip data and generates reports.</p>
            </div>
          </div>
          
          <div className="image-placeholder">
            <img src="/colab/step5_1.png" alt="Agent Flow Diagram" />
          </div>
        </div>
        
        <div className="action-button">
          <a href={colabNotebookUrl} target="_blank" rel="noopener noreferrer">
            Open in Colab →
          </a>
        </div>
      </div>
    )
  },
  {
    title: "Running & Deployment",
    subtitle: "Hands-On Execution",
    duration: "20 mins",
    content: (
      <div className="tab-content">
        <h3>🎯 Goal</h3>
        <p>Execute the full multi-agent pipeline and prepare for deployment.</p>
        
        <div className="running-section">
          <h4>🚀 Running the System</h4>
          <p>To run the system, you'll need:</p>
          
          <div className="requirements-list">
            <h5>Prerequisites</h5>
            <ul>
              <li>Gemini API Key (from Step 3)</li>
              <li>Service Account JSON file with Firestore permissions</li>
              <li>Python environment with required packages</li>
            </ul>
          </div>
          
          <div className="setup-steps">
            <h5>Configuration Steps</h5>
            <ol>
              <li>Add your Gemini API key in the <a href="https://colab.research.google.com/drive/1lSESLRKRQinlv5loS7IagFkmoc5pt6_j#scrollTo=a9580394&line=5&uniqifier=1" className='billing'>Section mentioned</a></li>
              <div className="code-snippet">
                <code>GOOGLE_API_KEY="your_api_key_here"</code>
              </div>
              
             <li>Create a service account through Firebase:</li>
            <ul>
              <li>Login to Firebase Console</li>
              <li>Select your project</li>
              <li>Enable Firestore Database</li>
              <li>Click the gear icon → Project settings</li>
              <li>Go to "Service accounts" tab</li>
              <li>Click "Generate new private key"</li>
              <li>Select your service account and click "Generate key"</li>
              <li>Download the JSON key file</li>
            </ul>
            <div className="image-placeholder">
              <img src="/colab/step4_1.png" alt="Firebase Service Account" width="80%" height="80%"/>
            </div>
              
              <li>When Prompted upload the file downloaded to this <a href="https://colab.research.google.com/drive/1lSESLRKRQinlv5loS7IagFkmoc5pt6_j#scrollTo=SMJemZ2p2He5&line=5&uniqifier=1" className='billing'>Section</a></li>
              <div className="code-snippet">
                <code>Rename the JSON downloaded file to serviceAccountKey.json and Upload</code>
              </div>
              
              <li>At <a href="https://colab.research.google.com/drive/1lSESLRKRQinlv5loS7IagFkmoc5pt6_j#scrollTo=65a616d8&line=8&uniqifier=1" className='billing'>Runner Function</a> there will be an Upload Image Option so Simple upload the image and rest all things works</li>
              
            </ol>
          </div>
        </div>
        
        <div className="deployment-section">
          <h4>☁️ Introduction to Hosting & Deployment</h4>
          <p>Google Cloud Platform offers several advantages over AWS for our AI application:</p>
          
          <div className="comparison">
            <h5>GCP vs AWS for AI Applications</h5>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Google Cloud Platform</th>
                  <th>Amazon Web Services</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>AI/ML Services</td>
                  <td>Native Gemini integration</td>
                  <td>Third-party or limited AI services</td>
                </tr>
                <tr>
                  <td>Billing Model</td>
                  <td>Predictable with $300 free credits</td>
                  <td>Complex pricing structure</td>
                </tr>
                <tr>
                  <td>Serverless Options</td>
                  <td>Cloud Run with simple scaling</td>
                  <td>Lambda with limitations</td>
                </tr>
                <tr>
                  <td>Database Options</td>
                  <td>Firestore for real-time data</td>
                  <td>DynamoDB with steeper learning curve</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p>For our application, we'll use Cloud Run for serverless deployment, which provides automatic scaling and only charges for actual usage.</p>
        </div>
        
        <div className="action-button">
          <a href={colabNotebookUrl} target="_blank" rel="noopener noreferrer">
            Open in Colab →
          </a>
        </div>
      </div>
    )
  },
  {
    title: "Deployment Guide",
    subtitle: "Production Deployment",
    duration: "20 mins",
    content: (
      <div className="tab-content">
        <h3>🎯 Goal</h3>
        <p>Deploy your Vehicle Trip Planner to Google Cloud Platform.</p>
        
        <div className="deployment-steps">
          <h4>🚀 Deployment Steps</h4>
          
          <div className="deployment-step">
            <h3>Step 1: Clone the Repository</h3>
            <p>Open your terminal and clone the project repository:</p>
            <div className="code-snippet">
              <code>git clone https://github.com/Prathamesh01110/GDG-PROJECT.git</code>
              {renderCopyButton('git clone https://github.com/Prathamesh01110/GDG-PROJECT.git')}
            </div>
          </div>
          
          <div className="deployment-step">
            <h3>Step 2: Authenticate with Google Cloud</h3>
            <p>Log in to your Google Cloud account:</p>
            <div className="code-snippet">
              <code>gcloud auth login</code>
              {renderCopyButton('gcloud auth login')}
            </div>
          </div>
          
          <div className="deployment-step">
            <h3>Step 3: Deploy the Backend</h3>
            <p>Deploy the backend service using Cloud Run:</p>
            <div className="code-snippet">
              <code>cd Agent_code </code>
                 {renderCopyButton('cd Agent_code')}
                  </div>
                  <div className="code-snippet">
                <code>gcloud run deploy</code>
               {renderCopyButton('gcloud run deploy')}
            </div>
            <p>When prompted:</p>
            <ol>
              <li>Enter a service name (e.g., "vehicle-trip-planner-api") & press ENTER</li>
              <li>Select the region closest to your users which is 9 so press 9 & do ENTER</li>
              <li>Allow unauthenticated access (for demo purposes) press Y & ENTER</li>
            </ol>
            <p>Once deployed, note the Service URL provided.</p>

          </div>
          
          <div className="deployment-step">
            <h3>Step 4: Deploy the Frontend</h3>
            <p>Navigate to the frontend directory and deploy:</p>
            <div className="code-snippet">
              <code>cd Frontend</code>
              {renderCopyButton('cd Frontend')}
            </div>
            <div className="code-snippet">
              <code>gcloud run deploy</code>
               {renderCopyButton('gcloud run deploy')}
            </div>
            <div className="code-snippet">
              <code>same steps as Above</code>
            </div>
          </div>
          
          <div className="deployment-step">
            <h3>Step 5: Fix the Service URL Error</h3>
            <p>You may encounter an error because the frontend doesn't know the backend service URL. Here's how to fix it:</p>
            <ol>
              <li>Open the frontend src/App.jsx (using the log)</li>
              <li>Replace the placeholder API URL with your actual service URL on Line number 35 (GO TO cloud run {">"} services {">"} source {">"} edit source )</li>
              <li>Redeploy the frontend</li>
            </ol>
          </div>
          
          <div className="deployment-step">
            <h3>Step 6: Test Your Deployment</h3>
            <p>Visit your deployed application URL and test the full functionality:</p>
            <ul>
              <li>Upload a vehicle image</li>
              <li>Enter source and destination</li>
              <li>Specify the number of people</li>
              <li>Verify that you receive a trip plan</li>
            </ul>
          </div>
        </div>
        
        <div className="final-notes">
          <h4>🎉 Congratulations!</h4>
          <p>You've successfully deployed a multi-agent AI system to Google Cloud Platform. Your Vehicle Trip Planner is now accessible to users worldwide.</p>
          
          <h3>Next Steps</h3>
          <ul>
            <li>Set up monitoring and logging for your deployed services</li>
            <li>Implement authentication for secure access</li>
            <li>Consider adding more sophisticated features like real-time traffic updates</li>
            <li>Explore autoscaling configurations for handling increased traffic</li>
          </ul>
        </div>
        
        <div className="action-button">
          <a href={colabNotebookUrl} target="_blank" rel="noopener noreferrer">
            Open in Colab →
          </a>
        </div>
      </div>
    )
  }
];
  
  return (
    <div className="codelab-container">
      <div className="codelab-header">
        <div className="codelab-icon">📘</div>
        <h1>Google Codelab</h1>
        <h2>Building a Multi-Agent AI System with Google ADK, Gemini & GCP</h2>
      </div>
      
      <div className="tabs-container">
        <div className="tabs-header">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-button ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              <div className="tab-title">{tab.title}</div>
              <div className="tab-subtitle">{tab.subtitle}</div>
              <div className="tab-duration">({tab.duration})</div>
            </button>
          ))}
        </div>
        
        <div className="tab-content-container">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default CodelabTabs;