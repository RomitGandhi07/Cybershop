import Form, { FormItems } from "@/lib/form/form";
import { PrimaryButton } from "@/shared/components/button";
import { APIStore } from "@/utils/api-store";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from 'yup';

interface IMemberDetail {
    id: string,
    name: string,
    email: string,
    isEnabled: boolean
}

const OrganizationMembers: React.FC<{}> = () => {
    const formRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [inviteLoader, setInviteLoader] = useState(false);
    const [refreshPage, setRefreshPage] = useState(false);
    const [data, setData] = useState<{
        owner: IMemberDetail,
        team: {
            usersExist: {
                enabled: IMemberDetail[],
                disabled: IMemberDetail[]
            },
            usersNotExist: string[]
        }
    } | null>(null);

    const inviteUser = async (data: any) => {
        setInviteLoader(true);
        await APIStore.inviteOrganizationMember(data.email, {
            hideErrorMessage: true
        });
        setRefreshPage(true);
        setInviteLoader(false);
    }

    const activeUser = async (userId: string) => {
        setInviteLoader(true);
        await APIStore.inviteOrganizationMember(userId, {
            hideErrorMessage: true
        });
        setRefreshPage(true);
        setInviteLoader(false);
    }

    const onSubmit = () => {
        if (formRef && formRef.current) {
            // @ts-ignore
            formRef.current.submit();
        }
    };

    const getOrganizationMembers = async () => {
        setIsLoading(true);
        const response = await APIStore.getOrganizationMembers({
            hideSuccessMessage: true
        });
        if (response && response.success) {
            setData((response as any).data);
        }
        setRefreshPage(false);
        setIsLoading(false);
    }

    useEffect(() => {
        if (isLoading || refreshPage) {
            getOrganizationMembers();
        }
    }, [refreshPage, isLoading])

    const fields = [{
        name: 'email',
        className: "text-black mt-4 rounded-3xl w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
        placeholder: "Enter email address",
        type: 'input',
        // onChange: onChangeSearch
    }];

    const formValidations = Yup.object().shape({
        email: Yup
            .string()
            .email('Please enter a valid email')
            .required('Email is required'),
    });

    return (
        (isLoading && !data) ? "Loading..." :
            (data && <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-medium mb-2 text-orange-600">Team</h2>
                {/* <p classNameName="text-gray-500 mb-6">Creating a new account allows you to use Upwork in different ways, while still having just one login.</p> */}

                {/* OWNER */}
                <div className="flex flex-col mt-5">
                    <span className="text-gray-600">Owner</span>
                    <span className="mb-4">{data.owner.name} ({data.owner.email})</span>
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
                            {
                                data.team.usersExist.enabled.length ? data.team.usersExist.enabled.map(user => {
                                    return (
                                        <tr key={user.id}>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {user.name}
                                                </p>
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {user.email}
                                                </p>
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50 text-orange-600">
                                                <a href="#" className="block text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                                    Active
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                }) : <tr className="p-4 border-b border-blue-gray-50">
                                    <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900 text-center my-3">
                                        No Users Found.
                                    </p>
                                </tr>
                            }
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
                            {
                                data.team.usersExist.disabled.length ? data.team.usersExist.disabled.map(user => {
                                    return (
                                        <tr key={user.id}>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {user.name}
                                                </p>
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {user.email}
                                                </p>
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50 text-orange-600">
                                                <a href="#" className="block text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                                    Active
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                }) : <tr className="p-4 border-b border-blue-gray-50 text-center">
                                    <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900 my-3">
                                        No Users Found.
                                    </p>
                                </tr>
                            }
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
                            {
                                data.team.usersNotExist.length ? data.team.usersNotExist.map(email => {
                                    return (
                                        <tr key={email}>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {email}
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                }) : <tr className="p-4 border-b border-blue-gray-50">
                                    <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900 text-center my-3">
                                        No Users Found.
                                    </p>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>

                {/* Invite new User */}
                <div className="mt-10">
                    <span className="text-orange-600">Invite Team Member</span>
                    <Form onSubmit={inviteUser} ref={formRef} validationSchema={formValidations} defaultValues={{}}>
                        <div className="flex">
                            <div className="w-full">
                                <FormItems
                                    fields={fields}
                                />
                            </div>
                            {/* <div> */}
                            <PrimaryButton
                                isLoader={inviteLoader}
                                className="ml-4 mt-4 w-1/4 h-1/4"
                                mergeClasses={true}
                                onClick={onSubmit}
                            // disabled={true}
                            >
                                Invite
                            </PrimaryButton>
                            {/* </div> */}
                        </div>

                    </Form>
                </div>
            </div>)
    )
}

export default React.memo(OrganizationMembers);