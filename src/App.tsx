import './App.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { SelectUniversity } from './components/SelectUniversity'

function App() {
  return (
    <Provider store={store}>
      <SelectUniversity
        disabled={false}
        label='Università del mondo'
        onObjectSelected={(item: string) => {
          console.log(`Selezionato elemento ${JSON.stringify(item)}`)
        }}
      />
    </Provider>
  )
}

export default App
