import React from "react";
import Entities from 'assets/Files/Entities.json';
import Tile from "../Tile/Tile";
import './AvailableEntities.sass';
import Drag from "../Drag/Drag";

const AvailableEntities = () => {

    console.log(Entities)

    return (
        <div className="Available-Entities-Container">
            {Entities.map(entity => (
                <Drag
                    id={entity.Name}>
                    <Tile
                        name={entity.Name}
                        icon={entity.Icon}/>
                </Drag>
            ))}
        </div>
    );
}

export default AvailableEntities;