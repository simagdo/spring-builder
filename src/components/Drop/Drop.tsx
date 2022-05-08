import React, {ReactNode, useRef, useState} from "react";
import Tile from "../Tile/Tile";
import DragMove from "../DragMove/DragMove";

type Props = {
    children?: ReactNode
}

const Drop = ({children}: Props) => {

    const [content, setContent] = useState<HTMLElement>();
    const [translate, setTranslate] = useState({
        left: 0,
        top: 0
    });

    const handleDragMove = (event: React.DragEvent<HTMLElement>) => {
        setTranslate({
            top: translate.top + event.movementY,
            left: translate.left + event.movementX
        })
    }

    // This function will be triggered when dropping
    const dropHandler = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        console.log(data);

        setTranslate({
            top: event.movementY,
            left: event.movementX
        });

        const tile = <div
            style={{
                position: 'absolute',
                top: `${translate.top}px`,
                left: `${translate.left}px`
            }}>
            <Tile name="Test" icon=""/>
        </div>

        console.log(translate)

        const t = <DragMove
            onDragMove={handleDragMove}>
            <div
                style={{
                    transform: `translateX(${translate.top}px) translateY(${translate.left}px)`
                }}>
                <Tile name={data} icon=""/>
            </div>
        </DragMove>

        // @ts-ignore
        setContent(t);
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