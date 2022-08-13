import React from "react";
import SideBar from "./components/SideBar";
import Editor from "./components/Editor";

const App = () => {
  return (
    <main className="flex overflow-hidden">
      <div id="Side Bar" className="w-[25%] h-screen overflow-y-scroll z-50">
        <SideBar />
      </div>
      <div id="EditorContainer" className="w-[75%] h-screen z-0 relative">
        <Editor />
      </div>
    </main>
  );
};

export default App;
