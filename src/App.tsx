import './styles.css';
import { useState } from 'react';
import Dialog from './components/Dialog';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="App">
      <button onClick={() => setIsOpen(true)}>Click to Open Dialog</button>

      <Dialog handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <Dialog.Layout>
          <Dialog.Content>hello</Dialog.Content>
        </Dialog.Layout>
      </Dialog>
    </main>
  );
}
