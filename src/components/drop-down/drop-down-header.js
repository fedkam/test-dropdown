import React from 'react'
import { ReactComponent as IconClose } from '../../assets/icon/icon-close.svg'; // можно перенести в drop-down/icon для 100% независимости =)
import { ReactComponent as IconOpen } from '../../assets/icon/icon-open.svg';

const DDHeader = ({ openMenu, onClick, onKeyDown, getTitle }) => {
    return (
        <div
            className='drop-down-header'
            tabIndex={1}
            role='button'
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            <div className='drop-down-header__title'>
                <p>{getTitle()}</p>
            </div>
            <div className='drop-down-header__action'>
                {openMenu ? <IconClose /> : <IconOpen />}
            </div>
        </div>
    )
}



export default DDHeader
