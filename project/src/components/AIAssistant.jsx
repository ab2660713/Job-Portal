import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./AIAssistant.css";

const AI_RESPONSES = {
  greetings: [
    "Hello! I'm your JobPortal AI Assistant. How can I help you today?",
    "Hi there! Ask me anything about jobs, resumes, or interviews.",
  ],
  resume: [
    "Here are some resume tips:\n\n1. Keep it to 1-2 pages max\n2. Use action verbs (Led, Built, Managed)\n3. Quantify achievements (Increased sales by 30%)\n4. Tailor it for each job application\n5. Use a clean, professional format\n6. Include relevant keywords from the job description\n7. Proofread for spelling and grammar errors",
    "For a strong resume:\n\n- Start with a compelling summary\n- List experience in reverse chronological order\n- Focus on accomplishments, not just duties\n- Include technical skills relevant to the role\n- Add links to your portfolio/GitHub if applicable",
  ],
  interview: [
    "Interview preparation tips:\n\n1. Research the company thoroughly\n2. Practice STAR method (Situation, Task, Action, Result)\n3. Prepare 3-5 questions to ask the interviewer\n4. Dress professionally (even for video calls)\n5. Arrive 10-15 minutes early\n6. Follow up with a thank-you email within 24 hours",
    "Common interview questions to prepare:\n\n- Tell me about yourself\n- Why do you want this job?\n- What's your greatest strength/weakness?\n- Where do you see yourself in 5 years?\n- Describe a challenging situation you've handled\n- Why should we hire you?",
  ],
  salary: [
    "Salary negotiation tips:\n\n1. Research market rates on Glassdoor/LinkedIn\n2. Never give a number first if possible\n3. Consider total compensation (benefits, equity, PTO)\n4. Use a range instead of a fixed number\n5. Base your ask on market data, not current salary\n6. Practice your negotiation pitch beforehand",
  ],
  jobsearch: [
    "Job search strategies:\n\n1. Set up job alerts for your target roles\n2. Network on LinkedIn - 70% of jobs are found through networking\n3. Customize your application for each role\n4. Follow up on applications after 1 week\n5. Build an online presence (portfolio, blog)\n6. Consider informational interviews\n7. Don't apply to everything - focus on quality over quantity",
  ],
  skills: [
    "Top skills employers look for in 2024:\n\n- Technical: Cloud computing, AI/ML, Data Analysis, Cybersecurity\n- Soft skills: Communication, Problem-solving, Adaptability, Leadership\n- In-demand: Python, JavaScript, SQL, Project Management\n\nTip: Take online courses on Coursera, Udemy, or free resources like freeCodeCamp to upskill!",
  ],
  employer: [
    "Tips for employers:\n\n1. Write clear, detailed job descriptions\n2. Respond to applications within 48 hours\n3. Keep candidates informed about their status\n4. Offer competitive compensation\n5. Highlight company culture and benefits\n6. Streamline your interview process\n7. Provide constructive feedback to rejected candidates",
  ],
  portal: [
    "Here's how to use JobPortal:\n\n**For Job Seekers:**\n- Upload your resume in the Dashboard > Resume section\n- Browse and search jobs with filters\n- Save interesting jobs for later\n- Apply with cover letter and details\n- Track application status in Dashboard\n\n**For Employers:**\n- Post jobs from Dashboard > Post New Job\n- View applicants and their resumes\n- Shortlist or reject candidates\n- Manage all your job postings",
  ],
  default: [
    "I can help you with:\n\n- Resume tips and writing advice\n- Interview preparation\n- Job search strategies\n- Salary negotiation\n- Skills to learn\n- How to use this portal\n\nJust ask me anything related to these topics!",
    "I'm not sure I understand that. Try asking me about:\n- Resume tips\n- Interview prep\n- Job search help\n- Salary advice\n- Portal features\n- Career skills",
  ],
};

const getAIResponse = (message) => {
  const msg = message.toLowerCase();

  if (msg.match(/hi|hello|hey|namaste|hola/)) {
    return randomPick(AI_RESPONSES.greetings);
  }
  if (msg.match(/resume|cv|bio data/)) {
    return randomPick(AI_RESPONSES.resume);
  }
  if (msg.match(/interview|prepare|question/)) {
    return randomPick(AI_RESPONSES.interview);
  }
  if (msg.match(/salary|pay|compensation|negotiate|package/)) {
    return randomPick(AI_RESPONSES.salary);
  }
  if (msg.match(/job search|find job|apply|job hunt|looking for/)) {
    return randomPick(AI_RESPONSES.jobsearch);
  }
  if (msg.match(/skill|learn|course|upskill|technology/)) {
    return randomPick(AI_RESPONSES.skills);
  }
  if (msg.match(/employer|hire|recruit|post job|candidate/)) {
    return randomPick(AI_RESPONSES.employer);
  }
  if (msg.match(/portal|how to|use|feature|help|guide/)) {
    return randomPick(AI_RESPONSES.portal);
  }
  return randomPick(AI_RESPONSES.default);
};

const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm your JobPortal AI Assistant. Ask me about resumes, interviews, job searching, or how to use this portal!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(userMsg.text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: response },
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-assistant-container">
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-header-info">
              <FaRobot className="ai-header-icon" />
              <div>
                <h4>AI Assistant</h4>
                <span className="ai-status">Online</span>
              </div>
            </div>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-message ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <div className="ai-avatar">
                    <FaRobot />
                  </div>
                )}
                <div className="ai-message-bubble">
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-message bot">
                <div className="ai-avatar">
                  <FaRobot />
                </div>
                <div className="ai-message-bubble typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything..."
            />
            <button className="ai-send-btn" onClick={handleSend} disabled={!input.trim()}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      <button
        className={`ai-fab-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>
    </div>
  );
};

export default AIAssistant;
