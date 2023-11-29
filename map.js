 const latitude = 51.5073219; // example latitude
  const longitude = -0.1276474; // example longitude

  // Replace 'YOUR_API_KEY' with your actual API key from TimezoneDb
  const apiKey = 'BNAMB6BML8ZH';

  // Get the current timestamp
  const timestamp = Math.floor(Date.now() / 1000);

  // Make a request to the TimezoneDb API
  const apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        const offsetInSeconds = data.gmtOffset;
        const localTime = new Date(timestamp * 1000 + offsetInSeconds * 1000);
        console.log('Local Time:', localTime.toLocaleString());
      } else {
        console.error('Failed to get time zone data');
      }
    })
    .catch(error => console.error('Error fetching data:', error));