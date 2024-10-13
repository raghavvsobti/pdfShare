import { ReactNode } from "react"

const Body = ({ children }: { children: ReactNode }) => {
	return (
		<div className='md:px-36 px-4 h-[92.5vh] overflow-auto text-gray-800'>{children}</div>
	)
}

export default Body