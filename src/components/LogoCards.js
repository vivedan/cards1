import React, {useEffect, useRef} from 'react';
import { useGLTF } from '@react-three/drei';


function Tree(props) {

    const logo = useGLTF('/kaldevi_logo3D1.glb');

    const ref = useRef();

    /*useEffect(() => {
        window.addEventListener('deviceorientation', function(e) {
            var gammaRotation = e.gamma ? e.gamma * (Math.PI / 180) : 0;
            var alphaRotation = e.alpha ? e.alpha * (Math.PI / 180) : 0;
            var betaRotation = e.beta ? e.beta * (Math.PI / 180) : 0;
            ref.current.rotation.y = gammaRotation;
            ref.current.rotation.z = alphaRotation;
            ref.current.rotation.x = betaRotation;
        });
    }, [])*/

    return (
        <group ref={ref}>
            <mesh
                castShadow
                receiveShadow
                geometry={logo.nodes.Scene.children[0].geometry}
                position={[0, 0.8, 0]}
                rotation={[Math.PI/2, 0, 0]}
                scale={15}
            >
                <meshBasicMaterial attach="material" color={props.color}></meshBasicMaterial>
            </mesh>

        </group>
    );
}

export default Tree;