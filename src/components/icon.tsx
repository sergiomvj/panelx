'use client'

'use client'

import React, { forwardRef } from 'react'
import { icons, LucideProps } from 'lucide-react'

export type IconProps = LucideProps & {
  name: keyof typeof icons;
};

const Icon = forwardRef<SVGSVGElement, IconProps>(({ name, ...props }, ref) => {
  const LucideIcon = icons[name]

  if (!LucideIcon) {
    return null
  }

  return <LucideIcon ref={ref} {...props} />
})

Icon.displayName = 'Icon'

export { Icon }
