'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useWallet } from '../walletContext/WalletContext'; // Import the useWallet hook

const menuItems = [
  { name: 'Buy CSP', path: '/buy_csp' },
  { name: 'Transaction History', path: '/transactions' },
  { name: 'Ambassador', path: '/ambassador' },
  { name: 'My Wallet', path: '/dashboard' },
  { name: 'KYC', path: '/kyc' },
  { name: 'My Profile', path: '/profile' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { account, connectWallet, disconnectWallet } = useWallet();

  return (
    <div className="w-64 bg-black text-white h-screen p-5">

      <ul>
        {menuItems.map(item => (
          <li key={item.name} className={`mb-4 p-2 ${pathname === item.path ? 'bg-gradient-to-r from-[#FFC000] to-[#FF9500] p-2 rounded-lg text-black' : ''}`}>
            <Link href={item.path} className="block hover:bg-gradient-to-r from-[#FFC000] to-[#FF9500] p-2 rounded-lg">{item.name}</Link>
          </li>
        ))}
        {/* Conditional rendering based on wallet connection */}
        {account ? (
          <div className="mb-4 p-2 bg-gradient-to-r from-[#FFC000] to-[#FF9500] rounded-lg text-black">
            Connected Account:{account.slice(0, 3) + '...' + account.slice(-4)} {/* Display shortened address */}
            <Button onClick={disconnectWallet} className="mt-2">
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <Button onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </ul>
    </div>
  );
}
