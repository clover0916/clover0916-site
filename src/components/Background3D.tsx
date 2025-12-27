import { Float, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
	Vignette,
} from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function Model() {
	const { nodes } = useGLTF("/Icon_Color.glb") as any;
	const meshRef = useRef<THREE.Group>(null);
	const mouse = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1;
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	useFrame(() => {
		if (meshRef.current) {
			// Mouse interaction: rotate the model slightly based on mouse position
			const targetRotationX = mouse.current.y * 0.5; // Adjust sensitivity
			const targetRotationY = mouse.current.x * 0.5;

			meshRef.current.rotation.x = THREE.MathUtils.lerp(
				meshRef.current.rotation.x,
				targetRotationX,
				0.1,
			);
			meshRef.current.rotation.y = THREE.MathUtils.lerp(
				meshRef.current.rotation.y,
				targetRotationY,
				0.1,
			);
		}
	});

	return (
		<group ref={meshRef} dispose={null}>
			<group rotation={[Math.PI / 2, 0, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Obj_2.geometry}
					position={[0.562, 0, -0.5]}
				>
					<meshStandardMaterial
						color="#4C9A6A"
						roughness={0.2}
						metalness={0.1}
					/>
				</mesh>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Obj_4.geometry}
					position={[0.2, 0, 0.599]}
				>
					<meshStandardMaterial
						color="#4A6F58"
						roughness={0.2}
						metalness={0.1}
					/>
				</mesh>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Obj_1.geometry}
					position={[-0.863, 0, -0.136]}
				>
					<meshStandardMaterial
						color="#41C474"
						roughness={0.2}
						metalness={0.1}
					/>
				</mesh>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Obj_3.geometry}
					position={[0.2, 0, 0.599]}
				>
					<meshStandardMaterial
						color="#41C474"
						roughness={0.2}
						metalness={0.1}
					/>
				</mesh>
			</group>
		</group>
	);
}

export default function Background3D() {
	return (
		<div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
			<Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 15 }}>
				<ambientLight intensity={0.05} />
				<spotLight
					position={[10, 10, 10]}
					angle={0.5}
					penumbra={1}
					intensity={2}
					castShadow
				/>
				<pointLight position={[-10, -10, -10]} intensity={1.5} />
				<directionalLight position={[0, 5, 5]} intensity={1.5} />

				<Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
					<Model />
				</Float>

				<EffectComposer>
					<Bloom
						luminanceThreshold={0.2}
						luminanceSmoothing={0.9}
						height={300}
					/>
					<ChromaticAberration
						offset={new THREE.Vector2(0.002, 0.002)}
						radialModulation={false}
						modulationOffset={0}
					/>
					<Vignette eskil={false} offset={0.1} darkness={1.1} />
				</EffectComposer>
			</Canvas>
		</div>
	);
}

// Preload the model
useGLTF.preload("/Icon_Color.glb");
