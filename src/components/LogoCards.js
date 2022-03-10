import React, { useState } from 'react';
import * as THREE from 'three';
import { useGLTF, Text } from '@react-three/drei';
//import logoPath from '../models/rareaLogo.glb';

import { useSpring, animated } from '@react-spring/three';


function Tree(props) {
    //'../../public/assets/rarea_ChristmasTree.glb'

    const logo = useGLTF('/rareaLogo.glb');

    const [hovered, setHovered] = useState(false);

    const {scale} = useSpring({ scale: hovered ? [2, 2, 2] : [1, 1, 1] });
  
    const colors = ['Chartreuse', 'GreenYellow', 'PaleGreen'];

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