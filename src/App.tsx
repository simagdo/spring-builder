import React from 'react';
import './App.sass';
import AvailableEntities from "./components/AvailableEntities/AvailableEntities";
import Drop from "./components/Drop/Drop";
import {useDarkMode} from "usehooks-ts";

function App() {

    const {isDarkMode, toggle, enable, disable} = useDarkMode();
    console.log(`Dark Mode: ${isDarkMode}`)

    return (
        <div className="Grid-Container">
            <div className="Left-Sidebar">
                <h1>Left Sidebar</h1>
                <AvailableEntities/>
            </div>
            <div className="Topbar">
                <h1>Top Bar</h1>
            </div>
            <div className="Main">
                <h1>Main</h1>

                <div className="DragDrop-Container">
                    <Drop/>
                </div>

            </div>
            <div className="Right-Sidebar">
                <h1>Right Sidebar</h1>
            </div>
        </div>
    );
}

export default App;
