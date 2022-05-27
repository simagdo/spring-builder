import React from 'react';
import {IEntity} from "../../utils/Interfaces";
import './Entity.sass';

interface IProps {
    entity: IEntity
}

const Entity = ({entity}: IProps) => {
    return (
        <div className="Entity-Container">
            <div className="Entity">
                <div className="Entity-Header">
                    <p>{entity.entityName}</p>
                </div>
            </div>
        </div>
    );
};

export default Entity;