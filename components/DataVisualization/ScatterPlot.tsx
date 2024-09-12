'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useDataContext } from '@/store/context'
import { ScatterPlotData } from '@/types'
import { FaQuestionCircle } from 'react-icons/fa'
import { Tooltip } from '../ui/Tooltip'
import { Spinner } from '../ui/Spinner'

interface ScatterPlotProps {
  width: number
  height: number
  data: ScatterPlotData[]
  xLabel: string
  yLabel: string
  tooltip?: (data: ScatterPlotData) => React.ReactNode
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({
  width,
  height,
  data,
  xLabel,
  yLabel,
  tooltip,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { isLoading } = useDataContext()
  const [tooltipData, setTooltipData] = useState<ScatterPlotData | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, width, height)

    const xScale = width / Math.max(...data.map(d => d.x))
    const yScale = height / Math.max(...data.map(d => d.y))

    ctx.font = '12px Arial'
    ctx.fillStyle = '#333'
    ctx.fillText(xLabel, width / 2, height - 10)
    ctx.save()
    ctx.translate(10, height - 10)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText(yLabel, 0, 0)
    ctx.restore()

    data.forEach(d => {
      const x = d.x * xScale
      const y = height - d.y * yScale

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = '#2563eb'
      ctx.fill()

      const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        const dx = x - d.x * xScale
        const dy = y - (height - d.y * yScale)
        const distance = Math.sqrt(dx ** 2 + dy ** 2)

        if (distance < 10) {
          setTooltipData(d)
          setTooltipPosition({ x: event.clientX, y: event.clientY })
        } else {
          setTooltipData(null)
        }
      }

      const handleMouseLeave = () => {
        setTooltipData(null)
      }

      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
    })
  }, [width, height, data, xLabel, yLabel])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={width} height={height} />
      {tooltipData && tooltipPosition && (
        <Tooltip position={tooltipPosition}>
          {tooltip ? tooltip(tooltipData) : `(${tooltipData.x}, ${tooltipData.y})`}
        </Tooltip>
      )}
      <div className="absolute top-2 right-2">
        <FaQuestionCircle
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          size={16}
        />
      </div>
    </div>
  )
}

export default ScatterPlot