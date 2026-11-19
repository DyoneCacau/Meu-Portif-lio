/**
 * Fundo 3D dinâmico (escultura + órbitas + partículas)
 * Paleta alinhada ao portfólio: preto profundo + vermelho controlado.
 */
(function () {
  const mount = document.getElementById("ambient-3d");
  if (!mount || typeof THREE === "undefined") return;

  const reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.15, 5.2);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);

  const group = new THREE.Group();
  group.position.set(1.15, 0.05, 0);
  scene.add(group);

  const accent = 0x9e1b2e;
  const accentSoft = 0xc43a4e;
  const luminous = 0xe8e4df;

  const sculptureMat = new THREE.MeshStandardMaterial({
    color: 0x2a1016,
    metalness: 0.96,
    roughness: 0.16,
    emissive: 0x3a0c14,
    emissiveIntensity: 0.35,
  });

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.86, 0.24, 240, 32, 2, 3),
    sculptureMat
  );
  knot.rotation.x = 0.55;
  knot.rotation.y = -0.35;
  group.add(knot);

  const highlight = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.86, 0.065, 180, 16, 2, 3),
    new THREE.MeshBasicMaterial({
      color: accentSoft,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  highlight.rotation.copy(knot.rotation);
  group.add(highlight);

  const ringA = new THREE.Mesh(
    new THREE.TorusGeometry(1.42, 0.04, 16, 100),
    new THREE.MeshStandardMaterial({
      color: accent,
      metalness: 0.9,
      roughness: 0.22,
      emissive: accent,
      emissiveIntensity: 0.45,
    })
  );
  ringA.rotation.x = Math.PI / 2.4;
  group.add(ringA);

  const ringB = new THREE.Mesh(
    new THREE.TorusGeometry(1.78, 0.02, 12, 120),
    new THREE.MeshBasicMaterial({
      color: accentSoft,
      transparent: true,
      opacity: 0.7,
    })
  );
  ringB.rotation.x = Math.PI / 1.7;
  ringB.rotation.y = 0.4;
  group.add(ringB);

  function makeOrbit(radius, tiltX, tiltZ, segments) {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius)
      );
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const line = new THREE.Line(
      geo,
      new THREE.LineBasicMaterial({
        color: accentSoft,
        transparent: true,
        opacity: 0.35,
      })
    );
    line.rotation.x = tiltX;
    line.rotation.z = tiltZ;
    return line;
  }

  group.add(makeOrbit(2.05, 0.9, 0.2, 96));
  group.add(makeOrbit(2.35, 1.2, -0.35, 96));
  group.add(makeOrbit(2.65, 0.55, 0.55, 96));

  const particleCount = 380;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
  }
  const particles = new THREE.Points(
    new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    ),
    new THREE.PointsMaterial({
      color: luminous,
      size: 0.018,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
    })
  );
  scene.add(particles);

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  const key = new THREE.PointLight(accentSoft, 4.2, 20, 2);
  key.position.set(2.6, 1.8, 3.4);
  scene.add(key);

  const fill = new THREE.PointLight(0xffffff, 1.05, 18, 2);
  fill.position.set(-3.2, -0.8, 2.6);
  scene.add(fill);

  const rim = new THREE.PointLight(accent, 3.2, 16, 2);
  rim.position.set(0.2, 2.4, -2.4);
  scene.add(rim);

  const spark = new THREE.PointLight(0xff6b7a, 1.8, 10, 2);
  spark.position.set(1.1, 0.4, 1.8);
  scene.add(spark);

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  function onPointer(e) {
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const y = "touches" in e ? e.touches[0].clientY : e.clientY;
    target.x = (x / window.innerWidth) * 2 - 1;
    target.y = (y / window.innerHeight) * 2 - 1;
  }

  window.addEventListener("pointermove", onPointer, { passive: true });

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);

    const isMobile = w < 768;
    group.position.x = isMobile ? 0 : 1.15;
    group.position.y = isMobile ? 0.55 : 0.05;
    group.scale.setScalar(isMobile ? 0.72 : 1);
    camera.position.z = isMobile ? 6.2 : 5.2;
  }

  window.addEventListener("resize", resize);
  resize();

  let raf = 0;
  const clock = new THREE.Clock();

  function frame() {
    raf = requestAnimationFrame(frame);
    const t = clock.getElapsedTime();

    pointer.x += (target.x - pointer.x) * 0.04;
    pointer.y += (target.y - pointer.y) * 0.04;

    if (!reduced) {
      knot.rotation.y = t * 0.22 - 0.35;
      knot.rotation.x = 0.55 + Math.sin(t * 0.35) * 0.08;
      highlight.rotation.copy(knot.rotation);
      ringA.rotation.z = t * 0.18;
      ringB.rotation.z = -t * 0.12;
      particles.rotation.y = t * 0.02;
      spark.intensity = 1.4 + Math.sin(t * 2.2) * 0.5;
      group.rotation.y = pointer.x * 0.28;
      group.rotation.x = pointer.y * 0.16;
      group.position.y =
        (window.innerWidth < 768 ? 0.55 : 0.05) + Math.sin(t * 0.6) * 0.06;
    }

    camera.position.x = pointer.x * 0.18;
    camera.position.y = 0.15 + pointer.y * 0.1;
    camera.lookAt(0.4, 0.1, 0);

    renderer.render(scene, camera);
  }

  frame();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      clock.start();
      frame();
    }
  });
})();
