import React, { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on('message_history', setMessages);
    socket.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
    });
    socket.on('user_typing', setTyping);
    socket.on('stop_typing', () => setTyping(''));

    return () => {
      socket.off('message_history');
      socket.off('new_message');
      socket.off('user_typing');
      socket.off('stop_typing');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit('send_message', {
        username,
        message: newMessage
      });
      setNewMessage('');
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (e.target.value.trim()) {
      socket.emit('typing', username);
    } else {
      socket.emit('stop_typing');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <h1>Добро пожаловать в чат</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            setIsLoggedIn(true);
          }}>
            <input
              type="text"
              placeholder="Введите ваше имя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="username-input"
            />
            <button type="submit" className="login-btn">Войти</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>Чат {username} <button onClick={() => setIsLoggedIn(false)}>Выйти</button></h2>
      </header>
      
      <div className="messages-container">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.username === username ? 'own' : 'other'}`}>
            <strong>{msg.username}: </strong>
            {msg.text}
            <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
        {typing && <div className="typing">{typing} печатает...</div>}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          placeholder="Введите сообщение..."
          className="message-input"
        />
        <button type="submit" className="send-btn">Отправить</button>
      </form>
    </div>
  );
}

export default App;
