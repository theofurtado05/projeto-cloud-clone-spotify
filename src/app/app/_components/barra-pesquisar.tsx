"use client"
import { SearchIcon } from "@/components/icons/search-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWorkflow } from "@/context/workflow.context"
import axios from 'axios'
import { useEffect, useRef, useState } from "react"

export default function BarraPesquisar({ className }: { className?: string }) {
    const { activeSearch, setActiveSearch } = useWorkflow()
    const [searchList, setSearchList] = useState<string[]>([])
    const [showDropDown, setShowDropDown] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const fetchAzureSearch = async () => {
        try {
            const response = await axios.post('/api/musics/search', {
                searchText: activeSearch
            })
            console.log(response.data)
            setSearchList(response.data.searchResults)
            setShowDropDown(true)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (activeSearch.length >= 3 && !showDropDown) {
            fetchAzureSearch()
        }  else {
            setShowDropDown(false)
        }
    }, [activeSearch])

    const handleSuggestionClick = (suggestion: string) => {
        setActiveSearch(suggestion)
        setShowDropDown(false)
        
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropDown(false)
        }
    }

    const handleEscPress = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setShowDropDown(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleEscPress)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscPress)
        }
    }, [])

    return (
        <div className="relative flex items-center justify-start gap-0">
            <Input
                value={activeSearch}
                onChange={(e) => setActiveSearch(e.target.value)}
                placeholder='Pesquisar'
                className={`${className} !rounded-r-none w-full`}
            />
            <Button className="rounded-l-none">
                <SearchIcon className="text-[16px] font-bold" />
            </Button>
            {showDropDown && searchList.length > 0 && 
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {searchList.length > 1 && searchList.map((item: any, index: number) => (
                        <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                handleSuggestionClick(item.document.name)
                            }}
                        >
                            {item.document.name}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
