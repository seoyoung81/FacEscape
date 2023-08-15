const convertToGrayscale = (context: CanvasRenderingContext2D, width: number, height: number): void => {
    const imgData = context.getImageData(0, 0, width, height);
    const pixels = imgData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const grayscale = r * 0.3 + g * 0.59 + b * 0.11;
      pixels[i] = pixels[i + 1] = pixels[i + 2] = grayscale;
    }
    context.putImageData(imgData, 0, 0);
  };

export default convertToGrayscale;