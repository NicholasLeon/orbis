"use client"

import { useActionState, useEffect } from "react"
import { createChannelAction } from "@/actions/channelAction"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function CreateChannelModal({ workspaceId, open, onOpenChange }: any) {
  const [state, formAction, isPending] = useActionState(createChannelAction, null)

  useEffect(() => {
    if (state?.success) onOpenChange(false)
  }, [state, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-200">
        <DialogHeader>
          <DialogTitle className="font-bold">Create Channel</DialogTitle>
        </DialogHeader>
        
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="workspaceId" value={workspaceId} />
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest" aria-describedby="channel">
              Channel Name
            </label>
            <Input 
              name="name" 
              placeholder="e.g. announcements" 
              className="bg-zinc-900/50 border-zinc-800"
              required 
            />
            {state?.error && <p className="text-xs text-red-500">{state.error}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700 font-bold">
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}