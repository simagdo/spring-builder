import React from 'react';
import springIcon from '../../assets/Images/spring.png';
import './Navbar.sass';
import {ActionIcon, ColorScheme, Group, useMantineColorScheme} from "@mantine/core";
import {Sun, MoonStars} from 'tabler-icons-react';

interface IProps {
    colorScheme: ColorScheme,
    toggleColorScheme: (value?: ColorScheme) => void
}

const Navbar = ({colorScheme, toggleColorScheme}: IProps) => {

    const dark = colorScheme === 'dark';

    return (
        <div className="Navbar-Container">
            <div className="Navbar-Logo">
                <img
                    src={springIcon}
                    alt="Spring Builder"
                    className="Navbar-Icon"/>
                <p>Spring Builder</p>
            </div>
            <div className="Navbar-Actions">
                <div className="Navbar-Theme">
                    <ActionIcon
                        variant="outline"
                        color={dark ? 'yellow' : 'blue'}
                        onClick={() => toggleColorScheme()}
                        title="Toggle color Scheme">
                        {dark ? <Sun size={18}/> : <MoonStars size={18}/>}
                    </ActionIcon>
                </div>
            </div>
        </div>
    );
};

export default Navbar;