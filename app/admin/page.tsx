import type { Metadata } from 'next';
import Studio from '@/components/studio';
export const metadata:Metadata={title:'Portfolio Studio',robots:{index:false,follow:false}};
export default function Admin(){return <Studio/>;}
