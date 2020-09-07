import React, { useState, useEffect, useRef } from 'react';
import './drop-down.scss';
import DDHeader from './drop-down-header';
import DDList from './drop-down-list';


const DropDown = ({ data, title = '', multiSelect = false }) => {
    const [currentFocus, setCurrentFocus] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const toggleOpenMenu = () => setOpenMenu(!openMenu);

    const handleKeyDownHeader = (e) => {
        switch (e.key) {
            case 'Escape':
                //Esc
                setOpenMenu(false); break;
            case 'Enter':
                //Enter
                toggleOpenMenu(!openMenu); break;
            default: break;
        }
    }

    const handleKeyDownList = (e, item) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setCurrentFocus(currentFocus === data.length - 1 ? 0 : currentFocus + 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setCurrentFocus(currentFocus === 0 ? data.length - 1 : currentFocus - 1);
                break;
            case 'Escape':
                setOpenMenu(false)
                break;
            case 'Enter':
                handleOnClickList(item)
                break;
            default: break;
        }
        console.log(e.key, item)
    }

    const handleOnClickList = (item) => {
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
            <DDHeader
                openMenu={openMenu}
                onClick={() => toggleOpenMenu(!openMenu)}
                onKeyDown={handleKeyDownHeader}
                getTitle={getTitle}
            />
            {openMenu && (
                <DDList
                    data={data}
                    currentFocus={currentFocus}
                    onClick={handleOnClickList}
                    onKeyDown={handleKeyDownList}
                    isItemInSelection={isItemInSelection}
                />
            )}
        </div>
    )
}

export default DropDown;