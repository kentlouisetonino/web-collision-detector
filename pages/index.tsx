import Head from "next/head";
import { Fragment, useEffect, useRef } from "react";
import Control from "../libs/design/Control";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonUpRef = useRef<HTMLButtonElement>(null);
  const buttonDownRef = useRef<HTMLButtonElement>(null);
  const buttonLeftRef = useRef<HTMLButtonElement>(null);
  const buttonRightRef = useRef<HTMLButtonElement>(null);

  let direction = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    let x = 250;
    let y = 150;
    let coinx = Math.random() * (600 - 50);
    let coinY = Math.random() * (400 - 50);

    let t = Date.now();
    let speed = 300;
    let score = 0;

    function draw() {
      const timePassed = (Date.now() - t) / 1000;
      t = Date.now();

      context?.clearRect(0, 0, 600, 400);

      context!.font = "25px Arial";
      context!.fillStyle = "white";
      context?.fillText("Score: " + score, 20, 30);

      context?.beginPath();
      context?.rect(x, y, 100, 100);
      context!.fillStyle = "red";
      context?.fill();

      context?.beginPath();
      context?.rect(coinx, coinY, 50, 50);
      context!.fillStyle = "#e3c228";
      context?.fill();

      if (direction == 1) {
        if (x + 100 < 600) {
          x += speed * timePassed;
        }
      } else if (direction == 2) {
        if (x > 0) {
          x -= speed * timePassed;
        }
      } else if (direction == 3) {
        if (y + 100 < 400) {
          y += speed * timePassed;
        }
      } else if (direction == 4) {
        if (y > 0) {
          y -= speed * timePassed;
        }
      }

      if (
        coinx <= x + 100 &&
        x <= coinx + 50 &&
        coinY <= y + 100 &&
        y <= coinY + 50
      ) {
        score++;
        coinx = Math.random() * (600 - 50);
        coinY = Math.random() * (400 - 50);
      }

      window.requestAnimationFrame(draw);
    }
    draw();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Collision Detector</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1 className="text-4xl font-bold my-10">Collision Detector</h1>
      <canvas
        ref={canvasRef}
        id="canvas"
        width="600"
        height="400"
        className="block m-auto"
      >
        Your browser does not support HTML5 canvas tag.
      </canvas>
      <div className="my-5">
        <Control
          ref={buttonUpRef}
          onMouseDown={() => {
            direction = 4;
          }}
          onTouchStart={() => {
            direction = 4;
          }}
          onMouseUp={() => {
            direction = 0;
          }}
          onTouchEnd={() => {
            direction = 0;
          }}
        >
          ↑
        </Control>
        <br />
        <Control
          ref={buttonLeftRef}
          onMouseDown={() => {
            direction = 2;
          }}
          onTouchStart={() => {
            direction = 2;
          }}
          onMouseUp={() => {
            direction = 0;
          }}
          onTouchEnd={() => {
            direction = 0;
          }}
        >
          ←
        </Control>
        <Control
          ref={buttonDownRef}
          onMouseDown={() => {
            direction = 3;
          }}
          onTouchStart={() => {
            direction = 3;
          }}
          onMouseUp={() => {
            direction = 0;
          }}
          onTouchEnd={() => {
            direction = 0;
          }}
        >
          ↓
        </Control>
        <Control
          ref={buttonRightRef}
          onMouseDown={() => {
            direction = 1;
          }}
          onMouseUp={() => {
            direction = 0;
          }}
          onTouchStart={() => {
            direction = 1;
          }}
          onTouchEnd={() => {
            direction = 0;
          }}
        >
          →
        </Control>
      </div>
    </Fragment>
  );
}
