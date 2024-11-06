'use client'

import { Dispatch, SetStateAction, createContext, useState } from "react";

export const SidebarContext = createContext({is_sidebar_open:false, setIsSidebarOpen:()=>{}}as {is_sidebar_open:boolean, setIsSidebarOpen:Dispatch<SetStateAction<boolean>>})

export function SidebarProvider({children}:{children:React.ReactNode}){
	const [is_sidebar_open, setIsSidebarOpen] = useState(false)
	return (
	<SidebarContext.Provider value={{setIsSidebarOpen, is_sidebar_open}}>
			{children}
	</SidebarContext.Provider>
	)

}
