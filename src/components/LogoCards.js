import React from 'react';
import { useGLTF } from '@react-three/drei';


function Tree(props) {

    const logo = useGLTF('/rareaLogo.glb');

    return (
        <group>
            <mesh
                castShadow
                receiveShadow
                geometry={logo.nodes.Scene.children[0].geometry}
                position={[0, 2.7, 0]}
                scale={1}
            >
                <meshBasicMaterial attach="material" color={props.color}></meshBasicMaterial>
            </mesh>

        </group>
    );
}

export default Tree;