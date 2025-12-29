import { Float, PerformanceMonitor, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import round from "lodash/round";
import { useEffect, useRef, useState } from "react";
import { type Group, MathUtils, MeshStandardMaterial } from "three";
import LoadingScreen from "./LoadingScreen";

const material1 = new MeshStandardMaterial({
	color: "#4C9A6A",
	roughness: 0.2,
	metalness: 0.1,
});
const material2 = new MeshStandardMaterial({
	color: "#4A6F58",
	roughness: 0.2,
	metalness: 0.1,
});
const material3 = new MeshStandardMaterial({
	color: "#41C474",
	roughness: 0.2,
	metalness: 0.1,
});

function Model() {
	const { nodes } = useGLTF("/Icon_Color.glb") as any;
	const meshRef = useRef<Group>(null);
	const mouse = useRef({ x: 0, y: 0 });
	const regress = useThree((state) => state.performance.regress);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1;
			regress();
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [regress]);

	useFrame(() => {
		if (meshRef.current) {
			// Mouse interaction: rotate the model slightly based on mouse position
			const targetRotationX = mouse.current.y * 0.5; // Adjust sensitivity
			const targetRotationY = mouse.current.x * 0.5;

			meshRef.current.rotation.x = MathUtils.lerp(
				meshRef.current.rotation.x,
				targetRotationX,
				0.02,
			);
			meshRef.current.rotation.y = MathUtils.lerp(
				meshRef.current.rotation.y,
				targetRotationY,
				0.02,
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
					material={material1}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Obj_4.geometry}
					position={[0.2, 0, 0.599]}
					material={material2}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Obj_1.geometry}
					position={[-0.863, 0, -0.136]}
					material={material3}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Obj_3.geometry}
					position={[0.2, 0, 0.599]}
					material={material3}
				/>
			</group>
		</group>
	);
}

export default function Background3D() {
	const [dpr, setDpr] = useState(1.5);

	return (
		<>
			<LoadingScreen />
			<div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
				<Canvas
					shadows
					dpr={dpr}
					performance={{ min: 0.5 }}
					camera={{ position: [0, 0, 15], fov: 15 }}
				>
					<PerformanceMonitor
						onChange={({ factor }) => setDpr(round(0.5 + 1.5 * factor, 1))}
					>
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
					</PerformanceMonitor>
				</Canvas>
			</div>
		</>
	);
}

// Preload the model
useGLTF.preload("/Icon_Color.glb");
