import { prisma } from "@/lib/prisma";
import { AdminPageHeader, AdminEmptyState } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { markMessageRead, deleteMessage } from "./actions";

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        description="Submissions from the Contact page form."
      />

      {messages.length === 0 ? (
        <AdminEmptyState message="No messages yet." />
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start justify-between gap-4 rounded-2xl border p-5 ${
                message.read ? "border-ink/10 bg-white" : "border-primary/30 bg-primary-soft"
              }`}
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-ink">{message.name}</p>
                  {!message.read && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-body">
                  {message.email}
                  {message.phone ? ` · ${message.phone}` : ""}
                </p>
                <p className="text-sm text-ink">{message.message}</p>
                <p className="text-xs text-body">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {!message.read && (
                  <form action={markMessageRead.bind(null, message.id)}>
                    <button
                      type="submit"
                      className="rounded-full border border-primary px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-white"
                    >
                      Mark read
                    </button>
                  </form>
                )}
                <DeleteButton action={deleteMessage.bind(null, message.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

async function getMessages() {
  try {
    return await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}
