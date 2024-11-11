import Image from "next/image"
import React from "react"

interface IService {
    id: string,
    name: string,
    description: string,
    logo: string
}

interface ICategoryServices {
    type: string,
    services: IService[]
}

const CategoryServices: React.FC<ICategoryServices> = ({ type, services }) => {
    return (
        <div className="my-4">
            {/* <!-- Cyber Security Essentials Section --> */}
            <h2 className="text-xl font-bold text-orange-600 mb-6">{type}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {
                    services.map(service => {
                        return (
                            <div key={service.id} className="flex items-start space-x-4">
                                <img src={service.logo ?? "https://placehold.co/64x64"} alt="Icon" className="w-16 h-16 rounded-lg shadow-sm" />
                                {/* <Image
                                    src={service.logo ?? "https://placehold.co/64x64"}
                                    width={64}
                                    height={64}
                                    alt="Service Icon"
                                    className="w-16 h-16 rounded-lg shadow-sm"
                                /> */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                                    {/* <p className="text-sm text-gray-600">Cyber Security</p> */}
                                    <p className="text-sm text-gray-700 mt-1">{service.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default React.memo(CategoryServices);