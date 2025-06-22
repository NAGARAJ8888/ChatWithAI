import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const [code, setCode] = useState(``)
  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    if (!code.trim()) return alert("Please enter some code.")
    try {
      const response = await axios.post('https://jade-rolypoly-df8cc7.netlify.app/ai/get-review', { code })
      setReview(response.data)
    } catch (err) {
      console.error("Error fetching review:", err)
      setReview("❌ Failed to get review. Please try again.")
    }
  }

  return (
    <div className="container-fluid min-vh-100 p-3 bg-light">
      <h1 className="text-center mb-4 fw-bold text-primary">Code Review Tool</h1>
      <div className="row">
        {/* Code Editor */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-dark text-white">
              <strong>Write Your Code</strong>
            </div>
            <div className="card-body p-0" style={{ height: '60vh', overflow: 'auto' }}>
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  minHeight: "100%",
                  outline: "none"
                }}
              />
            </div>
            <div className="card-footer text-end">
              <button className="btn btn-primary" onClick={reviewCode}>Review</button>
            </div>
          </div>
        </div>

        {/* Review Output */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-secondary text-white">
              <strong>AI Review</strong>
            </div>
            <div className="card-body overflow-auto" style={{ height: '60vh' }}>
              <Markdown rehypePlugins={[rehypeHighlight]}>
                {review}
              </Markdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
