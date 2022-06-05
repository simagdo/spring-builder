import React, {ReactNode, useState} from "react";
import './Collapse.sass';
import {generateUUID} from "../../utils/utils";

type Props = {
    collapsed: boolean,
    title: string,
    children: ReactNode
}

const Collapse = ({collapsed, title, children}: Props) => {

    const [isCollapsed, setIsCollapsed] = useState<boolean>(collapsed);

    return (
        <div className="Collapse">
            <button
                className={`Collapse-Button ${isCollapsed ? 'Collapsed' : 'Expanded'}`}
                key={`Collapse-Button-${generateUUID()}`}
                onClick={() => {
                    setIsCollapsed(!isCollapsed)
                }}>
                {isCollapsed ? 'Show' : 'Hide'} {title}
            </button>
            <div
                className={`Collapse-Content ${isCollapsed ? 'Collapsed' : 'Expanded'}`}
                key={`Collapse-Content-${generateUUID()}`}
                aria-expanded={isCollapsed}>
                {children}
            </div>
        </div>
    );

}

export default Collapse;