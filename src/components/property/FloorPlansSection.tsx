import Image from 'next/image';
import { ExternalLink, Layers } from 'lucide-react';

interface Props {
  plans: string[];
  title: string;
  name: string;
}

export default function FloorPlansSection({ plans, title, name }: Props) {
  if (!plans.length) return null;

  return (
    <section className="rounded-3xl border border-gold-primary/35 bg-[#0E203D]/50 p-4 shadow-2xl sm:p-8">
      <h2 className="mb-5 flex items-center gap-2 font-el-messiri text-base font-extrabold text-white sm:text-lg">
        <Layers className="h-5 w-5 shrink-0 text-gold-primary" aria-hidden="true" />
        {title}
      </h2>
      <div className={`grid gap-5 ${plans.length > 1 ? 'sm:grid-cols-2 xl:grid-cols-3' : 'mx-auto max-w-3xl'}`}>
        {plans.map((url, index) => (
          <figure key={`${url}-${index}`} className="overflow-hidden rounded-2xl border border-white/10">
            <a href={url} target="_blank" rel="noopener noreferrer" className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-primary" aria-label={`عرض مخطط ${name} ${index + 1} بحجمه الكامل (يفتح في نافذة جديدة)`}>
              <div className="relative aspect-[3/4] bg-white">
                <Image src={url} alt={`مخطط ${name} ${index + 1}`} fill sizes={plans.length > 1 ? '(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 400px' : '(max-width: 768px) 100vw, 768px'} className="object-contain p-3" />
              </div>
              <figcaption className="flex min-h-12 items-center justify-between gap-3 bg-[#0B1A30] px-4 py-3 text-xs text-gold-light group-hover:text-white">
                <span>مخطط {index + 1}</span>
                <span className="flex items-center gap-2">عرض بالحجم الكامل <ExternalLink className="h-4 w-4" aria-hidden="true" /></span>
              </figcaption>
            </a>
          </figure>
        ))}
      </div>
    </section>
  );
}
