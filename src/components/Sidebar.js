'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useWallet } from '../walletContext/WalletContext'; // Import the useWallet hook
import { userAuth } from "@/Use_Context/authContext";
import axios from 'axios'; // Import axios for API calls
import { useState } from 'react'; // Import useState for managing modal state

const menuItems = [
  { name: 'Buy CSP', path: '/buy_csp' },
  // { name: 'Transaction History', path: '/transactions' },
  // { name: 'Ambassador', path: '/ambassador' },
  // { name: 'My Wallet', path: '/dashboard' },
  // { name: 'KYC', path: '/kyc' },
  // { name: 'My Profile', path: '/profile' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { account, connectWallet, disconnectWallet } = useWallet();
  const { authUser } = userAuth();

  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [referralCode, setReferralCode] = useState(''); // State to store referral code

  // Function to handle referral API call
  const handleReferClick = async () => {
    if (!authUser) { // Check if authUser is present
      alert("Please log in first."); // Alert user to log in
      return; // Exit the function if not logged in
    }

    const token = authUser; // Get the auth token from authUser
    try {
      const response = await axios.get("https://api.chainsphere.tech/api/v1/user/referral-code", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the auth token
        },
      });
      console.log("Referral Code Response:", response.data.data.referralCode); // Log the response
      setReferralCode(response.data.data.referralCode); // Set the referral code
      setModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching referral code:", error); // Log any errors
    }
  };

  // Function to copy referral code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      alert("Referral code copied to clipboard!"); // Notify user
    });
  };

  return (
    <div className="w-64 bg-black text-white h-screen p-5">

      <ul>
        {menuItems.map(item => (
          <li key={item.name} className={`mb-4 p-2 ${pathname === item.path ? 'bg-gradient-to-r from-[#FFC000] to-[#FF9500] p-2 rounded-lg text-black' : ''}`}>
            <Link href={item.path} className="block hover:bg-gradient-to-r from-[#FFC000] to-[#FF9500] p-2 rounded-lg">{item.name}</Link>
          </li>
        ))}
        <Button className="mt-2 mb-2" onClick={handleReferClick}>
          Refer Someone!
        </Button>
        {/* Conditional rendering based on wallet connection */}
        {account ? (
          <div className="mb-4 p-2 bg-gradient-to-r from-[#FFC000] to-[#FF9500] rounded-lg text-black">
            Account: {account.slice(0, 7) + '...' + account.slice(-4)} {/* Display shortened address */}
          </div>
        ) : (
          <Button onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </ul>

      {/* Modal for displaying referral code */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Here is your referral code:</h2>
            <p className="text-xl cursor-pointer" onClick={copyToClipboard}>
              {referralCode} {/* Display the referral code */}
            </p>
            <Button className="mt-4" onClick={() => setModalOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
