/**
 * Base URL for all media assets stored in Supabase Storage.
 * Falls back to local /public path for local development if env var is not set.
 */
export const STORAGE_URL =
    process.env.NEXT_PUBLIC_STORAGE_URL || "";
