import React, {useState} from 'react';
import {Box, Button, Group, Modal, Select, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {ColumnType, IEntity, IEntityColumn} from "../../utils/Interfaces";
import {useStateContext} from "../../contexts/ContextProvider";

interface IProps {
    entityName: string,
    initialState: false | true
}

const NewColumn = ({entityName, initialState}: IProps) => {

    const [opened, setOpened] = useState<boolean>(initialState);
    const {entities, setEntities} = useStateContext();
    const form = useForm<IEntityColumn>({
        initialValues: {
            columnName: '',
            type: ColumnType.String
        }
    })

    const columnTypes = Object.keys(ColumnType).map(type => ({
        value: type,
        label: type
    }))

    const addColumn = () => {
        const newColumn: IEntityColumn = {
            columnName: form.values.columnName,
            type: form.values.type
        }

        const entity = entities.find(entity => entity.entityName === entityName);

        //entity && entity.columns?.push(newColumn);

        // @ts-ignore
        const newEntities: Array<IEntity> = entities.map(newEntity => {
            if (newEntity.entityName === entityName) {
                return {
                    ...newEntity,
                    columns: newEntity.columns?.concat(newColumn)
                }
                return newEntity;
            }
        })

        console.log(entities);

        setEntities && setEntities(newEntities)

        // @ts-ignore
        //setEntities && setEntities([...entities, entity]);

        // Close the Modal
        setOpened(false);

        // Initialize the Form
        form.reset();

    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={`Add Column to Entity ${entityName}`}>

                <Box
                    sx={{
                        maxWidth: 300
                    }}
                    mx="auto">
                    <form onSubmit={form.onSubmit(() => addColumn())}>
                        <TextInput
                            required
                            label="Column Name"
                            {...form.getInputProps('columnName')}/>
                        <Select
                            label="Column Type"
                            placeholder="Pick one"
                            data={columnTypes}/>
                        <Group position="right" mt="md">
                            <Button type="submit">Submit</Button>
                        </Group>

                    </form>
                </Box>

            </Modal>
        </>
    );
};

export default NewColumn;