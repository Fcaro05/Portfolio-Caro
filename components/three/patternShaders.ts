/* "THE GATE" background — neon filament flow field that collapses from
 * turbulence (raw language) into hard bright data rows (structured output)
 * as uProgress rises. A hot scan column tracks the packet at uScanX. */

export const patternVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const patternFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform float uProgress;   // 0..1 scroll through the section
  uniform float uScanX;      // 0..1 screen-space x of the packet
  uniform vec2  uRes;
  uniform vec3  uA;          // violet
  uniform vec3  uB;          // cyan
  uniform vec3  uC;          // acid

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 uv = vUv;
    vec2 p = uv;
    p.x *= aspect;

    // the collapse happens over the first ~55% of the scroll
    float order = smoothstep(0.05, 0.55, uProgress);
    float t = uTime * 0.045;

    // chaotic domain-warped coordinate; warp amplitude dies as order rises
    vec2 q = vec2(fbm(p * 2.6 + t), fbm(p * 2.6 + vec2(4.7, 2.1) - t));
    vec2 pc = p * 2.6 + 2.1 * q * (1.0 - order * 0.92) + vec2(2.0, 0.7);

    // laminar coordinate: quantised rows + fast rightward flow
    float bands = 26.0;
    float row = floor(uv.y * bands);
    vec2 pl = vec2(p.x * 3.4 + t * 11.0 + row * 0.9, row * 0.42);

    vec2 ps = mix(pc, pl, order);

    // filament: sharpen the noise into thin bright veins on black
    float n = fbm(ps);
    float fil = pow(clamp(n, 0.0, 1.0), mix(2.4, 4.0, order));
    fil = smoothstep(0.12, 0.62, fil);

    // dark gaps between rows once ordered
    float bandY = fract(uv.y * bands);
    float gap = smoothstep(0.0, 0.16, bandY) * smoothstep(1.0, 0.84, bandY);
    fil *= mix(1.0, gap, order);

    // colour ramp: deep violet -> cyan -> acid crest
    vec3 col = mix(uA, uB, smoothstep(0.15, 0.75, fil));
    col = mix(col, uC, smoothstep(0.62, 1.0, fil));
    col *= 0.35 + 1.75 * fil;                 // mostly black, bright veins

    // faint violet haze so it never reads as empty
    col += uA * 0.05 * n;

    // hot scan column at the packet
    float sx = uScanX * aspect;
    float dx = abs(p.x - sx);
    col += mix(uB, uC, order) * 1.1 * smoothstep(0.09, 0.0, dx);
    col += vec3(1.0) * 0.35 * smoothstep(0.018, 0.0, dx);

    // subtle scanlines
    col *= 0.94 + 0.06 * sin(uv.y * uRes.y * 1.3);

    // vignette
    col *= 0.4 + 0.6 * smoothstep(1.25, 0.2, distance(uv, vec2(0.5)));

    gl_FragColor = vec4(col, 1.0);
  }
`;
