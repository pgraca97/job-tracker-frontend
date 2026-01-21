import { useEffect, useRef, useState } from "react"
import { useUpdateApplication } from "../hooks/useUpdateApplication"
import type { Application } from "../types"

interface EditableCellProps {
  initialValue: string
  applicationId: string
  field: keyof Pick<Application, "company" | "position" | "notes">
}

export function EditableCell({ initialValue, applicationId, field }: EditableCellProps) {
  const [value, setValue] = useState(initialValue)
  const skipSaveRef = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { mutate, isPending } = useUpdateApplication()

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && inputRef.current === document.activeElement) {
        inputRef.current?.blur()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  const handleSave = () => {
    if (skipSaveRef.current) {
      skipSaveRef.current = false
      return
    }
    if (value !== initialValue) {
      mutate({ id: applicationId, data: { [field]: value } })
    }
  }

  const handleCancel = () => {
    setValue(initialValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave()
    if (e.key === "Escape") {
      skipSaveRef.current = true
      handleCancel()
      e.currentTarget.blur()
    }
  }

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => { setValue(e.target.value) }}
      onBlur={handleSave}
      onKeyDown={handleKeyDown}
      disabled={isPending}
      className="w-full p-1 outline-none bg-transparent disabled:opacity-50 disabled:cursor-wait"
    />
  )
}