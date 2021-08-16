declare module "read-time-estimate" {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export default function toc(
		string: string,
		customWordTime: number,
		customImageTime: number,
		chineseKoreanReadTime: number,
		imageTags: string[]
	): {
		humanizedDuration: string
		duration: number
		totalWords: number
		wordTime: number
		totalImages: number
		imageTime: number
		otherLanguageTimeCharacters: number
		otherLanguageTime: number
	}
}
