import React from 'react'
import { cn } from '../lib/utils'

/**
 * Shine Border Component
 * Animated border effect with configurable properties
 */
export function ShineBorder({
  borderWidth = 2,
  duration = 14,
  shineColor = '#0d1629',
  className,
  style,
  children,
  ...props
}) {
  return (
    <div
      style={
        {
          '--border-width': `${borderWidth}px`,
          '--duration': `${duration}s`,
          backgroundImage: `radial-gradient(transparent, transparent, ${
            Array.isArray(shineColor) ? shineColor.join(',') : shineColor
          }, transparent, transparent)`,
          backgroundSize: '300% 300%',
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: `var(--border-width)`,
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          pointerEvents: 'none',
          animation: `shine var(--duration) infinite`,
          willChange: 'background-position',
          ...style,
        }
      }
      className={cn(className)}
      {...props}
    />
  )
}
