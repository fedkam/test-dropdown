import React, { useState, useEffect, useRef } from 'react';
import './drop-down.scss';
import { ReactComponent as IconClose } from '../../assets/icon/icon-close.svg'; // можно перенести в drop-down/icon для 100% независимости =)
import { ReactComponent as IconOpen } from '../../assets/icon/icon-open.svg';
import { ReactComponent as IconSelected } from '../../assets/icon/icon-selected.svg';

const DropDown = ({ data, title = '', multiSelect = false }) => {
    const ref = useRef(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const toggleOpenMenu = () => setOpenMenu(!openMenu);

    const handleOnClick = (item) => {
        if (!selectedItems.some(current => current.id === item.id)) {
            //если отсутствует в selectedItems
            multiSelect ?
                setSelectedItems([...selectedItems, item])
                :
                setSelectedItems([item])
        } else {
            //если такой уже есть в selectedItems, фильтром удаляем его
            let newSelectedItems = selectedItems.filter(current => current.id !== item.id);
            setSelectedItems([...newSelectedItems]);
        }
    }

    const handleKeyDownHeader = (e) => {
        switch (e.key) {
            case 'Escape':
                //Esc
                setOpenMenu(false); break;
            case 'Enter':
                //Enter
                toggleOpenMenu(!openMenu); break;
        }
    }

    const handleKeyDownList = (e) => {
        switch (e.key) {
            case 'ArrowDown':
                //down arrow
                break;
            case 'ArrowUp':
                //up arrow
                break;
            case 'Escape':
                //Esc
                setOpenMenu(false)
                break;
        }
        console.log(e.key)
    }

    const getTitle = () => {
        if (selectedItems.length == 0) {
            return title;
        } else {
            let sortSelectedItems = selectedItems.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name == b.name) return 0;
                if (a.name < b.name) return -1;
            });
            sortSelectedItems = sortSelectedItems.map(item => `${item.name}\u003B\t`);
            return sortSelectedItems;
        }
    }

    function isItemInSelection(item) {
        if (selectedItems.some(current => current.id === item.id)) {
            return true;
        }
        return false;
    }

    return (
        <div className='drop-down-wrapper'>
            <div
                className='drop-down-header'
                tabIndex={1}
                role='button'
                onClick={() => toggleOpenMenu(!openMenu)}
                onKeyDown={handleKeyDownHeader}
            >
                <div className='drop-down-header__title'>
                    <p>{getTitle()}</p>
                </div>
                <div className='drop-down-header__action'>
                    {openMenu ? <IconClose /> : <IconOpen />}
                </div>
            </div>
            {openMenu && (
                <ul className='drop-down-list'>
                    {data.map((item => (
                        <li
                            className='drop-down-list__item'
                            tabIndex={2}
                            ref={ref}
                            key={item.id}
                            onClick={() => handleOnClick(item)}
                            onKeyDown={handleKeyDownList}
                        >
                            <span>{item.name}</span>
                            {isItemInSelection(item) && <IconSelected />}
                        </li>
                    )))}
                </ul>
            )}
        </div>
    )
}

export default DropDown;