"use client";
import ThreatIntelligenceSearchForm from "./threat-intelligence-search-form";

export default function ThreatIntelligence() {
    return (
        <div className="flex flex-col space-y-2">
            {/* <div className="flex content-center items-center border">
                <ThreatIntelligenceSearchForm
                    setSearch={() => { }}
                />
            </div> */}

            <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <!-- Card 1 --> */}
                <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            {/* <img src="https://placehold.co/40x40" alt="Logo" className="w-10 h-10 rounded-full" /> */}
                            <div>
                                <h3 className="font-bold text-gray-800">Operation Silent Blade</h3>
                                {/* <p className="text-sm text-gray-500">Cybercriminals</p> */}
                            </div>
                        </div>
                        <span className="text-sm font-medium bg-orange-100 text-orange-600 py-1 px-3 rounded-full">Active</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                            <p className="font-semibold text-gray-700">Aliases</p>
                            <p>SilentDagger, BladeRunner</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Targeted Regions</p>
                            <p> North America, Western Europe</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">First seen</p>
                            <p>2023-11-15</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Last seen</p>
                            <p>2024-02-10</p>
                        </div>
                    </div>
                    <div className="mb-2">
                        <p className="font-semibold text-gray-700 text-sm">Targeted Industries</p>
                        <p> Energy, Defense</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Details</p>
                        <p> A sophisticated APT group targeting critical infrastructure with spear-phishing emails containing backdoor malware. Likely state-sponsored with financial espionage motives.</p>
                    </div>
                </div>
                {/* <!-- Card 2 --> */}
                <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            {/* <img src="https://placehold.co/40x40" alt="Logo" className="w-10 h-10 rounded-full" /> */}
                            <div>
                                <h3 className="font-bold text-gray-800">Dark Pyre Malware</h3>
                                {/* <p className="text-sm text-gray-500">Cybercriminals</p> */}
                            </div>
                        </div>
                        <span className="text-sm font-medium bg-orange-100 text-orange-600 py-1 px-3 rounded-full">Dormant</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                            <p className="font-semibold text-gray-700">Aliases</p>
                            <p> PyreFlame, BlackInferno</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Targeted Regions</p>
                            <p>Southeast Asia, Middle East</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">First seen</p>
                            <p>2024-01-05</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Last seen</p>
                            <p>2024-03-20</p>
                        </div>
                    </div>
                    <div className="mb-2">
                        <p className="font-semibold text-gray-700">Targeted Industries</p>
                        <p>Healthcare, Technology</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Details</p>
                        <p>A ransomware campaign leveraging zero-day vulnerabilities in outdated systems, encrypting sensitive data and demanding cryptocurrency payments.</p>
                    </div>
                </div>
                {/* <!-- Card 3 --> */}
                <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            {/* <img src="https://placehold.co/40x40" alt="Logo" className="w-10 h-10 rounded-full" /> */}
                            <div>
                                <h3 className="font-bold text-gray-800">Phantom Wave</h3>
                                {/* <p className="text-sm text-gray-500">Cybercriminals</p> */}
                            </div>
                        </div>
                        <span className="text-sm font-medium bg-orange-100 text-orange-600 py-1 px-3 rounded-full">Active</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                            <p className="font-semibold text-gray-700">Aliases</p>
                            <p>WaveX, GhostCurrent</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Targeted Regions</p>
                            <p>East Asia, Africa</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">First seen</p>
                            <p>2022-09-10</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Last seen</p>
                            <p>2024-08-30</p>
                        </div>
                    </div>
                    <div className="mb-2">
                        <p className="font-semibold text-gray-700">Targeted Industries</p>
                        <p>Finance, Retail</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Details</p>
                        <p>A persistent phishing campaign distributing fake invoices to extract login credentials from financial executives, leading to account takeover and fraud.</p>
                    </div>
                </div>
                {/* <!-- Card 4 --> */}
                <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            {/* <img src="https://placehold.co/40x40" alt="Logo" className="w-10 h-10 rounded-full" /> */}
                            <div>
                                <h3 className="font-bold text-gray-800">Nebula Botnet</h3>
                                {/* <p className="text-sm text-gray-500">Cybercriminals</p> */}
                            </div>
                        </div>
                        <span className="text-sm font-medium bg-orange-100 text-orange-600 py-1 px-3 rounded-full">Mitigated</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                            <p className="font-semibold text-gray-700">Aliases</p>
                            <p>StarLinker, CloudHunter</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Targeted Regions</p>
                            <p>South America, Eastern Europe</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">First seen</p>
                            <p>2023-03-18</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Last seen</p>
                            <p>2024-09-25</p>
                        </div>
                    </div>
                    <div className="mb-2">
                        <p className="font-semibold text-gray-700">Targeted Industries</p>
                        <p>Telecommunications, Manufacturing</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Details</p>
                        <p>A botnet leveraging IoT devices for DDoS attacks on enterprise networks, causing widespread service disruptions and ransom demands.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}