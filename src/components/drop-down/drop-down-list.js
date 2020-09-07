import React, { useRef, useEffect } from 'react';
import { ReactComponent as IconSelected } from '../../assets/icon/icon-selected.svg';
import PropTypes from 'prop-types';



const DDItem = ({ focus, onClick, onKeyDown, isItemInSelection, item }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (focus) {
            ref.current.focus();
        }
    }, [focus]);

    return (
        <li
            className='drop-down-list__item'
            tabIndex={2}
            role="button"
            ref={ref}
            onClick={() => onClick(item)}
            onKeyDown={(e) => onKeyDown(e, item)}
        >
            <span>{item.name}</span>
            {isItemInSelection(item) && <IconSelected />}
        </li>
    )
};



const DDList = (props) => {
    const { data, currentFocus } = props;
    return (
        <ul className='drop-down-list'>
            {data.map(((item, index) => (
                <DDItem
                    {...props}
                    key={item.id}
                    item={item}
                    focus={currentFocus === index}
                />
            )))}
        </ul>
    )
};



DDItem.propTypes = {
    data: PropTypes.array,
    currentFocus: PropTypes.number,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    isItemInSelection: PropTypes.func
}

DDList.propTypes = {
    data: PropTypes.array,
    currentFocus: PropTypes.number,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    isItemInSelection: PropTypes.func
}



export default DDList;
