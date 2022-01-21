import React, {ReactNode, useState} from "react";

type Props = {
    children: ReactNode
}

const Drop = ({children}: Props) => {

    const [content, setContent] = useState<HTMLElement>();

    // This function will be triggered when dropping
    const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        console.log(data);
        const draggedElement = document.getElementById(data);
        // @ts-ignore
        setContent(draggedElement);
    }

    // This makes the third box become droppable
    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    return (
        <div
            className="Box3"
            onDragOver={allowDrop}
            onDrop={dropHandler}>
            {content}
        </div>
    );

}

export default Drop;