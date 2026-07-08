// src/app/golden-cp/media/page.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import AdminBreadcrumb from '../../../components/admin/layout/AdminBreadcrumb';
import {
  Upload,
  Search,
  Eye,
  Copy,
  Trash2,
  ImageIcon,
  CheckCircle2,
  Film,
  FileImage,
  Play,
  X,
  Video,
  AlertCircle,
} from 'lucide-react';

import { PROPERTIES, PROJECTS } from '../../../lib/mockData';
import { getCloudinarySignature, deleteCloudinaryVideo } from '../../actions/cloudinary';
import { uploadFile, deleteFile } from '../../../lib/supabase/storage';

type MediaKind = 'image' | 'video';

interface MediaItem {
  id: string;
  src: string;
  thumbnail: string;
  name: string;
  category: 'property' | 'project' | 'general';
  kind: MediaKind;
  parentName: string;
  size: string;
  duration?: string; // for videos
}

// Mock video data (representative of real project/property tour videos)
const MOCK_VIDEOS: MediaItem[] = [
  {
    id: 'vid-1',
    src: '/videos/amal-stars-tour.mp4',
    thumbnail: '/projects/amal-stars/hero.webp',
    name: 'amal-stars-tour.mp4',
    category: 'project',
    kind: 'video',
    parentName: 'أمل ستارز',
    size: '24.5 MB',
    duration: '2:35',
  },
  {
    id: 'vid-2',
    src: '/videos/rinad-gallery-aerial.mp4',
    thumbnail: '/projects/rinad-gallery/hero.webp',
    name: 'rinad-gallery-aerial.mp4',
    category: 'project',
    kind: 'video',
    parentName: 'ريناد غاليري',
    size: '18.2 MB',
    duration: '1:48',
  },
  {
    id: 'vid-3',
    src: '/videos/company-overview.mp4',
    thumbnail: '/hero-bg-3.webp',
    name: 'company-overview.mp4',
    category: 'general',
    kind: 'video',
    parentName: 'فيديو تعريفي بالشركة',
    size: '42.3 MB',
    duration: '4:15',
  },
];

function getDeterministicSize(str: string, min = 100, max = 500): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const size = min + (Math.abs(hash) % (max - min));
  return `${size} KB`;
}

function buildMediaGallery(): MediaItem[] {
  const items: MediaItem[] = [];

  // Extract property images
  PROPERTIES.forEach((prop) => {
    prop.media.images.forEach((img, i) => {
      items.push({
        id: `prop-${prop.id}-${i}`,
        src: img,
        thumbnail: img,
        name: img.split('/').pop() || `property-${i}.webp`,
        category: 'property',
        kind: 'image',
        parentName: prop.title,
        size: getDeterministicSize(img, 100, 500),
      });
    });
  });

  // Extract project hero images + gallery
  PROJECTS.forEach((proj) => {
    items.push({
      id: `proj-${proj.id}-hero`,
      src: proj.media.hero,
      thumbnail: proj.media.hero,
      name: proj.media.hero.split('/').pop() || `project-hero.webp`,
      category: 'project',
      kind: 'image',
      parentName: proj.name,
      size: getDeterministicSize(proj.media.hero, 200, 800),
    });
    proj.media.gallery.forEach((img, i) => {
      items.push({
        id: `proj-${proj.id}-${i}`,
        src: img,
        thumbnail: img,
        name: img.split('/').pop() || `project-${i}.webp`,
        category: 'project',
        kind: 'image',
        parentName: proj.name,
        size: getDeterministicSize(img, 150, 650),
      });
    });
  });

  // Add mock videos
  items.push(...MOCK_VIDEOS);

  return items;
}

type FilterType = 'all' | 'property' | 'project' | 'general' | 'images' | 'videos';

const TYPE_LABELS: Record<FilterType, string> = {
  all: 'الكل',
  images: 'الصور فقط',
  videos: 'الفيديوهات فقط',
  property: 'صور العقارات',
  project: 'صور المشاريع',
  general: 'ملفات عامة',
};

interface UploadFile {
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'uploading' | 'done' | 'error';
  errorMessage?: string;
}

