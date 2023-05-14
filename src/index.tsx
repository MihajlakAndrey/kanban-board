import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'
import App from './App'
import { store } from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
declare global {
  interface Window {
    Cypress?: Cypress.Cypress;
    store : any
  }
}
if (window.Cypress) {
  window.store = store
}

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

