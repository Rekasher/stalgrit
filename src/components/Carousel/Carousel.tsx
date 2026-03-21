"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { employeeMockData } from "@/lib/employee-mock-data"

export default function Carousel3D() {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const currentRotation = useRef(0)
  const dragRotation = useRef(0)

  const itemCount = employeeMockData.length
  const anglePerItem = 360 / itemCount
  const radius = 400

  const normalizeRotation = (rot: number) => {
    let normalized = rot % 360
    if (normalized > 0) normalized -= 360
    const steps = Math.round(normalized / anglePerItem)
    return steps * anglePerItem
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    startX.current = e.clientX
    dragRotation.current = rotation
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - startX.current
    const newRotation = dragRotation.current + deltaX * 0.5
    setRotation(newRotation)
    currentRotation.current = newRotation
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    const snapped = normalizeRotation(currentRotation.current)
    setRotation(snapped)
    currentRotation.current = snapped
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  })

  useEffect(() => {
    if (isDragging) return
    const interval = setInterval(() => {
      const snapped = normalizeRotation(currentRotation.current)
      const next = snapped - anglePerItem
      setRotation(next)
      currentRotation.current = next
    }, 2500)
    return () => clearInterval(interval)
  }, [isDragging, anglePerItem, normalizeRotation])

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-visible">
      {/* perspective wrapper */}
      <div
        className="relative w-full h-[500px] cursor-grab active:cursor-grabbing"
        style={{ perspective: "1200px" }}
        onMouseDown={handleMouseDown}
      >
        {/* rotating stage — centered in the perspective wrapper */}
        <div
          className="absolute left-1/2 top-1/2 transition-transform duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `translate(-50%, -50%) translateZ(-${radius}px) rotateY(${rotation}deg)`,
          }}
        >
          {employeeMockData.map((item, i) => {
            const angle = i * anglePerItem
            return (
              <div
                key={i}
                className="absolute w-64 h-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col"
                style={{
                  left: "50%",
                  top: "50%",
                  marginLeft: "-128px",
                  marginTop: "-160px",
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                <div className="relative w-full h-60 overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="mt-auto p-4 text-center">
                  <p className="text-lg font-bold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.job}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
