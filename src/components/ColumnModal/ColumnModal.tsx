import React from 'react';
import {Box, Button, Checkbox, Group, Modal, NumberInput, Select, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {ColumnType, IEntity, IEntityColumn} from "../../utils/Interfaces";
import {useStateContext} from "../../contexts/ContextProvider";
import {useLocalStorage} from "@mantine/hooks";

interface IProps {
    entityName: string,
    opened: boolean,
    toggle: () => void
}

const ColumnModal = ({entityName, opened, toggle}: IProps) => {

    const {entities, setEntities} = useStateContext();
    const form = useForm<IEntityColumn>({
        initialValues: {
            columnName: '',
            type: ColumnType.String,
            insertable: true,
            length: 255,
            nullable: true,
            precision: 0,
            scale: 0,
            unique: false,
            updatable: true
        }
    });
    const [value, setValue] = useLocalStorage({
        key: 'entities'
    });

    const columnTypes = Object.keys(ColumnType).map(type => ({
        value: type,
        label: type
    }))

    const addColumn = () => {

        const values = form.values;

        const newColumn: IEntityColumn = {
            columnName: values.columnName,
            type: values.type,
            insertable: values.insertable,
            length: values.length,
            nullable: values.nullable,
            precision: values.precision,
            scale: values.scale,
            unique: values.unique,
            updatable: values.updatable
        }

        // @ts-ignore
        const newEntities: Array<IEntity> = entities.map(newEntity => {
            if (newEntity.entityName === entityName) {
                return {
                    ...newEntity,
                    columns: newEntity.columns?.concat(newColumn)
                }
            }
        })

        console.log(entities);

        setEntities && setEntities(newEntities)

        // Close the Modal
        toggle();

        // Initialize the Form
        form.reset();

        // Save the current Entities in the Local Storage
        setValue(JSON.stringify(newEntities));

    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={toggle}
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
                            searchable
                            data={columnTypes}/>
                        <Checkbox
                            label="Insertable"
                            placeholder="True"
                            checked={true}
                            {...form.getInputProps('insertable')}/>
                        <NumberInput
                            label="Length"
                            placeholder="255"
                            defaultValue={255}
                            {...form.getInputProps('length')}/>
                        <Checkbox
                            label="Nullable"
                            placeholder="True"
                            checked={true}
                            {...form.getInputProps('nullable')}/>
                        <NumberInput
                            label="Precision"
                            placeholder=""
                            defaultValue={0}
                            {...form.getInputProps('precision')}/>
                        <NumberInput
                            label="Scale"
                            placeholder="0"
                            defaultValue={0}
                            {...form.getInputProps('scale')}/>
                        <Checkbox
                            label="Unique"
                            checked={false}
                            {...form.getInputProps('unique')}/>
                        <Checkbox
                            label="Updatable"
                            checked={true}
                            {...form.getInputProps('updatable')}/>
                        <Group position="right" mt="md">
                            <Button type="submit">Submit</Button>
                        </Group>

                    </form>
                </Box>

            </Modal>
        </>
    );
};

export default ColumnModal;