"use client"
import {
    DashboardPage,
    DashboardPageHeader,
    DashboardPageHeaderNav,
    DashboardPageHeaderTitle,
    DashboardPageMain,
  } from '@/components/app/page'
  
  import { Button } from '@/components/ui/button'
  import { PlusIcon } from '@radix-ui/react-icons'

import Link from 'next/link'

import { useEffect, useState } from 'react'
import Cookies from 'cookies-js'
import { useTheme } from 'next-themes'
import { Icon } from '@iconify/react'
import Info from '@/components/app/info'
import { ModalVideo } from '@/components/app/modal-video'
import BarraPesquisar from '../_components/barra-pesquisar'


  
export default function Page() {
    
    const {setTheme} = useTheme()

    useEffect(() => {
      const themeCached = Cookies.get('theme')
      if(themeCached){
        setTheme(themeCached)
      }

      Cookies.expire('feedbacks')
    }, [])

    return (
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>
            <BarraPesquisar />
            </DashboardPageHeaderTitle>
          <DashboardPageHeaderNav>
            <></>
          </DashboardPageHeaderNav>
        </DashboardPageHeader>
        <DashboardPageMain>
          <></>
        </DashboardPageMain>
      </DashboardPage>
    )
  }