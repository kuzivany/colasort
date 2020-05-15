const COLOURS = [
	'#e36209',
	'#c0b404',
	'#6f42c1',
	'#22863a',
	'#6f6042',
	'#005cc5',
]

/**
 * @param {int} index
 */
export function colour ( index ) {
	return `background-color: ${COLOURS[index - 1]};`
}
