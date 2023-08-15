const flipVertical = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    flip: boolean
): void => {
    if (flip) {
        context.translate(0, height);
        context.scale(1, -1);
    }
};

export default flipVertical;