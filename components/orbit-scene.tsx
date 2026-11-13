'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import * as THREE from 'three';

// One small, disposable WebGL scene. No external model, texture, or render loop.
export default function OrbitScene({ paused = false }: { paused?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch { return; }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.z = 10;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0, 0);
    host.appendChild(renderer.domElement);
    const group = new THREE.Group(); scene.add(group);
    scene.add(new THREE.AmbientLight(0xceadff, 2.2));
    const light = new THREE.PointLight(0xb393ff, 65); light.position.set(3, 3, 4); scene.add(light);
    const fill = new THREE.PointLight(0xe1ccff, 30); fill.position.set(-3, -2, 2); scene.add(fill);
    const ringGroup = new THREE.Group(); ringGroup.rotation.set(0.95, -0.4, -0.45); group.add(ringGroup);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xb58bff, transparent: true, opacity: 0.75 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.012, 6, 120), ringMaterial); ringGroup.add(ring);
    const halo = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.045, 6, 100), new THREE.MeshBasicMaterial({ color: 0x8150ff, transparent: true, opacity: 0.12 })); ringGroup.add(halo);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.006, 6, 100), new THREE.MeshBasicMaterial({ color: 0xaa7cff, transparent: true, opacity: 0.22 })); ring2.rotation.x = 0.18; ringGroup.add(ring2);
    const crystalMaterial = new THREE.MeshPhysicalMaterial({ color: 0xa975ef, metalness: 0.22, roughness: 0.13, transparent: true, opacity: 0.8, clearcoat: 1, flatShading: true });
    const crystals = Array.from({length: 4}, (_, i) => {
      const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(i === 0 ? 0.3 : 0.16, 0), crystalMaterial);
      const positions = [[-2.25,-1.3,0.7],[2.15,1.5,0],[-1.6,1.95,-0.8],[2,-1.8,0.3]];
      mesh.position.set(...positions[i] as [number,number,number]); group.add(mesh); return mesh;
    });
    const coordinates = new Float32Array(70 * 3);
    for (let i=0;i<70;i++) { const a=i*2.39996, r=1.4+(i%11)*0.24; coordinates.set([Math.cos(a)*r,Math.sin(a)*r,(i%5-2)*0.4], i*3); }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.BufferAttribute(coordinates,3));
    group.add(new THREE.Points(geo,new THREE.PointsMaterial({color:0xd8c0ff,size:0.018,transparent:true,opacity:0.65})));
    const resize = () => { const {width,height}=host.getBoundingClientRect(); if (!width||!height) return; camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height); renderer.render(scene,camera); };
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    const pointer = {x:0,y:0};
    const move = (e:PointerEvent) => { if(e.pointerType==='touch')return;const b=host.getBoundingClientRect();pointer.x=((e.clientX-b.left)/b.width-.5)*.25;pointer.y=((e.clientY-b.top)/b.height-.5)*.2; };
    window.addEventListener('pointermove',move,{passive:true});
    let visible = true;
    const renderFrame = (time:number) => { if(!visible||document.hidden)return;const t=time*.0002;group.rotation.y+=(pointer.x-group.rotation.y)*.025;group.rotation.x+=(-pointer.y-group.rotation.x)*.025;ringGroup.rotation.z=-.45+Math.sin(t)*.13;crystals.forEach((m,i)=>{m.rotation.x=t+i;m.rotation.y=t*.7;m.position.y+=Math.sin(t*2+i)*.0009;});renderer.render(scene,camera); };
    const updateLoop=()=>{renderer.setAnimationLoop(!reduced&&!paused&&visible&&!document.hidden?renderFrame:null);renderer.render(scene,camera);};
    const intersection = new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;updateLoop();});intersection.observe(host);
    document.addEventListener('visibilitychange',updateLoop);updateLoop();
    return()=>{renderer.setAnimationLoop(null);observer.disconnect();intersection.disconnect();window.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',updateLoop);scene.traverse(obj=>{if(obj instanceof THREE.Mesh||obj instanceof THREE.Points){obj.geometry.dispose();const mats=Array.isArray(obj.material)?obj.material:[obj.material];mats.forEach((m:THREE.Material)=>m.dispose());}});renderer.dispose();renderer.domElement.remove();};
  },[reduced,paused]);
  return <div ref={root} className="orbit-scene" aria-hidden="true"/>;
}
