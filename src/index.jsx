import { h, render, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import { SORT } from './sort'

async function main () {
	const data = await fetch('/data.json').then(res => res.json())

	render(<Table data={data}/>, document.getElementById('root'))
}

main()

/**
 * @param {Object} props
 * @param {Object[]} props.data
 */
function Table ( props ) {
	const [data, setData] = useState(props.data)
	const [sort, setSort] = useState(null)

	function handleClick ( event ) {
		let syncSort = null
		const dataToSort = data

		if ( ! sort || sort === 'descending' ) {
			setSort('ascending')
			syncSort = 'ascending'
		} else {
			setSort('descending')
			syncSort = 'descending'
		}

		dataToSort.sort(SORT[syncSort])

		setData(dataToSort)
	}

	return (
		<Fragment>
			<SortButton sort={sort} onClick={handleClick}/>
			<div class="Table">
				{data.map(row => (
					<div class="Row" key={row.id}>
						<div class="d-block bg-light border text-center">{row.id}</div>
						<div class="row flex-nowrap m-0 overflow-auto px-1">
							{row.data.map(column => (
								<div class="col-6 px-1 py-2" key={column}>
									<span class="Column--inner btn btn-light border">{column}</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</Fragment>
	)
}

function SortButton ( props ) {
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
