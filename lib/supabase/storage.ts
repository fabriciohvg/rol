const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export function getStorageUrl(
  bucket: string,
  path: string | null,
  id: string,
): string {
  if (!path)
    return `https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${encodeURIComponent(id)}`;
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}
