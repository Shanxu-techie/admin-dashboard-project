export const createDonutProgress = (canvas, options = {}) => {
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const clamp01 = (n) => Math.max(0, Math.min(1, n));

    const state = {
      angle: Math.PI * 0.5,
      percent: clamp01(options.percent ?? 1),
      foregroundStops: options.gradientStops || [
        { stop: 0, color: "rgba(0, 117, 255, 0)" },
        { stop: 1, color: "#0075FF" }
      ],
      bgType: options.bgType || "full", // "full", "arc", or "none"
      bgGradient: options.bgGradient || {
        angle: 312.89, // degrees
        stops: [
          { stop: 0, color: "rgba(6, 11, 40, 0.7)" },
          { stop: 0.3, color: "rgba(8, 13, 37, 0.71216)" },
          { stop: 0.836, color: "rgba(10, 14, 35, 0.35)" }
        ]
      },
      bgColor: options.bgColor || "#2E2F5C" // Fallback for arc-style background
    };

    const drawArc = (col, c, r, start, end) => {
      ctx.strokeStyle = col;
      ctx.beginPath();
      ctx.arc(...c, r, start, end);
      ctx.stroke();
    };

    const createLinearGradient = (ctx, width, height, angle, stops) => {
      // Convert angle from degrees to radians
      const angleRad = (angle - 90) * Math.PI / 180;
      
      // Calculate gradient direction
      const halfWidth = width / 2;
      const halfHeight = height / 2;
      const length = Math.sqrt(halfWidth * halfWidth + halfHeight * halfHeight);
      const x1 = halfWidth - Math.cos(angleRad) * length;
      const y1 = halfHeight - Math.sin(angleRad) * length;
      const x2 = halfWidth + Math.cos(angleRad) * length;
      const y2 = halfHeight + Math.sin(angleRad) * length;
      
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      stops.forEach(stop => gradient.addColorStop(stop.stop, stop.color));
      return gradient;
    };

    const drawFullBackground = (c, r) => {
      const gradient = createLinearGradient(
        ctx, 
        canvas.width, 
        canvas.height, 
        state.bgGradient.angle, 
        state.bgGradient.stops
      );
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(...c, r + ctx.lineWidth/2, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const c = [w / 2, h / 2];
      const d = Math.min(...c);
      const r = d * 0.9;

      const cap = r * 0.15;
      const capSize = cap / d * Math.PI;

      const start = state.angle;
      const end = start + Math.PI * 2 * state.percent - capSize;

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = cap;
      ctx.lineCap = "round";

      // Draw background based on type
      if (state.bgType !== "none") {
        if (state.bgType === "arc") {
          drawArc(state.bgColor, c, r, 0, Math.PI * 2);
        } else if (state.bgType === "full") {
          drawFullBackground(c, r);
        }
      }

      // Draw foreground arc
      const grad = ctx.createConicGradient(start - capSize * 0.5, ...c);
      state.foregroundStops.forEach(s => grad.addColorStop(s.stop, s.color));
      drawArc(grad, c, r, start, end);
    };

    window.addEventListener("resize", () => {
      resize();
      draw();
    });

    resize();
    draw();
  };

