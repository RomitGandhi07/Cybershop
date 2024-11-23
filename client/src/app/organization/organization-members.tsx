import Form, { FormItems } from "@/lib/form/form";
import { PrimaryButton } from "@/shared/components/button";
import { useRef } from "react";

export default function OrganizationMembers() {
    const formRef = useRef(null);

    const fields = [{
        name: 'search',
        className: "text-black mt-4 rounded-3xl w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
        placeholder: "Enter email address",
        type: 'input',
        // onChange: onChangeSearch
    }]

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-medium mb-2 text-orange-600">Team</h2>
            {/* <p classNameName="text-gray-500 mb-6">Creating a new account allows you to use Upwork in different ways, while still having just one login.</p> */}

            {/* OWNER */}
            <div className="flex flex-col mt-5">
                <span className="text-gray-600">Owner</span>
                <span className="mb-4">Romit Gandhi (gandhiromit77@gmail.com)</span>
            </div>


            {/* ENABLED USERS */}
            <div
                className="mt-5 relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <span className="m-5 text-orange-600">Members</span>
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Name
                                </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Email
                                </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    Darshan Vesatiya
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    darshan.vesatiya@gmail.com
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50 text-orange-600">
                                <a href="#" className="block text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    Inactive
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    Vaibhav Talati
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    vaibhav.talati@gmail.com
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50  text-orange-600">
                                <a href="#" className="block text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    Inactive
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* DISABLED USERS */}
            <div
                className="mt-7 relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <span className="m-5  text-orange-600">Inactive Members</span>
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Name
                                </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Email
                                </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    Akshay Dholakiya
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    akshay.dholakiya@gmail.com
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50 text-orange-600">
                                <a href="#" className="block text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    Active
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* INVITED USERS */}
            <div
                className="mt-7 relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <span className="m-5  text-orange-600">Invited Members</span>
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Email
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    romit.gandhi@rapidops.com
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Invite new User */}
            <div className="mt-10">
                <span className="text-orange-600">Invite Team Member</span>
                <Form ref={formRef} defaultValues={{}}>
                    <div className="flex">
                        <div className="w-full">
                            <FormItems
                                fields={fields}
                            />
                        </div>
                        {/* <div> */}
                            <PrimaryButton
                                isLoader={false}
                                className="ml-4 mt-4 w-1/4"
                                mergeClasses={true}
                            // disabled={true}
                            >
                                Invite
                            </PrimaryButton>
                        {/* </div> */}
                    </div>

                </Form>
            </div>
        </div>
    )
}