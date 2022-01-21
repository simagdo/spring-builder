import React, {ReactNode} from "react";

type Props = {
    children: ReactNode,
    id: string
}

const Drag = ({children, id}: Props) => {

    const dragStartHandler = (
        event: React.DragEvent<HTMLDivElement>
    ) => {
        event.dataTransfer.setData("text/plain", id)
    }

    return (
        <div
            draggable={true}
            onDragStart={(event) => dragStartHandler(event)}>
            {children}
        </div>
    );

}

export default Drag;