import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import { SORT } from './sort'
import { SortButton } from './sort-button'

/**
 * @param {Object} props
 * @param {Object[]} props.data
 */
export function App ( props ) {
	const [data, setData] = useState(props.data)
	const [sort, setSort] = useState(null)

	function handleClick ( event ) {
		let syncSort = null
		const dataToSort = data

		if ( ! sort || sort === 'descending' ) {
			syncSort = 'ascending'
		} else {
			syncSort = 'descending'
		}

		setSort(syncSort)
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