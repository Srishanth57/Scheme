import { useEffect, useState } from "react";
// Remove dotenv and GoogleGenAI imports from frontend!

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getAgricultureSchemes() {
      try {
        const response = await fetch("/src/api/dashboard/agriculture");
        if (!response.ok) throw new Error("Failed to fetch");
        const fetchedData = await response.json();
        setData(fetchedData);
        console.log("Fetched:", fetchedData);
      } catch (err) {
        console.error("Error fetching agriculture schemes:", err);
      }
    }
    getAgricultureSchemes();
  }, []);

  // You should call Gemini API from your backend, not frontend!
  async function handleGeminiSort() {
    const res = await fetch("/api/gemini-sort", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schemes: data }),
    });
    const result = await res.json();
    console.log(result);
  }

  return (
    <div>
      <button onClick={handleGeminiSort} disabled={!data}>
        Sort Schemes with Gemini
      </button>
    </div>
  );
}

export default App;