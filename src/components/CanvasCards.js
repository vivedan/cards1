import React, { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
//import firebase from '../firebase';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PresentationControls} from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, SSAO as Ssao } from '@react-three/postprocessing';

import LogoCards from './LogoCards';

function CanvasCards(props) {

    //const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const mouse = useRef([0, 0]);
    /*const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        //console.log(mobile);
        if(mobile) {setIsMobile(true)}
        else{setIsMobile(false)};
    }, [])*/
    //const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), []);

    //EFFECTS
    /* function Effect() {
        const composer = useRef()
        const { scene, gl, size, camera } = useThree()
        const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
        useEffect(() => void composer.current.setSize(size.width, size.height), [size])
        useFrame(() => composer.current.render(), 1)

        //PARAMS FOR BLOOM
        const params = {resolution: aspect, strength: 1, radius: 1, threshold: 0};

        return (
          <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <unrealBloomPass attachArray="passes" args={[params.resolution, params.strength, params.radius, params.threshold]} />
          </effectComposer>
        )
    } */

    function Swarm({ count, mouse }) {
        const mesh = useRef()
        const light = useRef()
        const { size, viewport } = useThree()
        const aspect = size.width / viewport.width
        
        const dummy = useMemo(() => new THREE.Object3D(), [])
        // Generate some random positions, speed factors and timings
        const particles = useMemo(() => {
            const temp = []
            for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
            }
            return temp
        }, [count])
        // The innards of this hook will run every frame
        useFrame(state => {
            // Makes the light follow the mouse
            light.current.position.set(mouse.current[0] / aspect, -mouse.current[1] / aspect, 0)
            // Run through the randomized data to calculate some movement
            particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            // There is no sense or reason to any of this, just messing around with trigonometric functions
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)
            particle.mx += (mouse.current[0] - particle.mx) * 0.01
            particle.my += (mouse.current[1] * -1 - particle.my) * 0.01
            // Update the dummy object
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.set(s, s, s)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()
            // And apply the matrix to the instanced item
            mesh.current.setMatrixAt(i, dummy.matrix)
            })
            mesh.current.instanceMatrix.needsUpdate = true
        })
        return (
            <>
            <pointLight ref={light} distance={10} intensity={2} color="lightblue" />
            <instancedMesh ref={mesh} args={[null, null, count]}>
                <dodecahedronBufferGeometry attach="geometry" args={[0.1, 0]} />
                <meshBasicMaterial attach="material" color="#525252" />
            </instancedMesh>
            </>
        )
    }

    return (
        <div className="cards-cont">
            <Canvas
                camera={{position: [0, 0, 2]}}
                gl={{ powerPreference: "high-performance", alpha: false, antialias: false, stencil: false, depth: false }}>
                <color attach="background" args={["#0a0a0a"]} />
                <fog color="#212121" attach="fog" near={8} far={30} />
                <Suspense fallback={null}>
                    <PresentationControls
                            global
                            config={{ mass: 2, tension: 1000 }}
                            snap={{ mass: 4, tension: 1500 }}
                            rotation={[0, 0, 0]}
                            polar={[-Math.PI / 3, Math.PI / 3]}
                            azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
                        
                            <LogoCards color={props.color}/>
                        
                    </PresentationControls>
                </Suspense>
                <Swarm count={5000} mouse={mouse} />
                {/* !isMobile && <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} target={[0, 0, 0]} />}
                {isMobile && <DeviceOrientationControls target={[0, 2, 0]}/> */}

                

                {/* <Effect /> */}
                <EffectComposer smma>
                    {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.99} intensity={0.5} />
                    <Noise opacity={0.02} />
                    <Vignette eskil={false} offset={0.1} darkness={0.5} />
                    <Ssao />
                </EffectComposer>
                
            </Canvas>
            {/* <InputComment /> */}
        </div>
    );
}

export default CanvasCards;