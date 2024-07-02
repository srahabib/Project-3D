import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/Sky';

const Home = () => {
  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [4, 4, 4];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [5, 5, 5];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

  // Adjust the sky scale to make it bigger
  const skyScale = [70, 70, 70]; // Adjust this value as needed
  const skyPosition = [0, 0, 0]; // Adjust this value as needed

  return (
    <section className='w-full h-screen relative'>
      <Canvas className='w-full h-screen relative' camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} intensity={2} />
          <hemisphereLight skyColor='#b1e1ff' groundColor='#000000' intensity={1} />
          <Sky scale={skyScale} position={skyPosition} />
          <Island position={islandPosition} scale={islandScale} rotation={islandRotation} />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
