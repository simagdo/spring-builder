import React from "react";
import './Tile.sass';

type Props = {
    name: string,
    icon: string
}

const Tile = ({name, icon}: Props) => {
    return (
        <div className="Tile">
            <figure className="Tile-Image--Wrapper">
                <i className={icon}/>
            </figure>
            <div className="Tile-Info">
                <p>{name}</p>
            </div>
        </div>
    );
}

export default Tile;