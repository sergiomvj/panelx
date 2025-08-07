'use client'

import { forwardRef } from 'react'
import type { LucideProps } from 'lucide-react'

export interface IconProps extends LucideProps {
  name: string
}

const Icon = forwardRef<SVGSVGElement, IconProps>(({ name, className, ...props }, ref) => {
  // Dynamically import the icon component
  // This is a placeholder and will be replaced with a dynamic import
  const LucideIcon = require('lucide-react')[name]

  if (!LucideIcon) {
    return null // Or a fallback icon
  }

  return <LucideIcon ref={ref} className={className} {...props} />
})

Icon.displayName = 'Icon'

export { Icon }
