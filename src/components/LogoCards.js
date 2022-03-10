import React, {useRef} from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';


function Tree(props) {

    const logo = useGLTF('/rareaLogo.glb');

    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        ref.current.rotation.x = Math.cos(t / 4) / 8
        ref.current.rotation.y = Math.sin(t / 4) / 2
        ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
        ref.current.position.y = (0.5 + Math.sin(t / 1.5)) / 30
    });

    return (
        <group ref={ref}>
            <mesh
                castShadow
                receiveShadow
                geometry={logo.nodes.Scene.children[0].geometry}
                position={[0, 0.7, 0]}
                scale={1}
            >
                <meshBasicMaterial attach="material" color={props.color}></meshBasicMaterial>
            </mesh>

        </group>
    );
}

export default Tree;