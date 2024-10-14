import { ReactNode } from "react"

const Body = ({ children }: { children: ReactNode }) => {
	return (
		<div className='md:px-36 px-4 h-full overflow-auto text-gray-800 font-comfortaa'>{children}</div>
	)
}

export default Body