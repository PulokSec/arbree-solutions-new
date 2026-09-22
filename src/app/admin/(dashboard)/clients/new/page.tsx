import { ClientLogoForm } from "../ClientLogoForm";
import { createClientLogo } from "../actions";

export default function NewClientLogoPage() {
  return (
    <ClientLogoForm title="New Client Logo" action={createClientLogo} submitLabel="Save Client Logo" />
  );
}
