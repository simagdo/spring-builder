import React, {useState} from 'react';
import './App.sass';
import {Box, Button, Container, Group, MantineProvider, Modal, TextInput} from "@mantine/core";
import {IEntity, IEntityColumn} from "./utils/Interfaces";
import Sidebar from "./components/Sidebar";
import {randomString} from "./utils/utils";
import {Entity} from "./components";
import {useForm} from "@mantine/form";

function App() {

    const [entities, setEntities] = useState<IEntity[]>([]);
    const [opened, setOpened] = useState<boolean>(false);
    const form = useForm<IEntity>({
        initialValues: {
            entityName: '',
            tableName: '',
            columns: [],
            positionX: 0,
            positionY: 0,
            collapsed: true
        },
        validate: {
            tableName: (value) => (/[^a-z]/g.test(value) ? 'Only Small Letters are allowed' : null)
        }
    })

    const addEntity = () => {

        let column: IEntityColumn = {
            columnName: randomString(),
            type: 'String'
        }
        const entityColumns: Array<IEntityColumn> = [column];

        const newEntity = {
            entityName: form.values.entityName,
            tableName: form.values.tableName,
            positionX: Math.floor(Math.random() * 250),
            positionY: Math.floor(Math.random() * 50),
            collapsed: true,
            columns: []//entityColumns
        };

        console.log(newEntity)

        setEntities([...entities, newEntity]);

        // Close the Modal
        setOpened(false);

        // Initialize the Form
        form.reset();

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

    const newEntity = () => {
        return (
            <>
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="New Entity">

                    <Box
                        sx={{
                            maxWidth: 300
                        }}
                        mx="auto">
                        <form onSubmit={form.onSubmit(() => addEntity())}>
                            <TextInput
                                required
                                label="Entity Name"
                                placeholder="User"
                                {...form.getInputProps('entityName')}/>
                            <TextInput
                                required
                                label="Table Name"
                                placeholder="User"
                                {...form.getInputProps('tableName')}/>
                            <Group position="right" mt="md">
                                <Button type="submit">Submit</Button>
                            </Group>

                        </form>
                    </Box>

                </Modal>
            </>
        );
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
                    {newEntity()}
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
