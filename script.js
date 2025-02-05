const apiKey = "AIzaSyAGDUHZwjYMsUkUO5lWc95pnu96H4WUCNo";  // Replace with your actual Gemini API key
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
  userInput.value = "";

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "contents": [{
          "parts": [{
            "text": message
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Accessing the text from the first candidate response
    const reply = data.candidates[0].content.parts[0].text;

    chatBox.innerHTML += `<div><strong>Gemini 1.5:</strong> ${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    chatBox.innerHTML += `<div><strong>Error:</strong> ${error.message}</div>`;
  }
}
