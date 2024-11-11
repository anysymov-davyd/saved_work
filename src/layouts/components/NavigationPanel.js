import React, { useRef, useState } from 'react'
import ArrowIcon from './ArrowIcon'

import './../styles/NavigationPanel.css'

function NavigationPanel({ localization, getCurrentPageIndex, setCurrentPageIndex, getCurrentLanguage }) {
    const ITEM_HEIGHT = 56

    const darkMode = setCurrentPageIndex == 0

    const optionSet = [
        {
            id: 'en',
            name: 'English'
        },
        {
            id: 'de',
            name: 'Deutsch'
        },
        {
            id: 'ua',
            name: 'Українська'
        },
        {
            id: 'ru',
            name: 'Русский'
        }
    ]

    const sidebarRef = useRef()

    const [currentOption, setCurrentOption] = useState(null)
    const [isOpened, setIsOpened] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }

    const loadedLanguageId = localStorage.getItem('languageId') === null ?
        optionSet.find(id => id === navigator.language) ? navigator.language : 'en'
        : localStorage.getItem('languageId')


    const handleCurrentOption = value => {
        setIsOpened(false)
        setCurrentOption(value)
        getCurrentLanguage(value)
    }

    const handleChooseSidebarOption = e => {
        if(e.target.className === 'navigation__sidebar') {
            setOpenMenu(false)
        }
    }

    return (
        <div className='navigation__container'>
            <div onClick={handleOpenMenu} className='navigation__menu-button'>
                <svg fill={darkMode ? 'black' : 'white'} className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MenuIcon">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                </svg>
            </div>
            <div
                onClick={handleChooseSidebarOption}
                className='navigation__sidebar'
                style={{
                    background: openMenu ? 'rgba(0, 0, 0, .75)' : 'transparent',
                    pointerEvents: openMenu ? 'all' : 'none'
                }}
            >
                <div
                    ref={sidebarRef}
                    className='navigation__sidebar-content'
                    style={{
                        marginLeft: openMenu ? 0 : '-100vw'
                    }}
                >
                    {localization.map((page, index) => (
                        <div className='navigation__item' key={index}>
                            <a
                                onClick={() => {
                                    getCurrentPageIndex(index)
                                    setOpenMenu(false)
                                }}
                                className={`navigation__page caps1 ${setCurrentPageIndex == index ? '--active' : ''}`}
                            >
                                { page }
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <div className='navigation__pages'>
                {localization.map((page, index) => (
                    <div className='navigation__item' key={index}>
                        <a
                            onClick={() => getCurrentPageIndex(index)}
                            className={`navigation__page caps1 ${setCurrentPageIndex == index && index !== 0 ? '--active' : ''}`}
                            style={{ color: darkMode ? 'black' : 'white' }}
                        >
                            { page }  
                        </a>

                        {index !== localization.length - 1 && (
                            <a style={{ color: darkMode ? 'black' : 'white' }} className='navigation__dot caps1'>•</a>
                        )}
                    </div>
                ))}
            </div>
            <div className='navigation__dropdown'>
                <div
                    className='navigation__dropdown-value'
                    onClick={() => setIsOpened(!isOpened)}
                >
                    <a
                        style={{ color: darkMode ? 'black' : 'white' }}
                        className='navigation__language caps1'
                    >{ currentOption !== null ? currentOption.id : loadedLanguageId }</a>
                    <ArrowIcon darkMode={darkMode}/>
                </div>
                <div
                    className='navigation__options'
                    style={{
                        maxHeight: isOpened ? '300px' : 0
                    }}
                >
                    {optionSet.map((elem, index) => (
                        <div
                            key={index}
                            className='navigation__option caps3'
                            style={{
                                minHeight: `${ITEM_HEIGHT}`,
                                color: darkMode ? 'black' : 'white',
                                background: darkMode ? 'rgba(255, 255, 255, .2)' : '#222222'
                            }}
                            onClick={() => handleCurrentOption(elem)}
                        >
                            { elem.name }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NavigationPanel