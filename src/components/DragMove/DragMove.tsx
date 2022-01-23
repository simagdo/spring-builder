import React, {CSSProperties, useState} from "react";

type PointerDown = React.DragEvent<HTMLElement>;

type Props = {
    onPointerDown?: (e: PointerDown) => void,
    onPointerUp?: (e: PointerDown) => void,
    onPointerMove?: (e: PointerDown) => void,
    onDragMove?: (e: PointerDown) => void,
    children: React.ReactNode,
    style?: CSSProperties,
    className?: string
}

export default function DragMove({
                                     onPointerDown,
                                     onPointerUp,
                                     onPointerMove,
                                     onDragMove,
                                     children,
                                     style,
                                     className
                                 }: Props) {

    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handlePointerDown = (event: React.DragEvent<HTMLElement>) => {
        setIsDragging(true);

        if (onPointerDown) {
            onPointerDown(event);
        }
    };

    const handlePointerUp = (event: React.DragEvent<HTMLElement>) => {
        setIsDragging(false);

        if (onPointerUp) {
            onPointerUp(event);
        }
    }

    const handlePointerMove = (event: React.DragEvent<HTMLElement>) => {
        if (isDragging)
            if (onDragMove) {
                onDragMove(event);
            }

        if (onPointerMove) {
            onPointerMove(event);
        }
    };

    return (
        <div
            // @ts-ignore
            onPointerDown={handlePointerDown}
            // @ts-ignore
            onPointerUp={handlePointerUp}
            // @ts-ignore
            onPointerMove={handlePointerMove}
            style={style}
            className={className}>
            {children}
        </div>
    );

}