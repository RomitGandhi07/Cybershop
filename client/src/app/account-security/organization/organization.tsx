import OrganizationDetails from "./organization-details";
import OrganizationMembers from "./organization-members";

export default function Organization() {
    return (
        <div className="flex items-center justify-center min-h-screen p-4">

            <div className="w-full max-w-6xl space-y-6">
                <h1 className="text-2xl font-medium mb-6">Organization</h1>
                <OrganizationDetails />
                <OrganizationMembers />
            </div>

        </div>
    )
}