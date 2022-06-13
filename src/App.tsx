import React, {useEffect, useState} from 'react';
import './App.sass';
import {Button, ColorScheme, ColorSchemeProvider, Container, Group, MantineProvider} from "@mantine/core";
import Sidebar from "./components/Sidebar";
import {Entity, EntityModal, Navbar} from "./components";
import {useStateContext} from "./contexts/ContextProvider";
import {useColorScheme, useLocalStorage} from "@mantine/hooks";
import {generateUUID} from "./utils/utils";
import {getCookie, setCookies} from "cookies-next";
import {useTranslation} from "react-i18next";
import {NotificationsProvider} from "@mantine/notifications";

function App() {

    const {entities, setEntities} = useStateContext();
    const [opened, setOpened] = useState<boolean>(false);
    const toggle = () => setOpened(!opened);
    const [value, setValue] = useLocalStorage({
        key: 'entities'
    });
    const {t} = useTranslation('common');

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
                <NotificationsProvider
                    position="top-center"
                    zIndex={2077}>
                    <div className="Grid-Container">
                        <div className="Left-Sidebar">
                            <h1>{t('common.entities')}</h1>
                            <Group
                                position="center">
                                <Button
                                    onClick={() => setOpened(true)}>
                                    {t('common.newEntity')}
                                </Button>
                            </Group>
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

                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
