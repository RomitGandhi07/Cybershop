"use client";
import React, { useState } from 'react';

interface CompanyDetails {
    name: string,
    logo: string,
    website: string;
    industry: string;
    noOfEmployees: number;
    tagline: string;
    description: string;
}

const EditCompanyDetailsForm: React.FC<{ initialData: CompanyDetails, onSave?: (data: CompanyDetails) => void }> = ({ initialData }) => {
    const [formData, setFormData] = useState<CompanyDetails>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "noOfEmployees" ? parseInt(value) : value
        });
    };

    //   const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     onSave(formData);
    //   };

    return (
        <form className="mx-auto bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Organization Details</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">logo</label>
                <input
                    type="text"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
                <input
                    type="number"
                    name="employees"
                    value={formData.noOfEmployees}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                <input
                    type="text"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
                Save Changes
            </button>
        </form>
    );
};

export default EditCompanyDetailsForm;
