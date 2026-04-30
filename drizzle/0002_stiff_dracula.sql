CREATE TABLE "channel_members" (
	"channel_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "channel_members_channel_id_member_id_pk" PRIMARY KEY("channel_id","member_id")
);
--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "invite_code" text;--> statement-breakpoint
ALTER TABLE "channel_members" ADD CONSTRAINT "channel_members_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "channel_members" ADD CONSTRAINT "channel_members_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_invite_code_unique" UNIQUE("invite_code");