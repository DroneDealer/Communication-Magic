"use client";

import { useState, useEffect } from "react";

export default function EmojiKeyboard() {
  //we can toggle through the emoji categories here
  const [category, setCategory] = useState("activities");
  const [emojis, setEmojis] = useState([]);
  useEffect(() => {
    //based on the category
    async function loadEmojis(cat) {
      setEmojis([]);
      try {
        const res = await fetch(`/emojis/${cat}.txt`); //load the appropriate file (same name)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const text = await res.text(); //get text
        const list = Array.from(text).filter((e) => e.trim() !== ""); //convert to array
        setEmojis(list);
      } catch (error) {
        console.error(error);
      }
    }
    //get the corresponding emojis :D
    if (category) { //if category has been selected
      loadEmojis(category); 
    }
  }, [category]);

  //when a button is clicked, we handle it here based on mode
  function handleEmojiClick(emoji) {
    alert(`You clicked: ${emoji}`);
  }

  //render template
  return (
    <div style={{display: "grid", gridTemplateColumns: "50% 25% 25%", //3 primary columns :D
        gap: "1rem", minHeight: "100vh", padding: "2rem", boxSizing: "border-box",
      }}>

      <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
        <h2><b>CHAT LOGS COLUMN</b></h2>
        <p>Put your content here.</p>
      </div>
      <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
        <h2><b>ACTION PANEL</b></h2>
        <p>More content here.</p>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
        <h1 style={{ textAlign: "right" }}><b>EMOJI KEYBOARD</b></h1>

        <form style={{ textAlign: "right", marginBottom: "1rem" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="emoji-select"
            style={{ width: "100%" }}
          >
            <option value="activities">activities</option>
            <option value="animals">animals</option>
            <option value="faces">faces</option>
            <option value="food">food</option>
            <option value="items">items</option>
            <option value="nature">nature</option>
            <option value="people">people</option>
            <option value="place">place</option>
            <option value="plants">plants</option>
            <option value="symbol">symbol</option>
          </select>
        </form>

        <div
          id="emoji-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 3 columns inside emoji grid
            gap: "10px",
          }}
        >
          {emojis.map((emoji, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleEmojiClick(emoji)}
              style={{
                fontSize: "2rem",
                cursor: "pointer",
                background: "transparent",
                border: "none",
                padding: 0,
                textAlign: "center",
              }}
              aria-label={`Emoji ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}