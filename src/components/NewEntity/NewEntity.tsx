import React from 'react';
import {Modal} from '@mantine/core';

interface IProps {
    opened: false | true,
    setOpened: (opened: boolean) => void
}

const NewEntity = ({opened, setOpened}: IProps) => {

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="New Entity">

            </Modal>
        </>
    );
};

export default NewEntity;