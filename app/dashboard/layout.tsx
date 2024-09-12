'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/store'
import { selectUser } from '@/store/slices/authSlice'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import useScroll from '@/hooks/useScroll'
import { FaChartLine, FaChartBar, FaChartPie, FaChartScatter } from 'react-icons/fa'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const user = useAppSelector(selectUser)
  const { scrollY, scrollDirection } = useScroll()

  const links = [
    {
      label: 'Visualizations',
      path: '/dashboard/visualizations',
      icon: <FaChartLine />,
    },
    {
      label: 'Line Chart',
      path: '/dashboard/visualizations/line-chart',
      icon: <FaChartLine />,
    },
    {
      label: 'Bar Chart',
      path: '/dashboard/visualizations/bar-chart',
      icon: <FaChartBar />,
    },
    {
      label: 'Pie Chart',
      path: '/dashboard/visualizations/pie-chart',
      icon: <FaChartPie />,
    },
    {
      label: 'Scatter Plot',
      path: '/dashboard/visualizations/scatter-plot',
      icon: <FaChartScatter />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        user={user}
        links={links}
        scrollY={scrollY}
        scrollDirection={scrollDirection}
      />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout