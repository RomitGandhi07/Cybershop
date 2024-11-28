import React, { useState } from 'react';

type Tab = {
    label: string;
    content: React.ReactNode;
};

type TabsProps = {
    tabs: Tab[];
    defaultTab?: number;
    onTabChange?: (activeIndex: number) => void;
};

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab = 0, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        if (onTabChange) {
            onTabChange(index);
        }
    };

    return (
        <div className="w-full">
            {/* Tab Navigation */}
            <div className="flex">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={`px-4 py-2 text-md font-medium ${activeTab === index
                                ? 'border-b-2 border-orange-600 text-orange-600'
                                : 'text-gray-500 hover:text-orange-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {/* Tab Content */}
            <div className="mt-4">
                {tabs[activeTab]?.content}
            </div>
        </div>
    );
};

export default Tabs;
