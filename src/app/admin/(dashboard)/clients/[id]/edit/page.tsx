import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ClientLogoForm } from "../../ClientLogoForm";
import { updateClientLogo } from "../../actions";

export default async function EditClientLogoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const logo = await prisma.clientLogo.findUnique({ where: { id } });

  if (!logo) notFound();

  return (
    <ClientLogoForm
      title="Edit Client Logo"
      action={updateClientLogo.bind(null, id)}
      submitLabel="Save Changes"
      defaults={{ name: logo.name, logo: logo.logo, url: logo.url }}
    />
  );
}
