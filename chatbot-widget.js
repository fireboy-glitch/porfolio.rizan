const style = document.createElement("style");
style.innerHTML = `
.hamburger {
  display: none;
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
}
.hamburger div {
  width: 26px;
  height: 3px;
  background-color: #0a66c2;
  margin: 5px 0;
  transition: all 0.3s;
}
nav {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
  background: white;
  padding: 15px 10px;
  font-family: 'Poppins', sans-serif;
}
nav a {
  text-decoration: none;
  color: #0a66c2;
  font-weight: 500;
  font-size: 16px;
  transition: color 0.2s;
}
nav a:hover {
  color: #083c7b;
}
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    display: none;
    text-align: center;
  }
  nav.active {
    display: flex;
  }
  .hamburger {
    display: block;
  }
}

#chatbot-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #0a66c2;
  color: white;
  border: none;
  padding: 14px 16px;
  border-radius: 50%;
  font-size: 18px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  cursor: pointer;
  z-index: 1000;
}

#chatbot {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 310px;
  max-height: 400px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  display: none;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
  font-family: 'Poppins', sans-serif;
}

#chat-header {
  background: #0a66c2;
  color: white;
  padding: 12px;
  font-weight: 600;
  text-align: center;
}

#chat-body {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user, .bot {
  padding: 10px 12px;
  border-radius: 12px;
  max-width: 85%;
  word-wrap: break-word;
}

.user {
  background: #daf1ff;
  align-self: flex-end;
}

.bot {
  background: #f0f0f0;
  align-self: flex-start;
}

#chat-input-area {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
}

#chat-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-family: inherit;
}

#send-btn {
  background: #0a66c2;
  color: white;
  border: none;
  padding: 0 14px;
  margin-left: 8px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}
`;
document.head.appendChild(style);

const hamburger = document.createElement("div");
hamburger.className = "hamburger";
hamburger.innerHTML = `<div></div><div></div><div></div>`;
hamburger.onclick = toggleMenu;
document.body.appendChild(hamburger);

const nav = document.createElement("nav");
nav.id = "main-nav";
nav.innerHTML = `
  <a href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#projects">Projects</a>
  <a href="#contact">Contact</a>
`;
document.body.appendChild(nav);

const chatbotDiv = document.createElement("div");
chatbotDiv.innerHTML = `
  <button id="chatbot-toggle">💬</button>
  <div id="chatbot">
    <div id="chat-header">Ask Me Anything</div>
    <div id="chat-body"></div>
    <div id="chat-input-area">
      <input type="text" id="chat-input" placeholder="Type here..." />
      <button id="send-btn">➤</button>
    </div>
  </div>
`;
document.body.appendChild(chatbotDiv);

const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotBox = document.getElementById("chatbot");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

chatbotToggle.addEventListener("click", () => {
  chatbotBox.style.display = chatbotBox.style.display === "flex" ? "none" : "flex";
  chatbotBox.style.flexDirection = "column";
});

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msg = chatInput.value.trim();
  if (msg === "") return;
  appendMessage("user", msg);
  chatInput.value = "";
  setTimeout(() => {
    const reply = generateBotResponse(msg);
    appendMessage("bot", reply);
  }, 400);
}

function appendMessage(role, text) {
  const bubble = document.createElement("div");
  bubble.className = role;
  bubble.textContent = text;
  chatBody.appendChild(bubble);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function generateBotResponse(input) {
  const lower = input.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi")) return "Hey there! How can I help you today?";
  if (lower.includes("name")) return "I'm your personal assistant here on Rizan's site.";
  if (lower.includes("project")) return "You can scroll down to see Rizan's cool projects!";
  if (lower.includes("contact")) return "Try the contact form or reach out via social media!";
  return "I'm still learning to chat better, check the menu above for more!";
}

function toggleMenu() {
  document.getElementById("main-nav").classList.toggle("active");
}
