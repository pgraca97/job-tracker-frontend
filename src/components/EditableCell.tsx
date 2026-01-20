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
  const lastKeyPressedRef = useRef<string | null>(null)
  const { mutate, isPending } = useUpdateApplication()

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleBlur = () => {
    if (lastKeyPressedRef.current === "Escape") {
      lastKeyPressedRef.current = null
      return
    }
    mutate({
      id: applicationId,
      data: { [field]: value },
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.key === "Enter") {
      e.currentTarget.blur()
    }
    if (e.key === "Escape") {
      console.log("Reverting to initial value")
      lastKeyPressedRef.current = e.key
      setValue(initialValue)
    }
  }

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      disabled={isPending}
      className="
        w-full p-1
        
         outline-none
        bg-transparent

        disabled:opacity-50 disabled:cursor-wait
      "
    />
  )
}