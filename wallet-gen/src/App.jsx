import { useState, useEffect } from 'react'
import { Buffer } from 'buffer';
window.Buffer = Buffer;
import { SolanaWallet } from './components/solana'; // Make sure this path is correct
import { ShowSolBalance } from './components/showBalance';
import './App.css'

// App.jsx
function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [generateMnemonic, setGenerateMnemonic] = useState(null);

  useEffect(() => {
    import('bip39').then(bip39 => {
      setGenerateMnemonic(() => bip39.generateMnemonic);
    });
  }, []);

  const handleGenerateMnemonic = () => {
    if (generateMnemonic) {
      const newMnemonic = generateMnemonic();
      setMnemonic(newMnemonic);
      console.log("New mnemonic generated:", newMnemonic);
    }
  };

  return (
    <div className="container">
      <h2>Solana Wallet Generator</h2>
      <button onClick={handleGenerateMnemonic} disabled={!generateMnemonic}>
        Generate Mnemonic
      </button>
      {mnemonic && (
        <>
          <p>Generated Mnemonic:</p>
          <p>{mnemonic}</p>
          <ShowSolBalance />
          <SolanaWallet mnemonic={mnemonic} />
        </>
      )}
    </div>
  );
}

export default App;