body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.chat-container {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 30px 20px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: #1a1a1a;
  font-size: 28px;
  margin-bottom: 20px;
}

#nameInput,
#messageInput {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
  box-sizing: border-box;
}

/* Botões lado a lado e centralizados */
.button-group {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.button-group button {
  flex: 1;
  min-width: 100px;
  padding: 12px;
  background-color: #1e40af;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-group button:hover {
  background-color: #1a3691;
}

.chat-box {
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
  text-align: left;
  padding-right: 5px;
}

.message {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f1f1f1;
}

.message strong {
  color: #1e40af;
  font-weight: bold;
}

.user-message {
  background-color: #dbeafe;
  text-align: right;
}
