import React from 'react';
import {Box, Button, Group, Modal, TextInput} from '@mantine/core';
import {useForm} from "@mantine/form";
import {IEntity} from "../../utils/Interfaces";
import {useStateContext} from "../../contexts/ContextProvider";
import {useLocalStorage} from "@mantine/hooks";

interface IProps {
    opened: boolean,
    toggle: () => void,
    entityName?: string
}

const EntityModal = ({opened, toggle, entityName}: IProps) => {

    const {entities, setEntities} = useStateContext();
    const entity = entities.find((ent) => ent.entityName === entityName);
    const title = entity !== undefined ? `Edit Entity ${entityName}` : 'New Entity';
    const form = useForm<IEntity>({
        initialValues: {
            entityName: entity !== undefined ? entity.entityName : '',
            tableName: entity !== undefined ? entity.tableName : '',
            columns: [],
            positionX: 0,
            positionY: 0,
            collapsed: true
        },
        validate: {
            tableName: (value) => (/[^a-z]/g.test(value) ? 'Only Small Letters are allowed' : null)
        }
    });
    const [value, setValue] = useLocalStorage({
        key: 'entities'
    });

    const addEntity = () => {

        const newEntity = {
            entityName: form.values.entityName,
            tableName: form.values.tableName,
            positionX: Math.floor(Math.random() * 250),
            positionY: Math.floor(Math.random() * 50),
            collapsed: true,
            columns: []
        };

        console.log(newEntity)

        if (entity) {
            const elements = [...entities];
            const entityIndex = elements.findIndex(element => element.entityName === entityName);
            if (entityIndex === -1) return;
            elements[entityIndex].entityName = form.values.entityName;
            elements[entityIndex].tableName = form.values.tableName;

            setEntities && setEntities(elements);

            // Save the current Entities in the Local Storage
            setValue(JSON.stringify(elements));
        } else {
            setEntities && setEntities([...entities, newEntity]);

            // Save the current Entities in the Local Storage
            setValue(JSON.stringify([...entities, newEntity]));
        }

        // Close the Modal
        toggle();

        // Initialize the Form
        form.reset();

    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={toggle}
                title={title}>

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
                            onBlur={(event) => form.setFieldValue('tableName', event.target.value.toLowerCase())}
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
};

export default EntityModal;