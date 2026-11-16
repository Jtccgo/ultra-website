// Nature Landscape Shader for GlslCanvas
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 5
float fbm (in vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // Sunset / twilight sky gradient
    vec3 col = mix(vec3(0.95, 0.6, 0.3), vec3(0.15, 0.3, 0.6), st.y);

    // Drifting clouds
    vec2 cloudPos = st * 3.0;
    cloudPos.x += u_time * 0.03;
    float cloud = fbm(cloudPos);
    col = mix(col, vec3(1.0), smoothstep(0.4, 0.8, cloud) * 0.4);

    // Distant mountain layer
    float m2 = fbm(vec2(st.x * 2.5 + 5.0, 0.0));
    float mountain2 = smoothstep(0.35, 0.37, m2 * 0.35 + 0.25 - st.y);
    vec3 mColor2 = vec3(0.2, 0.3, 0.35);
    col = mix(col, mColor2, mountain2);

    // Foreground mountain layer
    float m1 = fbm(vec2(st.x * 3.5, 0.0));
    float mountain1 = smoothstep(0.25, 0.27, m1 * 0.4 + 0.15 - st.y);
    vec3 mColor1 = vec3(0.08, 0.15, 0.15);
    col = mix(col, mColor1, mountain1);

    gl_FragColor = vec4(col, 1.0);
} 