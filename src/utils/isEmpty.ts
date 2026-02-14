export function isEmpty(value: unknown): boolean {
  // null or undefined
  if (value == null) return true

  // empty string (after trimming whitespace)
  if (typeof value === 'string' && value.trim() === '') return true

  // empty array
  if (Array.isArray(value) && value.length === 0) return true

  // empty plain object
  if (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value as Record<string, unknown>).length === 0
  )
    return true

  return false
}
