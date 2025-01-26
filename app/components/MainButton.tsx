import Image from "next/image";
import React from "react";

interface MainButtonProps {
	children: React.ReactNode;
	iconURL?: string;
	href: string;
	download?: boolean;
}

const MainButton = ({ children, iconURL, href, download }: MainButtonProps) => {
	return (
		<a
			href={download ? undefined : href}
			download={download ? true : undefined}
			className='bg-secondary_light hover:bg-secondary text-white font-bold py-2 px-4 rounded-full select-none'
		>
			<div className='flex flex-1 space-x-2'>
				{iconURL && (
					<Image
						src={iconURL}
						alt=''
						className='max-w-6 max-y-6'
						style={{
							filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(321deg) brightness(111%) contrast(101%)",
						}}
					/>
				)}
				<div>{children}</div>
			</div>
		</a>
	);
};

export default MainButton;
