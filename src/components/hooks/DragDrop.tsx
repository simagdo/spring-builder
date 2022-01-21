import React, {useState} from "react";

export default function DragDrop() {

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

}