/*!
 * ColaSort <https://github.com/kuzivany/colasort>
 */

import { h, render, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import { App } from './app'

async function main () {
	const data = await fetch('/data.json').then(res => res.json())

	render(<App data={data} />, document.getElementById('root'))
}

main()
