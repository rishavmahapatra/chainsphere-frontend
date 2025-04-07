import LayoutWrapper from '@/components/LayoutWrapper';

export default function BuyCSPPage() {
  return (
    <LayoutWrapper>
      <h1 className="text-2xl font-bold mb-4">BUY CHAINSPHERE</h1>
      <p className="text-yellow-400 mb-4">Chainsphere Price - $0.05</p>
      <div className="bg-black border border-gray-700 p-6 rounded-lg max-w-xl">
        <div className="mb-4">
          <label className="block mb-2">Select Coin</label>
          <select className="w-full p-2 bg-gray-800 text-white rounded">
            <option value="">Select coin</option>
            <option value="">Select </option>
            <option value="">Select con</option>
            <option value="">Select coi</option>
          </select>
          
        </div>
        <div className="mb-4">
          <label className="block mb-2">Enter USDT Amount</label>
          <input type="number" className="w-full p-2 bg-gray-800 text-white rounded" />
        </div>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">
          Pay
        </button>
      </div>
    </LayoutWrapper>
  );
}
