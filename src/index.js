import React from 'react';
import ReactDOM from 'react-dom';
import './css/todo_layout.css';
import './css/todo_style.css';
import './css/fonts/Lexend Exa/css.css';
import App from './App';
import Modal from './modal';

ReactDOM.render(<React.Fragment> <App /><Modal/></React.Fragment>, document.getElementById('root'));
