"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateWorkspaceModal } from "./CreateWorkspace";

export function CreateWorkspaceTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
        className="w-full h-14 bg-[#00f9ff] hover:bg-[#8ffcff] text-black font-black uppercase tracking-[0.2em] rounded-none transition-all duration-300 shadow-[0_0_20px_rgba(0,249,255,0.2)] hover:shadow-[0_0_30px_rgba(0,249,255,0.4)]"
      >
        <Plus className="mr-2 size-5" strokeWidth={3} />
        Create New Workspace
      </Button>
      
      <CreateWorkspaceModal open={open} onOpenChange={setOpen} />
    </>
  );
}