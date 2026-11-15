'use client';
import {useEffect,useState} from 'react';
export type MotionMode='full'|'subtle'|'off';
export default function ExperienceControls({mode,onMode,language,onLanguage}:{mode:MotionMode;onMode:(mode:MotionMode)=>void;language:'id'|'en';onLanguage:(lang:'id'|'en')=>void}){
 const [open,setOpen]=useState(false);
 return <div className="experience-controls glass"><button className="experience-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="experience-options">✦ {language==='id'?'Pengalaman':'Experience'} <span>{mode==='off'?'○':'●'}</span></button>{open&&<div id="experience-options"><label>{language==='id'?'Bahasa':'Language'}<select value={language} onChange={e=>onLanguage(e.target.value as 'id'|'en')}><option value="id">Indonesia</option><option value="en">English</option></select></label><fieldset><legend>{language==='id'?'Gerakan & efek':'Motion & effects'}</legend>{(['full','subtle','off'] as const).map((m,i)=><label key={m}><input type="radio" name="motion-mode" checked={mode===m} onChange={()=>onMode(m)}/>{(language==='id'?['Penuh','Ringan','Mati']:['Full','Subtle','Off'])[i]}</label>)}</fieldset><small>{language==='id'?'Pilihan disimpan di perangkat ini. Pengaturan reduced motion perangkat tetap dihormati.':'Saved on this device. Your system’s reduced motion preference is always respected.'}</small></div>}</div>;
}
