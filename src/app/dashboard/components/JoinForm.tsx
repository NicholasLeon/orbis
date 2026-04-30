"use client"

import { useActionState } from "react";
import { joinWorkspaceAction } from "@/actions/memberAction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function JoinWorkspaceForm() {
  const [state, formAction, isPending] = useActionState(joinWorkspaceAction, null);

  return (
    <form action={formAction} className="space-y-3">
      <Input 
        name="inviteCode" 
        placeholder="ORB-XXXXXX"
        className="..." 
        required
      />
      {state?.error && (
        <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest animate-pulse">
          {state.error}
        </p>
      )}
      <Button type="submit" disabled={isPending} className="...">
        {isPending ? "Syncing..." : "Join Workspace"}
      </Button>
    </form>
  );
}