// index.js (Backend)
import express from "express";
import fs from "fs";
//import path from "path";
import csv from "csv-parser";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
const PORT = 3001;
const latex = `<ADD YOUR RESUME>`


app.use(cors());

const GROQ_API_KEY = "<ADD API KEY>"; // Put your Groq API key here

const summarizeText = async (text) => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gemma2-9b-it",
      messages: [
        { 
            "role": "system", 
            "content": "You are a helpful assistant that reads professor webpages and summarizes their research interests, education, biography, and recent publications. Then, using the user's resume (provided in LaTeX), generate a personalized and concise email requesting potential research or teaching assistant positions. The email should show strong alignment between the professor's work and the user’s background." 
          }
          ,
          { 
            "role": "user", 
            "content": `Summarize this for an email:\n\n[Professor Webpage Text or Profile Details]${text}\n\nHere is my resume in LaTeX:\n\n[LaTeX resume content]${latex}`
          }
          ,
      ],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
};

const extractSections = ($, title) => {
  const headers = $(".accordion-item");
  let result = "";
  headers.each((_, el) => {
    const headerText = $(el).find(".accordion-header").text().trim().toLowerCase();
    if (headerText.includes(title.toLowerCase())) {
      result = $(el).find("ul, p").text().trim();
    }
  });
  return result || null;
};

app.get("/api/professors", async (req, res) => {
  const results = [];
  const csvFilePath = '/Users/vishwanthreddyjakka/sendEmailsAIAgent/backend/professors.csv';

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      const summaries = [];

      for (const professor of results) {
        try {
          const response = await fetch(professor["Bio URL"]);
          const html = await response.text();
          const $ = cheerio.load(html);

          const research = extractSections($, "Research interests");
          const education = extractSections($, "Education");
          const biography = extractSections($, "Biography");
          const publications = extractSections($, "Recent publications");

          const combined = `Research: ${research}\nEducation: ${education}\nBiography: ${biography}\nPublications: ${publications}`;
          const summary = await summarizeText(combined);

          summaries.push({
            name: professor.Name,
            title: professor.Title,
            bioUrl: professor["Bio URL"],
            imageUrl: professor["Image URL"],
            campus: professor.Campus,
            email: professor.Email,
            summary,
          });
        } catch (err) {
          console.error(`Error for ${professor.Name}:`, err.message);
        }
      }

      res.json(summaries);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
