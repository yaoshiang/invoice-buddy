import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { BsPaperclip, BsArrowUp } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';

const initial_messages = [
  {
    sender: "LexIntel",
    message:
      "Hello! Let's start drafting. What kind of document would you like to draft? I can help with:\n\n" +
      "- Demand letters for wrongful eviction\n" +
      "- Demand letters for return of deposit (coming soon)\n" +
      "- Demand letters for illegal rent increase (coming soon)\n" +
      "- Demand letters for maintenance issues (coming soon)"
  },
  {
    sender: "You",
    message: "wrongful eviction"
  },
  {
    sender: "LexIntel",
    message: "Great! First, I'll need a statement of facts. Upload or type it out below."
  }
  // ... more messages
];

const ChatWindow = () => {
  const [chatLog, setChatLog] = useState(initial_messages);
  const [messageText, setMessageText] = useState('');

  const addMessageToChatLog = (sender, newMessage) => {
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      {
        sender: sender,
        message: newMessage
      }
    ]);
  };

  const handleClick = async () => {
    // Define your API endpoint
    const apiEndpoint = 'api/log';

    try {

      if (messageText.trim()) {
        addMessageToChatLog("You", messageText);
        // Clear the message input
        setMessageText('');
      }

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatContent: chatLog }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle the response data
      const data = await response.json();
      console.log(data);
      // Process the data as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (

    <div className="card border-secondary p-1 m-1 h-100">
      <div className="d-flex flex-column h-100 ">
        <div id="chat-log" className="chat-log d-flex flex-column justify-content-end flex-grow-1">
          {chatLog.map((msg, index) => (
            <div key={index} className="text-start">
              <b>{msg.sender}: </b>
              <ReactMarkdown>{msg.message}</ReactMarkdown>

            </div>
          ))}

        </div>
      </div>


      <InputGroup className="mb-3">
        <InputGroup.Text>
          <BsPaperclip />
        </InputGroup.Text>
        <Form.Control
          type="textarea"
          placeholder="Type a message..."
          style={{ maxHeight: '100px' }}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />

        <Button variant="outline-secondary" onClick={handleClick}>
          <BsArrowUp />
        </Button>
      </InputGroup>
    </div >

  );
};

export default ChatWindow;
