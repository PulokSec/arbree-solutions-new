import { ServiceForm } from "../ServiceForm";
import { createService } from "../actions";

export default function NewServicePage() {
  return <ServiceForm title="New Service" action={createService} submitLabel="Save Service" />;
}
