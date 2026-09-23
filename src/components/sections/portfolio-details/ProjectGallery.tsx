export function ProjectGallery({ images }: { images: string[] }) {
  if (images.length === 0) return null;

  return (
    <section className="bg-[#f8f8f8] px-[30px] py-16 lg:p-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-start gap-8">
        <h2 className="text-[40px] font-semibold text-ink sm:text-[48px]">
          Project <span className="text-primary">Gallery</span>
        </h2>

        <div className="grid w-full grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, i) => (
            <div
              key={src + i}
              className="aspect-[380/255] w-full overflow-hidden rounded-[20px] border border-[#f8f8f8] shadow-[0_20px_48px_rgba(6,186,181,0.03)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="size-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
