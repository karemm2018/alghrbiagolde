'use client';

import { useRef, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUp, Layers, Loader2, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { compressImageToWebP } from '@/lib/image';
import { uploadFile } from '@/lib/supabase/storage';

interface Props {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
  uploading: boolean;
  onUploadingChange: (uploading: boolean) => void;
}

export default function ProjectFloorPlansEditor({ value, onChange, uploading, onUploadingChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length || uploading) return;

    onUploadingChange(true);
    const uploaded: string[] = [];
    let failed = 0;
    try {
      for (const file of files) {
        try {
          if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type) || file.size > 20 * 1024 * 1024) {
            throw new Error('Unsupported image');
          }
          const image = await compressImageToWebP(file, 0.92);
          const result = await uploadFile('media', `projects/plans/${crypto.randomUUID()}.webp`, image, { contentType: 'image/webp' });
          if (!result) throw new Error('Upload failed');
          uploaded.push(result.url);
        } catch {
          failed += 1;
        }
      }
      if (uploaded.length) {
        onChange(previous => [...previous, ...uploaded]);
        toast.success(`تم رفع ${uploaded.length} مخطط. اضغط حفظ المشروع لاعتماد التغييرات`);
      }
      if (failed) toast.error(`تعذر رفع ${failed} صورة. استخدم JPG أو PNG أو WebP أو AVIF بحجم أقصى 20 ميجابايت للصورة`);
    } finally {
      onUploadingChange(false);
    }
  };

  const movePlan = (index: number, offset: number) => {
    onChange(previous => {
      const next = [...previous];
      const destination = index + offset;
      if (destination < 0 || destination >= next.length) return previous;
      [next[index], next[destination]] = [next[destination], next[index]];
      return next;
    });
  };

  return (
    <section aria-labelledby="project-floor-plans-label" className="space-y-4 border-t border-white/10 pt-6">
      <div>
        <h4 id="project-floor-plans-label" className="neu-label flex items-center gap-2">
          <Layers className="h-4 w-4" aria-hidden="true" />
          مخططات المشروع (2D / 3D)
        </h4>
        <p className="mt-1 text-xs leading-relaxed text-[var(--neu-text-muted)]">
          أضف مخططاً أو أكثر ليظهر في قسم مستقل عن صور المشروع. مخطط كل وحدة يُضاف من صفحة تعديل الوحدة.
        </p>
      </div>

      {value.length > 0 && (
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {value.map((url, index) => (
            <li key={`${url}-${index}`} className="overflow-hidden rounded-xl border border-white/10">
              <div className="relative aspect-[4/3] bg-white">
                <Image src={url} alt={`مخطط المشروع ${index + 1}`} fill sizes="(max-width: 640px) 100vw, 360px" className="object-contain p-2" />
              </div>
              <div className="flex items-center justify-between gap-1 p-2">
                <span className="text-xs text-[var(--neu-text-secondary)]">مخطط {index + 1}</span>
                <div className="flex gap-1">
                  <button type="button" aria-label={`تقديم المخطط ${index + 1}`} disabled={uploading || index === 0} onClick={() => movePlan(index, -1)} className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-white/10 disabled:opacity-30">
                    <ArrowUp className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button type="button" aria-label={`تأخير المخطط ${index + 1}`} disabled={uploading || index === value.length - 1} onClick={() => movePlan(index, 1)} className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-white/10 disabled:opacity-30">
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button type="button" aria-label={`إزالة المخطط ${index + 1}`} disabled={uploading} onClick={() => onChange(previous => previous.filter((_, itemIndex) => itemIndex !== index))} className="flex h-11 w-11 items-center justify-center rounded-lg text-red-400 hover:bg-red-500/10 disabled:opacity-30">
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}

      <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="neu-btn neu-btn-ghost min-h-12 w-full border border-dashed border-[var(--neu-gold)]/40 text-sm sm:w-auto" aria-describedby="project-floor-plans-help">
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Upload className="h-4 w-4" aria-hidden="true" />}
        <span role="status">{uploading ? 'جاري رفع المخططات...' : 'إضافة صور مخططات المشروع'}</span>
      </button>
      <p id="project-floor-plans-help" className="text-xs text-[var(--neu-text-muted)]">يمكن اختيار عدة صور. الحد الأقصى 20 ميجابايت للصورة. احفظ المشروع لاعتماد الإضافة أو الإزالة أو الترتيب.</p>
      <input ref={inputRef} type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleUpload} disabled={uploading} className="hidden" aria-label="اختيار صور مخططات المشروع" />
    </section>
  );
}
