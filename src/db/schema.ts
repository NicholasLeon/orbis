import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  index,
  primaryKey,
  integer,
  pgEnum,
  foreignKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("member_role", ["admin", "moderator", "member"]);
export const channelTypeEnum = pgEnum("channel_type", ["text", "voice", "announcement"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workspaces = pgTable("workspaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  inviteCode: text("invite_code").unique(),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  role: roleEnum("role").default("member").notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
}, (table) => ({
  uniqueMemberIdx: index("unique_member_idx").on(table.userId, table.workspaceId),
}));

export const channels = pgTable("channels", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: channelTypeEnum("type").default("text").notNull(),
  isPrivate: boolean("is_private").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  channelId: uuid("channel_id").notNull().references(() => channels.id, { onDelete: "cascade" }),
  memberId: uuid("member_id").notNull().references(() => members.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  
  parentId: uuid("parent_id"), 

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
}, (table) => ({
  channelTimeIdx: index("channel_time_idx").on(table.channelId, table.createdAt),
  
  parentReference: foreignKey({
    columns: [table.parentId],
    foreignColumns: [table.id],
    name: "message_reply_fk"
  }).onDelete("cascade"),
}));

export const attachments = pgTable("attachments", {
  id: uuid("id").primaryKey().defaultRandom(),
  messageId: uuid("message_id").notNull().references(() => messages.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  publicId: text("public_id").notNull(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
});

export const channelReadStatus = pgTable("channel_read_status", {
  memberId: uuid("member_id").notNull().references(() => members.id, { onDelete: "cascade" }),
  channelId: uuid("channel_id").notNull().references(() => channels.id, { onDelete: "cascade" }),
  lastReadMessageId: uuid("last_read_message_id").references(() => messages.id, { onDelete: "set null" }),
  
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.memberId, table.channelId] }),
}));



export const usersRelation = relations(users, ({many}) => ({
    members: many(members),
}));

export const workspacesRelations = relations(workspaces, ({ many, one }) => ({
  members: many(members),
  channels: many(channels),
  owner: one(users, {
    fields: [workspaces.createdBy],
    references: [users.id],
  }),
}));

export const membersRelations = relations(members, ({ one, many }) => ({
  user: one(users, {
    fields: [members.userId],
    references: [users.id],
  }),
  workspace: one(workspaces, {
    fields: [members.workspaceId],
    references: [workspaces.id],
  }),
  messages: many(messages),
}));

export const channelsRelations = relations(channels, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [channels.workspaceId],
    references: [workspaces.id],
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one, many }) => ({
  channel: one(channels, {
    fields: [messages.channelId],
    references: [channels.id],
  }),
  member: one(members, {
    fields: [messages.memberId],
    references: [members.id],
  }),
  attachments: many(attachments),
  parent: one(messages, {
    fields: [messages.parentId],
    references: [messages.id],
    relationName: "replies",
  }),
  replies: many(messages, {
    relationName: "replies",
  }),
}));

export const attachmentsRelations = relations(attachments, ({ one }) => ({
  message: one(messages, {
    fields: [attachments.messageId],
    references: [messages.id],
  }),
}));

export const channelReadStatusRelations = relations(channelReadStatus, ({ one }) => ({
  member: one(members, {
    fields: [channelReadStatus.memberId],
    references: [members.id],
  }),
  channel: one(channels, {
    fields: [channelReadStatus.channelId],
    references: [channels.id],
  }),
  lastReadMessage: one(messages, {
    fields: [channelReadStatus.lastReadMessageId],
    references: [messages.id],
  }),
}));

export const channelMembers = pgTable("channel_members", {
  channelId: uuid("channel_id").notNull().references(() => channels.id, { onDelete: "cascade" }),
  memberId: uuid("member_id").notNull().references(() => members.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.channelId, table.memberId] }),
}));

export const channelMembersRelations = relations(channelMembers, ({ one }) => ({
  channel: one(channels, {
    fields: [channelMembers.channelId],
    references: [channels.id],
  }),
  member: one(members, {
    fields: [channelMembers.memberId],
    references: [members.id],
  }),
}));