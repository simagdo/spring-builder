import React, {useState} from 'react';
import {IEntity} from "../../utils/Interfaces";
import './Entity.sass';
import {ActionIcon, Button, Group} from "@mantine/core";
import {Pencil} from "tabler-icons-react";
import {ColumnModal, EntityModal} from "../index";

interface IProps {
    entity: IEntity
}

const Entity = ({entity}: IProps) => {

    const [openedColumn, setOpenedColumn] = useState<boolean>(false);
    const [openedEntity, setOpenedEntity] = useState<boolean>(false);
    const toggleColumnModal = () => setOpenedColumn(!openedColumn);
    const toggleEntityModal = () => setOpenedEntity(!openedEntity);

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
                    <Group
                        position="right"
                        spacing="sm">
                        <Button
                            type="button"
                            onClick={() => setOpenedColumn(true)}>
                            Add Column
                        </Button>
                        <ActionIcon
                            size="sm"
                            variant="hover"
                            onClick={() => setOpenedEntity(true)}
                            data-entity-name={entity.entityName}>
                            <Pencil size={16}/>
                        </ActionIcon>
                    </Group>
                </div>

                <div className="Entity-Columns">
                    <ul>
                        {entity.columns && entity.columns.map((column) => (
                            <li key={`Entity-${entity.entityName}-${column.columnName}`}>{column.columnName}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {openedEntity && <EntityModal
                opened={openedEntity}
                toggle={toggleEntityModal}
                entityName={entity.entityName}/>}
            {openedColumn && <ColumnModal
                entityName={entity.entityName}
                opened={openedColumn}
                toggle={toggleColumnModal}/>}
        </div>
    );
};

export default Entity;