"use client"

import { useState } from "react"
import { Plus, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateWorkspaceModal } from "./createPage/CreateWorkspace"

export default function EmptyState() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-72px)] text-center px-4">
      <div className="size-20 bg-zinc-900/40 rounded-3xl flex items-center justify-center border border-zinc-800/50 mb-8 shadow-2xl">
        <Building2 className="text-zinc-600 size-10" />
      </div>
      
      <h2 className="text-2xl font-bold text-zinc-100 mb-3 tracking-tight">
        Ready to start collaborating?
      </h2>
      <p className="text-zinc-500 text-sm max-w-sm mb-10 leading-relaxed">
        Kamu belum memiliki workspace. Buat yang pertama sekarang atau minta admin tim kamu untuk mengundangmu.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#8ffcff] hover:bg-indigo-700 font-bold px-8 h-12 rounded-xl transition-all shadow-lg shadow-indigo-500/10"
        >
          <Plus className="mr-2 size-5" />
          Create your workspace
        </Button>
      </div>

      <CreateWorkspaceModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </div>
  )
}