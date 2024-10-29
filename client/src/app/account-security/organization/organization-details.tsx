import Description from "@/shared/components/description";
import { useState } from "react"

export default function OrganizationDetails() {
    const [data, setData] = useState<Record<string, any>>({
        name: "Demo",
        description: "Demo",
        numberOfADUsers: "Demo",
    });

    const fieldToTitleMapping: Record<string, string> = {
        name: "Name",
        description: "Description",
        numberOfADUsers: "Number Of AD Users"
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-xl font-medium mb-4">Basic Information</h2>
                    <div className="absolute top-4 right-4">
                        <button className="text-green-600 bg-gray-100 rounded-full p-2">
                            <i className="fas fa-pen"></i>
                        </button>
                    </div>
                    {
                        Object.keys(fieldToTitleMapping ?? {}).map(record => {
                            return <Description key={record} title={fieldToTitleMapping[record]} description={data[record]}></Description>
                        })
                    }
                    {/* <p className="text-gray-600">User ID</p>
                    <p className="mb-4">romitgandhi</p>
                    <p className="text-gray-600">Name</p>
                    <p className="mb-4">Romit Gandhi</p>
                    <p className="text-gray-600">Email</p>
                    <p className="mb-4">g******77@gmail.com</p> */}
                </div>
            </div>
        </div>
    )
}