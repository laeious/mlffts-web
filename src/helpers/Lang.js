import React from 'react'

export default props => {
	let text
		switch(props.lang) {
			case 'th' :
				text = props.th
			break;
			case 'en' :
				text = props.en
			break;
			default:
				text = props.en
			break;
		}

		return text
}