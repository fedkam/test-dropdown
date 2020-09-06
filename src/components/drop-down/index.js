import React, { useState, useEffect } from 'react';
import './drop-down.scss';
import { ReactComponent as IconClose } from '../../assets/icon/icon-close.svg';
import { ReactComponent as IconOpen } from '../../assets/icon/icon-open.svg';
import { ReactComponent as IconSelected } from '../../assets/icon/icon-selected.svg';

const DropDown = ({ data, title = '', multiSelect = false }) => {
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
                tabIndex={0}
                role='button'
                // onKeyPress={() => toggle(!openMenu)}
                onClick={() => toggleOpenMenu(!openMenu)}
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
                            key={item.id}
                            onClick={() => handleOnClick(item)}
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