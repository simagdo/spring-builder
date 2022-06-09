import React from 'react';
import springIcon from '../../assets/Images/spring.png';
import './Navbar.sass';
import {ActionIcon, ColorScheme, Select} from "@mantine/core";
import {MoonStars, Sun} from 'tabler-icons-react';
import {useTranslation} from "react-i18next";

interface IProps {
    colorScheme: ColorScheme,
    toggleColorScheme: (value?: ColorScheme) => void
}

const Navbar = ({colorScheme, toggleColorScheme}: IProps) => {

    const dark = colorScheme === 'dark';
    const {t, i18n} = useTranslation('common');

    const languages = [
        {
            value: 'de',
            label: 'Germany'
        },
        {
            value: 'en',
            label: 'English'
        }
    ]

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
                        title={t('common.toggleScheme')}>
                        {dark ? <Sun size={18}/> : <MoonStars size={18}/>}
                    </ActionIcon>
                </div>
                <div className="Navbar-Language">
                    <Select
                        data={languages}
                        label={t('common.changeLanguage')}
                        value={i18n.language}
                        onChange={(value) => typeof value === 'string' && i18n.changeLanguage(value)}/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;