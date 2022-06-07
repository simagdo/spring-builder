import React from "react";
import {IEntity} from "../utils/Interfaces";
import {Text} from "@mantine/core";
import {Collapse} from "./index";
import {generateUUID} from "../utils/utils";

interface IProps {
    entities: Array<IEntity>
}

const Sidebar = ({entities}: IProps) => {
    return (
        <div key="Sidebar">
            {
                entities.map((entity) => (
                    <>
                        <Collapse
                            collapsed={entity.collapsed}
                            title={entity.entityName}
                            key={`Collapse-${generateUUID()}`}>
                            <Text
                                key={generateUUID()}>
                                Content will follow
                            </Text>
                        </Collapse>
                    </>
                ))
            }
        </div>
    );
}

export default Sidebar;