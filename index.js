require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
app.use(cors({
  origin: 'https://package-pilot-isvkwsyn5-alexs-projects-33383354.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());
const { promptFormater } = require("./src/utl/prompt");

app.get("/",async (req, res) => {
  res.send("Travel guide API is running");  
});

app.post("/api/travel-guide", async (req, res) => {
  const prompt = await promptFormater(req.body);

  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar-pro",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  res.json(JSON.parse(data.choices[0]?.message?.content));
});

app.listen(PORT, () => {
  console.log(`Travel guide API server running on http://localhost:${PORT}`);
});
