# <div align='center'> PNR Enquirer</div>
A smooth, fluid and beautiful Front End Web Application for enquiring PNR Status.

### Highlights

<ul>
	<li>Material - Fluid Design.</li>
	<li>Responsive</li>
	<li>Based on Vanilla JS</li>
	<li>Geolocation Embedded for both stations.</li>
</ul>

### Previews

For Previews Go <a href='https://imgur.com/a/a2OU9Pd' target='_blank'>Here</a>.

### Usage Instructions

The PNR Enquirer uses Railway API and Google Maps API.

To use it for your own projects. Register with <a href='' target='_blank'>Railway API</a> and <a href="https://cloud.google.com/maps-platform/" target="_blank">Google Maps Geolocation API</a> and get an API Key.

Now that you may have the API Keys, go to <strong>scripts.js</strong> and make the following changes ;

Change the APIKEY of the Railway API to the key you obtained : 

```javascript
request.open('GET','https://api.railwayapi.com/v2/pnr-status/pnr/'+pnr+'/apikey/APIKEY/');
```

Same with the Google Maps API Key in <strong>index.html</strong>: 

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOURAPIKEY&callback=initMap" async defer></script>
```

### License

The script is absolutely free to use. Do whatever you want with it.

### Issues

For Issues, add an issue to the repository or just email them to <a href='mailto:devesh2027@gmail.com' target="_blank">devesh2027@gmail.com</a>
