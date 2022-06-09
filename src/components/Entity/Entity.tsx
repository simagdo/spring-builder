import React, {useState} from 'react';
import {IEntity} from "../../utils/Interfaces";
import './Entity.sass';
import {ActionIcon, Button, Group} from "@mantine/core";
import {Pencil, Trash} from "tabler-icons-react";
import {ColumnModal, EntityModal} from "../index";
import {generateUUID} from "../../utils/utils";
import {useStateContext} from "../../contexts/ContextProvider";
import {useLocalStorage} from "@mantine/hooks";
import {useTranslation} from "react-i18next";

interface IProps {
    entity: IEntity
}

const Entity = ({entity}: IProps) => {

    const {entities, setEntities} = useStateContext();
    const [openedColumn, setOpenedColumn] = useState<boolean>(false);
    const [openedEntity, setOpenedEntity] = useState<boolean>(false);
    const [selectedColumn, setSelectedColumn] = useState<string>('');
    const [value, setValue] = useLocalStorage({
        key: 'entities'
    });
    const {t} = useTranslation();
    const toggleColumnModal = () => {
        setOpenedColumn(!openedColumn);
        setSelectedColumn('');
    };
    const toggleEntityModal = () => setOpenedEntity(!openedEntity);

    const onColumnSelect = (event: React.MouseEvent<HTMLButtonElement>): void => {
        let attribute = event.currentTarget.getAttribute('data-column-name');
        if (attribute)
            setSelectedColumn(attribute);

        setOpenedColumn(true);
    }

    const onEntityDelete = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const entityName = event.currentTarget.getAttribute('data-entity-name');
        const entityIndex = entities.findIndex((currentEntity) => currentEntity.entityName === entityName);
        entities.splice(entityIndex, 1);
        setEntities && setEntities(entities);

        // Save the current Entities in the Local Storage
        setValue(JSON.stringify(entities));
    }

    const onColumnDelete = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const columnName = event.currentTarget.getAttribute('data-column-name');
        const columnIndex = entity && entity.columns && entity.columns.findIndex((column) => column.columnName === columnName);
        if (columnIndex === -1) return;
        if (columnIndex != null) {
            entity.columns?.splice(columnIndex, 1);
            setEntities && setEntities(entities);

            // Save the current Entities in the Local Storage
            setValue(JSON.stringify(entities));
        }

    }

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
                            {t('common.addColumn')}
                        </Button>
                        <ActionIcon
                            title={t('common.edit')}
                            size="sm"
                            variant="hover"
                            onClick={() => setOpenedEntity(true)}
                            data-entity-name={entity.entityName}>
                            <Pencil size={16}/>
                        </ActionIcon>
                        <ActionIcon
                            title={t('common.delete')}
                            size="sm"
                            variant="hover"
                            onClick={onEntityDelete}
                            data-entity-name={entity.entityName}>
                            <Trash size={16}/>
                        </ActionIcon>
                    </Group>
                </div>

                <div className="Entity-Columns">
                    <ul>
                        {entity.columns && entity.columns.map((column) => (
                            <li
                                key={generateUUID()}
                                className='Entity-Column'>
                                <span>{column.columnName}</span>
                                <span>({column.type})</span>
                                <Group
                                    position="right"
                                    spacing="sm">
                                    <ActionIcon
                                        title={t('common.edit')}
                                        size="sm"
                                        variant="hover"
                                        onClick={onColumnSelect}
                                        data-column-name={column.columnName}>
                                        <Pencil size={16}/>
                                    </ActionIcon>
                                    <ActionIcon
                                        title={t('common.delete')}
                                        size="sm"
                                        variant="hover"
                                        onClick={onColumnDelete}
                                        data-column-name={column.columnName}>
                                        <Trash size={16}/>
                                    </ActionIcon>
                                </Group>
                            </li>
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
                toggle={toggleColumnModal}
                columnName={selectedColumn}/>}
        </div>
    );
};

export default Entity;