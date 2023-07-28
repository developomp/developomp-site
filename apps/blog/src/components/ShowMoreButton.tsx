interface Props {
    action(): void
}

export default function ShowMoreButton({ action }: Props) {
    return (
        <button className="button" onClick={action}>
            Show more posts
        </button>
    )
}
