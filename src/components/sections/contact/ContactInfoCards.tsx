import { Mail, Phone } from "lucide-react";

export function ContactInfoCards() {
  return (
    <section className="bg-[#f8f8f8] px-[30px] pb-16 lg:px-[60px] lg:pb-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-8 rounded-3xl bg-white p-6 sm:flex-row sm:gap-6">
        <div className="flex flex-1 flex-col items-center gap-6 py-4 text-center">
          <div className="flex flex-col items-center gap-6">
            <span className="flex items-center justify-center rounded-xl bg-primary/15 p-[7px]">
              <Mail className="size-10 text-primary" strokeWidth={1.5} />
            </span>
            <p className="text-2xl font-medium text-ink">Email</p>
          </div>
          <p className="text-lg text-body">Our friendly team is here to help.</p>
          <a href="mailto:info@arbreesolutions.com" className="text-lg text-primary">
            info@arbreesolutions.com
          </a>
        </div>

        <div className="hidden h-[150px] w-px bg-ink/10 sm:block" aria-hidden />
        <div className="h-px w-full bg-ink/10 sm:hidden" aria-hidden />

        <div className="flex flex-1 flex-col items-center gap-6 py-4 text-center">
          <div className="flex flex-col items-center gap-6">
            <span className="flex items-center justify-center rounded-xl bg-primary/15 p-[7px]">
              <Phone className="size-10 text-primary" strokeWidth={1.5} />
            </span>
            <p className="text-2xl font-medium text-ink">Phone</p>
          </div>
          <p className="text-lg text-body">Sunday–Thursday from 10am to 5pm.</p>
          <a href="tel:+8801724645825" className="text-lg text-primary">
            +88-017-2464-5825
          </a>
        </div>
      </div>
    </section>
  );
}
