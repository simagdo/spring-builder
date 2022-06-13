import React from "react";
import {IEntity} from "../utils/Interfaces";
import {Accordion, Text, Tooltip} from "@mantine/core";

interface IProps {
    entities: Array<IEntity>
}

const Sidebar = ({entities}: IProps) => {
    return (
        <div key="Sidebar">
            <Accordion multiple>
                {
                    entities.map((entity) => (
                        <Accordion.Item
                            label={entity.entityName}>
                            {entity.columns?.map(column => {

                                const text = `Name: ${column.columnName}\nType: ${column.type}`;

                                return (
                                    <Tooltip
                                        wrapLines
                                        width={220}
                                        withArrow
                                        label={text}>
                                        <Text>
                                            {column.columnName} - {column.type}
                                        </Text>
                                    </Tooltip>
                                )
                            })}
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </div>
    );
}

export default Sidebar;