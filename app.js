let scene, camera, renderer, starGeo, starts;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 1;
  camera.position.x = Math.PI / 2;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  starGeo = new THREE.Geometry();
  for (let i = 0; i < 6000; i++) {
    star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    star.velocity = 0;
    star.accelaration = 0.01;
    starGeo.vertices.push(star);
  }

  let sprite = new THREE.TextureLoader().load("star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);

  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  starGeo.vertices.forEach((p) => {
    if (p.velocity < p.accelaration * 100) {
      p.velocity += p.accelaration;
    }

    p.z -= p.velocity;
    if (p.z < -200) {
      p.z = 200;
      p.velocity = 0;
    }
  });
  starGeo.verticesNeedUpdate = true;
  stars.rotation.z += 0.002;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.onload = () => {
  init();

  window.addEventListener("resize", onWindowResize);
};
