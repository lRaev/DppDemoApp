"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center mb-8">
            <span className="text-m font-bold self-start mt-1 text-blue-600">©</span> 
            <span className="text-5xl font-bold ml-1 text-blue-600">DigiPP</span>
            <span className="text-sm italic ml-2 text-blue-600 self-end mb-1">powered by SoftGroup</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Digital Product Passport</h1>
          
          <div className="prose prose-gray max-w-none mb-8">
            <p className="text-lg text-gray-700 mb-4">
              The Digital Product Passport (DPP) is a standardized digital record that enables transparent, traceable, and interoperable product data sharing across the entire value chain — from raw materials to recycling.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              In the context of the Ecodesign for Sustainable Products Regulation (ESPR), the DPP empowers businesses and consumers with essential sustainability, compliance, and circularity information to support the green transition.
            </p>
            <p className="text-lg text-gray-700 font-medium mt-8">
              DigiPP, powered by SoftGroup, is our upcoming platform dedicated to enabling seamless DPP creation and management — launching soon.
            </p>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button className="px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 text-center text-sm text-gray-500">
            © 2024 By SoftGroup
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
