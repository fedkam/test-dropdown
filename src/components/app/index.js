import React from 'react';
import './app.scss'
import DropDown from '../drop-down'



const data = [
  {
    id: 1,
    name: 'Вулкан Горелый',
  },
  {
    id: 2,
    name: 'Вилючинский вулкан',
  },
  {
    id: 3,
    name: 'Авачинский вулкан',
  },
];



function App() {
  return (
    <div className='container'>
      <div className='app__drop-down_indent'>
        <DropDown
          data={data}
          title='Мультивыделение'
          multiSelect />
      </div>
      <div className='app__drop-down_indent'>
        <DropDown
          className='app__drop-down_indent'
          data={data}
          title='Одиночное выделение' />
      </div>
    </div>
  );
}

export default App;
