import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { DEFAULT_CAMERA_POSITION } from "./camera-manager";
import AvatarCanvas from "./avatar-canvas";

const ShowAvatar = ({ className }) => {
    return (
        <div className={`w-full h-full ${className}`}>
            <Leva hidden />
            <Canvas
                camera={{
                    position: DEFAULT_CAMERA_POSITION,
                    fov: 45,
                }}
                gl={{
                    preserveDrawingBuffer: true,
                }}
                shadows
                className="w-full h-full"
            >
                <color attach="background" args={["#130f30"]} />
                <fog attach="fog" args={["#130f30", 10, 40]} />
                <group position-y={-1}>
                    <AvatarCanvas />
                </group>
            </Canvas>
        </div>
    );
};

export default ShowAvatar;
