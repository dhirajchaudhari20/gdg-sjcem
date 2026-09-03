import React from 'react';

const CodeBlock = ({ code }) => {
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("Copied!")) // Simple alert for now, component handles toast
            .catch(err => console.error('Error copying:', err));
    };

    return (
        <pre>
            <button className="gc-copy-btn" onClick={() => handleCopy(code)}>
                <i className="far fa-copy" style={{ marginRight: '4px' }}></i>
            </button>
            <code>{code}</code>
        </pre>
    );
};

export const codelabs = [
    {
        id: "techsprint-1",
        title: "Build a Travel Agent using MCP & ADK",
        duration: "60 min",
        level: "Intermediate",
        author: {
            name: "Prathamesh Jakkula",
            title: "AIML/DSA Lead | GDG On Campus SJCEM",
            image: "https://i.ibb.co/35jPBNjj/profile.jpg"
        },
        steps: [
            {
                title: "Introduction",
                duration: "5 mins",
                content: (
                    <div className="gc-step-content">
                        <p>
                            In this codelab, you will build out an agent using the <a href="#">Agent Development Kit (ADK)</a> that utilizes the MCP Toolbox for Databases.
                        </p>

                        <div className="gc-about-card" style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', color: '#5f6368', fontSize: '14px' }}>
                                <i className="far fa-clock" style={{ marginRight: '8px' }}></i>
                                <span>Last updated Dec 13, 2025</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                <div style={{ fontSize: '40px', color: '#5f6368', lineHeight: 1 }}>
                                    <img
                                        src="https://i.ibb.co/35jPBNjj/profile.jpg"
                                        alt="Prathamesh Jakkula"
                                        style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '500', color: '#202124', fontSize: '16px' }}>Written by Prathamesh Jakkula</div>
                                    <div style={{ fontSize: '14px', color: '#5f6368', marginBottom: '8px' }}>AIML/DSA Lead | GDG On Campus SJCEM</div>
                                    <p style={{ fontSize: '14px', color: '#3c4043', lineHeight: '1.5', margin: '0 0 12px 0' }}>
                                        Started as a participant, became a finalist, then a winner; now I mentor and judge hackathons, with still a long way to go. I enjoy working with Google’s AI tools, Building agents, and practical ML projects while helping others learn faster.
                                    </p>
                                    <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
                                        <a href="https://www.linkedin.com/in/prathamesh-jakkula-496a39285/" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: '#1a73e8' }}>
                                            <i className="fab fa-linkedin"></i> LinkedIn
                                        </a>
                                        <a href="https://github.com/Prathamesh01110" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: '#1a73e8' }}>
                                            <i className="fab fa-github"></i> GitHub
                                        </a>
                                        <a href="https://x.com/Prathamesh01_" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: '#1a73e8' }}>
                                            <i className="fab fa-twitter"></i> Twitter/X
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="gc-info-box">
                            <span className="gc-info-box-title">What you'll build</span>
                            <p>We're creating a Vehicle Trip Planner that uses multiple AI agents to analyze vehicle images and generate optimal travel plans. This system combines computer vision, route optimization, and capacity planning.</p>
                        </div>

                        <h3>What you'll learn</h3>
                        <ul>
                            <li>How to build AI agents that can understand images and plan trips</li>
                            <li>Multi-agent orchestration patterns</li>
                            <li>Integrating Gemini API with custom tools</li>
                            <li>Deploying AI systems to Google Cloud</li>
                        </ul>

                        <h3>Prerequisites</h3>
                        <ul>
                            <li>Basic knowledge of Python</li>
                            <li>A Google Cloud Platform account</li>
                            <li>Access to Google AI Studio</li>
                        </ul>
                    </div>
                )
            },
            {
                title: "Foundations: Colab & Firebase",
                duration: "10 mins",
                content: (
                    <div className="gc-step-content">
                        <h3>Understanding the Tools</h3>
                        <p>Before writing code, let's understand the tools we're using.</p>

                        <h4>1. Google Colab</h4>
                        <p>Google Colab is a free online coding environment where you can write and run Python code. It requires no setup and provides free access to computing resources.</p>
                        <img src="/colab/step1_3.png" alt="Google Colab Interface" style={{ maxHeight: '300px' }} />

                        <h4>2. Firebase</h4>
                        <p>Firebase is a Backend-as-a-Service (BaaS) by Google. We will use it for:</p>
                        <ul>
                            <li>Database (Firestore)</li>
                            <li>Authentication</li>
                            <li>Hosting</li>
                        </ul>
                        <img src="/colab/step1_1.png" alt="Firebase Console" style={{ maxHeight: '300px' }} />

                        <div className="gc-info-box">
                            <span className="gc-info-box-title">Mental Model</span>
                            <p><strong>Colab</strong> builds & tests agents. <strong>Firebase</strong> stores data. <strong>GCP</strong> powers & deploys everything.</p>
                        </div>
                    </div>
                )
            },
            {
                title: "Project Setup",
                duration: "15 mins",
                content: (
                    <div className="gc-step-content">
                        <h3>Setup GCP & Gemini API Key</h3>

                        <h4>Step 1: Enable Billing Account</h4>
                        <p>Claim your <a href="https://trygcp.dev/claim/adk-crash-course-1" target="_blank" rel="noopener noreferrer" style={{color:'blue'}}>Free $5 Billing Credit</a>.</p>
                        <p>No credit card is needed. Just sign in with your Gmail and accept the credits.</p>
                        <img src="/colab/step3_5.png" alt="Billing Setup" />

                        <h4>Step 2: Create GCP Project</h4>
                        <p>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" style={{color:'blue'}}>Google Cloud Console</a> and create a new project. Ensure your new billing account is linked.</p>
                        <img src="/colab/step3_1.png" alt="Create Project" />

                        <h4>Step 3: Generate Gemini API Key</h4>
                        <p>Navigate to <a href="https://aistudio.google.com/api-keys" target="_blank" rel="noopener noreferrer" style={{color:'blue'}}>Google AI Studio</a> and create a new API key.</p>
                        <img src="/colab/step3_2.png" alt="Get API Key" />

                         <h3>Setup Firebase & Firestore</h3>

                        <h4>Step 4: Login to Firebase & Choose the Project created in GCP</h4>
                        <p>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" style={{color:'blue'}}>Firebase Console</a> and log in with your Google account.</p>

                        <h4>Step 5: Generate Firebase Admin SDK Key</h4>
                        <p>Enable "Firestore Database"</p>
                        <p>Click the gear icon in the top left corner of the Firebase console and go to "Project settings".</p>
                        <p>In the "Service accounts" tab, click "Generate new private key".</p>

                        <img src="/colab/step4_1.png" alt="Get API Key" />
                        <h4>Step 6: Download & Rename Firebase Key</h4>
                        <p>Download the JSON key file and rename it to <code>serviceAccountKey.json</code>.</p>

                        <div className="gc-info-box">
                            <span className="gc-info-box-title">Important</span>
                            <p>Copy your API key immediately and store it safely. You won't be able to see it again!</p>
                        </div>
                    </div>
                )
            },
            {
                title: "Building the First Agent",
                duration: "15 mins",
                content: (
                    <div className="gc-step-content">
                        <h3>Text Sentiment Analysis Agent</h3>
                        <p>Let's build a simple agent to understand the pattern: <strong>Input → Processing → Structured Output</strong>.</p>

                        <h4>Code Snippet</h4>
                        <pre><code>{`def create_sentiment_agent():
  def analyze_sentiment(text):
    response = model.generate_content(
      f"Analyze the sentiment of this text: {text}. 
      Return JSON with 'sentiment' and 'confidence'."
    )
    return json.loads(response.text)
  
  return analyze_sentiment`}</code></pre>

                        <p>This simple agent takes text, sends it to the model with a specific instruction, and returns a structured JSON response.</p>

                        <div className="action-button-container" style={{ margin: '24px 0' }}>
                            <a href="https://colab.research.google.com/drive/1iv22TYsiEN9EADcXNYiHh3L0tFadQEOm" target="_blank" rel="noopener noreferrer" className="btn-gc-primary">
                                Open to Colab
                            </a>
                        </div>
                    </div>
                )
            },
            {
                title: "Architecture Deep Dive",
                duration: "10 mins",
                content: (
                    <div className="gc-step-content">
                        <h3>Project Architecture</h3>
                        <p>Our Vehicle Trip Planner consists of multiple specialized agents working together:</p>
                        <img src="/colab/step5_2.png" alt="System Architecture" />

                        <h4>Agent Breakdown</h4>
                        <ul>
                            <li><strong>Vehicle Detection Agent:</strong> Analyzes images to find vehicle type and specs.</li>
                            <li><strong>Trip Planning Agent:</strong> Calculates optimal routes and fuel.</li>
                            <li><strong>Capacity Planning Agent:</strong> Determines fleet size needed.</li>
                            <li><strong>Data Recording Agent:</strong> Saves everything to Firestore.</li>
                        </ul>
                        <div className="action-button-container" style={{ margin: '24px 0' }}>
                            <a href="https://colab.research.google.com/drive/1lSESLRKRQinlv5loS7IagFkmoc5pt6_j" target="_blank" rel="noopener noreferrer" className="btn-gc-primary">
                                Open to Colab
                            </a>
                        </div>
                    </div>
                )
            },
            {
                title: "Running & Deployment",
                duration: "20 mins",
                content: (
                    <div className="gc-step-content">
                        <h3>Deployment Guide</h3>

                        <h4>Step 1: Clone Repository</h4>
                        <pre><code>git clone https://github.com/Prathamesh01110/GDG-PROJECT.git</code></pre>

                        <h4>Step 2: Authenticate</h4>
                        <pre><code>gcloud auth login</code></pre>

                        <h4>Step 3: Deploy Backend</h4>
                        <pre><code>{`cd Agent_code
gcloud run deploy`}</code></pre>
                        <p>Follow the prompts: Select a region (e.g., 9 for us-central1), and allow unauthenticated calls (y).</p>

                        <h4>Step 4: Deploy Frontend</h4>
                        <pre><code>{`cd Frontend
gcloud run deploy`}</code></pre>

                        <div className="gc-info-box">
                            <span className="gc-info-box-title">Fixing Service URL</span>
                            <p>Update `src/App.jsx` in the frontend with your new Backend URL, then redeploy the frontend.</p>
                            <p>Add your Gemini_Key & Upload serviceAccountKey.json in the root of /Agent_code </p>
                        </div>
                    </div>
                )
            },
            {
                title: "Congratulations",
                duration: "1 min",
                content: (
                    <div className="gc-step-content">
                        <h3>🎉 You're Done!</h3>
                        <p>Congratulations, you've successfully built an agent using the Agent Development Kit (ADK) that utilizes the MCP Toolbox for Databases.</p>

                        <h4>Reference docs</h4>
                        <ul className="gc-reference-list">
                            <li><a href="https://google.github.io/adk-docs/" target="_blank" rel="noopener noreferrer">Agent Development Kit</a></li>
                            <li><a href="https://github.com/googleapis/genai-toolbox" target="_blank" rel="noopener noreferrer">MCP Toolbox for Databases</a></li>
                            <li><a href="https://googleapis.github.io/genai-toolbox/how-to/connect-ide/" target="_blank" rel="noopener noreferrer">Connecting to MCP Toolbox from your IDE</a></li>
                            <li><a href="https://cloud.google.com/sql/docs/postgres" target="_blank" rel="noopener noreferrer">Cloud SQL for PostgreSQL</a></li>
                        </ul>
                    </div>
                )
            }
        ]
    }
];
