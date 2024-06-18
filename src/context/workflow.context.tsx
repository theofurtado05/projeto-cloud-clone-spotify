"use client"
import React, { createContext, useState, useContext } from 'react';


const WorkflowContext = createContext<any | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)
    const [isModalUpgradeActive, setIsModalUpgradeActive] = useState<boolean>(false)
    const [activeSearch, setActiveSearch] = useState<string | null>(null)
    
    return (
        <WorkflowContext.Provider value={{ 
            isOpenSidebar, setIsOpenSidebar,
            isModalUpgradeActive, setIsModalUpgradeActive,
            activeSearch, setActiveSearch
            }}>
            {children}
        </WorkflowContext.Provider>
    );
};

export const useWorkflow: () => any = () => {
    const context = useContext(WorkflowContext);
    if (!context) {
        throw new Error('useWorkflow must be used within a WorkflowProvider');
    }
    return context;
};
