
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pzfumgyzxbfapxtzwgef.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_gjT7L_PWCCerfKHBwPOAUQ_bFiluKRL';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
