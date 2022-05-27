import React, {useState} from 'react';
import './App.sass';
import {Button, Container, MantineProvider} from "@mantine/core";
import {IEntity} from "./utils/Interfaces";
import Sidebar from "./components/Sidebar";
import {randomString} from "./utils/utils";
import {Entity} from "./components";

function App() {

    const [entities, setEntities] = useState<IEntity[]>([]);

    const addEntity = () => {

        console.log('Adding Entity')

        const newEntity: IEntity = {
            entityName: randomString(),
            positionX: Math.floor(Math.random() * 50),
            positionY: Math.floor(Math.random() * 50),
            collapsed: true
        };

        setEntities([...entities, newEntity]);
    }

    const renderEntities = () => {
        {/*
                    <Box
                        key={entity.entityName}
                        component="div"
                        style={{
                            "marginTop": entity.positionY,
                            "marginLeft": entity.positionX
                        }}>
                        <div>
                            {entity.entityName}
                        </div>
                    </Box>*/
        }
        return (
            <>
                {entities.map((entity) => (
                    <Entity entity={entity}/>
                ))}
            </>
        )
    }

    return (
        <MantineProvider
            theme={{
                colorScheme: 'dark'
            }}
            withGlobalStyles
            withNormalizeCSS>
            <div className="Grid-Container">
                <div className="Left-Sidebar">
                    <h1>Left Sidebar</h1>
                    <Button
                        onClick={addEntity}>Add new Entity</Button>
                    <Sidebar entities={entities}/>
                </div>
                <div className="Topbar">
                    <h1>Top Bar</h1>
                </div>
                <div className="Main">
                    <Container>
                        <h1>Main</h1>
                        {renderEntities()}
                    </Container>
                </div>
            </div>
        </MantineProvider>


    );
}

export default App;
