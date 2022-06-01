import React, {useState} from 'react';
import {IEntity} from "../../utils/Interfaces";
import './Entity.sass';
import {Button} from "@mantine/core";
import {NewColumn} from 'components';

interface IProps {
    entity: IEntity
}

const Entity = ({entity}: IProps) => {

    const [opened, setOpened] = useState<boolean>(false);
    console.log(opened)
    const toggle = () => setOpened(!opened);

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
                    <Button
                        type="button"
                        onClick={() => setOpened(true)}>
                        Add Column
                    </Button>
                </div>

                <div className="Entity-Columns">
                    <ul>
                        {entity.columns && entity.columns.map((column) => (
                            <li key={`Entity-${entity.entityName}-${column.columnName}`}>{column.columnName}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {opened && <NewColumn
                entityName={entity.entityName}
                opened={opened}
                toggle={toggle}/>}
        </div>
    );
};

export default Entity;