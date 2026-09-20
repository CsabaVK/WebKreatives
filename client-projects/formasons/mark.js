/* The Formasons mark as a 3D object. One fixed transparent canvas over the
   page; the mark glides between `.mark-slot` elements as the reader scrolls,
   lifting on an arc and turning half a turn at every change of slot, then
   idling with a slow turn. Slots reserve the space, so it never covers text.
   Geometry is the traced silhouette (assets/mark-shape.json) extruded with a
   bevel. Reduced motion, or no WebGL: slots show the static SVG instead. */
(function () {
  var base = document.currentScript.src.replace(/mark\.js.*$/, '');
  var slots = Array.prototype.slice.call(document.querySelectorAll('.mark-slot'));
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function fallback() { document.documentElement.classList.add('mark-static'); }
  if (!slots.length) return;
  if (reduced) return fallback();

  Promise.all([
    import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js'),
    fetch(base + 'assets/mark-shape.json').then(function (r) { return r.json(); })
  ]).then(function (res) { start(res[0], res[1]); }).catch(fallback);

  function start(THREE, shapes) {
    var canvas = document.createElement('canvas');
    canvas.id = 'mark-canvas';
    var renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true }); }
    catch (e) { return fallback(); }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    document.body.appendChild(canvas);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.z = 10;
    var visH = 2 * 10 * Math.tan(THREE.MathUtils.degToRad(15)); // world height at z = 0

    scene.add(new THREE.HemisphereLight(0xfff4e2, 0x1a2a1c, 1.4));
    var key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(2, 3, 4); scene.add(key);
    var fill = new THREE.DirectionalLight(0xdfe8d8, 0.7); fill.position.set(-3, -1, 3); scene.add(fill);
    var rim = new THREE.DirectionalLight(0xffffff, 1.2); rim.position.set(0, 2, -4); scene.add(rim);

    var material = new THREE.MeshPhysicalMaterial({
      color: 0x2d461d, roughness: 0.34, metalness: 0.18,
      clearcoat: 0.5, clearcoatRoughness: 0.28
    });
    var group = new THREE.Group();
    var depth = 0.14;
    shapes.forEach(function (s) {
      var shape = new THREE.Shape(s.outer.map(function (p) { return new THREE.Vector2(p[0], p[1]); }));
      s.holes.forEach(function (h) {
        shape.holes.push(new THREE.Path(h.map(function (p) { return new THREE.Vector2(p[0], p[1]); })));
      });
      var geo = new THREE.ExtrudeGeometry(shape, { depth: depth, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.018, bevelSegments: 4, curveSegments: 1 });
      geo.translate(0, 0, -depth / 2);
      group.add(new THREE.Mesh(geo, material));
    });
    scene.add(group);

    /* State: where the mark is, where it wants to be. */
    var pos = new THREE.Vector3(), target = new THREE.Vector3();
    var scale = 0, targetScale = 0, spin = 0, spinTarget = 0, idle = 0;
    var current = -1, hopStart = -1, hopFrom = 0, hopH = 0, first = true;
    var w = 0, h = 0, wpp = 0;

    function resize() {
      w = innerWidth; h = innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      wpp = visH / h; // world units per CSS pixel
      first = true;
    }
    addEventListener('resize', resize); resize();

    /* The current slot is the last one whose top has crossed 60% of the
       viewport; before any has, the first visible one. Hidden slots (display
       none on phones) are ignored. */
    function pick() {
      var idx = -1, line = h * 0.6, rects = [];
      for (var i = 0; i < slots.length; i++) {
        var r = slots[i].getBoundingClientRect();
        rects.push(r);
        if (r.height > 0 && r.top < line) idx = i;
      }
      if (idx < 0) for (i = 0; i < rects.length; i++) if (rects[i].height > 0) { idx = i; break; }
      if (idx < 0) return;
      var r2 = rects[idx];
      target.set((r2.left + r2.width / 2 - w / 2) * wpp, (h / 2 - r2.top - r2.height / 2) * wpp, 0);
      targetScale = r2.height * wpp * 0.92;
      if (idx !== current) {
        if (current >= 0 && !first) { hopStart = performance.now(); hopFrom = pos.y; hopH = Math.max(scale, targetScale) * 0.8; spinTarget += Math.PI; }
        current = idx;
      }
      if (first) { pos.copy(target); scale = targetScale; first = false; }
    }

    var last = performance.now();
    function frame(now) {
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      pick();
      var k = 1 - Math.pow(0.001, dt); // ~0.08 per frame at 60fps, frame-rate independent
      var px = pos.x;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      scale += (targetScale - scale) * k;
      spin += (spinTarget - spin) * k;
      idle += dt * (Math.PI * 2 / 24);
      var lift = 0;
      if (hopStart >= 0) {
        var p = (now - hopStart) / 900;
        if (p >= 1) hopStart = -1; else lift = Math.sin(p * Math.PI) * hopH;
      }
      var vx = (pos.x - px) / (dt || 0.016);
      group.position.set(pos.x, pos.y + lift, 0);
      group.scale.setScalar(scale);
      group.rotation.set(Math.sin(idle * 2) * 0.06, spin + Math.sin(idle) * 0.35, THREE.MathUtils.clamp(-vx * 0.05, -0.35, 0.35));
      renderer.render(scene, camera);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
})();
