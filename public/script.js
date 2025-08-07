body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #1a1a1a;
  font-weight: bold;
}

#chat {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
  text-align: left;
}

.message {
  background-color: #e6e6e6;
  padding: 10px 15px;
  border-radius: 15px;
  margin: 10px 0;
  max-width: 80%;
  word-wrap: break-word;
}

.user {
  background-color: #007bff;
  color: white;
  margin-left: auto;
  text-align: right;
}

.bot {
  background-color: #f1f1f1;
  color: #333;
  text-align: left;
}

.bot strong {
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 25px;
  background-color: #0057e7;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 1;
}

button:hover {
  background-color: #0041b3;
}
