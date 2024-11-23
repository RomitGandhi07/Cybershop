import OrganizationDetails from "./organization-details";
import OrganizationMembers from "./organization-members";

export default function Organization() {
    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">

            <div className="w-full max-w-6xl space-y-6">
                <div className="flex">
                    <img src="https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_200_200/company-logo_200_200/0/1633985771177/crowdstrike_logo?e=1740009600&v=beta&t=8duqSF0EAlEK6SB-UBNKPykiMqpXfZwXG8u7LhJWtGs" alt="Profile" className="w-12 h-12 rounded-full border border-gray-300" />
                    <h1 className="ml-5 mt-2 text-2xl font-medium mb-6">Crowd Strike</h1>
                </div>
                <OrganizationDetails />
                <OrganizationMembers />
            </div>

        </div>
    )
}