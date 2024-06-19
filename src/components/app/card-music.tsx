"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { musics } from "@prisma/client"
import { HeartIcon } from "@radix-ui/react-icons"
import { Music } from "@/model/music"
import { intToDuration } from "@/lib/intToDuration"

export default function CardMusic({ music } : { music: Music }) {
  return (
    <Card className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={music.img} alt="Album Artwork" width={300} height={200} className="w-full h-48 object-cover" />
        <Button variant="ghost" className="absolute top-4 right-4 text-gray-900 dark:text-gray-100">
          <HeartIcon className="w-6 h-6" />
        </Button>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{music.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{music.artist.name}</p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{intToDuration(music.duration)}</p>
        </div>
      </div>
    </Card>
  )
}

