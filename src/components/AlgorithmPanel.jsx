import Select from 'react-select';
import { useEffect, useState } from 'react';
export default function AlgorithmPanel( {src, srcOptions, handleSrc, handleDest, handleBellman, handleSpeed, speed, display, time} ) {
    const [destOptions, setDestOptions] = useState([]);
    useEffect(() => {
        if (srcOptions.length > 0 && src) {
            setDestOptions([ {value: -1, label: 'Tous les sommets'}, ...srcOptions.filter(s => s?.value != src.value)]);
        }
    }, [src, srcOptions]);
    return (
        <>
            <div>
                <div className="m-4 p-4 text-gray-800">
                    <h2 className="m-4 text-2xl font-bold">Trouver le plus court chemin (<a href="https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm" className="text-indigo-500" target='_blank'>Bellman Ford</a>)</h2>
                    <div className="">
                            <div className="p-4 m-2 ml-3">
                                <label htmlFor="speed" className="text-lg font-medium m-2 block">
                                    Vitesse: <span className="text-indigo-500">{speed}</span>
                                </label>
                                <input
                                    id="speed"
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={speed}
                                    onChange={(e) => handleSpeed(e.target.value)}
                                    className="w-full md:w-1/2 lg:w-1/4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                />
                            </div>
                            
                    </div>
                    <div className="mx-6">
                        <span className="text-md font-semibold">Temps d&apos;exécution: <span className="text-green-600 font-thin">{time}ms</span></span>
                    </div>
                    <div className="flex m-4 mb-10 justify-between xl:justify-start">

                        <div className="flex mr-6">   
                            <Select 
                            options={srcOptions}
                            onChange={handleSrc}
                            placeholder="Source..."
                            classNames={{
                                control: (state) =>
                                  state.isFocused ? 'border-red-600' : 'border-grey-300',
                              }}
                            className="m-2 w-60 accent-indigo-500 focus:border-indigo-500"
                            />
                            <Select 
                            options={destOptions}
                            onChange={handleDest}
                            placeholder="Arrivé..."
                            className="m-2 w-60"
                            />
                        </div>
                        <div className="">
                                <button className="m-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md text-gray-100 font-bold " onClick={handleBellman}>Trouver le plus court chemin</button>
                        </div>
                        </div>
                        
                    <div>
                        <ul className="">
                            {display.map((dist, i) => <li key={i} className="m-6 font-semibold">{dist}</li>)}
                        </ul>
                    </div>
                </div>
                
            </div>
        </>
    );
}