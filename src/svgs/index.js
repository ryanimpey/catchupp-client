import React from "react";
import Svg, { SvgXml } from "react-native-svg";

const heartWithDotSvg = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 357.3 383.1" style="enable-background:new 0 0 357.3 383.1;" xml:space="preserve">
<title>heart-with-dot_1</title>
<g id="Layer_2_1_">
	<g id="Layer_1-2">
		<ellipse cx="178.5" cy="366.1" rx="40.9" ry="17"/>
	</g>
</g>
<path d="M253.8,31c40,0,72.5,30.3,72.5,67.6c0,15.8-6,31.2-16.9,43.3c-1,1.1-1.9,2.3-2.7,3.5L178.7,277L50.5,145.3
	c-0.8-1.2-1.7-2.4-2.7-3.5C37,129.7,31,114.4,31,98.5C31,61.3,63.5,31,103.5,31c20.4,0,39.3,7.7,53.2,21.7c5.8,5.9,13.7,9.2,22,9.2
	s16.2-3.3,22-9.2C214.5,38.7,233.4,31,253.8,31 M253.8,0c-29.6,0-56.3,11.9-75.2,30.9C159.8,11.8,133.1,0,103.5,0
	C46.3,0,0,44.1,0,98.5c0,24.4,9.3,46.8,24.8,64h-0.7l154.6,158.9l154.6-158.9h-0.7c15.5-17.2,24.8-39.6,24.8-64
	C357.3,44.1,311,0,253.8,0L253.8,0z"/>
</svg>
`

const heartWithDotRedSvg = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 357.3 383.1" style="enable-background:new 0 0 357.3 383.1;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#ED152F;}
</style>
<title>heart-with-dot_1</title>
<g id="Layer_2_1_">
	<g id="Layer_1-2">
		<ellipse class="st0" cx="178.5" cy="366.1" rx="40.9" ry="17"/>
	</g>
</g>
<path class="st0" d="M332.6,162.5h0.7L178.7,321.4L24.1,162.5h0.7C9.3,145.3,0,122.9,0,98.5C0,44.1,46.3,0,103.5,0
	c29.6,0,56.3,11.8,75.1,30.9C197.5,11.9,224.2,0,253.8,0C311,0,357.3,44.1,357.4,98.5C357.4,122.9,348.1,145.3,332.6,162.5z"/>
</svg>
`

const heartWithDotOutlineSvg = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 357.3 383.1" style="enable-background:new 0 0 357.3 383.1;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#D3D3D3;}
</style>
<title>heart-with-dot_1</title>
<g id="Layer_2_1_">
	<g id="Layer_1-2">
		<ellipse class="st0" cx="178.5" cy="366.1" rx="40.9" ry="17"/>
	</g>
</g>
<path class="st0" d="M253.8,31c40,0,72.5,30.3,72.5,67.6c0,15.8-6,31.2-16.9,43.3c-1,1.1-1.9,2.3-2.7,3.5L178.7,277L50.5,145.3
	c-0.8-1.2-1.7-2.4-2.7-3.5C37,129.7,31,114.4,31,98.5C31,61.3,63.5,31,103.5,31c20.4,0,39.3,7.7,53.2,21.7c5.8,5.9,13.7,9.2,22,9.2
	s16.2-3.3,22-9.2C214.5,38.7,233.4,31,253.8,31L253.8,31z M253.8,0c-29.6,0-56.3,11.9-75.2,30.9C159.8,11.8,133.1,0,103.5,0
	C46.3,0,0,44.1,0,98.5c0,24.4,9.3,46.8,24.8,64h-0.7l154.6,158.9l154.6-158.9h-0.7c15.5-17.2,24.8-39.6,24.8-64
	C357.3,44.1,311,0,253.8,0L253.8,0z"/>
</svg>
`

export const HeartWithDotIcon = ({width = "50%", height = "50%"}) => <SvgXml xml={heartWithDotSvg} width={width} height={height} />
export const HeartWithDotRedIcon = ({width = "50%", height = "50%"}) => <SvgXml xml={heartWithDotRedSvg} width={width} height={height} />
export const HeartWithDotOutlineIcon = ({width = "50%", height = "50%"}) => <SvgXml xml={heartWithDotOutlineSvg} width={width} height={height} />