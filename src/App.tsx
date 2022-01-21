import React, {useState} from 'react';
import './App.sass';
import AvailableEntities from "./components/AvailableEntities/AvailableEntities";
import Drag from "./components/Drag/Drag";
import Drop from "./components/Drop/Drop";

function App() {

    const PHOTO_URL =
        "https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg";

    const [content, setContent] = useState<string>("Drop something here");

    // This function will be triggered when you start dragging
    const dragStartHandler = (
        event: React.DragEvent<HTMLDivElement>,
        data: string
    ) => {
        event.dataTransfer.setData("text", data);
    };

    // This function will be triggered when dropping
    const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        setContent(data);
    }

    // This makes the third box become droppable
    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

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
                    <Drag id="Box1">
                        <img src={PHOTO_URL}/>
                    </Drag>
                    <Drop>
                        <div >

                        </div>
                    </Drop>
                </div>

            </div>
            <div className="Right-Sidebar">
                <h1>Right Sidebar</h1>
            </div>
        </div>
    );
}

export default App;
