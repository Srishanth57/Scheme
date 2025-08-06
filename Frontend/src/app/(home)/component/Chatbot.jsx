import { useEffect } from 'react';

function Chatbot() {

  useEffect(() => {
    
    const injectScript = document.createElement("script");
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.2/inject.js";
    injectScript.async = true;
    document.body.appendChild(injectScript);

 
    injectScript.onload = () => {
      const configScript = document.createElement("script");
      configScript.src = "https://files.bpcontent.cloud/2025/07/23/13/20250723131832-S1MS7YVT.js";
      configScript.async = true;
      document.body.appendChild(configScript);
    };
  }, []);

  return (
    <div className="App">
      <h1> Botpress Chatbot</h1>
    </div>
  );
}

export default Chatbot;