const flipHorizontal = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    flip: boolean
  ): void => {
    if (flip) {
      context.translate(width, 0);
      context.scale(-1, 1);
    }
  };
  
export default flipHorizontal