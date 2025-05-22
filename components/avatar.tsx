import { createClient } from "@/lib/supabase/server";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";

export default async function Avatar({ width=32, height=32}){
    const supabase = await createClient();
    const { data: {user} } = await supabase.auth.getUser();
    //console.log(user);
    const { data: imageData, error } = await supabase.storage 
        .from('avatars')
        .createSignedUrl(user?.user_metadata.avatar, 60 * 5, {
            transform: {
                width: 32,
                height: 32
            }
        })
    //console.log(imageData);
    
    if (error || !imageData){
        return <CircleUserRound className="w-6 h-6"/>
    };

    return (
        <div className="rounded-full overflow-hidden w-[width] h-[width]">
            <Image 
                    src={imageData.signedUrl} 
                    width={width} 
                    height={height} 
                    alt="User Avatar"
                />
        </div>
    )
    
   
}