export type Application = {
  id: string
  company: string
  position: string
  status: "applied" | "interview" | "offer" | "rejected"
  applicationDate: string
  notes?: string
  createdAt: string
  updatedAt: string
}
