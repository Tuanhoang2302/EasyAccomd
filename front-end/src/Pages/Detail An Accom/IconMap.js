import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const iconPerson = new L.Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: null,
    popupAnchor: [12.505, -0.09],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
});

export default iconPerson ;