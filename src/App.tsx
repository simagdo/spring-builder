import React, {useEffect, useState} from 'react';
import './App.sass';
import {Button, Container, MantineProvider} from "@mantine/core";
import Sidebar from "./components/Sidebar";
import {Entity, EntityModal} from "./components";
import {useStateContext} from "./contexts/ContextProvider";
import {useLocalStorage} from "@mantine/hooks";

function App() {

    const {entities, setEntities} = useStateContext();
    const [opened, setOpened] = useState<boolean>(false);
    const toggle = () => setOpened(!opened);
    const [value, setValue] = useLocalStorage({
        key: 'entities'
    });

    useEffect(() => {

        if (setEntities && value) {
            console.log(JSON.parse(value))
            setEntities(JSON.parse(value));
        }

    }, [value]);

    const renderEntities = () => {
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
                        onClick={() => setOpened(true)}>Add new Entity</Button>
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

            {opened && <EntityModal
                opened={opened}
                toggle={toggle}/>}

        </MantineProvider>
    );
}

export default App;
