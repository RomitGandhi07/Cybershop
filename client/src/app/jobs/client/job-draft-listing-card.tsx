"use client";
import { APIStore } from "@/utils/api-store";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface IJobDetails {
    id: string,
    title: string,
    createdAt: string
}
interface IJobListingCardProps {
    job: IJobDetails,
    setRefreshPage: (val: boolean) => void
}


const JobDraftListingCard: React.FC<IJobListingCardProps> = ({ job, setRefreshPage }) => {
    const router = useRouter();

    
    async function cancelJobPost() {
        const response = await APIStore.deleteJobPost(job.id);
        if(response && response.success) {
            setRefreshPage(true);
        }
    }

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-500 text-xs mb-2">Posted at {new Date(job.createdAt).toString()}</p>

                    <FaPencil
                        size={15}
                        title="Edit"
                        className="cursor-pointer"
                        onClick={() => {
                            router.push(`/jobs/${job.id}/edit`);
                        }}
                    // onClick={handleWishlistToggle}
                    // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                    //     }`
                    // }
                    />

                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-orange-600 font-semibold text-lg mb-2">{job.title}</span>

                    <FaTrash
                        size={15}
                        title="Cancel"
                        className="text-red-600 cursor-pointer"
                        onClick={cancelJobPost}
                    // onClick={handleWishlistToggle}
                    // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                    //     }`
                    // }
                    />
                </div>
            </div>
        </>
    )
};

export default JobDraftListingCard;