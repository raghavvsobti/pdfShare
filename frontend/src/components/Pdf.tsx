/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AreaHighlight, Content, Highlight, IHighlight, NewHighlight, PdfHighlighter, PdfLoader, Popup, ScaledPosition } from "../libs/react-pdf-highlighter/src";
import "../style/App.css";
import { Spinner } from './Spinner';
import { useNavigate } from "react-router-dom";
import { colors } from '../../constants';
import { useUniversalState } from "../context/stateProvider";
import SocketService, { Message } from "../socket.service";
import { removeDuplicates } from "../utils";


const getNextId = () => String(Math.random()).slice(2);

const resetHash = () => {
	document.location.hash = "";
};

const HighlightPopup = ({
	comment,
}: {
	comment: { text: string; emoji: string };
}) =>
	comment.text ? (
		<div className="Highlight__popup">
			{comment.emoji} {comment.text}
		</div>
	) : null;


export const Pdf = () => {
	const { url, setUrl, user, setUser } = useUniversalState()
	const [highlights, setHighlights] = useState<Array<IHighlight>>([]);
	const [message, setMessage] = useState<Message | null>(null)

	useEffect(() => {
		if (!user) {
			const user = localStorage.getItem("data")
			setUser(user)
		}
	}, [])


	const navigate = useNavigate();

	useEffect(() => {
		const user = localStorage.getItem("data")
		if (!user) {
			navigate("/login")
		} else {
			setUser(JSON.parse(user))
		}
		return () => {
			setUrl(null);
		}
	}, [])

	useEffect(() => {
		const searchParams = new URLSearchParams(document.location.search);
		if (!url) {
			setUrl(searchParams.get("url"))
		}
	}, [url])

	const addHighlight = (highlight: NewHighlight) => {
		// console.log("Saving highlight", highlight);
		setHighlights((prevHighlights) => [
			{ ...highlight, id: getNextId() },
			...prevHighlights,
		]);
	};

	const updateHighlight = (
		highlightId: string,
		position: Partial<ScaledPosition>,
		content: Partial<Content>,
	) => {
		// console.log("Updating highlight", highlightId, position, content);
		setHighlights((prevHighlights) =>
			prevHighlights.map((h) => {
				const {
					id,
					position: originalPosition,
					content: originalContent,
					...rest
				} = h;
				return id === highlightId
					? {
						id,
						position: { ...originalPosition, ...position },
						content: { ...originalContent, ...content },
						...rest,
					}
					: h;
			}),
		);
	};

	useEffect(() => {
		const handleMessage = (msg: Message) => {
			if (msg?.pdf === url) {
				setHighlights(() => {
					return msg?.highlights?.length > 0 ? [...msg.highlights] : [];
				});
				setMessage(msg)
			}
		};

		SocketService.onMessage(handleMessage);

		return () => {
			SocketService.offMessage(handleMessage);
		};
	}, [url]);

	const sendMessage = () => {
		if (user && highlights?.length > 0) {
			SocketService.sendMessage({
				pdf: url,
				highlights: highlights ?? [],
				watchers: removeDuplicates([...new Set([...[{ name: user?.username, colorIndex: user?.colorIndex }], ...(message ? message.watchers : [])])], "name"),
			});
		}
	};

	useEffect(() => {
		sendMessage()
	}, [JSON.stringify(highlights), user])

	return (
		<div className="pt-14">
			<div className="flex my-2 justify-end flex-wrap group cursor-pointer">
				{message?.watchers?.sort((a, b) => a.colorIndex - b.colorIndex)?.map((item, index) => {
					return (
						<p title={item?.name}
							key={index}
							className={`rounded-full px-4 py-3 text-xs w-fit -mr-4 transition-all duration-200 ease-in group-hover:-mr-2 bg-gray-100 font-bold border-2 border-[${colors[item?.colorIndex]?.toString()?.includes("#") ? colors[item?.colorIndex] : `#${colors[item?.colorIndex]}`}]`}>{item?.name?.charAt(0)?.toUpperCase()}</p>
					);
				})}
			</div>

			<div className="flex h-[80vh] rounded-md w-full border-2 border-gray-200">
				<div className="w-full h-[100vh_-_55rem] relative overflow-auto">
					<PdfLoader url={url} beforeLoad={<Spinner />}>
						{(pdfDocument) => (
							<PdfHighlighter
								pdfDocument={pdfDocument}
								enableAreaSelection={(event) => event.altKey}
								onScrollChange={resetHash}
								scrollRef={() => {
								}}
								onSelectionFinished={(
									position,
									content,
								) => addHighlight({ content, position, comment: { text: "", emoji: "" }, color: colors[user?.colorIndex] }) as any}
								highlightTransform={(
									highlight,
									index,
									setTip,
									hideTip,
									viewportToScaled,
									screenshot,
									isScrolledTo,
								) => {
									const isTextHighlight = !highlight.content?.image;

									const component = isTextHighlight ? (
										<Highlight
											isScrolledTo={isScrolledTo}
											position={highlight.position}
											comment={highlight.comment}
											color={highlight.color}
										/>
									) : (
										<AreaHighlight
											isScrolledTo={isScrolledTo}
											highlight={highlight}
											onChange={(boundingRect) => {
												updateHighlight(
													highlight.id,
													{ boundingRect: viewportToScaled(boundingRect) },
													{ image: screenshot(boundingRect) },
												);
											}}
										/>
									);

									return (
										<Popup
											popupContent={<HighlightPopup {...highlight} />}
											onMouseOver={(popupContent: JSX.Element) =>
												setTip(highlight, (_highlight) => popupContent)
											}
											onMouseOut={hideTip}
											key={index}
										>
											{component}
										</Popup>
									);
								}}
								highlights={highlights}
							/>
						)}
					</PdfLoader>
				</div>
			</div>
		</div>
	);
}


