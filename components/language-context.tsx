'use client';
import {createContext,useContext,useEffect} from 'react';
import {translate} from '@/lib/language';
export const LanguageContext=createContext<'id'|'en'>('id');
export function useLanguage(){const lang=useContext(LanguageContext);return {lang,t:(text:string)=>translate(text,lang)};}

export function PageLanguage({lang}:{lang:'id'|'en'}){useEffect(()=>{document.documentElement.lang=lang},[lang]);return null;}
