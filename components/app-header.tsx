import Link from 'next/link';
import ThemeSwitch from './dark-mode-toggle';
import { createClient } from '@/lib/supabase/server';
import { CircleUserRound, KeyRound } from 'lucide-react';
import { sizes, variants } from '@/lib/variants';
import SignOutButton from './sign-out-button';
import Avatar from './avatar';

type PageHeaderProps = {
  className?: string
}

export default async function PageHeader({className = ''}: PageHeaderProps) {

  const supabase = await createClient();
  const { data: {user}, error } = await supabase.auth.getUser();
  //console.log(user);

  if (!user || !user.email || error) {
    return <div className={className}>Not logged in</div>;
  }

  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link href="/dashboard" 
        className='text-xl hover:underline hover:underline-offset-8 decoration-2'>
        Finance App
      </Link>

      <div className='flex items-center'>
        <div><ThemeSwitch/></div>
        
          {user && <Link href="/dashboard/settings" 
                         className={`flex items-center space-x-2 ${variants['ghost']} ${sizes['sm']}`} 
            >
              <Avatar />
              <span className='font-mono font-semibold'>{user?.email?.split('@')[0]}</span>
            </Link>}
          {user && <SignOutButton />}
          {!user && <Link href="/login" className={`${variants['ghost']} ${sizes['sm']}`}>
            <KeyRound className="h-6 w-6"/>
          </Link>}
        
      </div>
    </header>
  )
}

