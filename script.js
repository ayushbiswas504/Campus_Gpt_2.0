async function sendMessage() {
  let user_input = document.getElementById("user_input").value.trim();
  if (!user_input) return;

  let chatbox = document.getElementById("chatbox");

  // Add user message
  let userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerText = user_input;
  chatbox.appendChild(userMsg);

  // Scroll down
  chatbox.scrollTop = chatbox.scrollHeight;

  try {
    // Fetch from backend (example endpoint)
    let response = await fetch("http://localhost:8000/get_timetable");
    let data = await response.json();

    // Add bot message
    let botMsg = document.createElement("div");
    botMsg.className = "message bot";
    botMsg.innerText = JSON.stringify(data);
    chatbox.appendChild(botMsg);
  } catch (error) {
    let errorMsg = document.createElement("div");
    errorMsg.className = "message bot";
    errorMsg.innerText = "⚠ Error connecting to server.";
    chatbox.appendChild(errorMsg);
  }

  // Clear input
  document.getElementById("user_input").value = "";

  // Auto scroll
  chatbox.scrollTop = chatbox.scrollHeight;
}
// Load Google Generative AI
const genAI = new window.GoogleGenerativeAI.GoogleGenerativeAI(
  "AIzaSyCXDr6gfud10cW9LzMBYGWggtQCcljx5Ko"
);

async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");

  let userMessage = inputField.value.trim();
  if (!userMessage) return;

  // Display user message
  let userDiv = document.createElement("div");
  userDiv.className = "user-message";
  userDiv.textContent = "🧑: " + userMessage;
  chatbox.appendChild(userDiv);

  inputField.value = "";

  try {
    // Use Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(userMessage);

    const botReply = result.response.text();

    let botDiv = document.createElement("div");
    botDiv.className = "bot-message";
    botDiv.textContent = "🤖: " + botReply;
    chatbox.appendChild(botDiv);

    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (error) {
    console.error("Chatbot error:", error);
    let errorDiv = document.createElement("div");
    errorDiv.className = "bot-message error";
    errorDiv.textContent = "⚠ Sorry, something went wrong!";
    chatbox.appendChild(errorDiv);
  }
}