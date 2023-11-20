'use client'
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { UserContext } from "./UserContext";

export async function Providers({ children }: React.PropsWithChildren) {
    const [userData, setUser] = useState<User | null>(null);

    const supabase = createClientComponentClient();
    const {
        data: { user },
      } = await supabase.auth.getUser()
    if(user) setUser(user);
    return (
        <UserContext.Provider value={{ userData, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
