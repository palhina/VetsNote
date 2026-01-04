import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");

  const submit = async () => {
    await fetch("http://localhost/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setName("");
    alert("送信しました");
  };

  return (
    <div>
      <h1>User Create</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前"
      />

      <button onClick={submit}>送信</button>
    </div>
  );
}

export default App;
