import { useState, useEffect, useRef, useMemo } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import "./styles/MarkdownPreviewer.css";

export default function MarkdownPreviewer() {
  const [markdownText, setMarkdownText] = useState("_Welcome..._");
  const textAreaRef = useRef(null);

  // Load Markdown from Local Storage
  useEffect(() => {
    const savedMarkdown = localStorage.getItem("markdownContent");
    if (savedMarkdown) {
      setMarkdownText(savedMarkdown);
    }
    textAreaRef.current.focus(); // Auto-focus textarea on load
  }, []);

  // Save Markdown to Local Storage
  useEffect(() => {
    localStorage.setItem("markdownContent", markdownText);
  }, [markdownText]);

  function handleTextAreaChange(e) {
    setMarkdownText(e.target.value);
  }

  // Optimize Markdown Parsing
  const rawHTML = useMemo(
    () => DOMPurify.sanitize(marked(markdownText)),
    [markdownText]
  );

  return (
    <div className="main-container">
      <h1>Markdown Previewer</h1>

      <label htmlFor="editor">Editor</label>
      <textarea
        ref={textAreaRef}
        id="editor"
        rows={10}
        cols={50}
        value={markdownText}
        onChange={handleTextAreaChange}
      ></textarea>

      <label htmlFor="preview">Preview</label>
      <div
        id="preview"
        style={{ overflowX: "auto" }}
        dangerouslySetInnerHTML={{ __html: rawHTML }}
      ></div>
    </div>
  );
}
