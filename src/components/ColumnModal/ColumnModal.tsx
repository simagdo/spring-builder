import React from 'react';
import {Box, Button, Checkbox, Group, Modal, NumberInput, Select, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {IEntity, IEntityColumn} from "../../utils/Interfaces";
import {useStateContext} from "../../contexts/ContextProvider";
import {useLocalStorage} from "@mantine/hooks";
import {ColumnType} from "../../utils/Enums";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation();
    const title = column !== undefined ? t('form.editColumnTitle', {
        columnName: columnName,
        entityName: entityName
    }) : t('form.addColumnTitle', {
        entityName: entityName
    });
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
                            label={t('form.columnName')}
                            {...form.getInputProps('columnName')}/>
                        <Select
                            label={t('form.columnType')}
                            placeholder="Pick one"
                            searchable
                            defaultValue={column && column.type}
                            data={columnTypes}
                            {...form.getInputProps('type')}/>
                        <Checkbox
                            label={t('form.insertable')}
                            {...form.getInputProps('insertable', {type: 'checkbox'})}/>
                        <NumberInput
                            label={t('form.length')}
                            placeholder="255"
                            defaultValue={255}
                            {...form.getInputProps('length')}/>
                        <Checkbox
                            label={t('form.nullable')}
                            {...form.getInputProps('nullable', {type: 'checkbox'})}/>
                        <NumberInput
                            label={t('form.precision')}
                            placeholder=""
                            defaultValue={0}
                            {...form.getInputProps('precision')}/>
                        <NumberInput
                            label={t('form.scale')}
                            placeholder="0"
                            defaultValue={0}
                            {...form.getInputProps('scale')}/>
                        <Checkbox
                            label={t('form.unique')}
                            {...form.getInputProps('unique', {type: 'checkbox'})}/>
                        <Checkbox
                            label={t('form.updatable')}
                            {...form.getInputProps('updatable', {type: 'checkbox'})}/>
                        <Group position="right" mt="md">
                            <Button type="submit">{t('buttons.save')}</Button>
                        </Group>

                    </form>
                </Box>

            </Modal>
        </>
    );
};

export default ColumnModal;