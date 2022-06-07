import React from 'react';
import {Box, Button, Checkbox, Group, Modal, NumberInput, Select, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {IEntity, IEntityColumn} from "../../utils/Interfaces";
import {useStateContext} from "../../contexts/ContextProvider";
import {useLocalStorage} from "@mantine/hooks";
import {ColumnType} from "../../utils/Enums";

interface IProps {
    entityName: string,
    opened: boolean,
    toggle: () => void,
    columnName?: string
}

const ColumnModal = ({entityName, opened, toggle, columnName}: IProps) => {

    const {entities, setEntities} = useStateContext();
    let entity = entities.find((entity) => entity.entityName === entityName);
    let column = entity && entity.columns?.find((column) => column.columnName === columnName);
    const title = column !== undefined ? `Edit Column ${column.columnName} on Entity ${entityName}` : `Add Column to Entity ${entityName}`;
    console.log(column);
    const form = useForm<IEntityColumn>({
        initialValues: {
            columnName: column !== undefined ? column.columnName : '',
            type: column !== undefined ? column.type : ColumnType.String,
            insertable: column !== undefined ? column.insertable : true,
            length: column !== undefined ? column.length : 255,
            nullable: column !== undefined ? column.nullable : true,
            precision: column !== undefined ? column.precision : 0,
            scale: column !== undefined ? column.scale : 0,
            unique: column !== undefined && column.unique,
            updatable: column !== undefined ? column.updatable : true
        }
    });
    const [value, setValue] = useLocalStorage({
        key: 'entities'
    });

    const columnTypes = Object.keys(ColumnType).map(type => ({
        // @ts-ignore
        value: ColumnType[type],
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

        if (entity && column) {
            column = {
                ...form.values
            }
            console.log(column)
            const columnIndex = entity.columns?.findIndex((column) => column.columnName === columnName);
            if (columnIndex === -1) return;
            // @ts-ignore
            entity.columns[columnIndex] = column;

            setEntities && setEntities(entities);

            // Save the current Entities in the Local Storage
            setValue(JSON.stringify(entities));
        } else {

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

            // Save the current Entities in the Local Storage
            setValue(JSON.stringify(newEntities));

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
                    <form onSubmit={form.onSubmit(() => addColumn())}>
                        <TextInput
                            required
                            label="Column Name"
                            {...form.getInputProps('columnName')}/>
                        <Select
                            label="Column Type"
                            placeholder="Pick one"
                            searchable
                            defaultValue={column && column.type}
                            data={columnTypes}
                            {...form.getInputProps('type')}/>
                        <Checkbox
                            label="Insertable"
                            {...form.getInputProps('insertable', {type: 'checkbox'})}/>
                        <NumberInput
                            label="Length"
                            placeholder="255"
                            defaultValue={255}
                            {...form.getInputProps('length')}/>
                        <Checkbox
                            label="Nullable"
                            {...form.getInputProps('nullable', {type: 'checkbox'})}/>
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
                            {...form.getInputProps('unique', {type: 'checkbox'})}/>
                        <Checkbox
                            label="Updatable"
                            {...form.getInputProps('updatable', {type: 'checkbox'})}/>
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