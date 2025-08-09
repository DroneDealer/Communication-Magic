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

      <div style={{ border: "1px solid #ccc", padding: "1rem", display: "flex", flexDirection: "column" }}>
        <h2><b>ACTION PANEL</b></h2>

        {/* Video Window */}
        <div style={{
            width: "100%",
            aspectRatio: "16 / 9",
            backgroundColor: "black",
            border: "1px solid #444",
            margin: "1rem 0"
        }}></div>

        {/* Control Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1rem" }}>
            <button>Start</button>
            <button>Stop</button>
            <button>Approve</button>
            <button>Discard</button>
        </div>
        
        <div style={{ marginTop: "auto" }}>
            <button style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}>Merge</button>
            <img 
                src="/waves.png"
                alt="Ocean waves" 
                style={{ width: "100%", height: "150px", display: "block" }} 
            />
        </div>
      </div>

      <div
  style={{
    border: "1px solid #ccc",
    padding: "1rem",
    height: "calc(100vh - 4rem)",  // fixed height same as before
    display: "flex",
    flexDirection: "column",
  }}
>
  <h1 style={{ textAlign: "right" }}><b>EMOJI KEYBOARD</b></h1>

  <form style={{ textAlign: "right", marginBottom: "1rem" }}>
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      id="emoji-select"
      style={{ width: "100%" }}
    >
      {/* options */}
    </select>
  </form>

  <div
    id="emoji-grid"
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "10px",
      flexGrow: 1,            // take remaining space in column
      overflowY: "auto",     // vertical scroll inside emoji grid
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
      <img src="/book.png" 
        alt="BOOK" 
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 'auto',
            zIndex: -1,
            pointerEvents: 'none'
        }}/>
    </div>
  );
}