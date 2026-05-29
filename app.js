const messages = document.getElementById("messages");
const input = document.getElementById("input");

// Permite enviar mensagem com Enter
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

if (!localStorage.getItem("sessionId")) {
  localStorage.setItem(
    "sessionId",
    crypto.randomUUID()
  );
}

function scrollMessagesToBottom() {
  requestAnimationFrame(() => {
    messages.scrollTop = messages.scrollHeight;
    messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
    const last = messages.lastElementChild;
    if (last) {
      last.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender;
  
  if (sender === "assistant") {
    // Converte \n em <br> e mantém a formatação de negrito
    const formatted = text
      .replace(/\\n/g, '<br>')
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    div.innerHTML = formatted;
  } else {
    div.textContent = text;
  }
  
  messages.appendChild(div);
  scrollMessagesToBottom();
}

async function sendMessage() {

  const text = input.value.trim();

  // Não permite enviar mensagens vazias
  if (!text) {
    return;
  }

  addMessage(text, "user");

  input.value = "";

  const response = await fetch(
    "https://n8n-marcio.duckdns.org/webhook/chat-rh",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text,
        sessionId: localStorage.getItem("sessionId")
      })
    }
  );

  const data = await response.json();

  const formatted = data.output
    .replace(/\\n/g, '<br>')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  addMessage("<br>" + formatted + "<br><br>", "assistant");
}