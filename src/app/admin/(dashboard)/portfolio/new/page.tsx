import { PortfolioForm } from "../PortfolioForm";
import { createPortfolioItem } from "../actions";

export default function NewPortfolioItemPage() {
  return (
    <PortfolioForm
      title="New Portfolio Item"
      action={createPortfolioItem}
      submitLabel="Save Portfolio Item"
    />
  );
}
