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
        <div>
            {
                entities.map((entity) => (
                    <>
                        <Collapse
                            collapsed={entity.collapsed}
                            title={entity.entityName}
                            key={`Collapse-${generateUUID()}`}>
                            <Text>
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