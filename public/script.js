body {
  font-family: Arial, sans-serif;
  background: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80') no-repeat center center fixed;
  background-size: cover;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.chat-container {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 90%;
  width: 100%;
  text-align: center;
}

h1 {
  margin-top: 0;
  font-size: 2rem;
  color: #333;
  font-weight: bold;
}

#chat-box {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  text-align: left;
}

.message {
  margin-bottom: 1rem;
}

.message.user {
  text-align: right;
}

.message.jesus {
  text-align: left;
}

.message span {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  max-width: 70%;
  word-wrap: break-word;
}

.message.user span {
  background-color: #d1e7dd;
}

.message.jesus span {
  background-color: #f8d7da;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

input[type="text"] {
  width: 100%;
  padding: 1rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
}

button {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 20px;
  background-color: #1e40af;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  flex: 1;
}

button:hover {
  background-color: #3b82f6;
}

@media (max-width: 600px) {
  .chat-container {
    padding: 1rem;
  }

  .button-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}
