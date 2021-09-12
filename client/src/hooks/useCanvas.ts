import { useCallback, useRef, useState } from 'react';

export interface Coords {
  x: number;
  y: number;
  color: string;
}

export const useCanvas = () => {
  const canvas = useRef<HTMLCanvasElement>();
  const coordsRef = useRef<Coords[]>([]);
  const [currentColor, setCurrentColor] = useState('#00FF00');
  const lineWidth = 2.2;
  const selectedColor = useRef('#00FF00');
  const lastX = useRef(0);
  const lastY = useRef(0);
  const ctx = useRef(canvas?.current?.getContext('2d'));

  const drawCircle = useCallback((event: any) => {
    if (!ctx || !ctx.current) {
      return;
    }
    ctx.current.beginPath();
    ctx.current.arc(lastX.current, lastY.current, 12, 0, 2 * Math.PI);
    ctx.current.stroke();

    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
  }, []);

  const draw = useCallback(
    (e: any) => {
      if (!ctx.current) return;
      [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
      ctx.current.strokeStyle = selectedColor.current;
      ctx.current.lineWidth = lineWidth;
      setCurrentColor(selectedColor.current);
      drawCircle(e);
      const circle = {
        x: lastX.current,
        y: lastY.current,
        color: selectedColor.current
      };
      coordsRef.current.push(circle);
    },
    [drawCircle]
  );

  const init = useCallback(() => {
    ctx.current = canvas?.current?.getContext('2d');
    const ratio = Math.ceil(window.devicePixelRatio) || 1;
    if (canvas && canvas.current && ctx && ctx.current) {
      canvas.current.addEventListener('click', draw);
      canvas.current.width = 350 * ratio;
      canvas.current.height = 478 * ratio;
      canvas.current.style.width = `${350}px`;
      canvas.current.style.height = `${478}px`;

      ctx.current.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  }, [draw]);

  const initViewer = () => {
    ctx.current = canvas?.current?.getContext('2d');
    const ratio = Math.ceil(window.devicePixelRatio) || 1;
    if (canvas && canvas.current && ctx && ctx.current) {
      canvas.current.width = 350 * ratio;
      canvas.current.height = 478 * ratio;
      canvas.current.style.width = `${350}px`;
      canvas.current.style.height = `${478}px`;

      ctx.current.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  };

  const handleColor = (color: string) => {
    setCurrentColor(color);
    selectedColor.current = color;
  };

  const undo = () => {
    if (!ctx.current || !canvas.current || coordsRef.current.length === 0)
      return;
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    coordsRef.current.pop();
    coordsRef.current.forEach((circle) => {
      if (!ctx.current) return;
      ctx.current.strokeStyle = circle.color;
      ctx.current.lineWidth = lineWidth;
      ctx.current.beginPath();
      ctx.current.arc(circle.x, circle.y, 12, 0, 2 * Math.PI);
      ctx.current.stroke();
    });
  };

  const loadFromCoords = (coords: Array<Coords>) => {
    if (!ctx.current || !canvas.current) return;
    coords.forEach((circle) => {
      if (!ctx.current) return;
      ctx.current.strokeStyle = circle.color;
      ctx.current.lineWidth = lineWidth;
      ctx.current.beginPath();
      ctx.current.arc(circle.x, circle.y, 12, 0, 2 * Math.PI);
      ctx.current.stroke();
    });
  };

  return [
    {
      canvas,
      selectedColor,
      coords: coordsRef
    },
    {
      init,
      initViewer,
      handleColor,
      undo,
      loadFromCoords
    }
  ];
};
