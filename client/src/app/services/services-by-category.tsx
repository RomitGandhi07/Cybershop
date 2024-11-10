import { ApiSuccessResponse } from "@/interfaces";
import { PrimaryButton } from "@/shared/components/button";
import { APIStore } from "@/utils/api-store";
import { useEffect, useState } from "react";
import CategoryServices from "./service-category";
import ServicesSearchForm from "./services-search-form";

interface IService {
    id: string,
    name: string,
    description: string,
    logo: string
}

export default function ServicesByCategory() {
    const [services, setServices] = useState<Record<string, IService[]>>({});
    const [search, setSearch] = useState("");
    const [searchResultsText, setSearchResultsText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isAPILoading, setIsAPILoading] = useState(true);

    const fetchServicesByCategory = async () => {
        // Set is API Loading to true
        setIsAPILoading(true);

        let queryParams = "groupByCategory=true";
        if (search) {
            queryParams += "&search=" + search;
        }
        // Fetch services
        const response = await APIStore.getSevices(queryParams, {
            hideSuccessMessage: true
        });

        if (search) {
            setSearchResultsText(`Showing results for "${search}"`);
        }
        else {
            setSearchResultsText("");
        }

        // If respones is success then set services
        if (response && response.success) {
            setServices((response as ApiSuccessResponse).data);
        }

        // Set API Loading to false
        setIsAPILoading(false);
    };

    useEffect(() => {
        fetchServicesByCategory().then(() => {
            // If isLoading is true then set it to false. It is used for first time where API is called
            if (isLoading) {
                setIsLoading(false);
            }
        });
    }, []);

    return (
        isLoading ?
            "Loading..." :
            <div className="w-full max-w-screen-xl mx-auto">
                {/* <!-- Hero Section --> */}
                <div className="relative bg-cover bg-center h-[200px]">
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h1 className="text-3xl font-semibold">Explore and Strengthen Your Defense with the Best in Cybersecurity Solutions</h1>
                            <div className="mt-6 relative flex items-center justify-center">
                                <ServicesSearchForm
                                    setSearch={setSearch}
                                    fetchServicesByCategory={fetchServicesByCategory}
                                />
                                <div className="ml-4 mt-4 w-1/6">
                                    <PrimaryButton
                                        isLoader={isAPILoading}
                                        onClick={fetchServicesByCategory}
                                    >
                                        Search
                                    </PrimaryButton>
                                </div>

                            </div>
                            <div className="mt-3">
                                {searchResultsText}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="flex flex-wrap items-center gap-4 mt-5">
                <div className="ml-auto flex items-center space-x-2 text-gray-700">
                    <span>Name: A-Z</span>
                    <i className="fas fa-sort-alpha-down-alt"></i>
                </div>
            </div> */}
                {/* <!-- Content Section --> */}
                {
                    Object.keys(services).length ?
                        <div className="py-12 px-6 md:px-12 bg-white">
                            {
                                Object.keys(services).map(type => {
                                    return <CategoryServices
                                        key={type}
                                        type={type}
                                        services={services[type]}
                                    />
                                })
                            }
                        </div> :
                        <div className="flex items-center content-start">
                            <h2>No result found...</h2>
                        </div> // TODO: Need image for this
                }
            </div>
    );
}