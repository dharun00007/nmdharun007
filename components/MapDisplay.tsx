

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import type { TranslationKeys } from '../translations';

interface MapDisplayProps {
    latitude: number;
    longitude: number;
    t: TranslationKeys;
}

const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ latitude, longitude, t }) => {
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        return <div className="w-full h-full bg-gray-200 flex items-center justify-center"><p className="text-gray-500">{t.mapLocationNotAvailable}</p></div>;
    }

    const position: [number, number] = [latitude, longitude];

    // Workaround for react-leaflet type issues where standard props are not recognized.
    // This is likely due to a misconfiguration or version mismatch of type definitions.
    const mapContainerProps: any = {
        center: position,
        zoom: 10,
        scrollWheelZoom: true,
        style: { height: '100%', width: '100%' },
        'aria-label': t.mapAriaLabel
    };

    const tileLayerProps: any = {
        attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    };

    return (
        <MapContainer {...mapContainerProps}>
            <TileLayer {...tileLayerProps} />
            <Marker position={position} />
            <ChangeView center={position} zoom={10} />
        </MapContainer>
    );
};

export default MapDisplay;
