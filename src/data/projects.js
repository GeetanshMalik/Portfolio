export const allProjects = [
  {
    id: 'interview-ai',
    name: 'InterviewAI',
    tagline: 'Agentic AI Interview Platform',
    category: 'AI / LangGraph',
    tech: ['Next.js', 'LangGraph', 'ChromaDB', 'Redis', 'Docker', 'RAG'],
    color: '#ff007f',
    overview: 'An autonomous orchestration platform designed for automated technical and HR interview evaluation workflows. InterviewAI acts as an agentic mock interviewer that dynamically adjusts questioning based on candidate responses.',
    features: [
      'Multi-agent interview evaluation workflows orchestrated with LangGraph.',
      'Asynchronous latency reduction using Redis queues and task parallelization.',
      'Context-aware question grading leveraging RAG (Retrieval-Augmented Generation) with ChromaDB.'
    ],
    architecture: 'Next.js Frontend ➔ FastAPI Gateway ➔ LangGraph Agent Router ➔ Redis Task Queue ➔ ChromaDB Vector DB',
    challenges: 'Ensuring real-time response generation without latency. Solved by decoupling answer analysis into asynchronous background jobs via Redis queues, reducing interface latency by 70%.',
    github: 'https://github.com/GeetanshMalik/InterviewAI',
    demo: 'https://github.com/GeetanshMalik/InterviewAI'
  },
  {
    id: 'mind-space',
    name: 'MindSpace',
    tagline: 'Cross-Platform Wellness Application',
    category: 'Mobile / React Native',
    tech: ['React Native', 'JavaScript', 'Expo', 'Firebase', 'Firestore', 'Cloudinary', 'Supabase'],
    color: '#00f0ff',
    overview: 'A sleek, cross-platform mobile wellness companion designed to track mental health metrics, display custom statistics, and offer personalized relaxation routines.',
    features: [
      'Interactive mood log calendars and wellness tracking systems.',
      'Highly optimized navigation flows yielding 60FPS fluid transitions.',
      'Reusable responsive visual widgets adapting dynamically to diverse mobile viewports.'
    ],
    architecture: 'React Native Mobile App ➔ Firebase Auth & Backend ➔ Firestore Database ➔ Cloudinary (Images/Videos) ➔ Supabase (File Storage)',
    challenges: 'Managing smooth screen transitions while loading extensive statistical charts. Mitigated by implementing lazy-rendering widgets and pre-fetching client-side metrics during quiet states.',
    github: 'https://github.com/GeetanshMalik/MindSpace',
    demo: 'https://www.indusappstore.com/apps/social/mindspace/com.mindspace.app?page=details&id=com.mindspace.app'
  },
  {
    id: 'code-genix',
    name: 'CodeGenix',
    tagline: 'AI-Powered Code Compiler Platform',
    category: 'MERN Stack / Docker',
    tech: ['MERN Stack', 'Docker', 'OpenAI API', 'React.js', 'Node.js', 'MongoDB'],
    color: '#8b5cf6',
    overview: 'A collaborative, real-time code editor and compilation sandbox with integrated AI-driven debugging assistance and compilation diagnostics.',
    features: [
      'Safe, isolated code execution utilizing containerized Docker runtimes.',
      'Automated syntax correction and interactive step-by-step debugging chat assistants.',
      'Real-time editor sync and code collaboration rooms.'
    ],
    architecture: 'React.js Frontend ➔ Socket.io Sync ➔ Node.js Compiler Runner ➔ Isolated Docker Sandbox',
    challenges: 'Protecting the server environment while running arbitrary user code. Resolved by spinning up ephemeral, isolated Docker containers with restricted memory limits and disabled networking.',
    github: 'https://github.com/GeetanshMalik/Code_Genix',
    demo: 'https://codegenix.live'
  },
  {
    id: 'idea-flux',
    name: 'IdeaFlux',
    tagline: 'MERN Social Media Platform',
    category: 'MERN Stack / OAuth',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'REST APIs', 'OpenAI'],
    color: '#f59e0b',
    overview: 'A feature-rich social media workspace featuring secure token authentication, media shares, and automated, AI-powered caption and hashtag generators.',
    features: [
      'Secure, stateless session management utilizing JSON Web Tokens (JWT).',
      'AI caption generation integrating post content parsing API engines.',
      'Complete, robust RESTful CRUD endpoints for media, likes, and comments.'
    ],
    architecture: 'React.js Client ➔ JWT Auth Middleware ➔ Express.js API Router ➔ MongoDB database',
    challenges: 'Handling media uploads and caption generation atomically. Resolved by utilizing cloud bucket storage hooks alongside an asynchronous worker that triggers OpenAI post-upload.',
    github: 'https://github.com/GeetanshMalik/IDEAFLUX',
    demo: 'https://ideaflux.me'
  },
  {
    id: 'ai-meme-studio',
    name: 'AI Meme Studio',
    tagline: 'AI Meme Generator',
    category: 'MERN Stack / AI',
    tech: ['React', 'Node.js', 'Groq', 'Llama 3.3', 'MERN Stack'],
    color: '#ff1b76',
    overview: 'Generate viral-worthy memes instantly using AI. Combines intelligent caption generation with 50+ meme templates for endless creativity.',
    features: [
      'Generates viral-worthy meme captions using Groq\'s Llama 3.3 70B.',
      'Provides 50+ custom meme templates for instant creation.',
      'Stateless session creation and quick image sharing capabilities.'
    ],
    architecture: 'React Frontend ➔ Node.js API Gateway ➔ Groq Llama 3.3 70B',
    challenges: 'Achieving instant, low-latency generation of caption variations. Solved by optimizing Groq API parameters and streaming responses.',
    github: 'https://github.com/GeetanshMalik/AI-Meme-Generator',
    demo: 'https://ai-meme-generator-ahmj.onrender.com/'
  },
  {
    id: 'multigame-arena',
    name: 'MultiGame Arena',
    tagline: 'All-in-One Gaming Hub',
    category: 'Game Dev',
    tech: ['HTML5 Canvas', 'JavaScript', 'CSS3', 'UI/UX'],
    color: '#10b981',
    overview: 'An all-in-one web gaming arena featuring 5+ classic games (Snake, Sudoku, etc.). Engineered for seamless play with local high-score saving.',
    features: [
      'Features 5+ classic browser games built with clean vanilla JS.',
      'Saves local high scores using LocalStorage.',
      'Fluid, retro-themed responsive user interface optimized for 60FPS.'
    ],
    architecture: 'HTML5 Canvas ➔ Vanilla JavaScript ➔ LocalStorage',
    challenges: 'Handling responsive controls across mobile and desktop. Solved by implementing touch swipe gestures and custom canvas scaling.',
    github: 'https://github.com/GeetanshMalik/multigame-webapp',
    demo: 'https://multigamearena.games/'
  },
  {
    id: 'weather-app',
    name: 'Weather App',
    tagline: 'MERN Weather Dashboard',
    category: 'MERN Stack',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenWeather API'],
    color: '#0df0ff',
    overview: 'A full-stack weather application built with the MERN stack that provides real-time weather data and 5-day forecasts.',
    features: [
      'Real-time weather tracking and search indexing via OpenWeather API.',
      'Provides 5-day visual forecast charts.',
      'MongoDB storage for user location preferences.'
    ],
    architecture: 'React Client ➔ Express.js Server ➔ OpenWeather API ➔ MongoDB',
    challenges: 'Managing redundant API calls for static weather reports. Resolved by implementing server-side caching of weather queries for 15 minutes.',
    github: 'https://github.com/GeetanshMalik/Weather-App',
    demo: 'https://weather-app-malik-geetansh.vercel.app/'
  },
  {
    id: 'maliks-ai-chatbot',
    name: "Malik's AI Chatbot",
    tagline: 'Voice-Enabled Gemini Bot',
    category: 'AI / NLP',
    tech: ['Gemini AI', 'React', 'Speech API', 'Render', 'Node.js'],
    color: '#7c3aed',
    overview: 'Built an intelligent chatbot application integrating Google\'s Gemini AI with voice interaction capabilities. Deployed on Render and GitHub Pages.',
    features: [
      'Voice-to-text input and text-to-speech feedback using Web Speech API.',
      'Generates real-time conversational responses with Gemini API.',
      'Uptime monitored backend deployed on Render.'
    ],
    architecture: 'React Client (GitHub Pages) ➔ Express Gateway (Render) ➔ Gemini AI',
    challenges: 'Ensuring smooth audio feedback and speech synchronization. Mitigated by handling browser-specific speech synthesizers using queuing state machines.',
    github: 'https://github.com/GeetanshMalik/AI-Chatbot',
    demo: 'https://ai-chatbot-ten-beige-36.vercel.app/'
  },
  {
    id: 'ai-disease-prediction',
    name: 'AI Disease Prediction System',
    tagline: 'ML Diagnosis System',
    category: 'Machine Learning',
    tech: ['Python', 'Streamlit', 'Scikit-learn', 'Machine Learning'],
    color: '#eab308',
    overview: 'An intelligent disease prediction system built with Python and Streamlit that diagnoses 15 common diseases from 45 symptoms with 88% accuracy.',
    features: [
      'Diagnoses 15 common diseases from 45 symptoms using Machine Learning.',
      'High accuracy rate of 88% using classification algorithms.',
      'Simple, clean user dashboard built with Streamlit.'
    ],
    architecture: 'Streamlit UI ➔ Python ML Classifier (Scikit-Learn)',
    challenges: 'Imbalance in symptoms causing skewed classifier results. Solved by balancing training labels using SMOTE (Synthetic Minority Over-sampling Technique).',
    github: 'https://github.com/GeetanshMalik/Disease-Prediction-System',
    demo: 'https://disease-prediction-system-gstndxvprnwbokhhgk5bwq.streamlit.app/'
  },
  {
    id: 'spam-email-detection',
    name: 'Spam Email Detection',
    tagline: 'Naive Bayes Classifier',
    category: 'Machine Learning',
    tech: ['Python', 'Naive Bayes', 'NLP', 'Streamlit'],
    color: '#ef4444',
    overview: 'I\'ve developed and deployed a Spam Email Detection Model to classify emails as spam or ham (not spam) with an impressive accuracy of 80% using Naive Bayes.',
    features: [
      'Uses Naive Bayes Algorithm and Natural Language Processing (NLP).',
      'Achieved 80% accuracy in email classification.',
      'Deploys model instantly via interactive Streamlit widgets.'
    ],
    architecture: 'Streamlit Client ➔ NLTK Text Preprocessing ➔ Naive Bayes Model',
    challenges: 'Noisy email formatting causing false spam positives. Resolved by stripping HTML tags and punctuation before tokenization.',
    github: 'https://github.com/GeetanshMalik/Email-Spam-Detection',
    demo: 'https://spamclassification-geetanshmalik.streamlit.app/'
  },
  {
    id: 'ml-ids',
    name: 'ML-IDS',
    tagline: 'Intrusion Detection System',
    category: 'Cybersecurity',
    tech: ['Python', 'XGBoost', 'XGBoost Classifier', 'AWID Dataset'],
    color: '#2496ed',
    overview: 'A Machine Learning-based Intrusion Detection System using the AWID CLS-R WiFi security dataset and XGBoost classifier. Features tunable detection thresholds.',
    features: [
      'Supervised network intrusion detection using the XGBoost classifier.',
      'Analyzes the AWID CLS-R WiFi security dataset for threat patterns.',
      'Tunable detection thresholds for false positive minimization.'
    ],
    architecture: 'Pandas Preprocessing Pipeline ➔ XGBoost Model ➔ Evaluation Dashboard',
    challenges: 'Handling highly imbalanced network traffic datasets. Solved by applying custom class weighting inside the XGBoost loss function.',
    github: 'https://github.com/GeetanshMalik/ML-IDS',
    demo: 'https://github.com/GeetanshMalik/ML-IDS'
  }
];

// Backwards compatibility mappings
export const flagshipProjects = allProjects.slice(0, 4);
export const archivedProjects = allProjects;

