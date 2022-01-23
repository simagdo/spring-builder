import React from 'react';
import './App.sass';
import AvailableEntities from "./components/AvailableEntities/AvailableEntities";
import Drop from "./components/Drop/Drop";

function App() {

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