// Helper to compress and convert to WebP in browser using Canvas
async function compressImageToWebP(file: File, quality = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = window.document.createElement('img');
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = window.document.createElement('canvas');
        const MAX_WIDTH = 1920;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newFileName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
              const compressedFile = new File([blob], newFileName, {
                type: 'image/webp',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Image conversion to WebP failed.'));
            }
          },
          'image/webp',
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [confirmDeleteFile, setConfirmDeleteFile] = useState<MediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize media gallery once on client side mount
  useEffect(() => {
    setMediaList(buildMediaGallery());
  }, []);

  // Automatically close upload modal after all files are successfully uploaded
  useEffect(() => {
    if (showUploadModal && uploadFiles.length > 0) {
      const allDone = uploadFiles.every((f) => f.status === 'done');
      const anyUploading = uploadFiles.some((f) => f.status === 'uploading');
      if (allDone && !anyUploading) {
        const timer = setTimeout(() => {
          handleCloseUploadModal();
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [uploadFiles, showUploadModal]);

  const handleFilesSelected = useCallback((files: FileList | null) => {
    if (!files) return;
    const newFiles: UploadFile[] = Array.from(files).map((file) => {
      const isVideo = file.type.startsWith('video/');
      const sizeMB = file.size / 1024 / 1024;
      let status: 'pending' | 'error' = 'pending';
      let errorMessage = '';

      // Check if file is duplicate
      const targetName = file.type.startsWith('image/')
        ? file.name.replace(/\.[^/.]+$/, '') + '.webp'
        : file.name;
      const isDuplicate = mediaList.some(
        (m) => m.name.toLowerCase() === targetName.toLowerCase()
      );

      if (isDuplicate) {
        status = 'error';
        errorMessage = 'هذا الملف مرفوع بالفعل في النظام وبنفس الاسم';
      } else if (isVideo && sizeMB > 100) {
        status = 'error';
        errorMessage = 'حجم الفيديو يتجاوز الحد الأقصى (100 ميجابايت)';
      }

      return {
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
        progress: 0,
        status,
        errorMessage,
      };
    });
    setUploadFiles((prev) => [...prev, ...newFiles]);
    setShowUploadModal(true);
  }, [mediaList]);

  // Upload individual file
  const uploadSingleFile = async (index: number) => {
    const uploadItem = uploadFiles[index];
    if (uploadItem.status === 'error' || uploadItem.status === 'done') return;

    // Update status to uploading
    setUploadFiles((prev) =>
      prev.map((f, i) => (i === index ? { ...f, status: 'uploading' as const, progress: 10 } : f))
    );

    try {
      const isVideo = uploadItem.file.type.startsWith('video/');

      if (isVideo) {
        // Upload to Cloudinary using secure signed upload
        const signData = await getCloudinarySignature();

        const formData = new FormData();
        formData.append('file', uploadItem.file);
        formData.append('api_key', signData.apiKey);
        formData.append('timestamp', signData.timestamp.toString());
        formData.append('signature', signData.signature);
        formData.append('folder', signData.folder);
        formData.append('transformation', signData.transformation);

        // Upload using XHR to track progress dynamically
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', `https://api.cloudinary.com/v1_1/${signData.cloudName}/video/upload`, true);

          xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
              const pct = Math.round((e.loaded * 90) / e.total) + 10; // Start from 10% to 100%
              setUploadFiles((prev) =>
                prev.map((f, i) => (i === index ? { ...f, progress: pct } : f))
              );
            }
          });

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              const res = JSON.parse(xhr.responseText);
              // Add to local state list
              const newVideoItem: MediaItem = {
                id: res.public_id,
                src: res.secure_url,
                thumbnail: res.secure_url.replace(/\.[^/.]+$/, '.jpg'), // Auto generated thumbnail poster
                name: uploadItem.file.name,
                category: 'general',
                kind: 'video',
                parentName: 'مرفوع حديثاً',
                size: `${(uploadItem.file.size / 1024 / 1024).toFixed(1)} MB`,
                duration: res.duration
                  ? `${Math.floor(res.duration / 60)}:${Math.floor(res.duration % 60).toString().padStart(2, '0')}`
                  : undefined,
              };
              setMediaList((prev) => [newVideoItem, ...prev]);
              resolve();
            } else {
              reject(new Error(xhr.responseText || 'فشل الرفع إلى Cloudinary'));
            }
          };

          xhr.onerror = () => reject(new Error('خطأ في الاتصال بالشبكة'));
          xhr.send(formData);
        });
      } else {
        // Compress and convert image to WebP
        setUploadFiles((prev) =>
          prev.map((f, i) => (i === index ? { ...f, progress: 30 } : f)) // 30% progress representing compression stage
        );
        const webpFile = await compressImageToWebP(uploadItem.file);

        setUploadFiles((prev) =>
          prev.map((f, i) => (i === index ? { ...f, progress: 60 } : f))
        );

        // Upload to Supabase Storage media bucket under images folder
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.webp`;
        const filePath = `images/${uniqueName}`;

        const uploadRes = await uploadFile('media', filePath, webpFile, {
          contentType: 'image/webp',
        });

        if (!uploadRes) {
          throw new Error('فشل الرفع إلى Supabase Storage. تأكد من وجود Bucket باسم "media".');
        }

        // Add to local state list
        const newImageItem: MediaItem = {
          id: uploadRes.path,
          src: uploadRes.url,
          thumbnail: uploadRes.url,
          name: webpFile.name,
          category: 'general',
          kind: 'image',
          parentName: 'مرفوع حديثاً',
          size: `${(webpFile.size / 1024).toFixed(1)} KB`,
        };
        setMediaList((prev) => [newImageItem, ...prev]);
      }

      // Mark as complete
      setUploadFiles((prev) =>
        prev.map((f, i) => (i === index ? { ...f, status: 'done' as const, progress: 100 } : f))
      );
    } catch (err: any) {
      console.error(err);
      setUploadFiles((prev) =>
        prev.map((f, i) => (
          i === index
            ? { ...f, status: 'error' as const, errorMessage: err.message || 'حدث خطأ أثناء الرفع' }
            : f
        ))
      );
    }
  };

  const handleUploadAll = async () => {
    const pendingIndices = uploadFiles
      .map((f, idx) => (f.status === 'pending' ? idx : -1))
      .filter((idx) => idx !== -1);

    for (const idx of pendingIndices) {
      await uploadSingleFile(idx);
    }
  };

  const handleRemoveUploadFile = (index: number) => {
    setUploadFiles((prev) => {
      const removed = prev[index];
      if (removed.preview) URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleCloseUploadModal = () => {
    uploadFiles.forEach((f) => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    setUploadFiles([]);
    setShowUploadModal(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFilesSelected(e.dataTransfer.files);
    },
    [handleFilesSelected]
  );

  const filtered = mediaList.filter((item) => {
    const matchSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.parentName.toLowerCase().includes(searchQuery.toLowerCase());

    let matchType = true;
    if (typeFilter === 'images') {
      matchType = item.kind === 'image';
    } else if (typeFilter === 'videos') {
      matchType = item.kind === 'video';
    } else if (typeFilter !== 'all') {
      matchType = item.category === typeFilter;
    }

    return matchSearch && matchType;
  });

  const handleDeleteItem = (item: MediaItem) => {
    setConfirmDeleteFile(item);
  };

  const executeDeletion = async () => {
    if (!confirmDeleteFile) return;
    setIsDeleting(true);
    try {
      const isMockAsset =
        confirmDeleteFile.id.startsWith('prop-') ||
        confirmDeleteFile.id.startsWith('proj-') ||
        confirmDeleteFile.id.startsWith('vid-');

      if (!isMockAsset) {
        if (confirmDeleteFile.kind === 'video') {
          // Delete from Cloudinary
          await deleteCloudinaryVideo(confirmDeleteFile.id);
        } else {
          // Delete from Supabase Storage 'media' bucket
          let storagePath = confirmDeleteFile.id;
          if (confirmDeleteFile.src.includes('/storage/v1/object/public/media/')) {
            storagePath = confirmDeleteFile.src.split('/storage/v1/object/public/media/')[1];
          }
          await deleteFile('media', storagePath);
        }
      }

      // Remove from state list
      setMediaList((prev) => prev.filter((m) => m.id !== confirmDeleteFile.id));
    } catch (err) {
      console.error('Error deleting file from storage:', err);
    } finally {
      setIsDeleting(false);
      setConfirmDeleteFile(null);
    }
  };

  const handleCopyLink = (item: MediaItem) => {
    navigator.clipboard.writeText(item.src).catch(() => {
      /* Clipboard API not available */
    });
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const imageCount = mediaList.filter((m) => m.kind === 'image').length;
  const videoCount = mediaList.filter((m) => m.kind === 'video').length;

  return (
    <div>
      <AdminBreadcrumb items={[{ label: 'الوسائط' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--neu-text-heading)]">إدارة الوسائط</h2>
          <p className="text-sm text-[var(--neu-text-muted)] mt-1">
            {mediaList.length} ملف مرفوع في النظام
          </p>
        </div>
        <button
          className="neu-btn neu-btn-primary"
          title="رفع ملف جديد"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-4 h-4" />
          رفع ملف
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleFilesSelected(e.target.files)}
          aria-label="اختيار ملفات للرفع"
        />
      </div>

      {/* Filters */}
      <div className="neu-card mb-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neu-text-muted)]" />
            <input
              type="text"
              placeholder="ابحث باسم الملف أو المصدر..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="neu-input pe-10"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as FilterType)}
            className="neu-input neu-select w-full md:w-44"
            title="تصفية حسب النوع"
          >
            {Object.entries(TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="neu-card p-3 sm:p-4 text-center">
          <FileImage className="w-5 h-5 mx-auto mb-1 text-[var(--neu-gold)]" />
          <p className="text-xl sm:text-2xl font-bold text-[var(--neu-text-heading)]">
            {imageCount}
          </p>
          <p className="text-[10px] sm:text-xs text-[var(--neu-text-muted)]">صورة</p>
        </div>
        <div className="neu-card p-3 sm:p-4 text-center">
          <Video className="w-5 h-5 mx-auto mb-1 text-[var(--neu-gold)]" />
          <p className="text-xl sm:text-2xl font-bold text-[var(--neu-text-heading)]">
            {videoCount}
          </p>
          <p className="text-[10px] sm:text-xs text-[var(--neu-text-muted)]">فيديو</p>
        </div>
        <div className="neu-card p-3 sm:p-4 text-center">
          <ImageIcon className="w-5 h-5 mx-auto mb-1 text-[var(--neu-gold)]" />
          <p className="text-xl sm:text-2xl font-bold text-[var(--neu-text-heading)]">
            {mediaList.length}
          </p>
          <p className="text-[10px] sm:text-xs text-[var(--neu-text-muted)]">إجمالي الملفات</p>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="neu-card p-0 overflow-hidden group">
            {/* Preview Thumbnail */}
            <div className="relative h-32 sm:h-40 bg-[var(--neu-depressed)]">
              {item.thumbnail.startsWith('/') || item.thumbnail.startsWith('http') ? (
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[var(--neu-surface)] text-[var(--neu-text-muted)]">
                  <Film className="w-8 h-8" />
                </div>
              )}

              {/* Video play icon overlay */}
              {item.kind === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ms-0.5" />
                  </div>
                </div>
              )}

              {/* Video duration badge */}
              {item.kind === 'video' && item.duration && (
                <div className="absolute bottom-2 left-2 z-[1]">
                  <span
                    className="bg-black/70 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded font-medium"
                    dir="ltr"
                  >
                    {item.duration}
                  </span>
                </div>
              )}

              {/* Hover overlay with actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-[2]">
                <button
                  onClick={() => setPreviewItem(item)}
                  className="neu-btn neu-btn-sm p-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0"
                  title="معاينة"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCopyLink(item)}
                  className="neu-btn neu-btn-sm p-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0"
                  title="نسخ الرابط"
                >
                  {copiedId === item.id ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleDeleteItem(item)}
                  className="neu-btn neu-btn-sm p-2 bg-red-500/30 backdrop-blur-sm text-white hover:bg-red-500/50 border-0"
                  title="حذف"
                  aria-label={`حذف ${item.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Type badge */}
              <div className="absolute top-2 right-2 z-[1]">
                <span
                  className={`neu-badge text-[10px] px-1.5 py-0.5 ${
                    item.kind === 'video' ? 'neu-badge-info' : 'neu-badge-gold'
                  }`}
                >
                  {item.kind === 'video' ? (
                    <span className="flex items-center gap-0.5">
                      <Film className="w-3 h-3" />
                      فيديو
                    </span>
                  ) : item.category === 'property' ? (
                    'عقار'
                  ) : item.category === 'project' ? (
                    'مشروع'
                  ) : (
                    'عام'
                  )}
                </span>
              </div>
            </div>

            {/* File Info */}
            <div className="p-2.5 sm:p-3">
              <p
                className="text-xs font-medium text-[var(--neu-text-heading)] truncate"
                title={item.name}
                dir="ltr"
              >
                {item.name}
              </p>
              <p
                className="text-[10px] text-[var(--neu-text-muted)] mt-0.5 truncate"
                title={item.parentName}
              >
                {item.parentName}
              </p>
              <p className="text-[10px] text-[var(--neu-text-muted)] mt-0.5" dir="ltr">
                {item.size}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="neu-card flex flex-col items-center justify-center py-16 text-center mt-4">
          <ImageIcon className="w-12 h-12 text-[var(--neu-text-muted)] mb-3 opacity-30" />
          <p className="text-[var(--neu-text-secondary)] font-medium">لا توجد ملفات مطابقة</p>
          <p className="text-xs text-[var(--neu-text-muted)] mt-1">جرّب تغيير معايير البحث</p>
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          onClick={() => setPreviewItem(null)}
          role="dialog"
          aria-label="معاينة الوسائط"
        >
          {/* Close button */}
          <button
            className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setPreviewItem(null)}
            aria-label="إغلاق المعاينة"
          >
            <X className="w-5 h-5" />
          </button>

          {/* File name */}
          <div className="absolute top-4 right-4 z-10">
            <p
              className="text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg"
              dir="ltr"
            >
              {previewItem.name}
            </p>
          </div>

          <div
            className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {previewItem.kind === 'video' ? (
              <div className="relative w-full bg-black rounded-2xl overflow-hidden aspect-video">
                <video
                  src={previewItem.src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain rounded-2xl"
                  poster={previewItem.thumbnail}
                />
              </div>
            ) : (
              <Image
                src={previewItem.src}
                alt="معاينة"
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
              />
            )}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          onClick={handleCloseUploadModal}
          role="dialog"
          aria-label="رفع ملفات"
        >
          <div
            className="neu-card w-full max-w-xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--neu-text-heading)]">رفع ملفات جديدة</h3>
              <button
                onClick={handleCloseUploadModal}
                className="neu-btn neu-btn-ghost neu-btn-sm p-1.5"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drag & Drop Zone */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-colors cursor-pointer ${
                isDragging
                  ? 'border-[var(--neu-gold)] bg-[var(--neu-gold-glow)]'
                  : 'border-white/10 hover:border-white/20'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-10 h-10 mx-auto mb-3 text-[var(--neu-text-muted)]" />
              <p className="text-sm text-[var(--neu-text-secondary)] font-medium">
                اسحب الملفات هنا أو اضغط للاختيار
              </p>
              <p className="text-xs text-[var(--neu-text-muted)] mt-1">
                صور (JPG, PNG, WebP) أو فيديوهات (MP4, WebM) بحد أقصى 100MB للفيديو
              </p>
            </div>

            {/* Selected Files List */}
            {uploadFiles.length > 0 && (
              <div className="space-y-3 mb-6">
                <p className="text-xs text-[var(--neu-text-muted)] font-medium">
                  {uploadFiles.length} ملف مختار
                </p>
                {uploadFiles.map((uf, i) => (
                  <div key={i} className="flex flex-col gap-2 p-3 rounded-xl neu-inset-sm">
                    <div className="flex items-center gap-3">
                      {/* Thumbnail or icon */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-[var(--neu-depressed)] shrink-0 flex items-center justify-center">
                        {uf.preview ? (
                          <img src={uf.preview} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Film className="w-5 h-5 text-[var(--neu-text-muted)]" />
                        )}
                      </div>

                      {/* File info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[var(--neu-text-heading)] truncate" dir="ltr">
                          {uf.file.name}
                        </p>
                        <p className="text-[10px] text-[var(--neu-text-muted)] mt-0.5" dir="ltr">
                          {(uf.file.size / 1024 / 1024).toFixed(1)} MB
                          {uf.file.type.startsWith('video/') && ' · فيديو'}
                        </p>
                      </div>

                      {/* Status / Remove */}
                      <div className="shrink-0">
                        {uf.status === 'done' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : uf.status === 'uploading' ? (
                          <span className="text-[10px] text-[var(--neu-gold)] font-bold">{uf.progress}%</span>
                        ) : uf.status === 'error' ? (
                          <span title={uf.errorMessage}>
                            <AlertCircle className="w-5 h-5 text-[var(--neu-danger)]" />
                          </span>
                        ) : (
                          <button
                            onClick={() => handleRemoveUploadFile(i)}
                            className="neu-btn neu-btn-ghost neu-btn-sm p-1"
                            aria-label={`إزالة ${uf.file.name}`}
                          >
                            <X className="w-4 h-4 text-[var(--neu-text-muted)]" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress bar or error message */}
                    {uf.status === 'error' && uf.errorMessage && (
                      <p className="text-[10px] text-[var(--neu-danger)] font-medium">
                        ⚠️ {uf.errorMessage}
                      </p>
                    )}

                    {(uf.status === 'uploading' || uf.status === 'done') && (
                      <div className="neu-progress-wrapper mt-1">
                        <div
                          className="neu-progress-bar"
                          style={{ width: `${uf.progress}%` } as React.CSSProperties}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleUploadAll}
                disabled={
                  uploadFiles.length === 0 ||
                  uploadFiles.every((f) => f.status === 'done' || f.status === 'error')
                }
                className="neu-btn neu-btn-primary flex-1"
              >
                <Upload className="w-4 h-4" />
                {uploadFiles.some((f) => f.status === 'uploading') ? 'جاري الرفع...' : 'رفع الملفات'}
              </button>
              <button onClick={handleCloseUploadModal} className="neu-btn neu-btn-secondary">
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteFile && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[210] flex items-center justify-center p-4"
          onClick={() => !isDeleting && setConfirmDeleteFile(null)}
          role="dialog"
          aria-label="تأكيد الحذف"
        >
          <div
            className="neu-card w-full max-w-md p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-[var(--neu-danger)]/10 border-2 border-[var(--neu-danger)]/20 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-[var(--neu-danger)]" />
            </div>
            
            <h3 className="text-lg font-bold text-[var(--neu-text-heading)] mb-2">تأكيد حذف الملف</h3>
            <p className="text-sm text-[var(--neu-text-secondary)] mb-6">
              هل أنت متأكد من حذف الملف <strong className="text-[var(--neu-text-heading)]" dir="ltr">"{confirmDeleteFile.name}"</strong>؟
              <br />
              سيتم حذف هذا الملف نهائياً من مساحة التخزين وقاعدة البيانات، ولا يمكن التراجع عن هذا الإجراء.
            </p>

            <div className="flex gap-3">
              <button
                onClick={executeDeletion}
                disabled={isDeleting}
                className="neu-btn neu-btn-primary bg-[var(--neu-danger)] hover:bg-[var(--neu-danger)]/90 border-0 flex-1"
              >
                {isDeleting ? 'جاري الحذف...' : 'نعم، احذف الملف'}
              </button>
              <button
                onClick={() => setConfirmDeleteFile(null)}
                disabled={isDeleting}
                className="neu-btn neu-btn-secondary flex-1"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
