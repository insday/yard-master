/*eslint-disable*/

// import InfoBox from './map/infobox';
import {styles as StyleMap} from './style';

// export function contactsMap() {
//
// 	const MarkerWithLabel = require('./markerwithlabel.js')(google.maps);
// 	const newMarkers = [];
// 	const {zoom, placemarks} = initConfig;
//
// 	const mapProp = {
// 		center: new google.maps.LatLng(placemarks[0].lat, placemarks[0].lng),
// 		zoom,
// 		mapTypeId: google.maps.MapTypeId.ROADMAP,
// 		styles: StyleMap,
// 		scrollwheel: false,
// 	};
//
// 	const map = new google.maps.Map(document.getElementById('map'), mapProp);
//
// 	for (var i = 1; i <= placemarks.length; i++) {
//
// 		const data = placemarks[i - 1];
// 		const myLatlng = new google.maps.LatLng(data.lat, data.lng);
//
// 		const block = `<div><img src="${data.icon}" alt=""></div>`;
//
// 		const marker = new MarkerWithLabel({
// 			position: myLatlng,
// 			map,
// 			title: data.title,
// 			icon: ' ',
// 			labelContent: block,
// 			labelAnchor: new google.maps.Point(28, 63),
// 			labelClass: 'marker-title',
// 			labelInBackground: false
// 		});
//
// 		newMarkers.push(marker);
//
// 		// (function(marker, data) {
// 		//
// 		//   const div = `<div class="locationBox">
// 		//           <div style="background-image: url('${data.infoBox.img}')" class="locationBox__photo"></div>
// 		//           <div class="locationBox__body">
// 		//             <div class="locationBox__title">${data.infoBox.title}</div>
// 		//             <div class="locationBox__text">${data.infoBox.text}</div>
// 		//           </div>
// 		//         </div>`;
// 		//
// 		//   const myOptions = {
// 		//     content: div,
// 		//     disableAutoPan: false,
// 		//     maxWidth: 0,
// 		//     pixelOffset: new google.maps.Size(80, -90),
// 		//     zIndex: null,
// 		//     boxStyle: {
// 		//       background: '',
// 		//       width: '25rem'
// 		//     },
// 		//     closeBoxMargin: '10px 10px 2px 2px',
// 		//     closeBoxURL: '',
// 		//     infoBoxClearance: new google.maps.Size(1, 1),
// 		//     isHidden: false,
// 		//     pane: 'floatPane',
// 		//     enableEventPropagation: false
// 		//   };
// 		//
// 		//   // marker.infobox = new InfoBox(myOptions);
// 		//
// 		//   // google.maps.event.addListener(marker, 'click', function() {
// 		// 	//
// 		//   // 	if ($(window).width() > 900) {
// 		//   //     const curMarker = this;
// 		//   //     marker.infobox.open(map, marker);
// 		//   //     marker.set('labelClass', 'marker-title active');
// 		// 	//
// 		//   //     $.each(newMarkers, function(index, marker) {
// 		// 	//
// 		//   //       if (marker !== curMarker) {
// 		//   //         marker.infobox.close();
// 		//   //         marker.set('labelClass', 'marker-title');
// 		//   //       }
// 		//   //     });
// 		// 	//
// 		//   //     const latUrl = parseFloat(marker.position.toUrlValue().split(',', 2)[0]);
// 		//   //     const lngUrl = parseFloat(marker.position.toUrlValue().split(',', 2)[1]);
// 		// 	//
// 		//   //     map.panTo({lat: latUrl, lng: lngUrl});
// 		//   //   }
// 		// 	//
// 		//   // });
// 		//
// 		// })(marker, data);
//
// 		var bounds = new google.maps.LatLngBounds();
// 		for (var i = 0; i < newMarkers.length; i++) {
// 			bounds.extend(newMarkers[i].getPosition());
// 		}
//
// 		map.fitBounds(bounds);
//
// 		$(window).on('resize', function () {
// 			google.maps.event.trigger(map, 'resize');
// 			map.fitBounds(bounds);
// 		});
//
// 	}
// };

export function previewMap(idMap, initConfig) {

  const $mapEl = $('#' + idMap);
  const $select = $('.js-mapBox-select');
  const {zoom, placemarks, multiObjects} = initConfig;
  $mapEl.get(0).map = null;
  let bounds = new google.maps.LatLngBounds();
  const newMarkers = [];

  init();

  function init() {
    const mapProp = {
      center: new google.maps.LatLng(placemarks[0].coords[0], placemarks[0].coords[1]),
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: StyleMap,
      scrollwheel: false,
      mapTypeControl: !!multiObjects,
      disableDefaultUI: !multiObjects,
      streetViewControl: false,
      // navigationControlOptions: {
      // 	style: google.maps.NavigationControlStyle.SMALL
      // }
    };
    $mapEl.get(0).map = new google.maps.Map(document.getElementById(idMap), mapProp);
    const markersToRemove = [];

    if (multiObjects) {
      $(document).on('change', '.js-mapBox-select', function () {
        updateMarkers($(this).closest('.mapBox').find('#mapLocation').get(0).map, $(this).closest('.mapBox').find('#mapLocation'));
      });
    }

    addMarkersOnMap();
    panByUpdate();

    $(window).on('resize', function () {
      google.maps.event.trigger($mapEl.get(0).map, 'resize');
      panByUpdate();
    });


    $('[data-toggle-modal]').fancybox({
      touch: false,
      afterShow() {
        $mapEl.get(0).map.fitBounds(bounds);
      }
    })

    function updateMarkers(map, el) {
      map.clearOverlays();
      addMarkersOnMap(map);
    }


    function addMarkersOnMap(map) {
      const MarkerWithLabel = require('./markerwithlabel.js')(google.maps);
      let placemarksArr = placemarks;

      bounds = new google.maps.LatLngBounds();


      if (multiObjects || map) {
        placemarksArr = placemarks.filter((item) => {
          return item.category === $select.val() || item.category === 'main';
        });
      }

      for (let i = 0; i < placemarksArr.length; i++) {

        const templateMarker = (data) => {
          return `<div><img src="${data.icon}" alt=""></div>`;
        };
        const data = placemarksArr[i];
        const myLatlng = new google.maps.LatLng(data.coords[0], data.coords[1]);
        const marker = new MarkerWithLabel({
          position: myLatlng,
          map: map ? map : $mapEl.get(0).map,
          title: data.title,
          icon: ' ',
          labelContent: templateMarker(data),
          labelAnchor: new google.maps.Point(28, 63),
          labelClass: 'marker-title',
          labelInBackground: false
        });

        newMarkers.push(marker);
        bounds.extend(newMarkers[i].getPosition());

        google.maps.Map.prototype.clearOverlays = function () {
          for (var i = 0; i < newMarkers.length; i++) {
            newMarkers[i].setMap(null);
          }
          newMarkers.length = 0;
        };
      }

      if (placemarksArr.length > 1) {
        map ? map.fitBounds(bounds) : $mapEl.get(0).map.fitBounds(bounds);
      }
    }

    function panByUpdate() {

      if (!multiObjects) {
        if (window.outerWidth > 767) {
          const $el = $('.locationBox');
          const data = -($el.offset().left + $el.outerWidth()) / 2;
          $mapEl.get(0).map.panBy(data, 60)
        } else {
          $mapEl.get(0).map.panBy(0, 70)
        }
      }
    }
  }
}
