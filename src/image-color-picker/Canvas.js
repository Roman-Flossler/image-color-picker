import React, { useRef, useEffect } from 'react';

const Canvas = React.memo(({ imgUrl, sizeX, sizeY, roundness, getCtx }) => {
  const canvasrRef = useRef();

  useEffect(() => {    
    const ctx = canvasrRef.current.getContext("2d");
    const img = new Image(); 
    img.src = imgUrl;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    } 
    getCtx(ctx);
  },[imgUrl, getCtx]);
    
    return (
      <canvas ref={canvasrRef} style={{borderRadius:roundness-13}} width={sizeX} height={sizeY} />      
    );
})

export default Canvas;
