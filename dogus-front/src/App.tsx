
import './App.css';
import NoteTable from './components/note-table/Index';
import { getNotesUsingGet } from './services/api/noteControllerService';






function App ():JSX.Element {


getNotesUsingGet("c123e7d8-3b97-43e8-84bf-7998e60cfac6").then((data) => {
    console.log(data)
})


return (
<>
<NoteTable/>
</>
);
}

export default App;
