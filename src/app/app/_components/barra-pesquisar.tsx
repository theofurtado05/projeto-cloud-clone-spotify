"use client"

import { SearchIcon } from "@/components/icons/search-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWorkflow } from "@/context/workflow.context"

export default function BarraPesquisar({ className }: { className?: string }) {
    const {activeSearch, setActiveSearch} = useWorkflow()

    return (
        <div className="flex items-center justify-start gap-0">
            <Input value={activeSearch} onChange={(e) => setActiveSearch(e.target.value)} placeholder='Pesquisar' className={`${className} !rounded-r-none w-full`} />
            <Button className="rounded-l-none">
                <SearchIcon className="text-[16px] font-bold"/>
            </Button>
        </div>
    )
}