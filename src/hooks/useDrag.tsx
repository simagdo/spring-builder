import React, {RefObject, useEffect, useState} from "react";

type Props = {
    id: string,
    effect: DataTransfer["dropEffect"],
    ref: RefObject<HTMLDivElement>,
    onDragStart: any,
    onDragOver: any,
    onDragEnd: any
}

export default function useDrag({id, effect, ref, onDragStart, onDragOver, onDragEnd}: Props) {
    const [dragState, updateDragState] = useState<string>("draggable");

    const drag = (event: React.DragEvent<HTMLDivElement>): void => {
        updateDragState("dragStart");
        event.dataTransfer.dropEffect = effect;
        event.dataTransfer.setData("source", id);
        onDragStart && onDragStart()
    }

    const dragStart = (event: React.DragEvent<HTMLDivElement>): any => {
        updateDragState("dragStart");
        event.dataTransfer.dropEffect = effect;
        event.dataTransfer.setData("source", id);
        onDragStart && onDragStart()
    }

    const dragOver = () => {
        updateDragState("dragging");
        onDragOver && onDragOver()
    }

    const dragEnd = () => {
        updateDragState("draggable");
        onDragEnd && onDragEnd()
    }

    useEffect(() => {
        const element = ref.current;

        if (element) {
            element.setAttribute("draggable", String(true));
            // @ts-ignore
            element.addEventListener("dragstart", dragStart);
            element.addEventListener("dragover", dragOver);
            element.addEventListener("dragend", dragEnd);

            return () => {
                // @ts-ignore
                element.removeEventListener("dragstart", dragStart);
                element.removeEventListener("dragover", dragOver);
                element.removeEventListener("dragend", dragEnd);
            }

        }

    })

}