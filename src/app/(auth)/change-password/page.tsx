import { createClient } from '@/lib/utils/supabase/server';
import { cookies } from 'next/headers';
import ChangePassword from '@/app/(auth)/change-password/change-password';

export default async function ChangePasswordPage(){
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return <ChangePassword session={session} />
}