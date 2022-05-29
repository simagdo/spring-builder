import React from 'react';
import {IEntity} from "../../utils/Interfaces";
import './Entity.sass';

interface IProps {
    entity: IEntity
}

const Entity = ({entity}: IProps) => {
    return (
        <div
            className="Entity-Container"
            style={{
                "marginTop": entity.positionY,
                "marginLeft": entity.positionX
            }}>
            <div className="Entity">
                <div className="Entity-Header">
                    <p>{entity.entityName}</p>
                </div>
                <div className="Entity-Columns">
                    <ul>
                        {entity.columns && entity.columns.map((column) => (
                            <li key={`Entity-${entity.entityName}-${column.columnName}`}>{column.columnName}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Entity;