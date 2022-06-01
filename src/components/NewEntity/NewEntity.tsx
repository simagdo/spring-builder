import React from 'react';
import {Box, Button, Group, Modal, TextInput} from '@mantine/core';
import {useForm} from "@mantine/form";
import {IEntity} from "../../utils/Interfaces";
import {useStateContext} from "../../contexts/ContextProvider";

interface IProps {
    opened: boolean,
    toggle: () => void
}

const NewEntity = ({opened, toggle}: IProps) => {

    const {entities, setEntities} = useStateContext();
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

        const newEntity = {
            entityName: form.values.entityName,
            tableName: form.values.tableName,
            positionX: Math.floor(Math.random() * 250),
            positionY: Math.floor(Math.random() * 50),
            collapsed: true,
            columns: []
        };

        console.log(newEntity)

        setEntities && setEntities([...entities, newEntity]);

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

export default NewEntity;