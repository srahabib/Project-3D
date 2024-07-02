import React from 'react';
import { useGLTF } from "@react-three/drei";
import PropTypes from 'prop-types';
import skyScene from "../assets/3d/sky.glb";

const Sky = ({ scale = [1, 1, 1], position = [0, 0, 0] }) => {
  const { scene } = useGLTF(skyScene);

  return (
    <mesh scale={scale} position={position}>
      <primitive object={scene} />
    </mesh>
  );
}

Sky.propTypes = {
  scale: PropTypes.arrayOf(PropTypes.number),
  position: PropTypes.arrayOf(PropTypes.number)
};

export default Sky;
