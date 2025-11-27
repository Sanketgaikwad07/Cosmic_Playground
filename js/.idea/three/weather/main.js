// === SCENE, CAMERA, RENDERER SETUP ==============================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === LIGHTING ===================================================================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Soft ambient light
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1.5); // Main light source
pointLight.position.set(10, 5, 5);
scene.add(pointLight);

// === OBJECTS =====================================================================
// Earth Globe
const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
const earthTexture = new THREE.TextureLoader().load("https://raw.githubusercontent.com/nikhilnayyar007/threejs-earth-globe/master/images/earthmap1k.jpg");
const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    shininess: 50 // Adds a bit of specular highlight to oceans
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Cloud Layer
const cloudGeometry = new THREE.SphereGeometry(2.02, 64, 64);
const cloudTexture = new THREE.TextureLoader().load("https://raw.githubusercontent.com/nikhilnayyar007/threejs-earth-globe/master/images/earthcloudmap.jpg");
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.7
});
const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(clouds);

// Starry Background
const starGeometry = new THREE.SphereGeometry(500, 64, 64);
const starTexture = new THREE.TextureLoader().load("https://raw.githubusercontent.com/nikhilnayyar007/threejs-earth-globe/master/images/starfield.jpg");
const starMaterial = new THREE.MeshBasicMaterial({
    map: starTexture,
    side: THREE.BackSide // Render the texture on the inside of the sphere
});
const starfield = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starfield);


// === CONTROLS & CAMERA POSITION ==================================================
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Makes rotation and zoom smoother
controls.dampingFactor = 0.05;
controls.minDistance = 2.5; // Prevent zooming inside the Earth
controls.maxDistance = 10;
camera.position.z = 4.5;

// === INTERACTIVITY (Raycasting for Tooltips) =======================================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.getElementById('tooltip');
const weatherMarkers = []; // Array to hold marker objects for intersection testing

// === HELPER FUNCTIONS ============================================================
// Converts Latitude/Longitude to 3D coordinates
function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
}

// Fetches weather and creates a visual marker on the globe
async function addWeatherMarker(city, lat, lon) {
    // ⚠️ IMPORTANT: Replace with your actual API key from OpenWeatherMap
    const apiKey = "YOUR_API_KEY_HERE";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Log a more descriptive error if the API key is invalid
            if (response.status === 401) {
                console.error(`Error for ${city}: Invalid API Key. Please check your key in main.js.`);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return; // Stop execution for this marker if there's an error
        }
        const data = await response.json();

        const temp = Math.round(data.main.temp);
        const weatherDescription = data.weather[0].description;

        // Determine marker color based on temperature
        const color = temp > 30 ? 0xff4500 : (temp < 10 ? 0x1e90ff : 0x32cd32); // Red, Blue, Green

        // Create the glowing sphere marker
        const markerGeometry = new THREE.SphereGeometry(0.04, 16, 16);
        const markerMaterial = new THREE.MeshPhongMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 2
        });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);

        // Store data inside the marker object for the tooltip
        marker.userData = {
            city: city,
            temp: temp,
            weather: weatherDescription
        };

        const position = latLonToVector3(lat, lon, 2.05); // Place it just above the Earth's surface
        marker.position.copy(position);

        scene.add(marker);
        weatherMarkers.push(marker); // Add to array for raycasting

    } catch (error) {
        console.error(`Failed to fetch weather data for ${city}:`, error);
    }
}

// === EVENT LISTENERS =============================================================
// Handles mouse movement to show/hide tooltips
function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(weatherMarkers);

    if (intersects.length > 0) {
        const data = intersects[0].object.userData;
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.top = `${event.clientY + 10}px`;
        tooltip.innerHTML = `
            <strong>${data.city}</strong><br>
            Temp: ${data.temp}°C<br>
            Weather: ${data.weather.charAt(0).toUpperCase() + data.weather.slice(1)}
        `;
    } else {
        tooltip.style.display = 'none';
    }
}

// Handles window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('resize', onWindowResize);


// === INITIAL DATA LOADING ========================================================
// Add markers for various cities around the globe
addWeatherMarker("Pune", 18.5204, 73.8567);
addWeatherMarker("London", 51.5074, -0.1278);
addWeatherMarker("New York", 40.7128, -74.0060);
addWeatherMarker("Tokyo", 35.6895, 139.6917);
addWeatherMarker("Sydney", -33.8688, 151.2093);
addWeatherMarker("Cairo", 30.0444, 31.2357);
addWeatherMarker("Moscow", 55.7558, 37.6173);
addWeatherMarker("Rio de Janeiro", -22.9068, -43.1729);


// === ANIMATION LOOP ==============================================================
function animate() {
    requestAnimationFrame(animate);

    // Subtle rotation for the globe and clouds
    earth.rotation.y += 0.0005;
    clouds.rotation.y += 0.0006;

    controls.update(); // Necessary for damping to work
    renderer.render(scene, camera);
}

// Start the animation loop
animate();