import { useEffect, useRef, useState } from "react";

const Map = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [map, setMap] = useState(null); // Store map instance in state

  useEffect(() => {
    // Load the Google Maps script dynamically after component mounts
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDWquM-OTGrBgW6oqdvMQ7oDyegBHTfDa0&libraries=places`;
        script.async = true;
        script.onload = () => setIsScriptLoaded(true); // Mark script as loaded
        document.head.appendChild(script);
      } else {
        setIsScriptLoaded(true);
      }
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (isScriptLoaded) {
      initializeMap();
    }
  }, [isScriptLoaded]);

  const initializeMap = () => {
    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 9.145, lng: 40.489673 }, // Default center of Ethiopia
      zoom: 5, // Adjusted zoom to fit the map initially
    });

    setMap(googleMap); // Store map instance in state

    // Define the bounds for Ethiopia
    const bounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(3.403, 33.0), // Southwest Corner
      new window.google.maps.LatLng(15.0, 48.0) // Northeast Corner
    );

    // Fit the map to the bounds
    googleMap.fitBounds(bounds);

    // Initialize the marker at a default position
    markerRef.current = new window.google.maps.Marker({
      position: { lat: 9.145, lng: 40.489673 }, // Default marker position (center of Ethiopia)
      map: googleMap,
      draggable: true,
    });

    // Add a 'dragend' event listener to update location when the marker is moved
    markerRef.current.addListener("dragend", (event) => {
      const draggedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      // Pass dragged location to the parent
      onLocationSelect(draggedLocation);
    });

    // Add click event listener to the map
    googleMap.addListener("click", (event) => {
      const clickedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      // Move the marker to the clicked location
      markerRef.current.setPosition(clickedLocation);

      // Pass clicked location to the parent
      onLocationSelect(clickedLocation);
    });
  };

  const handleMyLocation = () => {
    // Check if Geolocation is supported
    if (navigator.geolocation) {
      // Request the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };

          // Center the map on the user's location
          map.setCenter(userLocation);
          map.setZoom(15); // Set zoom level to 15 to focus on the user's location

          // Move the marker to the user's location
          markerRef.current.setPosition(userLocation);

          // Pass the user's location to the parent
          onLocationSelect(userLocation);
        },
        (error) => {
          // Handle errors related to location permissions
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Permission denied. Please allow location access.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get your location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      {/* "My Location" button */}
      <button
        onClick={handleMyLocation}
        style={{ marginBottom: "10px", padding: "8px" }}
      >
        Use My Location
      </button>

      {/* Map container */}
      <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
};

export default Map;
