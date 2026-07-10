// src/app/actions/submissions.ts
'use server';

import { getSupabaseServerClient } from '../../lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface Submission {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  type: 'contact' | 'inquiry' | 'property_inquiry';
  resident_type: string;
  status: 'new' | 'reviewed' | 'closed';
  created_at: string;
  notes?: string;
  property_id?: string;
  project_id?: string;
}

const MOCK_SUBMISSIONS: Submission[] = [
  { id: '1', name: 'أبو محمد الشهري', phone: '0554498018', email: 'mohammed@email.com', subject: 'استفسار عن ملحق أمل ستارز', message: 'أرغب في معرفة تفاصيل الملحق المتوفر في مشروع أمل ستارز وأقرب موعد لمعاينة الموقع.', type: 'property_inquiry', resident_type: 'citizen', status: 'new', created_at: '2026-07-08T14:30:00' },
  { id: '2', name: 'سارة القحطاني', phone: '0551234567', email: '', subject: 'استفسار عام', message: 'أريد معرفة المشاريع المتاحة في جدة.', type: 'contact', resident_type: 'citizen', status: 'new', created_at: '2026-07-08T12:15:00' },
  { id: '3', name: 'خالد العمري', phone: '0559876543', email: 'khalid@gmail.com', subject: 'استفسار عن مشروع ريناد غاليري', message: 'هل يوجد وحدات متاحة في مشروع ريناد غاليري؟', type: 'inquiry', resident_type: 'resident', status: 'reviewed', created_at: '2026-07-07T18:00:00' },
  { id: '4', name: 'فاطمة الحربي', phone: '0557654321', email: '', subject: 'طلب معاينة', message: 'أرغب في حجز موعد لمعاينة فيلا أبو هايل.', type: 'property_inquiry', resident_type: 'citizen', status: 'closed', created_at: '2026-07-06T09:45:00' },
];

// Fetch all submissions from the database (fallback to mock if empty)
export async function getSubmissionsList(): Promise<Submission[]> {
  try {
    const supabase = (await getSupabaseServerClient()) as any;
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      return data.map((sub: any) => ({
        id: sub.id,
        name: sub.name,
        phone: sub.phone,
        email: sub.email || '',
        subject: sub.subject || '',
        message: sub.message || '',
        type: sub.type,
        resident_type: sub.resident_type || 'citizen',
        status: sub.status,
        created_at: sub.created_at,
        notes: sub.notes || '',
        property_id: sub.property_id,
        project_id: sub.project_id
      }));
    }

    // Seed mock data if database is empty to let user have initial items
    await seedMockSubmissionsIfEmpty();
    return MOCK_SUBMISSIONS;
  } catch (err: any) {
    console.error('Error fetching submissions list:', err);
    return MOCK_SUBMISSIONS;
  }
}

// Seed mock data if database table is completely empty
async function seedMockSubmissionsIfEmpty() {
  try {
    const supabase = (await getSupabaseServerClient()) as any;
    const { count } = await supabase
      .from('submissions')
      .select('*', { count: 'exact', head: true });

    if (count === 0) {
      const dataToInsert = MOCK_SUBMISSIONS.map(({ id, ...rest }) => ({
        ...rest,
        email: rest.email || null,
        notes: rest.notes || null
      }));
      await supabase.from('submissions').insert(dataToInsert);
    }
  } catch (err) {
    console.error('Failed to seed mock submissions:', err);
  }
}

// Create a new submission from the frontend forms
export async function createSubmission(payload: Omit<Submission, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const supabase = (await getSupabaseServerClient()) as any;
    const { data, error } = await supabase
      .from('submissions')
      .insert([
        {
          type: payload.type,
          resident_type: payload.resident_type,
          name: payload.name,
          phone: payload.phone,
          email: payload.email || null,
          subject: payload.subject || null,
          message: payload.message || null,
          property_id: payload.property_id || null,
          project_id: payload.project_id || null,
          status: 'new'
        }
      ])
      .select();

    if (error) throw error;
    
    revalidatePath('/algharbia-cp');
    revalidatePath('/algharbia-cp/submissions');
    return { success: true, data };
  } catch (err: any) {
    console.error('Error creating submission:', err);
    return { success: false, error: err.message || 'حدث خطأ أثناء إرسال طلبك' };
  }
}

// Update status of a submission
export async function updateSubmissionStatus(id: string, status: 'new' | 'reviewed' | 'closed'): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = (await getSupabaseServerClient()) as any;
    const { error } = await supabase
      .from('submissions')
      .update({ status })
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/algharbia-cp');
    revalidatePath('/algharbia-cp/submissions');
    return { success: true };
  } catch (err: any) {
    console.error('Error updating submission status:', err);
    return { success: false, error: err.message || 'فشل تحديث حالة الاستفسار' };
  }
}

// Update admin notes of a submission
export async function updateSubmissionNotes(id: string, notes: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = (await getSupabaseServerClient()) as any;
    const { error } = await supabase
      .from('submissions')
      .update({ notes })
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/algharbia-cp/submissions');
    return { success: true };
  } catch (err: any) {
    console.error('Error updating submission notes:', err);
    return { success: false, error: err.message || 'فشل تحديث الملاحظات الإدارية' };
  }
}

// Delete a submission
export async function deleteSubmissionAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = (await getSupabaseServerClient()) as any;
    const { error } = await supabase
      .from('submissions')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/algharbia-cp');
    revalidatePath('/algharbia-cp/submissions');
    return { success: true };
  } catch (err: any) {
    console.error('Error deleting submission:', err);
    return { success: false, error: err.message || 'فشل حذف الاستفسار' };
  }
}

// Fetch dashboard counts dynamically from database
export async function getDashboardStats(): Promise<{ properties: number; projects: number; newSubmissions: number }> {
  try {
    const supabase = (await getSupabaseServerClient()) as any;
    
    // Properties count
    const { count: propertiesCount } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true });
      
    // Projects count
    const { count: projectsCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true });
      
    // New submissions count
    const { count: submissionsCount } = await supabase
      .from('submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new');
      
    return {
      properties: propertiesCount || 0,
      projects: projectsCount || 0,
      newSubmissions: submissionsCount || 0
    };
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    return {
      properties: 0,
      projects: 0,
      newSubmissions: 0
    };
  }
}
