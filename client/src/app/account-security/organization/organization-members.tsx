export default function OrganizationMembers() {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-medium mb-2">Members</h2>
            <p className="text-gray-500 mb-6">Creating a new account allows you to use Upwork in different ways, while still having just one login.</p>

            <div className="mb-4">
                <h3 className="font-medium">Client Account</h3>
                <p className="text-gray-500 mb-3">Hire, manage and pay as a different company. Each client company has its own freelancers, payment methods and reports.</p>
                <button className="px-4 py-2 border border-green-600 text-green-600 rounded-md font-medium">New Client Account</button>
            </div>

            <div>
                <h3 className="font-medium">Agency Account</h3>
                <p className="text-gray-500 mb-3">Find jobs and earn money as manager of a team of freelancers.</p>
                <button className="px-4 py-2 border border-green-600 text-green-600 rounded-md font-medium">New Agency Account</button>
            </div>
        </div>
    )
}