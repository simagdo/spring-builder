import React, {ReactNode, useState} from "react";
import './Collapse.sass';

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
                onClick={() => {
                    setIsCollapsed(!isCollapsed)
                }}>
                {isCollapsed ? 'Show' : 'Hide'} {title}
            </button>
            <div
                className={`Collapse-Content ${isCollapsed ? 'Collapsed' : 'Expanded'}`}
                aria-expanded={isCollapsed}>
                {children}
            </div>
        </div>
    );

}

export default Collapse;