import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SubmitButton from '../components/SubmitButton';

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-start;
`;

const Description = styled.div`
flex: 2;
padding-right: 20px;  // Give some space between description and video
`;

const VideoFrame = styled.iframe`
flex: 1;  // Take up equal space as the description
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const LeftPanel = styled.div`
  flex: 1;
  padding-right: 20px;  // Give some space between panels
`;

const RightPanel = styled.div`
  flex: 1;
  padding-left: 20px;  // Give some space between panels
`;


const DocumentPanel = styled.div`
  width: 100%;
  height: 500px;  // Adjust height as needed
  border: 1px solid #ccc;  // Give it a border
  padding: 10px;
  overflow: auto;  // Allow scrolling if content exceeds the height
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;  
`;

const Label = styled.label`
  flex: 1;
  text-align: center; 
  margin-right: 20px;  
  align-self: flex-start;
`;

const LargeInput = styled.textarea`
  flex: 2;
  height: 100px;  // Adjust height as needed
  margin-bottom: 10px;  // Space between input boxes
  resize: vertical;  // Allow vertical resizing
`;

const ButtonContainer = styled.div`
display: flex;
justify-content: center;
margin-top: 20px; // Adjust as needed for spacing
`;


const labelTexts = ["Who is your ideal customer? Be very specific. What annoys them? What keeps them up at night? What will get them promoted?",
  "What is their challenge or pain or frustration? What time of day does it happen? What language does the user say when this happens?",
  "How would you describe to Oprah Winfrey what your product is and the single most important benefit for this customer? How would they describe a magical experience with your product?",
  "How will your user experience your product? Is it an app, website, or physical product?",
  "If the product were perfect, what should the user do right now to get access to your product?"
];

const defaultTexts = ["First time dog owners, especially couples who are testing their relationship and future parenting skills. They don't know it yet, but they are willing to spend hundreds a month on this member of their family.",
  "They hate getting up early to walk their dog, espeically when it's cold and dark outside in the morning.",
  "The robotic dogwalker takes away the daily grind of walking your dog. It's like having a personal assistant for your dog.",
  "The robotic dogwalker is a lightweight device that attaches to your dog's collar. It has a built-in GPS and a small motor that can be programmed to walk your dog at a certain time of day. It also has a built-in camera so you can see your dog's walk in real-time.",
  "The robotic dogwalker will be available at robotdogwalker.com, Amazon and Petsmart stores."]

export default function Form() {
  const [fields, setFields] = useState(defaultTexts);
  const [serverResponse, setServerResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  let controller = new AbortController(); // Outside the function to retain reference for cleanup

  const handleSubmit = async () => {
    const formData = labelTexts.map((label, index) => ({
      label: label,
      value: fields[index]
    }));

    const signal = controller.signal;

    const response = await fetch('api/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      signal
    });


    const reader = response.body.getReader();
    let decoder = new TextDecoder();
    let dataBuffer = '';

    console.log('post sent, response recived, reader created')

    reader.read().then(function processStream({ done, value }) {
      console.log('processStream called with done: ', done, 'value: ', value)
      if (done) {
        setIsStreaming(false);
        return;
      }

      console.log(value)
      // Decode the stream chunk and append to buffer
      dataBuffer += decoder.decode(value, { stream: true });

      // Split by double newline which indicates end of an SSE message
      let messages = dataBuffer.split('\n\n');

      for (let i = 0; i < messages.length - 1; i++) {
        let message = messages[i];
        console.log('got message: ', i, message)
        if (message.startsWith("data: ")) {
          let eventData = message.replace("data: ", "");
          // Handle the SSE data
          console.log(eventData);
          setServerResponse(prevResponse => prevResponse + eventData);
        }
      }

      // Keep the last partial message in the buffer
      dataBuffer = messages[messages.length - 1];

      // Continue processing the stream
      return reader.read().then(processStream).catch(error => {
        console.error("Stream error:", error);
      });
    });


    setIsStreaming(true);
  };

  useEffect(() => {
    return () => {
      if (isStreaming) {
        controller.abort();
      }
    };
  }, [isStreaming]);

  return (
    <div className="main-form">

      {/* Header */}
      <h1>Working Backwards: The Amazon Product Development Process</h1>
      <h2>The First Step: The Mock Press Release</h2>

      <Container>
        {/* Description */}
        <Description>
          <p>Amazon adheres to a "Working Backwards" approach when developing products.
            The first step is to draft a mock press release. </p>

          <p>This serves two purposes:
            <li>Ensures a focus on customer benefits. </li>
            <li>Easy to iterate on compared to a PRD or code. </li>
          </p>
        </Description>

        {/* Embedded YouTube Video */}
        <VideoFrame
          width="200"
          height="200"
          src="https://www.youtube.com/embed/aFdpBqmDpzM?si=0sn97J0zN8H8pw40"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Container>

      <h2>Describe your product here</h2>
      <p>Write instinctively, without worring about grammar or structure. </p>

      <FormContainer>
        {/* Left Panel with Input Fields */}
        <LeftPanel>
          {fields.map((field, index) => (
            <InputContainer key={index}>
              <Label htmlFor={`field_${index}`}>{labelTexts[index]}</Label>
              <LargeInput
                id={`field_${index}`}
                value={field}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[index] = e.target.value;
                  setFields(newFields);
                }}
              />
            </InputContainer>
          ))}
          <ButtonContainer>
            <SubmitButton onClick={handleSubmit}>
              Generate
            </SubmitButton>
          </ButtonContainer>
        </LeftPanel>

        {/* Right Panel with Document Panel */}
        <RightPanel>
          <DocumentPanel>
            <div dangerouslySetInnerHTML={{ __html: serverResponse }} />
          </DocumentPanel>
        </RightPanel>
      </FormContainer>

    </div >
  );
}
