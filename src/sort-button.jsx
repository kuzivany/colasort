import { h, Fragment } from 'preact'

export function SortButton ( props ) {
	const { sort, onClick } = props

	return (
		<button title={`Sort${sort? ' ' + sort: ''}`} onClick={onClick} class="SortButton">
			<span class="SortButton--target">
				Sort {sort && (
					<Fragment>
						<span class="sr-only">{sort}</span>
						<i class="icon">{sort === 'ascending'? "\u25BE": "\u25B4"}</i>
					</Fragment>
				)}
			</span>
		</button>
	)
}
