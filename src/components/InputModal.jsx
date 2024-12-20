export default function InputModal({ text, applyText, handleGraphText, handleToggle }) {
    return (
        <>
            <div>
                <div className="fixed inset-0 z-40 bg-gray-950 bg-opacity-80"
                    onClick={handleToggle}>
                </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden fixed top-24 left-1/2 transform -translate-x-1/2 z-50 flex justify-center items-center">
                <div className="bg-gray-100 rounded-md max-w-md">
                    <div className="p-4 text-center">
                        <h1 className="font-bold text-2xl m-2 text-left md:mr-20">Importer data du Graph</h1>
                        <h3 className="text-gray-600 font-semibold m-2 text-lg p-4">Départ:Arrivé:Poid</h3>
                        <textarea rows={5} value={text} onChange={(e) => handleGraphText(e.target.value)}
                            className="border border-gray-700 rounded shadow-sm font-semibold p-4 text-lg"/>
                        <div className="text-right">
                            <button onClick={applyText} className="mt-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-100 font-bold">Confirmer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}