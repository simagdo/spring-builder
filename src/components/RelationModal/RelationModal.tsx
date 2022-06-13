import {Box, Button, Group, Modal, Select, SimpleGrid} from '@mantine/core';
import React from 'react';
import {IEntity, IRelation} from "../../utils/Interfaces";
import {useStateContext} from "../../contexts/ContextProvider";
import {RelationShipType} from "../../utils/Enums";
import {useForm} from "@mantine/form";
import {useTranslation} from "react-i18next";
import {useLocalStorage} from "@mantine/hooks";

interface IProps {
    opened: boolean,
    toggle: () => void,
    currentEntity: IEntity
}

const RelationModal = ({opened, toggle, currentEntity}: IProps) => {

    const {entities, setEntities} = useStateContext();
    const {t} = useTranslation();

    const form = useForm<IRelation>({
        initialValues: {
            // @ts-ignore
            child: null,
            relationType: RelationShipType.OneToOne
        }
    })
    const [value, setValue] = useLocalStorage({
        key: 'entities'
    });

    const currentEntityIndex = entities.findIndex(ent => ent.entityName === currentEntity.entityName);
    let availableEntities = entities.map(availableEntity => ({
        value: availableEntity.entityName,
        label: availableEntity.entityName
    }))

    availableEntities.splice(currentEntityIndex, 1);

    const availableRelationTypes = Object.keys(RelationShipType).map(type => ({
        // @ts-ignore
        value: RelationShipType[type],
        label: type
    }))

    const addRelationship = () => {
        const values = form.values;

        let newRelation: IRelation = {
            child: values.child,
            relationType: values.relationType
        }

        const entityIndex = entities.findIndex(ent => ent.entityName === currentEntity.entityName);

        if (entityIndex === -1) return;

        entities[entityIndex].relationship = entities[entityIndex].relationship.concat(newRelation);

        console.log(entities);

        setEntities && setEntities(entities);

        // Save the current Entities in the Local Storage
        setValue(JSON.stringify(entities));

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
                title="Add Relationship">

                <SimpleGrid cols={2}>
                    <Box title="Current Entity">
                        <p>Current</p>
                        <span>Entity: {currentEntity.entityName}</span>
                    </Box>
                    <Box title="Target Entity">
                        <p>Target</p>
                        <form
                            onSubmit={form.onSubmit(() => addRelationship())}>
                            <Select
                                required
                                label="Available Entities"
                                data={availableEntities}
                                {...form.getInputProps('child')}/>
                            <Select
                                required
                                label="Relationship Type"
                                data={availableRelationTypes}
                                {...form.getInputProps('relationType')}/>
                            <Group position="right" mt="md">
                                <Button type="submit">{t('buttons.save')}</Button>
                            </Group>
                        </form>
                    </Box>
                </SimpleGrid>

            </Modal>
        </>
    );
};

export default RelationModal;