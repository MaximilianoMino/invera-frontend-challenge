import { Toaster } from 'sonner';
import './App.css';
import Dashboard from './components/Dashboard';
import { UsersProvider } from './hooks/context/UserContext';

function App() {
  return (
    <UsersProvider>
      <div className='m-auto px-5 sm:px-10'>
        <Dashboard />
        <Toaster
          richColors // Add this prop to enable colorful toasts
          position='top-center'
        />
      </div>
    </UsersProvider>
  );
}

export default App;
