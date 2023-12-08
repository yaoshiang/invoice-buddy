import React, { useState, useEffect, useRef } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

function DocumentEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    const editorNode = editor.current;
    if (editorNode) {
      editorNode.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [editorState]);

  return (
    <div className="editor-container" style={{ height: '100%', overflow: 'auto' }}>
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        ref={editor}
      />
    </div>
  );
}

export default DocumentEditor;
