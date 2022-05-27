import React from "react";
import {IEntity} from "../utils/Interfaces";
import {Text} from "@mantine/core";
import {Collapse} from "./index";

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
                            key={`Collapse-${entity.entityName}`}>
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