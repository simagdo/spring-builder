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
    const [references, setReferences] = useState();

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
                {entities.map((entity) => {

                    const x1 = entity.positionX;
                    const y1 = entity.positionY;

                    return (
                        <div>
                            <Entity
                                entity={entity}
                                key={generateUUID()}/>
                            {
                                entity.relationship.map(relation => {

                                    const relationIndex = entities.findIndex(ent => ent.entityName === relation.childName);

                                    if (relationIndex === -1) return;

                                    const childEntity = entities[relationIndex];

                                    const x2 = childEntity.positionX;
                                    const y2 = childEntity.positionY;

                                    console.log(`X1: ${x1} Y1: ${y1} X2: ${x2} Y2: ${y2} Entity: ${relation.childName}`)

                                    return (
                                        <svg height={210} width={210}>
                                            <line
                                                x1={x1}
                                                x2={x2}
                                                y1={y1}
                                                y2={y2}
                                                strokeWidth={2}
                                                stroke="#285de8"/>
                                        </svg>
                                    );
                                })
                            }
                        </div>
                    );
                })}
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
