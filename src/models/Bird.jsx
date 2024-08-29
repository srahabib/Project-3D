import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import BirdScene from "../assets/3d/bird.glb";

export function Bird({ isRotating, ...props }) {
  const ref = useRef();
  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(BirdScene);
  // Get animation actions associated with the bird
  const { actions } = useAnimations(animations, ref);

  // Use an effect to control the bird's animation based on 'isRotating'
  useEffect(() => {
    const action = actions["Take 001"];
    
    if (isRotating) {
      action.timeScale = 5; // Faster speed when rotating
    } else {
      action.timeScale = 15; // Normal speed when not rotating
    }

    action.play();

    return () => {
      action.stop();
    };
  }, [actions, isRotating]);

  return (
    <primitive object={scene} ref={ref} {...props} />
  );
}

export default Bird;
