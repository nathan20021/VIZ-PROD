import React from "react";
import SideBar from "./components/SideBar";
import Editor from "./components/Editor";
const App = () => {
  return (
    <main className="flex overflow-hidden">
      <div id="Side Bar" className="w-[25%] h-screen overflow-y-scroll">
        <SideBar />
      </div>
      <div className="w-[75%] h-screen overflow-hidden">
        <Editor />
      </div>
    </main>
  );
};

export default App;
