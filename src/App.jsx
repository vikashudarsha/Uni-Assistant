import React, {useState} from 'react';

import './index.css'
// import './App.css'
function App() {

  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSend = async () => {
    if (!input) return;
    setLoading(true);
    setResponse("");

    try{

      const res = await fetch("http://localhost:11434/api/generate", {

        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({

          model: "qwen2.5-coder:7b",
          prompt: input,
          stream:false

        })

      });
         
      const data = await res.json();
      setResponse(data.response);

    } catch(error){
      console.error("Error fetching data:", error);
      setResponse("Error: Could not connect to ollama.");
    }finally{
      setLoading(false);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

return (

  <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
    <h1 className="text-4xl font-bold mb-8 text-blue-400"> Uni Assistant 
    </h1>
{/* Chat Display Area */}
<div className="w-full max-w-2xl bg-gray-800 rounded-lg p-6 mb-6 min-h-[300px] shadow-lg border-gray-700">
  {loading ? (
    <p className="text-gray-400 animate-pulse">Thinking...</p>
  ):(
    <p className="whitespace-pre-wrap">{response || "Ask me anything..."}</p>

  )}

</div>

{/* Input Area */}
<div className="w-full max-w-2xl flex gap-2">
  <input
    type="text"
    value={input}
    onKeyDown={handleKeyDown}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Enter your prompt here..."
    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
  
  />
  <button
  onClick={handleSend}
  disabled={loading}
  className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full font-semibold transition">
    {loading ? "..." : "Send"}
  </button>
</div>


  </div>

);

}

export default App;
