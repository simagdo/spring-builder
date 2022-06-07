import React, {useEffect, useState} from 'react';
import './App.sass';
import {Button, ColorScheme, ColorSchemeProvider, Container, MantineProvider} from "@mantine/core";
import Sidebar from "./components/Sidebar";
import {Entity, EntityModal, Navbar} from "./components";
import {useStateContext} from "./contexts/ContextProvider";
import {useColorScheme, useLocalStorage} from "@mantine/hooks";
import {generateUUID} from "./utils/utils";
import {getCookie, setCookies} from "cookies-next";

function App() {

    const {entities, setEntities} = useStateContext();
    const [opened, setOpened] = useState<boolean>(false);
    const toggle = () => setOpened(!opened);
    const [value, setValue] = useLocalStorage({
        key: 'entities'
    });

    const preferredColorScheme = useColorScheme();
    const test: ColorScheme = getCookie('spring-builder-color-scheme') as "light" | "dark";
    const [colorScheme, setColorScheme] = useState<ColorScheme>(test);

    const toggleColorScheme = (value?: ColorScheme) => {
        let nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);

        // Save the Theme in a Cookie
        setCookies('spring-builder-color-scheme', nextColorScheme, {
            maxAge: 60 * 60 * 24 * 30
        });
    };

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
                    <Entity
                        entity={entity}
                        key={generateUUID()}/>
                ))}
            </>
        )
    }

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{
                    colorScheme
                }}
                withGlobalStyles
                withNormalizeCSS>
                <div className="Grid-Container">
                    <div className="Left-Sidebar">
                        <h1>Entities</h1>
                        <Button
                            onClick={() => setOpened(true)}>Add new Entity</Button>
                        <Sidebar entities={entities}/>
                    </div>
                    <div className="Topbar">
                        <Navbar
                            colorScheme={colorScheme}
                            toggleColorScheme={toggleColorScheme}/>
                    </div>
                    <div className="Main">
                        <Container>
                            {renderEntities()}
                        </Container>
                    </div>
                </div>

                {opened && <EntityModal
                    opened={opened}
                    toggle={toggle}/>}

            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
