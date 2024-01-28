import React from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const AutocompleteInput = ({ onSelectAddress }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    libraries,
  });

  const handlePlaceSelect = (autocomplete) => {
    const selectedPlace = autocomplete.getPlace();
    if (selectedPlace && selectedPlace.formatted_address) {
      onSelectAddress(selectedPlace.formatted_address);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => {
          autocomplete.addListener('place_changed', () =>
            handlePlaceSelect(autocomplete)
          );
        }}
      >
        <input
          type="text"
          placeholder="Enter your address"
          className="form-control"
        />
      </Autocomplete>
    </div>
  );
};

export default AutocompleteInput;
