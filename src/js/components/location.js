/*eslint-disable*/

import {previewMap} from './map/index'


if (typeof google !== 'undefined' && $('#locationMapPreview').length) {
	previewMap('locationMapPreview', previewMapConfig);
}


if (typeof google !== 'undefined' && $('#mapLocation').length) {
	previewMap('mapLocation', locationMapConfig);
}

if (typeof google !== 'undefined' && $('#locationMapPreview2').length) {
	previewMap('locationMapPreview2', previewMapConfig);
}


if (typeof google !== 'undefined' && $('#mapLocation2').length) {
	previewMap('mapLocation2', locationMapConfig);
}
