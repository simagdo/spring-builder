import React, {RefObject, useEffect, useState} from "react";

type Props = {
    ref: RefObject<HTMLDivElement>,
    onDrop: any
}

export default function useDrop({ref, onDrop}: Props) {

    const [dropState, updateDropState] = useState<string>("droppable");

    const dropOver = (event: React.DragEvent<HTMLDivElement>): any => {
        event.preventDefault();
        updateDropState("dragging over");
    }

    const drop = (event: React.DragEvent<HTMLDivElement>): any => {
        event.preventDefault();
        onDrop(event.dataTransfer.getData("source"));
        updateDropState("dropped");
    }

    useEffect(() => {
        const element = ref.current;
        if (element) {
            // @ts-ignore
            element.addEventListener("dragover", dropOver);
            // @ts-ignore
            element.addEventListener("drop", drop);

            return () => {

                // @ts-ignore
                element.removeEventListener("dragover", dropOver);

                // @ts-ignore
                element.removeEventListener("drop", drop);
            }
        }
    })

}