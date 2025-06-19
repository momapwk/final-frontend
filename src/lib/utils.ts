import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

// Utility for merging Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// User role definitions
export const UserRoles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const

export type UserRole = keyof typeof UserRoles

// Password validation regex patterns
const passwordRegexes = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*()]/,
}

// Schema for auth form validation
export const authFormSchema = () =>
  z.object({
    // Sign up
    name: z.string().optional(),
    role: z.nativeEnum(UserRoles).optional(),
    // Common fields
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be less than 64 characters')
      .refine((pwd) => passwordRegexes.uppercase.test(pwd), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine((pwd) => passwordRegexes.lowercase.test(pwd), {
        message: 'Password must contain at least one lowercase letter',
      })
      .refine((pwd) => passwordRegexes.number.test(pwd), {
        message: 'Password must contain at least one number',
      })
      .refine((pwd) => passwordRegexes.special.test(pwd), {
        message: 'Password must contain at least one special character',
      }),
  })

// Schema for event validation
export const EventSchema = () =>
  z.object({
    _id: z.string().optional(),
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters'),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), 'Invalid date')
      .refine(
        (val) => new Date(val) >= new Date(new Date().toDateString()),
        'Date cannot be in the past'
      ),
    location: z.string().min(3, 'Location must be at least 3 characters'),
  })

// Generic debounce utility
export const debounce = <A extends unknown[]>(
  func: (...args: A) => void,
  wait: number
): ((...args: A) => void) & { cancel: () => void } => {
  let timeout: NodeJS.Timeout

  const debounced = ((...args: A) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as ((...args: A) => void) & { cancel: () => void }

  debounced.cancel = () => {
    clearTimeout(timeout)
  }

  return debounced
}


