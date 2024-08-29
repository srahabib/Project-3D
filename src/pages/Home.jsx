import { Suspense , useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import HomeInfo from '../components/HomeInfo';

const Home = () => {

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage , setCurrentStage] = useState(1);
  
  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [0.1, 0.1, 0.1];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [0.1,0.1, 0.1];
      screenPosition = [0, -1, 2];
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
      screenScale = [1.4, 1.4, 1.4];
      screenPosition = [0, 0, -8];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

  // Adjust the sky scale to make it bigger
  const skyScale = [1, 1, 1]; // Adjust this value as needed
  const skyPosition = [0, -10, 0]; // Adjust this value as needed

  return (
    <section className='w-full h-screen relative'>

      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <div className='canvas-container'>
       <Canvas shadows 
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight castShadow position={[5, 2, -10]} intensity={5} />
          <ambientLight castShadow  intensity={0.5} />
          <pointLight castShadow  position={[0, 5, -8]} intensity={3} />
          <spotLight castShadow  position={[0, 5, -8]} angle={0.15} penumbra={1} intensity={3} />
          <hemisphereLight castShadow  skyColor='#b1e1ff' groundColor='#000000' intensity={5} />
          <Bird
          isRotating={isRotating}
          position={biplanePosition}
          rotation={[0, 20.1, 0]}
          scale={biplaneScale}/>
          <Sky scale={skyScale} position={skyPosition} isRotating={isRotating} />
          <Island position={islandPosition} scale={islandScale} rotation={islandRotation}
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          setCurrentStage={setCurrentStage}/>
        </Suspense>
      </Canvas>
      </div>
    </section>
  );
};

export default Home;
