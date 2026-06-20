/* Fullscreen neon-plasma background — domain-warped value-noise fbm. */

export const heroVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const heroFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uMouse;   // 0..1 in uv space
  uniform vec2  uRes;
  uniform vec3  uColorA;  // acid
  uniform vec3  uColorB;  // magenta
  uniform vec3  uColorC;  // cyan

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
    vec2 p = vUv;
    p.x *= aspect;
    vec2 m = uMouse;
    m.x *= aspect;

    float t = uTime * 0.05;

    // domain warping
    vec2 q = vec2(fbm(p * 2.0 + t), fbm(p * 2.0 + vec2(5.2, 1.3) - t));
    vec2 r = vec2(
      fbm(p * 2.0 + 1.8 * q + vec2(8.3, 2.8) + 0.12 * t),
      fbm(p * 2.0 + 1.8 * q + vec2(1.2, 6.3) - 0.10 * t)
    );
    float f = fbm(p * 2.0 + 1.8 * r + (length(p - m) * -0.25));

    vec3 col = mix(uColorA, uColorB, clamp(f * 1.5, 0.0, 1.0));
    col = mix(col, uColorC, clamp(length(r), 0.0, 1.0) * 0.55);

    float streak = smoothstep(0.5, 0.95, f);
    vec3 base = vec3(0.025, 0.025, 0.04);
    col = base + col * (0.14 + streak * 0.95);

    // pointer glow
    float d = distance(p, m);
    col += uColorA * 0.16 * smoothstep(0.55, 0.0, d);

    // vignette
    float vig = smoothstep(1.25, 0.15, distance(vUv, vec2(0.5)));
    col *= 0.45 + 0.55 * vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;
