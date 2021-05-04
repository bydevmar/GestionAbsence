import React from 'react';
import ReactDOM from 'react-dom'
import { Provider} from 'react-redux'
import Main from './Components/SearchBarandFooter/Middle/main.js'
import { createStore } from 'redux'
import reducer from './reducers/rootReducer'

const store = createStore(reducer)



ReactDOM.render(<Provider store ={store}><Main/></Provider>,document.getElementById("root"));