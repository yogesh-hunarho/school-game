"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

interface ShootingStar {
    id: number;
    x: number;
    y: number;
    angle: number;
    scale: number;
    speed: number;
    distance: number;
    delay: number;
}

interface ShootingStarsProps {
    minSpeed?: number;
    maxSpeed?: number;
    minDelay?: number;
    maxDelay?: number;
    starColor?: string;
    trailColor?: string;
    starWidth?: number;
    starHeight?: number;
    starCount?: number;
    className?: string;
}

const getRandomStartPoint = () => {
    const side = Math.floor(Math.random() * 4);
    const offset = Math.random() * window.innerWidth;

    switch (side) {
        case 0:
            return { x: offset, y: 0, angle: 45 };
        case 1:
            return { x: window.innerWidth, y: offset, angle: 135 };
        case 2:
            return { x: offset, y: window.innerHeight, angle: 225 };
        case 3:
            return { x: 0, y: offset, angle: 315 };
        default:
            return { x: 0, y: 0, angle: 45 };
    }
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
    minSpeed = 10,
    maxSpeed = 20,
    minDelay = 1200,
    maxDelay = 4200,
    starColor = "#9E00FF",
    trailColor = "#2EB9DF",
    starWidth = 10,
    starHeight = 1,
    starCount = 5,
    className,
}) => {
    const [stars, setStars] = useState<ShootingStar[]>([]);
    const svgRef = useRef<SVGSVGElement>(null);
    const lastTimeRef = useRef<number>(0);

    useEffect(() => {
        const createStar = () => {
            const { x, y, angle } = getRandomStartPoint();
            const newStar: ShootingStar = {
                id: Math.random(),
                x,
                y,
                angle,
                scale: 1,
                speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
                distance: 0,
                delay: Math.random() * (maxDelay - minDelay) + minDelay,
            };
            return newStar;
        };

        const initialStars = Array.from({ length: starCount }, () => createStar());
        setStars(initialStars);
    }, [starCount, minSpeed, maxSpeed, minDelay, maxDelay]);

    useEffect(() => {
        const moveStars = (time: number) => {
            const deltaTime = time - lastTimeRef.current;
            lastTimeRef.current = time;

            setStars((prevStars) =>
                prevStars.map((star) => {
                    if (star.delay > 0) {
                        return { ...star, delay: star.delay - deltaTime };
                    }

                    const newX =
                        star.x +
                        star.speed * Math.cos((star.angle * Math.PI) / 180);
                    const newY =
                        star.y +
                        star.speed * Math.sin((star.angle * Math.PI) / 180);
                    const newDistance = star.distance + star.speed;
                    const newScale = 1 + newDistance / 100;

                    if (
                        newX < -20 ||
                        newX > window.innerWidth + 20 ||
                        newY < -20 ||
                        newY > window.innerHeight + 20
                    ) {
                        const { x, y, angle } = getRandomStartPoint();
                        return {
                            ...star,
                            id: Math.random(),
                            x,
                            y,
                            angle,
                            scale: 1,
                            speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
                            distance: 0,
                            delay: Math.random() * (maxDelay - minDelay) + minDelay,
                        };
                    }
                    return {
                        ...star,
                        x: newX,
                        y: newY,
                        distance: newDistance,
                        scale: newScale,
                    };
                })
            );
            animationFrame = requestAnimationFrame(moveStars);
        };

        let animationFrame = requestAnimationFrame(moveStars);
        return () => cancelAnimationFrame(animationFrame);
    }, [stars, minSpeed, maxSpeed, minDelay, maxDelay]);

    return (
        <svg
            ref={svgRef}
            className={cn("w-full h-full absolute inset-0", className)}
        >
            {stars.map((star) =>
                star.delay <= 0 && (
                    <rect
                        key={star.id}
                        x={star.x}
                        y={star.y}
                        width={starWidth * star.scale}
                        height={starHeight}
                        fill="url(#gradient)"
                        transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2
                            }, ${star.y + starHeight / 2})`}
                    />
                ))}
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
                    <stop
                        offset="100%"
                        style={{ stopColor: starColor, stopOpacity: 1 }}
                    />
                </linearGradient>
            </defs>
        </svg>
    );
};

