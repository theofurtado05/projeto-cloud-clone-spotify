"use client"
import CardMusic from '@/components/app/card-music'
import { useWorkflow } from '@/context/workflow.context'
import { Music } from '@/model/music'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function AllMusics(){
    const [musics, setMusics] = useState<Music[]>([])
    const {activeSearch, setActiveSearch} = useWorkflow()

    const fetchGetMusics = async () => {
        try {
            const response = await axios.get('/api/musics')
            setMusics(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchGetMusics()
    },[])

    return (
        <div className='flex flex-wrap w-full items-center justify-start gap-2'>
            {musics
            .filter((music: Music) => activeSearch.length > 3 ? music.name.toLowerCase().includes(activeSearch.toLowerCase()) : true)
            .map((music: Music) => {
                return (
                    <div key={music.id}>
                        <CardMusic music={music}/>
                    </div>
                )
            })}
        </div>
    )
}