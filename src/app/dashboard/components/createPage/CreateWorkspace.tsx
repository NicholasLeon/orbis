"use client"

import { useActionState, useEffect, useState } from "react"
import { createWorkspaceAction } from "@/actions/workspaceAction"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function CreateWorkspaceModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [state, formAction, isPending] = useActionState(createWorkspaceAction, null)

  useEffect(() => {
    if (state?.success) {
      onOpenChange(false)
    }
  }, [state, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-200 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">Create Workspace</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Beri nama workspace tim kamu. Kamu bisa mengundang anggota lain nanti.
          </DialogDescription>
        </DialogHeader>
        
        <form action={formAction} className="space-y-6 pt-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Workspace Name</label>
            <Input 
              name="name" 
              placeholder="e.g. Acme Corp, Engineering, Marketing"
              className="h-11 bg-zinc-900/50 border-zinc-800 focus:border-zinc-600 transition-all"
              required
              disabled={isPending}
            />
            {state?.error && <p className="text-xs text-red-500 font-medium">{state.error}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              className="text-zinc-400 hover:text-zinc-100"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-[#8ffcff] hover:bg-black hover:text-white hover:border-[#8ffcff] text-black font-bold px-6"
            >
              {isPending ? "Creating..." : "Create Workspace"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}