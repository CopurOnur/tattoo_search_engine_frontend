import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ExampleImage {
  id: string
  name: string
  description: string
  url: string
  category: string
}

interface ExampleGalleryProps {
  onExampleSelect: (url: string, filename: string) => void
  disabled?: boolean
}

export default function ExampleGallery({ onExampleSelect, disabled = false }: ExampleGalleryProps) {
  const [examples, setExamples] = useState<ExampleImage[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load examples from JSON file
    fetch('/examples/examples.json')
      .then(res => res.json())
      .then(data => {
        setExamples(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to load examples:', err)
        setIsLoading(false)
      })
  }, [])

  const handleExampleClick = async (example: ExampleImage) => {
    if (disabled) return

    setSelectedId(example.id)

    try {
      // Fetch the image and convert to File object
      const response = await fetch(example.url)
      const blob = await response.blob()
      const filename = `${example.id}.jpg`

      onExampleSelect(example.url, filename)
    } catch (err) {
      console.error('Failed to load example image:', err)
      setSelectedId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500">Loading examples...</p>
      </div>
    )
  }

  if (examples.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Try Example Images
        </h3>
        <p className="text-sm text-gray-600">
          Click any example to test the search engine
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => handleExampleClick(example)}
            disabled={disabled}
            className={`
              group relative overflow-hidden rounded-lg border-2 transition-all duration-200
              ${selectedId === example.id
                ? 'border-primary-500 ring-2 ring-primary-200'
                : 'border-gray-200 hover:border-primary-400'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="aspect-square relative">
              <Image
                src={example.url}
                alt={example.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-center px-2">
                  <p className="text-xs font-medium">{example.name}</p>
                </div>
              </div>
            </div>

            {/* Category badge */}
            <div className="absolute top-1 right-1">
              <span className="text-[10px] px-1.5 py-0.5 bg-black bg-opacity-50 text-white rounded">
                {example.category}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Or upload your own tattoo image above
        </p>
      </div>
    </div>
  )
}
